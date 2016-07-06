//=============================================================================
// SAN_AnalogMove.js
//=============================================================================
// Copyright (c) 2015-2016 Sanshiro
// Released under the MIT license
// http://opensource.org/licenses/mit-license.php
//=============================================================================

/*:
 * @plugindesc SAN_AnalogMove ver1.34 : Movement of 1 pixel unit.
 * Analog Stick and Touch Pad are supported. 
 * @author Sanshiro https://twitter.com/rev2nym
 * 
 * @help
 * Change player's movement to 1 pixel movement that isn't depend tiles.
 * Arrow Key, Analog Stick and Touch Pad are supported.
 * 
 * It's possible to commercial use, distribute, and modify under the MIT license.
 * But, don't eliminate and don't alter a comment of the beginning.
 * If it's good, please indicate an author name on credit.
 * 
 * Author doesn't shoulder any responsibility in all kind of damage by using this.
 * And please don't expect support. X(
 * 
 * Plugin Command
 *   AnalogMove ON            # Allow AnalogMove system working.
 *   AnalogMove OFF           # Disallow AnalogMove system working.
 *   AnalogMove Player ON     # Allow player and followers analog moving.
 *   AnalogMove Player OFF    # Disallow player and followers analog moving.
 *   
 * @param Valid
 * @desc Initial valid flag of AnalogMove system. ('ON' is valid)
 * @default OFF
 *
 * @param Player
 * @desc Initial valid flag of player and followers analog moving. ('ON' is valid)
 * @default OFF
 *
 */

/*:ja
 * @plugindesc �A�i���O���[�u ver1.34
 * 1�s�N�Z���P�ʂ̈ړ� �A�i���O�X�e�B�b�N�E�^�b�`�p�b�h�Ή�
 * @author �T���V�� https://twitter.com/rev2nym
 * @version 1.34 2016/03/30 ���񂾃v���C�I���e�B�̈قȂ�ڐG�C�x���g�̊Ԃ����蔲����s����C���A1�t���[�����ɋN������C�x���g��1�����ɂ���悤�ύX
 * 1.33 2015/11/29 �v���O�C���p�����[�^�����f����Ȃ��s����C��
 * 1.32 2015/11/29 �X���[�L�����̋����Ɋ֘A���ăt�H�����[�̋������C��
 * 1.31 2015/11/28 �R�[�h�����A�v���C���[�̃X���[�L�����̋����A��s�����Ɍ���{�^���E�ڐG�C�x���g���N������s����C��
 * 1.30 2015/11/26 ���W���[������SAN_AnalogMove.js�ɕύX�A���O��Ԃ̒ǉ��A��蕨�ɑΉ�
 * 1.27a 2015/11/25 �p��h�L�������g�ǉ�
 * 1.27 2015/11/24 MIT���C�Z���X�ɕύX�A�Z�[�u�t�@�C������Փ˃}�b�v�����O�A���[�g�w�莞�̌������f�̕s����C��
 * 1.26 2015/11/20 �t�H�����[�̈ʒu���f�A�C�x���g���̕��s�A�j���A�ʍs������b��C��
 * 1.25 2015/11/16 �t�H�����[�̌����Œ�ړ��̕s��Ə���ON�N�����ɃG���[�I������s����C��
 * 1.24 2015/11/15 �@�\�L���t���O�̏�Ԃ��Z�[�u�t�@�C���ɕۑ�����悤�C��
 * 1.23 2015/11/14 �ʍs�s�\�^�C���̐ڐG�C�x���g�N����ǉ��A���[�g�w��ړ��̌������f���C��
 * 1.22 2015/11/12 �E�B���h�E�������̃}�E�X�E�^�b�`�p�b�h�̊��x�A���W�w��ړ��̏I�������𒲐�
 * 1.21 2015/11/11 �΂ݕ\���A�������f�A�v���C�I���e�B�̈قȂ�C�x���g�̋N���̕s����C��
 * 1.20 2015/11/10 �^�b�`�p�b�h�ɑΉ��A�������f�A�C�x���g���̈ړ��A�}�b�v�[�̒ʍs����̕s����C��
 * 1.10 2015/11/09 �����_���G���J�E���g�ɑΉ��A�v���O�C���p�����[�^�Ǎ��݂̕s����C��
 * 1.01 2015/11/08 �p�x�̌�v�Z���C���A���[�v�}�b�v�g�p�\
 * 1.00 2015/11/08 �t�H�����[�̈ړ����x��������A�����[�X�o�[�W�����ɃA�b�v
 * 0.90 2015/11/08 �v���O�C���p�����[�^�E�R�}���h�A�ړ����[�g�̎w��A�t�H�����[�\���E�W���ȂǂɑΉ�
 * 0.12 2015/11/08 �Z�[�u�����[�h�Ɏb��Ή�
 * 0.11 2015/11/07 �����̃C�x���g�ɓ����ɐڐG�����Ƃ��G���[�I������s����C��
 * 0.10 2015/11/06 ���J
 * 
 * @help
 * �v���C���[�L�����N�^�[�̈ړ����^�C���ɂ��Ȃ�1�s�N�Z���P�ʂ̈ړ��ɕύX���܂��B
 * �����L�[�A�A�i���O�X�e�B�b�N�A�^�b�`�p�b�h���͂ɑΉ����Ă��܂��B
 * 
 * MIT���C�Z���X�̂��ƁA���p���p�A���ρA�Ĕz�z���\�ł��B
 * �������`���̃R�����g�͍폜����ς����Ȃ��ł��������B
 * �悩������N���W�b�g�ɍ�Җ����L�ڂ��Ă��������B
 * 
 * ����𗘗p�������Ƃɂ�邢���Ȃ鑹�Q�ɂ���҂͐ӔC�𕉂��܂���B
 * �T�|�[�g�͊��҂��Ȃ��ł������������B
 * 
 * �v���O�C���R�}���h
 *   AnalogMove ON            # �A�i���O���[�u�@�\�L����
 *   AnalogMove OFF           # �A�i���O���[�u�@�\������
 *   AnalogMove Player ON     # �v���C���[�ƃt�H�����[�̃A�i���O���[�u�L����
 *   AnalogMove Player OFF    # �v���C���[�ƃt�H�����[�̃A�i���O���[�u������
 *
 * @param Valid
 * @desc �A�i���O���[�u�@�\�̗L���t���O�̏����l�ł��B�iON�ŗL���j
 * @default OFF
 *
 * @param Player
 * @desc �v���C���[�ƃt�H�����[�̃A�i���O���[�u�L���t���O�̏����l�ł��B�iON�ŗL���j
 * @default OFF
 *
 */

var Imported = Imported || {};
Imported.SAN_AnalogMove = true;

var Sanshiro = Sanshiro || {};
Sanshiro.Game_AnalogMove = Sanshiro.Game_AnalogMove || {};

//-----------------------------------------------------------------------------
// Game_AnalogMove
//
// �A�i���O���[�u�N���X
function Game_AnalogMove() {
    this.initialize.apply(this, arguments);
};

// �A�i���O���[�u�N���X������
Game_AnalogMove.prototype.initialize = function(thisCharacter) {
    this._crntRealX    = thisCharacter._realX;        // ���݃}�b�v�� X ���W
    this._nextRealX    = thisCharacter._realX;        // ����}�b�v�� X ���W
    this._crntRealY    = thisCharacter._realY;        // ���݃}�b�v�� Y ���W
    this._nextRealY    = thisCharacter._realY;        // ����}�b�v�� Y ���W
    this._targRealX    = undefined;                   // �ڕW�}�b�v�� X ���W
    this._targRealY    = undefined;                   // �ڕW�}�b�v�� Y ���W
    this._dir4         = thisCharacter.direction();   // �L�����N�^�[�̌���
    this._distancePerFrame = 0.0;                     // �t���[���Ԉړ������i�s�N�Z���j
    this._directionRadian  = this.dir8ToRadian(thisCharacter.direction()); // ���ݐi�s����
    this._targetRadian     = this.dir8ToRadian(thisCharacter.direction()); // �ڕW�i�s����
    this._directionRadianVariate = Math.PI*2.0;       // �i�s���ʕω���
    this._encounterCount   = 0.0;                     // �G���J�E���g����
    this._collideEvents    = new Array();             // �ڐG�C�x���g
    this._isMoving         = false;                   // �ړ�������
    this._isThrough        = false;                   // ���蔲������
    this._valid            = false;                   // �A�i���O���[�u�ʃL�����N�^�[�L���t���O
};

// �A�i���O���[�u�ʃL�����N�^�[�L���t���O�̐ݒ�
Game_AnalogMove.prototype.setValid = function(valid) {
    this._valid = valid;
};

// �A�i���O���[�u�ʃL�����N�^�[�L������
Game_AnalogMove.prototype.isValid = function() {
    return $gameSystem.analogMoveValid() && this._valid;
};

// �A�i���O���[�u�ړ��\����
Game_AnalogMove.canMove = function() {
    return $gamePlayer.canMove() && !SceneManager.isSceneChanging();
};

// �t���[���X�V
Game_AnalogMove.prototype.update = function(thisCharacter) {
    this._crntRealX = thisCharacter._realX;
    this._crntRealY = thisCharacter._realY;
    this._nextRealX = thisCharacter._realX;
    this._nextRealY = thisCharacter._realY;
    this.updateDirectionRadian();
    this.updateDir4(thisCharacter);
    this.updateNextRealXY(thisCharacter);
    this.updateTargetRealXY(thisCharacter);
    this.updateIsMoving(thisCharacter);
    this.updateIsThrough(thisCharacter);
    this.updateEncounterCount(thisCharacter);
    this.updateCharacterPosition(thisCharacter);
};

// �ڕW���W�̍X�V
Game_AnalogMove.prototype.updateTargetRealXY = function(thisCharacter) {
    if (!Game_AnalogMove.canMove() ||
            this.deltaXY(thisCharacter._realX, thisCharacter._realY, this._nextRealX, this._nextRealY) < this._distancePerFrame / 16.0) {
        this._targRealX = undefined;
        this._targRealY = undefined;
    }
}

// �G���J�E���g�����̍X�V
Game_AnalogMove.prototype.updateEncounterCount = function(thisCharacter) {
    if (thisCharacter === $gamePlayer && Game_AnalogMove.canMove() && $gamePlayer.canEncounter()) {
        this._encounterCount += Math.sqrt(
                Math.pow((thisCharacter._realX - this._nextRealX), 2) +
                Math.pow((thisCharacter._realY - this._nextRealY), 2));
    }
};

// �G���J�E���g����
Game_AnalogMove.prototype.encounterCount = function() {
    var encounterCount = this._encounterCount;
    this._encounterCount = 0.0;
    return encounterCount;
};

// �L�����N�^�[�ʒu�̍X�V
Game_AnalogMove.prototype.updateCharacterPosition = function(thisCharacter) {
    thisCharacter.setDirectionAnalog(this.dir4());
    if (Game_AnalogMove.canMove() && this.isMoving()) {
        thisCharacter._realX = this._nextRealX;
        thisCharacter._realY = this._nextRealY;
        thisCharacter._x = Math.round(thisCharacter._realX);
        thisCharacter._y = Math.round(thisCharacter._realY);
        thisCharacter.resetStopCount();
    }
};

// �L�[���͂ɂ��ڕW���ʊp�x�ƈړ����x�̍X�V
Game_AnalogMove.prototype.moveByInput = function(thisCharacter) {
    if (!$gamePlayer.canMove()) {
        this._distancePerFrame = 0.0;
        return;
    }
    var stick = Input.leftStick();
    if (TouchInput.isTriggered() || TouchInput.isRepeated()) {
        this._targRealX = this.canvasToMapX(TouchInput.x);
        this._targRealY = this.canvasToMapY(TouchInput.y);
    } 
    if (stick !== undefined && stick.tilt !== 0.0) {
        this._targetRadian = this.normalizeRadian(stick.direction);
        this._distancePerFrame = thisCharacter.distancePerFrame() * stick.tilt;
        this._targRealX = undefined;
        this._targRealY = undefined;
    } else if (this.dir8ToRadian(Input.dir8) !== undefined) {
        this._targetRadian = this.dir8ToRadian(Input.dir8);
        this._distancePerFrame = thisCharacter.distancePerFrame();
        this._targRealX = undefined;
        this._targRealY = undefined;
    } else if (this._targRealX !== undefined && this._targRealY !== undefined) {
        var distanceRate = Math.min(this.deltaXYFrom(this._targRealX, this._targRealY), 1.0);
        distanceRate = (distanceRate < 0.1 ? 0.0 : distanceRate);
        this._targetRadian = this.towardDirectionRadian(this._targRealX, this._targRealY);
        this._distancePerFrame = thisCharacter.distancePerFrame() * distanceRate;
        if (distanceRate === 0.0) {
            this._targRealX = undefined;
            this._targRealY = undefined;
        }
    } else {
        this._distancePerFrame = 0.0;
    }
};

// ��� X ���W���}�b�v X ���W�ɕϊ�
Game_AnalogMove.prototype.canvasToMapX = function(x) {
    var tileWidth = $gameMap.tileWidth();
    var originX = $gameMap._displayX * tileWidth;
    var mapX = (originX + x) / tileWidth;
    return $gameMap.roundX(mapX);
};

// ��� Y ���W���}�b�v Y ���W�ɕϊ�
Game_AnalogMove.prototype.canvasToMapY = function(y) {
    var tileHeight = $gameMap.tileHeight();
    var originY = $gameMap._displayY * tileHeight;
    var mapY = (originY + y) / tileHeight;
    return $gameMap.roundY(mapY);
};

// �L�����N�^�[�Ǐ]�ɂ��ڕW���ʊp�x�ƈړ����x�̍X�V
Game_AnalogMove.prototype.followCharacter = function(thisCharacter, targetCharacter) {
    this._crntRealX = thisCharacter._realX;
    this._crntRealY = thisCharacter._realY;
    var deltaXYFromTarget = this.deltaXYFrom(targetCharacter._realX + 0.5, targetCharacter._realY + 0.5);
    this._targetRadian = this.towardDirectionRadian(targetCharacter._realX + 0.5, targetCharacter._realY + 0.5);
    if (deltaXYFromTarget <= 1.0) {
        this._distancePerFrame = thisCharacter.distancePerFrame() * 0.0;
    } else {
        var distanceRate = deltaXYFromTarget;
        distanceRate += Math.pow(distanceRate - 1.0, 2) - 0.125; 
        distanceRate = distanceRate > 2.0 ? 2.0 : distanceRate;
        this._distancePerFrame = thisCharacter.distancePerFrame() * distanceRate;
    }
};

// �ڕW�����Ɍ����Đi�s���ʂ��X�V
Game_AnalogMove.prototype.updateDirectionRadian = function() {
    if (this._directionRadian === this._targetRadian) {
        return;
    }
    var differentialRadian = this.normalizeRadian(this._targetRadian - this._directionRadian);
    if (differentialRadian >= Math.PI) {
        differentialRadian -= Math.PI * 2.0;
    }
    differentialRadian < 0 ?
        this._directionRadian += Math.max(differentialRadian, -this._directionRadianVariate) :
        this._directionRadian += Math.min(differentialRadian,  this._directionRadianVariate);
    this._directionRadian = this.normalizeRadian(this._directionRadian);
};

// ���W�A���p�x�𐮌`
Game_AnalogMove.prototype.normalizeRadian = function(radian) {
    while (radian < 0) radian += (Math.PI * 2.0);
    return radian % (Math.PI * 2.0);
};

// �N���X�����̎����W�̍X�V
Game_AnalogMove.prototype.updateNextRealXY = function(thisCharacter) {
    this._collideEvents = new Array();
    this._isMoving = false;
    var evadeDirectionRadian = this._directionRadian;
    var splitDistances = this.splitDistances();
    splitDistances.forEach(function(splitDistance) {
        this.calculateNextRealXY(splitDistance, this._directionRadian);
        var collideCharacters = this.collideCharacters(thisCharacter, splitDistance);
        var collideWallXY = this.collideWallXY(thisCharacter, splitDistance);
        var collideCornerXY = this.collideCornerXY(thisCharacter, splitDistance);
        if (collideCharacters.length === 0) {
            if (collideCornerXY !== undefined) {
                evadeDirectionRadian = this.evadeDirectionRadian(collideCornerXY.x, collideCornerXY.y, this._directionRadian);
                splitDistance *= Math.abs(Math.cos(evadeDirectionRadian - this._directionRadian));
                this.calculateNextRealXY(splitDistance, evadeDirectionRadian);
            }
            if (collideWallXY.x !== undefined) {
                this._nextRealX = Math.round(this._nextRealX);
            }
            if (collideWallXY.y !== undefined) {
                this._nextRealY = Math.round(this._nextRealY);
            }
        } else if (collideCharacters.length === 1 && collideWallXY.x === undefined && collideWallXY.y === undefined && collideCornerXY === undefined) {
            evadeDirectionRadian = this.evadeDirectionRadian(collideCharacters[0]._realX + 0.5, collideCharacters[0]._realY + 0.5, this._directionRadian);
            splitDistance *= Math.abs(Math.cos(evadeDirectionRadian - this._directionRadian));
            this.calculateNextRealXY(splitDistance, evadeDirectionRadian);
            if (this.collideCharacters(thisCharacter, splitDistance).length !== 0) {
                this._nextRealX = this._crntRealX;
                this._nextRealY = this._crntRealY;
            }
        } else {
            this._nextRealX = this._crntRealX;
            this._nextRealY = this._crntRealY;
        }
        this._crntRealX = this._nextRealX = ((this._nextRealX + $gameMap.width())  % $gameMap.width());
        this._crntRealY = this._nextRealY = ((this._nextRealY + $gameMap.height()) % $gameMap.height());
    }, this);
    // �Փ˂���C�x���g�̍X�V
    this._collideEvents = this._collideEvents.filter(function(character, i, characters) {
        var eventId = $gameMap.events().indexOf(character);
        return (characters.indexOf(character) === i && $gameMap.events().indexOf(character) !== -1);
    });
};

// �����t���[���Ԉړ�����
Game_AnalogMove.prototype.splitDistances = function() {
    var unitDistanceVelocity = 1.0 / 4.0;
    var distancePerFrame = this._distancePerFrame;
    var distances = new Array();
    while (distancePerFrame > 0.0) {
        distances.push(Math.min(distancePerFrame, unitDistanceVelocity));
        distancePerFrame -= unitDistanceVelocity;
    }
    return distances;
};

// �N���X�����̎��ړ����W�̌v�Z
Game_AnalogMove.prototype.calculateNextRealXY = function(distancePerFrame, directionRadian) {
    var distanceX = - distancePerFrame * Math.sin(directionRadian);
    var distanceY = - distancePerFrame * Math.cos(directionRadian);
    this._nextRealX = this._crntRealX + distanceX;
    this._nextRealY = this._crntRealY + distanceY;
};

// �w����W�ւ̕���
Game_AnalogMove.prototype.towardDirectionRadian = function(x, y) {
    var deltaX = this.deltaXFrom(x);
    var deltaY = this.deltaYFrom(y);
    if (deltaX === 0.0) {
        return (deltaY > 0 ? Math.PI * 0.0 : Math.PI * 1.0);
    } else if (deltaY === 0.0) {
        return (deltaX > 0 ? Math.PI * 0.5 : Math.PI * 1.5);
    } else {
        return Math.atan2(deltaX, deltaY);
    }
};

// �w����W���������ʊp�x
Game_AnalogMove.prototype.evadeDirectionRadian = function(x, y, directionRadian) {
    var towardDirectionRadian = this.towardDirectionRadian(x, y);
    var differentialRadian = this.normalizeRadian(towardDirectionRadian - directionRadian);
    if (differentialRadian > Math.PI) differentialRadian -= (Math.PI * 2.0);
    towardDirectionRadian += (differentialRadian < 0 ? Math.PI / 2.0 : - Math.PI / 2.0);
    return this.normalizeRadian(towardDirectionRadian);
};

// �Փ˂���S�ẴL�����N�^�[
Game_AnalogMove.prototype.collideCharacters = function(thisCharacter, distancePerFrame) {
    if ($gamePlayer.isInAirship()) {
        return [];
    }
    var collideCharacters = this.allCharacters();
    collideCharacters = collideCharacters.filter(function(character) {
        return character !== thisCharacter && !character.isThrough();
    });
    collideCharacters = collideCharacters.filter(function(character) {
        var crntDistance = this.deltaXY(this._crntRealX, this._crntRealY, character._realX, character._realY)
        var nextDistance = this.deltaXY(this._nextRealX, this._nextRealY, character._realX, character._realY);
        if (nextDistance < crntDistance) {
            if (nextDistance < 0.5 + distancePerFrame) {
                this._collideEvents.push(character);
            } else if (nextDistance < 1.0 - distancePerFrame &&
                character._priorityType === thisCharacter._priorityType) {
                this._collideEvents.push(character);
                return true;
            }
        }
        return false;
    }, this);
    var self = this;
    collideCharacters.sort(function(character1, character2) {
        var distance1 = self.deltaXYFrom(character1._realX + 0.5, character1._realY + 0.5);
        var distance2 = self.deltaXYFrom(character2._realX + 0.5, character2._realY + 0.5);
        return (distance2 - distance1);
    });
    if (this.isThrough()) {
        return [];
    }
    return collideCharacters;
};

// �}�b�v��̑S�ẴL�����N�^�[
Game_AnalogMove.prototype.allCharacters = function() {
    var player = [$gamePlayer];
    var events = $gameMap.events();
    var followers = $gamePlayer.followers().visibleFollowers();
    return ([$gamePlayer].concat($gameMap.events(), $gamePlayer.followers().visibleFollowers()));
};

// �Փ˂���C�x���g
Game_AnalogMove.prototype.collideEvents = function() {
    return this._collideEvents;
}

// �Փ˂���ǂ̍��W
Game_AnalogMove.prototype.collideWallXY = function(thisCharacter, distancePerFrame) {
    var nextCenterX = this._nextRealX + 0.5;
    var nextCenterY = this._nextRealY + 0.5;
    var x = (Math.floor(nextCenterX) + $gameMap.width()).mod($gameMap.width());
    var y = (Math.floor(nextCenterY) + $gameMap.height()).mod($gameMap.height());
    var tile5 = Game_CollideMap._tiles[x][y];
    var wallX = undefined;
    var wallY = undefined;
    if (this._crntRealX >= this._nextRealX) {
        // ���̕�
        var x2 = $gameMap.roundX(Math.floor(nextCenterX - 0.5));
        if (!$gameMap.isValid(x2, y)) {
            wallX = tile5._x4;
        } else {
            var tile4 = Game_CollideMap._tiles[x2][y];
            if (tile4._e6 && Math.abs(this.deltaX(nextCenterX, tile5._x4)) < 0.5 + distancePerFrame) {
                this._collideEvents.push.apply(this._collideEvents, $gameMap.eventsXy(x2, y));
                if (!this.isThrough()) {
                    wallX = tile4._x6;
                }
            }
        }
    } else {
        // �E�̕�
        var x2 = $gameMap.roundX(Math.floor(nextCenterX + 0.5));
        if (!$gameMap.isValid(x2, y)) {
            wallX = tile5._x6;
        } else {
            var tile6 = Game_CollideMap._tiles[x2][y];
            if (tile6._e4 && Math.abs(this.deltaX(nextCenterX, tile5._x6)) < 0.5 + distancePerFrame) {
                this._collideEvents.push.apply(this._collideEvents, $gameMap.eventsXy(x2, y));
                if (!this.isThrough()) {
                    wallX = tile6._x4;
                }
            }
        }
    }
    if (this._crntRealY >= this._nextRealY) {
        // ��̕�
        var y2 = $gameMap.roundY(Math.floor(nextCenterY - 0.5));
        if (!$gameMap.isValid(x, y2)) {
            wallY = tile5._y8;
        } else {
            var tile8 = Game_CollideMap._tiles[x][y2];
            if (tile8._e2 && Math.abs(this.deltaY(nextCenterY, tile5._y8)) < 0.5 + distancePerFrame) {
                this._collideEvents.push.apply(this._collideEvents, $gameMap.eventsXy(x, y2));
                if (!this.isThrough()) {
                    wallY = tile8._y2;
                }
            }
        }
    } else {
        // ���̕�
        var y2 = $gameMap.roundY(Math.floor(nextCenterY + 0.5));
        if (!$gameMap.isValid(x, y2)) {
            wallY = tile5._y2;
        } else {
            var tile2 = Game_CollideMap._tiles[x][y2];
            if (tile2._e8 && Math.abs(this.deltaY(nextCenterY, tile5._y2)) < 0.5 + distancePerFrame) {
                this._collideEvents.push.apply(this._collideEvents, $gameMap.eventsXy(x, y2));
                if (!this.isThrough()) {
                    wallY = tile2._y8;
                }
            }
        }
    }
    return {x: wallX, y: wallY};
};

// �Փ˂���p�̍��W
Game_AnalogMove.prototype.collideCornerXY = function(thisCharacter, distancePerFrame) {
    if (this.isThrough()) {
        return undefined;
    }
    var nextCenterX = this._nextRealX + 0.5
    var nextCenterY = this._nextRealY + 0.5
    if (this._nextRealX < this._crntRealX || this._nextRealY < this._crntRealY) {
        // ����̊p
        var x = (Math.floor(nextCenterX - 0.5) + $gameMap.width()).mod($gameMap.width());
        var y = (Math.floor(nextCenterY - 0.5) + $gameMap.height()).mod($gameMap.height());
        var tile7 = Game_CollideMap._tiles[x][y];
        if (tile7._a3 && this.deltaXY(nextCenterX, nextCenterY, tile7._x3, tile7._y3) < 0.5 - distancePerFrame) {
            return { x: tile7._x3, y: tile7._y3 };
        }
    }
    if (this._nextRealX < this._crntRealX || this._nextRealY > this._crntRealY) {
        // �����̊p
        var x = (Math.floor(nextCenterX - 0.5) + $gameMap.width()).mod($gameMap.width());
        var y = (Math.floor(nextCenterY + 0.5) + $gameMap.height()).mod($gameMap.height());
        var tile1 = Game_CollideMap._tiles[x][y];
        if (tile1._a9 && this.deltaXY(nextCenterX, nextCenterY, tile1._x9, tile1._y9) < 0.5 - distancePerFrame) {
            return { x: tile1._x9, y: tile1._y9 };
        }
    }
    if (this._nextRealX > this._crntRealX || this._nextRealY < this._crntRealY) {
        // �E��̊p
        var x = (Math.floor(nextCenterX + 0.5) + $gameMap.width()).mod($gameMap.width());
        var y = (Math.floor(nextCenterY - 0.5) + $gameMap.height()).mod($gameMap.height());
        var tile9 = Game_CollideMap._tiles[x][y];
        if (tile9._a1 && this.deltaXY(nextCenterX, nextCenterY, tile9._x1, tile9._y1) < 0.5 - distancePerFrame) {
            return { x: tile9._x1, y: tile9._y1 };
        }
    }
    if (this._nextRealX > this._crntRealX || this._nextRealY > this._crntRealY) {
        // �E���̊p
        var x = (Math.floor(nextCenterX + 0.5) + $gameMap.width()).mod($gameMap.width());
        var y = (Math.floor(nextCenterY + 0.5) + $gameMap.height()).mod($gameMap.height());
        var tile3 = Game_CollideMap._tiles[x][y];
        if (tile3._a7 && this.deltaXY(nextCenterX, nextCenterY, tile3._x7, tile3._y7) < 0.5 - distancePerFrame) {
            return { x: tile3._x7, y: tile3._y7 };
        }
    }
    return undefined;
};

// �ړ�������̍X�V
Game_AnalogMove.prototype.updateIsMoving = function(thisCharacter) {
    this._isMoving = (thisCharacter._realX !== this._nextRealX || thisCharacter._realY !== this._nextRealY);
};

// �ړ�������
Game_AnalogMove.prototype.isMoving = function() {
    return this._isMoving;
};

// ���蔲������̍X�V
Game_AnalogMove.prototype.updateIsThrough = function(thisCharacter) {
    this._isThrough = thisCharacter.isThrough() && (thisCharacter.constructor !== Game_Follower || $gamePlayer.isThrough());
};

// ���蔲������
Game_AnalogMove.prototype.isThrough = function() {
    return this._isThrough;
};

// �ڕW���ʊp�x�̐ݒ�
Game_AnalogMove.prototype.setTargetRadian = function(targetRadian) {
    this._targetRadian = targetRadian;
}

// ���������̋���
Game_AnalogMove.prototype.deltaX = function(x1, x2) {
    return $gameMap.deltaX(x1, x2)
};

// ���������̋���
Game_AnalogMove.prototype.deltaY = function(y1, y2) {
    return $gameMap.deltaY(y1, y2)
};

// ���W�Ԃ̋���
Game_AnalogMove.prototype.deltaXY = function(x1, y1, x2, y2) {
    return Math.sqrt(Math.pow(this.deltaX(x1, x2), 2) + Math.pow(this.deltaY(y1, y2), 2));
};

// ���ݍ��W�Ƃ̐��������̋���
Game_AnalogMove.prototype.deltaXFrom = function(x) {
    return this.deltaX(this._crntRealX + 0.5, x);
};

// ���ݍ��W�Ƃ̐��������̋���
Game_AnalogMove.prototype.deltaYFrom = function(y) {
    return this.deltaY(this._crntRealY + 0.5, y);
};

// ���ݍ��W�Ƃ̋���
Game_AnalogMove.prototype.deltaXYFrom = function(x, y) {
    return this.deltaXY(this._crntRealX + 0.5, this._crntRealY + 0.5, x, y);
};

// ����4�������X�V
Game_AnalogMove.prototype.updateDir4 = function(thisCharacter) {
    this._dir4 = thisCharacter.direction();
    this._dir4 = this.dir8ToDir4(this.radianToDir8(this._directionRadian));
};

// ����4�������擾
Game_AnalogMove.prototype.dir4 = function() {
    return this._dir4;
};

// 8�����ɂ����ʊp�x�̐ݒ�
Game_AnalogMove.prototype.setDirectionRadianByDir8 = function(dir8) {
    this._targetRadian = this.dir8ToRadian(dir8);
    this._directionRadian = this._targetRadian;
};

// 8������4�����ɕϊ�
Game_AnalogMove.prototype.dir8ToDir4 = function(dir8) {
    if (dir8 % 2 === 0) {
        return dir8;
    }
    switch (this._dir4) {
    case 8:
        switch (dir8) {
        case 3:  return 6;
        case 1:  return 4;
        default: return 8;
        }
    case 6:
        switch (dir8) {
        case 1:  return 2;
        case 7:  return 8;
        default: return 6;
        }
    case 2:
        switch (dir8) {
        case 7:  return 4;
        case 9:  return 6;
        default: return 2;
        }
    case 4:
        switch (dir8) {
        case 9:  return 8;
        case 3:  return 2;
        default: return 4;
        }
    }
    return undefined;
};

// �����p�x��8�����ɕϊ�
Game_AnalogMove.prototype.radianToDir8 = function(radian) {
    radian = this.normalizeRadian(radian);
    return (
        radian < Math.PI / 8.0 *  1.0 ? 8 :
        radian < Math.PI / 8.0 *  3.0 ? 7 :
        radian < Math.PI / 8.0 *  5.0 ? 4 :
        radian < Math.PI / 8.0 *  7.0 ? 1 :
        radian < Math.PI / 8.0 *  9.0 ? 2 :
        radian < Math.PI / 8.0 * 11.0 ? 3 :
        radian < Math.PI / 8.0 * 13.0 ? 6 :
        radian < Math.PI / 8.0 * 15.0 ? 9 : 8
    )
};

// 8����������p�x�ɕϊ�
Game_AnalogMove.prototype.dir8ToRadian = function(dir8) {
    return (
        dir8 === 8 ? Math.PI / 4.0  * 0.0 :
        dir8 === 7 ? Math.PI / 4.0  * 1.0 :
        dir8 === 4 ? Math.PI / 4.0  * 2.0 :
        dir8 === 1 ? Math.PI / 4.0  * 3.0 :
        dir8 === 2 ? Math.PI / 4.0  * 4.0 :
        dir8 === 3 ? Math.PI / 4.0  * 5.0 :
        dir8 === 6 ? Math.PI / 4.0  * 6.0 :
        dir8 === 9 ? Math.PI / 4.0  * 7.0 : undefined
    )
};

//-----------------------------------------------------------------------------
// Game_CollideMap
//
// �Փ˃}�b�v
Game_CollideMap = {};

// �Փ˃}�b�v�̃Z�b�g�A�b�v
Game_CollideMap.setup = function() {
    this._mapId = $gameMap.mapId()
    this._tiles = new Array();
    for (var x = 0; x < $gameMap.width(); x++) {
        this._tiles.push([]);
        for (var y = 0; y < $gameMap.height(); y++) {
            this._tiles[x].push(new Game_CollideTile(x, y));
        } 
    }
};

//-----------------------------------------------------------------------------
// Game_CollideTile
//
// �Փ˃^�C���N���X
function Game_CollideTile () {
    this.initialize.apply(this, arguments);
};

// �Փ˃^�C���N���X�̏�����
Game_CollideTile.prototype.initialize = function(x, y) {
    this._x = Math.floor(x);
    this._y = Math.floor(y);
    this._x5 = this._x + 0.5;
    this._y5 = this._y + 0.5;
    this._x4 = this._x1 = this._x7 = this._x;
    this._x6 = this._x3 = this._x9 = x + 1.0;
    this._y8 = this._y7 = this._y9 = this._y;
    this._y2 = this._y1 = this._y3 = y + 1;
    this._e8 = !this.isPassable(this._x, this._y, 8);
    this._e6 = !this.isPassable(this._x, this._y, 6);
    this._e2 = !this.isPassable(this._x, this._y, 2);
    this._e4 = !this.isPassable(this._x, this._y, 4);
    this._a9 = (this._e8 || this._e6) && this.isCorner(9);
    this._a3 = (this._e6 || this._e2) && this.isCorner(3);
    this._a1 = (this._e2 || this._e4) && this.isCorner(1);
    this._a7 = (this._e4 || this._e8) && this.isCorner(7);
};

// �Փ˃^�C���N���X�ʍs�\���� ��
Game_CollideTile.prototype.isPassable = function(x, y, d) {
    var x2 = $gameMap.roundXWithDirection(x, d);
    var y2 = $gameMap.roundYWithDirection(y, d);
    var d2 = $gamePlayer.reverseDir(d);
    return $gamePlayer.isMapPassable(x, y, d) && $gamePlayer.isMapPassable(x2, y2, d2) && $gameMap.isValid(x2, y2);
};

// �Փ˃^�C���N���X�ʍs�\���� �p
Game_CollideTile.prototype.isCorner = function(d) {
    switch (d) {
    case 9:  return this.isPassable(this._x, this._y - 1, 6) && this.isPassable(this._x + 1, this._y, 8);
    case 3:  return this.isPassable(this._x, this._y + 1, 6) && this.isPassable(this._x + 1, this._y, 2);
    case 1:  return this.isPassable(this._x, this._y + 1, 4) && this.isPassable(this._x - 1, this._y, 2);
    case 7:  return this.isPassable(this._x, this._y - 1, 4) && this.isPassable(this._x - 1, this._y, 8);
    default: return false;
    }
};

//-----------------------------------------------------------------------------
// Game_Map
//
// �}�b�v�N���X

// �}�b�v�N���X�̃Z�b�g�A�b�v
Sanshiro.Game_AnalogMove.Game_Map_setup = Game_Map.prototype.setup;
Game_Map.prototype.setup = function(mapId) {
    Sanshiro.Game_AnalogMove.Game_Map_setup.call(this, mapId);
    Game_CollideMap.setup();
};

//-----------------------------------------------------------------------------
// Game_System
//
// �V�X�e���N���X

// �V�X�e���̏�����
Sanshiro.Game_AnalogMove.Game_System_initialize = Game_System.prototype.initialize;
Game_System.prototype.initialize = function() {
    Sanshiro.Game_AnalogMove.Game_System_initialize.call(this);
    this.setAnalogMoveValid(PluginManager.parameters('SAN_AnalogMove')['Valid'] === 'ON');
};

// �V�X�e���̌ʂ̃A�i���O���[�u�L�����t���O�̐ݒ�
Game_System.prototype.setAnalogMoveValid = function(valid) {
    this._analogMoveValid = valid;
};

// �V�X�e���̌ʂ̃A�i���O���[�u�L������
Game_System.prototype.analogMoveValid = function() {
    return this._analogMoveValid;
};

//-----------------------------------------------------------------------------
// Input
//
// �C���v�b�g�N���X

// �Q�[���p�b�h�X�e�[�^�X�̍X�V
Sanshiro.Game_AnalogMove.Input_updateGamepadState = Input._updateGamepadState;
Input._updateGamepadState = function(gamepad) {
    Sanshiro.Game_AnalogMove.Input_updateGamepadState.call(this, gamepad);
    this._updateGamepadAxes(gamepad);
};

// �A�i���O�X�e�B�b�N�l�̍X�V
Input._updateGamepadAxes = function(gamepad) {
    this._axes = gamepad.axes;
};

// ���A�i���O�X�e�B�b�N
Input.leftStick = function() {
    if (this._axes === undefined) {
        return undefined;
    }
    var threshold = 0.1;
    var x = this._axes[0];
    var y = this._axes[1];
    var tilt = (Math.pow(x, 2) + Math.pow(y, 2));
    if (tilt < threshold) {
        tilt = 0.0;
    } else if (tilt > 1.0) {
        tilt = 1.0;
    }
    var direction = 0.0
    if (x === 0.0) {
        direction = (-y > 0 ? Math.PI * 0.0 : Math.PI * 1.0);
    } else if (y === 0.0) {
        direction = (-x > 0 ? Math.PI * 0.5 : Math.PI * 1.5);
    } else {
        direction = Math.atan2(-x, -y);
    }
    return {tilt: tilt, direction: direction};
};

// �E�A�i���O�X�e�B�b�N
Input.rightStick = function() {
    if (this._axes === undefined) {
        return undefined;
    }
    var threshold = 0.1;
    var x = this._axes[2];
    var y = this._axes[3];
    var tilt = (Math.pow(x, 2) + Math.pow(y, 2));
    if (tilt < threshold) {
        tilt = 0.0;
    } else if (tilt > 1.0) {
        tilt = 1.0;
    }
    var direction = 0.0
    if (x === 0.0) {
        direction = (-y > 0 ? Math.PI * 0.0 : Math.PI * 1.0);
    } else if (y === 0.0) {
        direction = (-x > 0 ? Math.PI * 0.5 : Math.PI * 1.5);
    } else {
        direction = Math.atan2(-x, -y);
    }
    return {tilt: tilt, direction: direction};
};

//-----------------------------------------------------------------------------
// Scene_Map
//
// �}�b�v�V�[���N���X

// �}�b�v�V�[���N���X�̃��j���[�V�[���Ăяo���X�V
Sanshiro.Game_AnalogMove.Scene_Map_updateCallMenu = Scene_Map.prototype.updateCallMenu;
Scene_Map.prototype.updateCallMenu = function() {
    var isMoving = $gamePlayer.isMoving;
    $gamePlayer.isMoving = function() { return false; };
    Sanshiro.Game_AnalogMove.Scene_Map_updateCallMenu.call(this);
    $gamePlayer.isMoving = isMoving;
};

// �}�b�v�V�[���N���X�̊J�n����
Sanshiro.Game_AnalogMove.Scene_Map_start = Scene_Map.prototype.start;
Scene_Map.prototype.start = function() {
    Sanshiro.Game_AnalogMove.Scene_Map_start.call(this);
    Game_CollideMap.setup();
};

//-----------------------------------------------------------------------------
// Game_CharacterBase
//
// �L�����N�^�[�x�[�X�N���X

// �L�����N�^�[�x�[�X�N���X�̃v���p�e�B������
Sanshiro.Game_AnalogMove.Game_CharacterBase_initMembers = Game_CharacterBase.prototype.initMembers;
Game_CharacterBase.prototype.initMembers = function() {
    Sanshiro.Game_AnalogMove.Game_CharacterBase_initMembers.call(this);
    this._analogMove = new Game_AnalogMove(this);
};

// �L�����N�^�[�x�[�X�N���X�̕����ݒ�
Sanshiro.Game_AnalogMove.Game_CharacterBase_setDirection = Game_CharacterBase.prototype.setDirection;
Game_CharacterBase.prototype.setDirection = function(d) {
    Sanshiro.Game_AnalogMove.Game_CharacterBase_setDirection.call(this, d);
    if (!this.isDirectionFixed()) {
        this._analogMove.setDirectionRadianByDir8(this._direction);
    }
};

// �L�����N�^�[�x�[�X�N���X�̃A�i���O���[�u�ɂ������ݒ�
Game_CharacterBase.prototype.setDirectionAnalog = function(d) {
    if (!this.isDirectionFixed()) {
        this._direction = d;
    }
};
    
// �L�����N�^�[�x�[�X�N���X�̈ړ�������
Sanshiro.Game_AnalogMove.Game_CharacterBase_isMoving = Game_CharacterBase.prototype.isMoving;
Game_CharacterBase.prototype.isMoving = function() {
    if (this.isAnalogMoveValid()) {
        return this._analogMove.isMoving() && Game_AnalogMove.canMove();
    }
    return Sanshiro.Game_AnalogMove.Game_CharacterBase_isMoving.call(this);
};

// �L�����N�^�[�x�[�X�N���X�̃t���[���X�V
Sanshiro.Game_AnalogMove.Game_CharacterBase_update = Game_CharacterBase.prototype.update;
Game_CharacterBase.prototype.update = function() {
    if (this.isAnalogMoveValid()) {
        this._analogMove.update(this);
        var isMoving = this.isMoving;
        this.isMoving = function() { return false; };
        this.refreshBushDepth();
        this.isMoving = isMoving;
    }
    return Sanshiro.Game_AnalogMove.Game_CharacterBase_update.call(this);
};

// �L�����N�^�[�x�[�X�N���X�̈ړ��X�V
Sanshiro.Game_AnalogMove.Game_CharacterBase_updateMove = Game_CharacterBase.prototype.updateMove;
Game_CharacterBase.prototype.updateMove = function() {
    if (this.isAnalogMoveValid()) {
        return;
    }
    return Sanshiro.Game_AnalogMove.Game_CharacterBase_updateMove.call(this)
};

// �L�����N�^�[�x�[�X�N���X�̌ʂ̃A�i���O���[�u�L�����t���O�̐ݒ�
Game_CharacterBase.prototype.setAnalogMoveValid = function(valid) {
    this._analogMove.setValid(valid);
};

// �L�����N�^�[�x�[�X�N���X�̌ʂ̃A�i���O���[�u�L������
Game_CharacterBase.prototype.isAnalogMoveValid = function() {
    return this._analogMove.isValid();
};

//-----------------------------------------------------------------------------
// Game_Character
//
// �L�����N�^�[�N���X

// �L�����N�^�[�N���X�̃��[�g�w��ړ�
Sanshiro.Game_AnalogMove.Game_Character_updateRoutineMove = Game_Character.prototype.updateRoutineMove;
Game_Character.prototype.updateRoutineMove = function() {
    if (this.isAnalogMoveValid()) {
        return;
    }
    return Sanshiro.Game_AnalogMove.Game_Character_updateRoutineMove.call(this);
};

// �L�����N�^�[�N���X�̌ʂ̃A�i���O���[�u�L������
Game_Character.prototype.isAnalogMoveValid = function() {
    return Game_CharacterBase.prototype.isAnalogMoveValid.call(this) && !this._moveRouteForcing;
};

//-----------------------------------------------------------------------------
// Game_Player
//
// �v���C���[�N���X

// �v���C���[�N���X�̃v���p�e�B������
Sanshiro.Game_AnalogMove.Game_Player_initMembers = Game_Player.prototype.initMembers;
Game_Player.prototype.initMembers = function() {
    Sanshiro.Game_AnalogMove.Game_Player_initMembers.call(this);
    this.setAnalogMoveValid(PluginManager.parameters('SAN_AnalogMove')['Player'] === 'ON');
    this._encounterCountAnalog = 0.0;
};

// �v���C���[�N���X�̃L�[���͂ɂ��ړ�
Sanshiro.Game_AnalogMove.Game_Player_moveByInput = Game_Player.prototype.moveByInput;
Game_Player.prototype.moveByInput = function() {
    if (this.isAnalogMoveValid()) {
        this._analogMove.moveByInput(this);
        this.checkEventTriggerTouchAnalog();
        this.checkEventTriggerActionAnalog();
        return;
    }
    return Sanshiro.Game_AnalogMove.Game_Player_moveByInput.call(this);
};

// �v���C���[�N���X�̃_�b�V����Ԃ̍X�V
Sanshiro.Game_AnalogMove.Game_Player_updateDashing = Game_Player.prototype.updateDashing;
Game_Player.prototype.updateDashing = function() {
    var isMoving = this.isMoving;
    this.isMoving = function() { return false };
    Sanshiro.Game_AnalogMove.Game_Player_updateDashing.call(this);
    this.isMoving = isMoving;
};

// �v���C���[�N���X�̃A�i���O���[�u���̐ڐG�C�x���g�N������
Game_Player.prototype.checkEventTriggerTouchAnalog = function() {
    if (!this.isThrough() && !$gameMap.isEventRunning()) {
        var event = this._analogMove.collideEvents()[0];
        if (!!event && event.isTriggerIn([1, 2])) {
            event.start();
        }
    }
};

// �v���C���[�N���X�̃A�i���O���[�u���̌���{�^���C�x���g�N������
Game_Player.prototype.checkEventTriggerActionAnalog = function() {
    this.triggerAction();
};

// �v���C���[�N���X�̈ړ��X�V
Sanshiro.Game_AnalogMove.Game_Player_updateMove = Game_Player.prototype.updateMove;
Game_Player.prototype.updateMove = function() {
    if (this.isAnalogMoveValid()) {
        this.updateEncounterCountAnalog();
    }
    Sanshiro.Game_AnalogMove.Game_Player_updateMove.call(this);
};

// �v���C���[�N���X�̃A�i���O�ړ��G���J�E���g�����J�E���g�_�E��
Game_Player.prototype.updateEncounterCountAnalog = function() {
    if (this.canEncounter()) {
        this._encounterCount -= this.encounterProgressValue() * this._analogMove.encounterCount();
    }
};

// �v���C���[�N���X�̏�蕨���撆�̃t���[���X�V
Sanshiro.Game_AnalogMove.Game_Player_updateVehicleGetOn = Game_Player.prototype.updateVehicleGetOn;
Game_Player.prototype.updateVehicleGetOn = function() {
    Sanshiro.Game_AnalogMove.Game_Player_updateVehicleGetOn.call(this);
    if (!this._vehicleGettingOn) {
        Game_CollideMap.setup();
    }
};

// �v���C���[�N���X�̏�蕨���撆�̃t���[���X�V
Sanshiro.Game_AnalogMove.Game_Player_updateVehicleGetOff = Game_Player.prototype.updateVehicleGetOff;
Game_Player.prototype.updateVehicleGetOff = function() {
    Sanshiro.Game_AnalogMove.Game_Player_updateVehicleGetOff.call(this);
    if (!this._vehicleGettingOff) {
        Game_CollideMap.setup();
    }
};

// �v���C���[�N���X�̌ʂ̃A�i���O���[�u�L������
Game_Player.prototype.isAnalogMoveValid = function() {
    return Game_Character.prototype.isAnalogMoveValid.call(this) &&
        !this._followers.areGathering();
};

//-----------------------------------------------------------------------------
// Game_Follower
//
// �t�H�����[�N���X

// �t�H�����[�N���X�̖ڕW�L�����N�^�[�ǔ�
Game_Follower.prototype.chaseCharacterAnalog = function(character) {
    this._analogMove.followCharacter(this, character);
};

// �t�H�����[�N���X�̃A�i���O���[�u�L������
Game_Follower.prototype.isAnalogMoveValid = function() {
    return $gamePlayer.isAnalogMoveValid();
};

// �t�H�����[�N���X�̈ړ��X�V
Sanshiro.Game_AnalogMove.Game_Follower_updateMove = Game_Follower.prototype.updateMove;
Game_Follower.prototype.updateMove = function() {
    Sanshiro.Game_AnalogMove.Game_Follower_updateMove.call(this);
};

//-----------------------------------------------------------------------------
// Game_Followers
//
// �t�H�����[�Y�N���X

// �t�H�����[�Y�N���X�̃t���[���X�V
Sanshiro.Game_AnalogMove.Game_Followers_update = Game_Followers.prototype.update;
Game_Followers.prototype.update = function() {
    if ($gamePlayer.isAnalogMoveValid()) {
        this.updateMoveAnalog();
        this.forEach(function(follower) {
            follower.update();
        }, this);
        return;
    }
    Sanshiro.Game_AnalogMove.Game_Followers_update.call(this);
};

// �t�H�����[�Y�N���X�̃A�i���O�ړ��̍X�V
Game_Followers.prototype.updateMoveAnalog = function() {
    for (var i = this._data.length - 1; i >= 0; i--) {
        var precedingCharacter = (i > 0 ? this._data[i - 1] : $gamePlayer);
        this._data[i].chaseCharacterAnalog(precedingCharacter);
    }
};

//-----------------------------------------------------------------------------
// Game_Interpreter
//
// �C���^�[�v���^�[�N���X

// �v���O�C���R�}���h
Sanshiro.Game_AnalogMove.Game_Interpreter_pluginCommand = Game_Interpreter.prototype.pluginCommand;
Game_Interpreter.prototype.pluginCommand = function(command, args) {
    Sanshiro.Game_AnalogMove.Game_Interpreter_pluginCommand.call(this, command, args);
    if (command === 'AnalogMove') {
        switch (args[0]) {
        case 'ON':
            $gameSystem.setAnalogMoveValid(true);
            break;
        case 'OFF':
            $gameSystem.setAnalogMoveValid(false);
            break;
        case 'Player':
            switch (args[1]) {
            case 'ON':
                $gamePlayer.setAnalogMoveValid(true);
                break;
            case 'OFF':
                $gamePlayer.setAnalogMoveValid(false);
                break;
            }
        break;
        }
    $gamePlayer.refresh();
    }
};