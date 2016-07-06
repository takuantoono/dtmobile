﻿/*:* @author Wouter Alberts (Sulsay)** @plugindesc Enables jumping over specified terrain tags and, optionally, events.** @param alwaysAllowJumping* @desc Boolean - If false, jumping is disabled when pointless, to prevent "bunny hopping" all over te map.* @default true** @param eventsAreJumpableByDefault* @desc Boolean - Determines if events at level "same as character" can be jumped over by default.* @default true** @param jumpableTerrainTags* @desc Integer[] - The terrain tags that can be jumped over. Apply to "low" unpassable tiles such as water.* @default [1]** @param jumpDistance* @desc Integer - The number of tiles to jump. If blocked, player will jump the first available smaller distance.* @default 2** @param jumpKey* @desc String - The button that triggers jumping.* @default "pageup"** @param sound* @desc Object - The sound to play when jumping. "volume", "pitch" and "pan" are optional, defaulting to 100, 100 and 0.* @default {"name": "Jump1"}** @help* Version 2:* - Added the option alwaysAllowJumping. If false, the player will not jump if the destination is a tile that he could have reached by simply walking [jumpDistance] tiles forward.** Version 1:* - Initial release.** Available for commercial use for free.** If you set eventsAreJumpableByDefault to true, you can override this behaviour with an event note containing "<!jumpable>".* Inversely, if eventsAreJumpableByDefault is false, override it with "<jumpable>".* This behaviour only applies to events with priority "Same as character".** To customize the sound that plays when jumping, supply a json object with at least the key "name".** jumpableTerrainTags is an array of integers containing the numbers of terrain tags that your player can jump over.* Apply such a terrain tag to water, holes in the floor and other small obstacles that appear jumpable to the player.** The jumpKey is set to "pageup" (Q) by default. Use a plugin for additional key mappings if you want to have more options than what RMMV supplies by default.* Additional key mappings are not part of this plugin, because a plugin should do as little as possible and minimize the risk of introducing conflicting behaviour.** Plugin commands:* - toggleJumpingEnabled* Toggles the jumping feature on/off. Supply an optional boolean argument (true or false) to enable or disable it.*/(function () {    var fileNameWithoutExtension = document.currentScript.src.split('/').pop().split('.')[0];    var options = PluginManager.parameters(fileNameWithoutExtension);    for (var key in options) {        if (options.hasOwnProperty(key)) {            try {                options[key] = JSON.parse(options[key]);            }            catch (err) {                var stringValue = String(options[key]);                console.warn('Failed to parse parameter "%1", falling back to string value: %2'.format(key, stringValue));                options[key] = stringValue;            }        }    }    var sound = {name: 'Jump1', volume: 100, pitch: 100, pan: 100};    ['name', 'volume', 'pitch', 'pan'].forEach(function (key) {        if (options.sound[key] != null) {            sound[key] = options.sound[key];        }    });    options.sound = sound;    options.eventsAreJumpableByDefault = !!options.eventsAreJumpableByDefault;    var priorityToRevertToOnLand = null, // This is set at the start of a jump, and gets reset to null upon landing.        isJumpingEnabled = true;         // Flag that can be set with the plugin command "toggleJumpingEnabled" (which accepts optional true or false argument).    var Tile = (function () {        function Tile(x, y) {            this.x = x;            this.y = y;            this.adjustXForHorizontalLoop();            this.adjustYForVerticalLoop();        }        Tile.prototype.adjustXForHorizontalLoop = function () {            if ($gameMap.isLoopHorizontal()) {                var mapWidth = $gameMap.width();                this.x += this.x < 0 ? mapWidth : this.x >= mapWidth ? -mapWidth : 0;            }        };        Tile.prototype.adjustYForVerticalLoop = function () {            if ($gameMap.isLoopVertical()) {                var mapHeight = $gameMap.height();                this.y += this.y < 0 ? mapHeight : this.y >= mapHeight ? -mapHeight : 0;            }        };        Tile.prototype.analyze = function (dir) {            var i, terrainTag = $gameMap.terrainTag(this.x, this.y);            this.isLowObstacle = options.jumpableTerrainTags.contains(terrainTag);            this.hasCollidingEvent = $gamePlayer.isCollidedWithEvents(this.x, this.y);            // A valid player position is a tile that can be accessed from at least one direction.            this.isValidPlayerPosition = false;            if (!this.hasCollidingEvent) {                var dirs = [2, 3, 6, 8];                for (i = 0; i < dirs.length; i++) {                    if ($gameMap.isPassable(this.x, this.y, dirs[i])) {                        this.isValidPlayerPosition = true;                        break;                    }                }            }            var events = $gameMap.eventsXy(this.x, this.y).filter(function (e) {                return e.isNormalPriority() && e.page();            });            this.jumpableNoteIsSet = false;            this.notJumpableNoteIsSet = false;            for (i = 0; i < events.length; i++) {                var note = events[i].event().note;                if (note.includes('<jumpable')) {                    this.jumpableNoteIsSet = true;                    break;                }                else if (note.includes('<!jumpable')) {                    this.notJumpableNoteIsSet = true;                    break;                }            }            this.isBlockedInDirectionOfMotion = !$gameMap.isPassable(this.x, this.y, dir);            this.isBlockedInOppositeDirection = !$gameMap.isPassable(this.x, this.y, 10 - dir);            // X and Y are already adjusted for looping (if applicable), so a simple bounds check is sufficient:            this.isInsideMap = this.x >= 0 && this.y >= 0 && this.x < $gameMap.width() && this.y < $gameMap.height();            return this;        };        return Tile;    })();    var Jump = (function () {        function Jump() {            this.dir = $gamePlayer.direction();            // Initiate the path (= the potential landing tiles) with the players' current position:            this.path = [new Tile($gamePlayer.x, $gamePlayer.y)];            // The path is to contain jumpDistance + 1 tiles (because it includes the starting position).            while (this.path.length <= options.jumpDistance) {                this.pushPath();            }            // For the option alwaysAllowJumping, maintain a flag indicating if the player could have simply walked to the jump-destination.            this.couldHaveWalked = true;        }        Jump.prototype.pushPath = function () {            var previous = this.path[this.path.length - 1],                x = $gameMap.xWithDirection(previous.x, this.dir),                y = $gameMap.yWithDirection(previous.y, this.dir);            this.path.push(new Tile(x, y));        };        Jump.prototype.determineDestination = function () {            this.destination = this.path.shift().analyze(this.dir);            // Passage of the starting position may be blocked in the direction of the jump. Player will not move forward, but still make the jumping motion.            // A block does not apply if the terrain tag for "low" is assigned.            if (this.destination.isBlockedInDirectionOfMotion && !this.destination.isLowObstacle) {                return this;            }            var previousTileWasBlock = false;            // All positions but the starting position remain to be checked:            while (this.path.length) {                var tile = this.path.shift().analyze(this.dir);                if (!tile.isInsideMap) {                    break;                }                if (tile.isValidPlayerPosition && (!tile.isBlockedInOppositeDirection || tile.isLowObstacle)) {                    // Player can stand here, and reach it.                    this.destination = tile;                    if (previousTileWasBlock) {                        this.couldHaveWalked = false;                    }                }                var canJumpOver = !tile.hasCollidingEvent && (tile.isLowObstacle || (!tile.isBlockedInDirectionOfMotion && !tile.isBlockedInOppositeDirection));                if (!canJumpOver && tile.hasCollidingEvent) {                    // Events can either be jumped over by default, or if a special note is present on the event.                    if ((options.eventsAreJumpableByDefault && !tile.notJumpableNoteIsSet)                        || (!options.eventsAreJumpableByDefault && tile.jumpableNoteIsSet)) {                        canJumpOver = true;                    }                }                if (!canJumpOver) {                    // Obstacles that aren't marked "low" with a customizable terrain tag cannot be jumped over.                    break;                }                if (!tile.isValidPlayerPosition) {                    previousTileWasBlock = true;                }            }            return this;        };        Jump.prototype.getRelative = function () {            if (this._relative == null) {                this._relative = {                    x: this.correctForHorizontalLoop(this.destination.x - $gamePlayer.x),                    y: this.correctForVerticalLoop(this.destination.y - $gamePlayer.y)                }            }            return this._relative;        };        Jump.prototype.correctForHorizontalLoop = function (relativeX) {            if (this.dir === 4 && relativeX > 0) {                // Facing left, jumping to a tile to the right of the player.                return relativeX - $gameMap.width();            }            else if (this.dir === 6 && relativeX < 0) {                // Facing right, jumping to a tile to the left of the player.                return $gameMap.width() + relativeX;            }            // No correction needed:            return relativeX;        };        Jump.prototype.correctForVerticalLoop = function (relativeY) {            if (this.dir === 2 && relativeY < 0) {                // Facing down, jumping to a tile higher than the player.                return $gameMap.height() + relativeY;            }            else if (this.dir === 8 && relativeY > 0) {                // Facing up, jumping to a tile lower than the player.                return relativeY - $gameMap.height();            }            // No correction needed:            return relativeY;        };        Jump.prototype.getDistance = function () {            return this._distance || (this._distance = Math.abs(this.getRelative().x) + Math.abs(this.getRelative().y));        };        return Jump;    })();    var moveByInput = Game_Player.prototype.moveByInput;    Game_Player.prototype.moveByInput = function () {        moveByInput.call(this);        if (isJumpingEnabled && !this.isMoving() && this.canMove() && Input.isTriggered(options.jumpKey)) {            var jump = new Jump(),                relative = jump.determineDestination().getRelative();            if (!options.alwaysAllowJumping) {                // The option alwaysAllowJumping is off. This means that if the player isn't actually jumping over something that would otherwise block him,                // or will remain on the same tile during the jump, the jump will not take place.                if (jump.getDistance() === 0 || jump.couldHaveWalked) {                    return;                }            }            priorityToRevertToOnLand = $gamePlayer._priorityType;            $gamePlayer.setPriorityType(1.1);            this.jump(relative.x, relative.y);            AudioManager.playSe(sound);            // Increment the step counter using the intended method, respecting plugins that extend it.            for (var i = 0; i < jump.getDistance(); i++) {                $gameParty.increaseSteps();            }        }        if (priorityToRevertToOnLand !== null && !this.isJumping()) {            // Player landed.            this.setPriorityType(priorityToRevertToOnLand);            priorityToRevertToOnLand = null;        }    };    var pluginCommand = Game_Interpreter.prototype.pluginCommand;    Game_Interpreter.prototype.pluginCommand = function (command, args) {        if (command === 'toggleJumpingEnabled') {            if (args.length === 1) {                isJumpingEnabled = args[0] === 'true';            }            else {                isJumpingEnabled = !isJumpingEnabled;            }        }        pluginCommand.call(this, command, args);    };})();