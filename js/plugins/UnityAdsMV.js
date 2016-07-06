// Generated by CoffeeScript 1.9.1

/*:
 * @plugindesc Unity Ads Plugin
 * @author Dan Yamamoto
 * @license MIT
 *
 * @param gameID
 * @desc Game ID
 * @default 42517
 *
 * @param videoAdPlacementId
 * @desc Video Ad Placement Id
 * @default defaultZone
 *
 * @param rewardedVideoAdPlacementId
 * @desc Rewarded Video Ad Placement Id
 * @default rewardedVideoZone
 *
 * @param isTest
 * @desc Ipunt 'true' or 'false'
 * @default true
 *
 */

(function() {
  var CordovaUnityAdsMV, gameId, isTest, parameters, rewardedVideoAdPlacementId, setup, videoAdPlacementId;

  parameters = PluginManager.parameters('UnityAdsMV');

  gameId = String(parameters['gameId'] || '42517');

  videoAdPlacementId = String(parameters['videoAdPlacementId'] || 'defaultZone');

  rewardedVideoAdPlacementId = String(parameters['rewardedVideoAdPlacementId'] || 'rewardedVideoZone');

  isTest = !parameters['isTest'].match(/^\s*(0|off|false)?\s*$/i);

  if (window.unityads == null) {
    window.unityads = {
      showVideoAd: function() {},
      showRewardedVideoAd: function() {},
      loadedVideoAd: function() {
        return false;
      },
      loadedRewardedVideoAd: function() {
        return false;
      },
      isShowingVideoAd: function() {
        return false;
      },
      isShowingRewardedVideoAd: function() {
        return false;
      }
    };
  }

  CordovaUnityAdsMV = (function() {
    function CordovaUnityAdsMV() {
      this.status = null;
      this.has_reward = false;
    }

    CordovaUnityAdsMV.prototype.showVideoAd = function() {
      if (this.loadedVideoAd()) {
        window.unityads.showVideoAd();
        return this.status = 'isReady';
      } else {
        return console.log('not loadedVideoAd');
      }
    };

    CordovaUnityAdsMV.prototype.showRewardedVideoAd = function() {};

    return CordovaUnityAdsMV;

  })();

  if (window.unityads == null) {
    window.unityads = {
      showVideoAd: function() {},
      showRewardedVideoAd: function() {},
      loadedVideoAd: function() {
        return false;
      },
      loadedRewardedVideoAd: function() {
        return false;
      },
      isShowingVideoAd: function() {
        return false;
      },
      isShowingRewardedVideoAd: function() {
        return false;
      }
    };
  }

  CordovaUnityAdsMV = (function() {
    function CordovaUnityAdsMV() {
      this.status = null;
      this.has_reward = false;
    }

    CordovaUnityAdsMV.prototype.isShowing = function() {
      return this.status !== null;
    };

    CordovaUnityAdsMV.prototype.hasReward = function() {
      return this.has_reward;
    };

    CordovaUnityAdsMV.prototype.clearReward = function() {
      return this.has_reward = false;
    };

    CordovaUnityAdsMV.prototype.showVideoAd = function() {
      if (this.loadedVideoAd()) {
        window.unityads.showVideoAd();
        return this.status = 'isReady';
      } else {
        return console.log('not loadedVideoAd');
      }
    };

    CordovaUnityAdsMV.prototype.showRewardedVideoAd = function() {
      if (this.loadedRewardedVideoAd()) {
        window.unityads.showRewardedVideoAd();
        return this.status = 'isReady';
      } else {
        return console.log('not loadedRewardedVideoAd');
      }
    };

    CordovaUnityAdsMV.prototype.loadedVideoAd = function() {
      return window.unityads.loadedVideoAd();
    };

    CordovaUnityAdsMV.prototype.loadedRewardedVideoAd = function() {
      return window.unityads.loadedRewardedVideoAd();
    };

    CordovaUnityAdsMV.prototype.isShowingVideoAd = function() {
      return window.unityads.isShowingVideoAd();
    };

    CordovaUnityAdsMV.prototype.isShowingRewardedVideoAd = function() {
      return window.unityads.isShowingRewardedVideoAd();
    };

    return CordovaUnityAdsMV;

  })();

  window.UnityAdsMV = new CordovaUnityAdsMV();

  setup = function() {
    window.unityads.setUp(gameId, videoAdPlacementId, rewardedVideoAdPlacementId, isTest);
    window.unityads.onVideoAdLoaded = function() {
      return isTest && console.log('onVideoAdLoaded');
    };
    window.unityads.onVideoAdShown = function() {
      window.UnityAdsMV.status = 'isShowing';
      return isTest && console.log('onVideoAdShown');
    };
    window.unityads.onVideoAdHidden = function() {
      window.UnityAdsMV.status = null;
      return isTest && console.log('onVideoAdHidden');
    };
    window.unityads.onRewardedVideoAdLoaded = function() {
      return isTest && console.log('onRewardedVideoAdLoaded');
    };
    window.unityads.onRewardedVideoAdShown = function() {
      window.UnityAdsMV.status = 'isShowing';
      return isTest && console.log('onRewardedVideoAdShown');
    };
    window.unityads.onRewardedVideoAdHidden = function() {
      window.UnityAdsMV.status = null;
      return isTest && console.log('onRewardedVideoAdHidden');
    };
    return window.unityads.onRewardedVideoAdCompleted = function() {
      this.has_reward = true;
      return isTest && console.log('onRewardedVideoAdCompleted');
    };
  };

  document.addEventListener("deviceready", setup, false);

}).call(this);