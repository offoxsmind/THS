#pragma once
#include <pebble.h>

#define SETTINGS_VERSION_KEY 1

//color setting
#define KEY_BACK_COLOR      1

typedef struct {
  // color settings
  GColor backColor;
}  Settings;

extern Settings globalSettings;

void Settings_init();
void Settings_deinit();
void Settings_loadFromStorage();
void Settings_saveToStorage();
void Settings_updateDynamicSettings();