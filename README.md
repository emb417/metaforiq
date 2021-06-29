# metaforiq v1.3.2

## digital rain in a browser

### Change Log

* v1 - original rain with color, gravity, and 3d desktop interactions
* v1.1 - ...added initialFontSize opt
* v1.2 - ...added mobile touch interactions
* v1.3 - ...added messages with keyboard and swipe interactions
* v1.3.1 - ...added more swipes
* v1.3.2 - ...added GA4 via GTM

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

## theMatrix.initialize and resetRain accept an opts object

```javascript
digitalRain.initialize({
  'colorsIndex': 5,
  'fontGravity': 1,
  'themeColor': '255,255,255',
  'threeDee': false,
});
```

### all params are optional

### @param {Array} charset

default size 42, starting at char code 65393 to get asian chars

```javascript
'charset': Array.from( new Array(42), (x, i) => String.fromCharCode(i + 65393) ),
```

### @param {Number} colorsIndex

one of the presets

```javascript
'colorsIndex': -1,
```

Here is the related set of colors to choose from:

```javascript
colors: [
  ['255,0,0', '255,255,255', '0,0,255'],      // 0 - red, white, blue
  ['0,255,0', '255,255,255'],                 // 1 - green, white
  ['255,95,31', '255,255,255', '255,255,0'],  // 2 - orange, white, yellow
  ['255,0,255', '255,255,255', '255,255,0'],  // 3 - purple, white, yellow
  ['0,255,255', '255,0,255', '255,95,31'],    // 4 - aqua, purple, orange
]
```

### @param {String} fontFace

defaults to symbol, can use any installed web font face

```javascript
'fontFace': 'symbol',
```

### @param {Number} fontFadeSpeed

font fade speed, defaults to 0.05 - make changes in the hundredths

```javascript
'fontFadeSpeed': 0.08,
```

### @param {Number} fontGravity

1 down, 0 random - default 1

```javascript
'fontGravity': 0,
```

### @param {Number} fontRenderSpeed

ms, default is 60ms

```javascript
'fontRenderSpeed': 42,
```

### @param {Array} fontSizeOffsets

array of multipliers to randomly change font sizes for 3D effect

```javascript
'fontSizeOffsets': [ 0.3, 0.6, 1.0, 1.3, 1.6, 2.0, 3.0 ],
```

### @param {Number} fontSpacing

space between chars in pts, defaults to 4

```javascript
'fontSpacing': 8,
```

### @param {Number} initialFontSize

number in pts, defaults to 8...used to determine numberOfColumns

```javascript
'initialFontSize': 12,
```

### @param {String} themeColor

rgb, default is 0,0,0 or black

```javascript
'themeColor': '255,255,255',
```

### @param {Boolean} threeDee

defaults to false, randomizes font sizes for 3D effect

```javascript
'threeDee': true,
```
