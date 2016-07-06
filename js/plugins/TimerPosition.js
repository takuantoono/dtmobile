//=============================================================================
// TimerPosition.js
// by Cecilia Bishton | bad chalk
//=============================================================================

/*:
 * @plugindesc Changes the position of the timer.
 * @author bad chalk - badchalk.com
 *
 * @param Timer X
 * @desc Choose an alignment: left   center   right
 * Or specify a pixel value. Ex: 42
 * @default center
 *
 * @param Timer Y
 * @desc Y Choose an alignment: top  center  bottom
 * Or specify a pixel value. Ex: 42
 * @default 0
 *
 * @help TIMER POSITION
 * ============================================================================
 * This plugin changes the position of the timer.
 * You can choose an alignment or enter pixel values.
 *
 *      Alignments for the x-axis are left, center, right.
 *      Alignments for the y-axis are top, center, bottom.
 *
 * Pixel values are calculated from the top left corner.
 * 
 * ============================================================================
 * Example: 
 *      Timer X: center
 *      Timer Y: 10
 *
 *      This timer will be centered horizontally.
 *      The top of the timer will be 10 pixels from the top of the screen.
 */



(function() {

    var params = PluginManager.parameters('TimerPosition');

    var timerX = String(params['Timer X'] || 0);
    var timerY = String(params['Timer Y'] || 0);

    Sprite_Timer.prototype.updatePosition = function () {

        // x coordinate
        if (timerX.toUpperCase() == 'CENTER') {
            this.x = Graphics.width / 2 - this.bitmap.width / 2;
        }
        else if (timerX.toUpperCase() == 'LEFT') {
            this.x = 0;
        }
        else if (timerX.toUpperCase() == 'RIGHT') {
            this.x = Graphics.width - this.bitmap.width;
        }
        else {
            this.x = parseInt(timerX);
        }

        // y coordinate
        if (timerY.toUpperCase() == 'CENTER') {
            this.y = Graphics.height / 2 - this.bitmap.height / 2;
        }
        else if (timerY.toUpperCase() == 'TOP') {
            this.y = 0;
        }
        else if (timerY.toUpperCase() == 'BOTTOM') {
            this.y = Graphics.height - this.bitmap.height;
        }
        else {
            this.y = parseInt(timerY);
        }
    };
    
})();