// -------------------------------------------------------------------------------------------------
// SOUL_MV Turn and Move.js
// Author: Soulpour777
// -------------------------------------------------------------------------------------------------
/*:
* @plugindesc v1.0 Makes the character turn to the direction before actual movement is executed.
* @author Soulpour777 - soulxregalia.wordpress.com
*
*@help

SOUL_MV Turn and Move
Author: Soulpour777

In the Pokemon games, it allows you to turn to the direction 
first before you actually move to that certain direction. 
This plugin emulates that certain effect.

Plugin Commands

set turnandmove true 				sets the turn and move function turned ON.
set turnandmove false				sets the turn and move function turned OFF.

Terms:
 - You are free to edit and adapt my plugins
 - You are free to use this plugin for commercial and non commercial use.

For more terms of use questions, please visit my website.

* @param Delay Time
* @desc The delay time of the turning process before actual movement execition.
* @default 6
*/
(function(){
	var SOUL_MV = SOUL_MV || {};
	SOUL_MV.TurnAndMove = SOUL_MV.TurnAndMove || {};

	SOUL_MV.TurnAndMove.delayTime = Number(PluginManager.parameters('SOUL_MV Turn and Move')['Delay Time'] || 6);
	SOUL_MV.TurnAndMove._gamePlayer_moveByInput = Game_Player.prototype.moveByInput;
	SOUL_MV.TurnAndMove._gamePlayer_update = Game_Player.prototype.update;
	SOUL_MV.TurnAndMove._gameSystem_initialize = Game_System.prototype.initialize;
	SOUL_MV.TurnAndMove._pluginCommand = Game_Interpreter.prototype.pluginCommand;
	Game_System.prototype.initialize = function() {
		SOUL_MV.TurnAndMove._gameSystem_initialize.call(this);
		this._turnMove = true;
	}
	Game_Interpreter.prototype.pluginCommand = function(command, args) {
	    // to be overridden by plugins
	    switch(command) {
	    	case 'set':
	    		if (args[0] === 'turnandmove') {
	    			if (args[1] === 'true') {
	    				$gameSystem._turnMove = true;
	    			} else if (args[1] === 'false') {
	    				$gameSystem._turnMove = false;
	    			} else {
	    				alert("SOUL_MV Turn and Move: No such plugin command exist!");
	    			}
	    		}
	    }
	    SOUL_MV.TurnAndMove._pluginCommand.call(this, command, args);
	};
	Game_Player.prototype.initialize = function() {
	    Game_Character.prototype.initialize.call(this);
	    this.setTransparent($dataSystem.optTransparent);
	    this._execTime = SOUL_MV.TurnAndMove.delayTime;
	};

	Game_Player.prototype.update = function(sceneActive) {
	    SOUL_MV.TurnAndMove._gamePlayer_update.call(this, sceneActive);
	    if (this._execTime != 0)this._execTime--;
	};

	Game_Player.prototype.moveByInput = function() {
		if ($gameSystem._turnMove) {
		    if (!this.isMoving() && this.canMove()) {
		        var direction = this.getInputDirection();
		        switch(direction) {
		        	case 2:
		        		if (Input.isTriggered('down')) {
		        			this._execTime = SOUL_MV.TurnAndMove.delayTime;

		        			this.setDirection(2);

		        		} else if (this._execTime <= 0) {
					        if (direction > 0) {
					            $gameTemp.clearDestination();
					        } else if ($gameTemp.isDestinationValid()){
					            var x = $gameTemp.destinationX();
					            var y = $gameTemp.destinationY();
					            direction = this.findDirectionTo(x, y);
					        }
					        if (direction > 0) {
if ($gameSwitches.value(236)===false){
 this.executeMove(direction);
}
else
{
if ($gameMap.terrainTag($gamePlayer.x, $gamePlayer.y) === 4 || $gameMap.terrainTag($gamePlayer.x, $gamePlayer.y) === 3) {
 this.executeMove(direction);
}
else
{
if ($gameSwitches.value(289)===true && $gameMap.terrainTag($gamePlayer.x, $gamePlayer.y) === 5) {
 this.executeMove(direction);
}
}					            
}
					        }
		        		}
		        		break;	
		        	case 8:
		        		if (Input.isTriggered('up')) {
		        			this._execTime = SOUL_MV.TurnAndMove.delayTime;
if ($gameSwitches.value(236)===true && $gameMap.terrainTag($gamePlayer.x, $gamePlayer.y) == 0 && $gameMap.terrainTag($gamePlayer.x, $gamePlayer.y) !== 5) {
}
else
{
		        			this.setDirection(8);
}
		        		} else if (this._execTime <= 0) {
					        if (direction > 0) {
					            $gameTemp.clearDestination();
					        } else if ($gameTemp.isDestinationValid()){
					            var x = $gameTemp.destinationX();
					            var y = $gameTemp.destinationY();
					            direction = this.findDirectionTo(x, y);
					        }
					        if (direction > 0) {
if ($gameSwitches.value(236)===true && $gameMap.terrainTag($gamePlayer.x, $gamePlayer.y) !== 3) {

if ($gameSwitches.value(289)===true && $gameMap.terrainTag($gamePlayer.x, $gamePlayer.y) === 5) {
 this.executeMove(direction);
}

}
else
{
					            this.executeMove(direction);
}
					        }
		        		}
		        		break;	     
		        	case 4:
		        		if (Input.isTriggered('left')) {
		        			this._execTime = SOUL_MV.TurnAndMove.delayTime;
if ($gameSwitches.value(236)===true && $gameMap.terrainTag($gamePlayer.x, $gamePlayer.y) == 0) {
}
else
{
		        			this.setDirection(4);
}
		        		} else if (this._execTime <= 0) {
					        if (direction > 0) {
					            $gameTemp.clearDestination();
					        } else if ($gameTemp.isDestinationValid()){
					            var x = $gameTemp.destinationX();
					            var y = $gameTemp.destinationY();
					            direction = this.findDirectionTo(x, y);
					        }
					        if (direction > 0) {

					            this.executeMove(direction);


					        }
		        		}
		        		break;	 
		        	case 6:
		        		if (Input.isTriggered('right')) {
		        			this._execTime = SOUL_MV.TurnAndMove.delayTime;
if ($gameSwitches.value(236)===true && $gameMap.terrainTag($gamePlayer.x, $gamePlayer.y) == 0) {
}
else
{
		        			this.setDirection(6);
}

		        		} else if (this._execTime <= 0) {
					        if (direction > 0) {
					            $gameTemp.clearDestination();
					        } else if ($gameTemp.isDestinationValid()){
					            var x = $gameTemp.destinationX();
					            var y = $gameTemp.destinationY();
					            direction = this.findDirectionTo(x, y);
					        }
					        if (direction > 0) {

					            this.executeMove(direction);


					        }
		        		}
		        		break;		        			        		   		        		   	
		        }

		    }
		} else {
			SOUL_MV.TurnAndMove._gamePlayer_moveByInput.call(this);
		}
	};
})();
