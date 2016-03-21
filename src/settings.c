#include <pebble.h>
#include "settings.h"

Settings globalSettings;

void Settings_init() {
  // first, check if we have any saved settings
  int settingsVersion = persist_read_int(SETTINGS_VERSION_KEY);

  // load all settings
  Settings_loadFromStorage();
}

void Settings_deinit() {
  // write all settings to storage
  Settings_saveToStorage();
}


void Settings_loadFromStorage() {
  if(persist_exists(KEY_BACK_COLOR)) {
     
     persist_read_data(KEY_BACK_COLOR,         &globalSettings.backColor,        sizeof(GColor));
  
    } else {
  
      globalSettings.backColor      = GColorBlack;
  
    #ifdef PBL_COLOR
      globalSettings.backColor      = GColorGreen;
  
    #else
      globalSettings.backColor      = GColorRed;
  
    #endif
  
}

void Settings_saveToStorage() {
  Settings_updateDynamicSettings();

  // save settings to persistent storage
  persist_write_data(KEY_BACK_COLOR,            &globalSettings.backColor,        sizeof(GColor));
  
  persist_write_int(SETTINGS_VERSION_KEY,               CURRENT_SETTINGS_VERSION);
}