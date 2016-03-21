#pragma once

#include "pebble.h"

static const GPathInfo MINUTE_HAND_POINTS = {
8,
  (GPoint []) {
      { 2, -10 },
      { 3, -11 },
      { 4, -12 },
      { 2, -70 },
      {-2, -70 },
      {-4, -12 },
      {-3, -11 },
      {-2, -10 }
  }
};

static const GPathInfo HOUR_HAND_POINTS = {
  6,
    (GPoint []){
      { 2, -54 },
      { 5, -54 },
      { 5, -78 },
      {-5, -78 },
      {-5, -54 },
      {-2, -54 }
      
  }
};






