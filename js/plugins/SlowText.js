//=============================================================================
// SlowText.js                                                             
//=============================================================================

/*:
* @author Kino
* @plugindesc This plugin makes rpgmaker draw text at a slower speed.
*
* @param Text Speed 
* @desc The speed at which characters will be rendered
* @default 2
*
* @help
* Version: 1.01
* Version Log:
* Updated to work with Yanfly Message Core!
*
* Instructions:
* You set your text speed in the plugin menu.
* This is the speed that the characters will be drawn at.
*
* Contact me via forums; username: Kino.
* Hope this plugin helps and enjoy!
*/

var KR = KR || {};
KR.Plugins = KR.Plugins || {};


(function($) {
//=============================================================================
// Plugin Variables                                                             
//=============================================================================
  var parameters = PluginManager.parameters("SlowText");
  var textSpeed = Number(parameters["Text Speed"]) || 5;
  $.Plugins.SlowText = function () {

//=============================================================================
// Window Message                                                         
//=============================================================================
    
    Window_Message.prototype.processNormalCharacter = function(textState) {
      Window_Base.prototype.processNormalCharacter.call(this, textState);
      this.startWait(textSpeed);
    };
    Window_Message.prototype.updateWait = function() {
      if (this._waitCount > 0 && !this._showFast) {
          this._waitCount--;
          return true;
      } else {
          this._waitCount = 0;
          return false;
      }
    };
  };

  $.Plugins.SlowText();
})(KR);