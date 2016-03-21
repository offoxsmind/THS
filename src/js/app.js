var CONFIG_VERSION = 7;
// var BASE_CONFIG_URL = 'http://localhost:4000/';
// var BASE_CONFIG_URL = 'http://192.168.0.108:40000/';
var BASE_CONFIG_URL = 'http://freakified.github.io/TimeStylePebble/';
// var BASE_CONFIG_URL = 'http://192.168.0.106:4000/';

var failureRetryAmount = 3;
var currentFailures = 0;

var xhrRequest = function (url, type, callback) {
  var xhr = new XMLHttpRequest();
  xhr.onload = function () {
    callback(this.responseText);
  };
  xhr.open(type, url);
  xhr.send();
};

Pebble.addEventListener('showConfiguration', function(e) {
  var bwConfigURL    = BASE_CONFIG_URL + 'config_bw.html';
  var colorConfigURL = BASE_CONFIG_URL + 'config_color.html';
  var roundConfigURL = BASE_CONFIG_URL + 'config_color_round.html';

  var versionString = '?appversion=' + CONFIG_VERSION;

  if(Pebble.getActiveWatchInfo) {
    try {
      watch = Pebble.getActiveWatchInfo();
    } catch(err) {
      watch = {
        platform: "basalt",
      };
    }
  } else {
    watch = {
      platform: "aplite",
    };
  }

  if(watch.platform == "aplite"){
    Pebble.openURL(bwConfigURL + versionString);
  } else if(watch.platform == "chalk") {
    Pebble.openURL(roundConfigURL + versionString);
  } else {
    Pebble.openURL(colorConfigURL + versionString);
  }
});

Pebble.addEventListener('webviewclosed', function(e) {
  var configData = decodeURIComponent(e.response);

  if(configData) {
    configData = JSON.parse(decodeURIComponent(e.response));

    console.log("Config data recieved!" + JSON.stringify(configData));

    // prepare a structure to hold everything we'll send to the watch
    var dict = {};

    // color settings
    if(configData.color_bg) {
      dict.KEY_SETTING_COLOR_BG = parseInt(configData.color_bg, 16);
    }


    console.log('Preparing message: ', JSON.stringify(dict));

    // Send settings to Pebble watchapp
    Pebble.sendAppMessage(dict, function(){
      console.log('Sent config data to Pebble, now trying to get weather');
    }, function() {
        console.log('Failed to send config data!');
    });
  } else {
    console.log("No settings changed!");
  }

});