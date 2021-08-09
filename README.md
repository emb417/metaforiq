# metaforiq v3.0.3

## digital rain in a browser

### Change Log

* v1 - original rain with color, gravity, and 3d desktop interactions
* v1.1 - ...added initialFontSize opt
* v1.2 - ...added mobile touch interactions
* v1.3 - ...added messages with keyboard and swipe interactions
* v1.3.1 - ...added more swipes
* v1.3.2 - ...added GA4 via GTM
* v1.3.3 - ...stopped default scrolling on swipe up/down
* v1.3.4 - ...added viewport meta and fixed message toggle bug
* v1.4 - ...added help messages
* v2.0 - refactored digital-rain.js, added more colors, and a gravity option (up)
* v2.1 - delay rain messages until after help messages
* v2.2 - added keypress h and two-finger tap to toggle help messages
* v2.2.1 - added new relic browser agent
* v2.2.2 - added help hint and quote messages
* v2.3.0 - added holiday colors
* v2.3.1 - removed new relic agent and console log
* v2.3.2 - better date compare and persist color thru gravity and 3d toggles
* v2.3.3 - ga4 event tracking for interactions
* v2.3.4 - readme update
* v2.3.5 - tracking event tweak
* v3.0.0 - refactored messages and added aurebesh
* v3.0.1 - fixed help for aurebesh
* v3.0.2 - fixed initial gravity, 3d, and aurebesh rendering
* v3.0.3 - shorter font tails...

### Mobile Experience using Touch

* swipe up to change gravity
* swipe left to change colors
* swipe down to toggle 2d/3d effect
* swipe right to toggle messages
* two-finger tap to toggle help

### Desktop Experience using Keyboard

* keypress g to change gravity
* keypress c to change color scheme
* keypress t to toggle 2d/3d effect
* keypress m to toggle messages
* keypress h to toggle help

## digitalRain.initialize and resetRain both accept 3 params

```javascript
digitalRain.initialize( colorsIndex, gravity, threeDee );
```

### all params are optional

### @param {Number} colorsIndex

set to choose one of the colors by array cell, defaults to random color set

```javascript
'colorsIndex': -1, //makes each set of chars a random color
```

Here is the related set of colors to choose from:

```javascript
colors: [
  ['255,0,0', '248,36,164'], // 0 - red, pink
  ['0,255,255', '255,0,255', '255,95,31'],  // 1 - aqua, purple, orange
  ['255,0,0'], // 2 - red
  ['255,95,31', '255,255,255', '255,255,0'],  // 3 - orange, white, yellow
  ['255,0,0','0,0,255'], // 4 - red, blue
  ['255,0,255'],  // 5 - purple
  ['0,255,0', '255,255,0'],  // 6 - green, yellow
  ['0,0,255'],  // 7 - blue
  ['0,255,0', '255,255,255'],  // 8 - green, white
  ['255,0,255', '255,255,0'],  // 9 - purple, yellow
  ['0,255,0'],  // 10 - green
  ['255,0,0', '255,255,255', '0,0,255'], // 11 - red, white, blue
  ['255,255,0'],  // 12 - yellow
  ['0,255,0', '255,0,255'],  // 13 - green, purple
  ['0,255,255'],  // 14 - aqua
  ['0,255,0', '255,0,0'],  // 15 - green, red
]
```

### @param {Number} gravity

0 up, 1 down, 2 random - default 0

```javascript
'gravity': 0,
```

### @param {Boolean} threeDee

defaults to true, randomizes font sizes for 3D effect

```javascript
'threeDee': true,
```

## digitalRain.colorHolidays

Is an array of objects that contain a date and colorIndex, selectColorSet will look for matches if colorsIndex isn't passed in initialize()

```javascript
colorHolidays:[
  { "date": "2/14/2022", "color": 0 },
  { "date": "3/17/2022", "color": 6 },
  { "date": "7/4/2022", "color": 11 },
  { "date": "10/31/2021", "color": 13 },
  { "date": "11/25/2021", "color": 3 },
  { "date": "12/24/2021", "color": 15 },
  { "date": "12/25/2021", "color": 15 },
  { "date": "12/31/2021", "color": -1 },
  { "date": "1/1/2022", "color": -1 },
]
```

## typewriter

typewriter.js is a class object used to create a canvas to write messages using a typewriter style rendering.  Included are a few implementations for showing help messages, currently related to the interaction options, and inspirational messages from sw: tcw.

## interactions for keyboard and touch devices

interactions.js contains event listeners for various keypress and touch scenarios,
more or less shuffling through preset options.

## analytics

using basic GA4 tagging via GTM -- CHANGE THE ACCOUNT NUMBER
