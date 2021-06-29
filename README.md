# metaforiq v2.0

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

### Mobile Experience using Touch

* swipe left to change colors
* swipe up to change gravity
* swipe right to start messages
* swipe down to change 2d/3d effect

### Desktop Experience using Keyboard

* keypress c to change color scheme
* keypress g to toggle gravity on or off
* keypress t to toggle 2d/3d effect
* keypress m to toggle messages

## theMatrix.initialize and resetRain accept 3 params

```javascript
digitalRain.initialize( colorsIndex, gravity, threeDee );
```

### all params are optional

### @param {Number} colorsIndex

one of the preset array cells, default 4 (red, blue)

```javascript
'colorsIndex': -1,
```

Here is the related set of colors to choose from:

```javascript
colors: [
  ['255,0,0', '248,36,164'], // red, pink
  ['0,255,255', '255,0,255', '255,95,31'],  // aqua, purple, orange
  ['255,0,0'], // red
  ['255,95,31', '255,255,255', '255,255,0'],  // orange, white, yellow
  ['255,0,0','0,0,255'], // red, blue
  ['255,0,255'],  // purple
  ['0,255,0', '255,255,0'],  // green, yellow
  ['0,0,255'],  // blue
  ['255,0,255', '255,255,0'],  // purple, yellow
  ['0,255,0'],  // green
  ['255,0,0', '255,255,255', '0,0,255'], // red, white, blue
  ['255,255,0'],  // yellow
  ['0,255,0', '255,255,255'],  // green, white
  ['0,255,255'],  // aqua
  ['0,255,0', '255,0,0'],  // green, red
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

## rain messages in a browser

rain-messages.js randomly selects and types a message from the messages array.

## interactions for keyboard and touch devices

interactions.js contains event listeners for various keypress and touch scenarios,
more or less shuffling through preset options.

## help

help-messages.js contains a set of helpful messages, currently related to the interaction options

## analytics

using basic GA4 tagging via GTM -- CHANGE THE ACCOUNT NUMBER
