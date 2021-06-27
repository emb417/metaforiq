/**
 * theMatrix.initialize and resetRain accept an opts object...
 * @param {Array} charset - default size 42, starting at char code 65393
 * @param {Array} fontColors - rgb strings, e.g. '0,255,0', empty array defaults to random
 * @param {String} fontFace - defaults to symbol
 * @param {Boolean} fontGravity - default true aka down
 * @param {Function} fontSize - Math.floor( window.innerWidth / 100 )
 * @param {Number} fontRenderSpeed - ms, default is 80ms
 * @param {Number} fontFadeSpeed - font fade speed, defaults to 0.05
 * @param {String} themeColor - rgb, default is 0,0,0 or black
 * @param {Boolean} threeDee - defaults to true, randomizes font sizes for 3d effect
 */

  // random functions
  const randomArrayIndex = ( length = 0 ) => Math.floor( Math.random() * length );
  const randomRoll = ( size ) => Math.abs( Math.random() * size );

  const digitalRain = {
    canvas: document.getElementById('digital-rain'),
    colors: [
      ['255,0,0', '255,255,255', '0,0,255'], // red, white, blue
      ['0,255,0', '255,255,255'],  // green, white
      ['255,95,31', '255,255,255', '255,255,0'],  // orange, white, yellow
      ['255,0,255', '255,255,255', '255,255,0'],  // purple, white, yellow
      ['0,255,255', '255,0,255', '255,95,31'],  // aqua, purple, orange
    ],
    columns: function( opts ) {
      /**** 
      ** create array of columns based on canvas width and font size
      ** and populate with fixed x position, random y start position
      ** and font gravity, font color, and font size
      ****/
      return Array.from( new Array( Math.ceil( window.innerWidth / this.config.fontSize() ) ),
                              ( x, i ) => ({
                                'fontColor': this.selectFontColor( opts ),
                                'fontGravity': this.selectFontGravity( opts ),
                                'fontSize': this.config.fontSize(),
                                'xPosition': ( i * this.config.fontSize() ),
                                'yPosition': randomArrayIndex( randomRoll(100) * this.config.fontSize()),
                              })
                )
    },
    config: {
      'charset': Array.from( new Array(42), (x, i) => String.fromCharCode(i + 65393) ),
      'fontFace': 'symbol',
      'fontFadeSpeed': 0.05,
      'fontRenderSpeed': 80,
      'fontSize': () => Math.floor( window.innerWidth / 100 ),
      'fontSizeOffsets': [ 0.3, 0.6, 1.0, 1.3, 1.6, 2.0, 3.0 ],
      'fontSpacing': 4,
      'themeColor': '0,0,0',
    },
    resetRain: function( opts = {} ) {
      clearInterval( digitalRain.rainDrops );
      makeItRain( opts );
    },
    initialize: function( opts ) {
      makeItRain( opts );
    },
    selectFontColor: ( { fontColors = [] } ) => { 
      if( fontColors.length == 0 ){
        fontColors = digitalRain.colors[randomArrayIndex(digitalRain.colors.length)]; 
      }
      return fontColors[ randomArrayIndex(fontColors.length) ];
    },
    selectFontGravity: ( { fontGravity = true } ) => {
      return fontGravity || Math.round( Math.random() );
    },
    selectFontSize: ( { threeDee = false } ) => {
      const { fontSizeOffsets, fontSize } = digitalRain.config;
      return threeDee
        && fontSize() * fontSizeOffsets[ randomArrayIndex(fontSizeOffsets.length) ]
        || fontSize();
    },
  };

  const makeItRain = ( opts = {} ) => {
    // config object, spreads opts after defaults are set
    const what = {
      ...digitalRain.config,
      ...opts
    };
    digitalRain.config = what;
    const cnvs = digitalRain.canvas;
    // set background, height and width
    cnvs.setAttribute('style', `background: rgb( ${ what.themeColor } )`);
    cnvs.setAttribute('height', window.innerHeight);
    cnvs.setAttribute('width', window.innerWidth);
    const ctx = digitalRain.context = cnvs.getContext('2d', { alpha: false, desynchronized: true });
    ctx.fillStyle = `rgba( ${ what.themeColor } )`;
    ctx.fillRect( 0, 0, cnvs.width, cnvs.height );

    const columns = digitalRain.columns( what );

    // draw a character at an interval based on font speed
    digitalRain.rainDrops = setInterval( () => {
      const cnvs = digitalRain.canvas;
      const ctx = digitalRain.context;
      // overlays transparent background color for fade effect
      ctx.fillStyle = `rgba( ${ what.themeColor }, ${ what.fontFadeSpeed } )`;
      ctx.fillRect( 0, 0, cnvs.width, cnvs.height );

      // what is the matrix, columns of chaotic beauty
      columns.map( ( column ) => {
        // set font color, size and face
        ctx.fillStyle = `rgba( ${ column.fontColor } ) `;
        ctx.font = `${ column.fontSize }pt ${ what.fontFace }`;
        // grab a random character from the charset and draw in column x at position y
        ctx.fillText( what.charset[ randomArrayIndex(what.charset.length) ],
                      column.xPosition,
                      column.yPosition
                    );
        // randomly decide to get new random starting position
        // OR draw next character below previous character
        if( ( column.fontGravity && column.yPosition > ( randomRoll(10) * cnvs.height ) )
        || ( !column.fontGravity && column.yPosition < ( cnvs.height / randomRoll(20) ) ) ) {
          column.fontColor = digitalRain.selectFontColor( what );
          column.fontGravity = digitalRain.selectFontGravity( what );
          column.fontSize = digitalRain.selectFontSize( what );
          column.yPosition = randomRoll(80) * column.fontSize;
        }
        else {
          column.yPosition = Math.abs( column.yPosition + ( column.fontGravity ? column.fontSize + what.fontSpacing : -column.fontSize - what.fontSpacing ) );
        }
      });
    }, what.fontRenderSpeed );
  };

digitalRain.initialize({
  fontColors: digitalRain.colors[2],
  fontGravity: false,
});

window.addEventListener('resize', e => {
  digitalRain.resetRain();
}, false);

window.addEventListener('keydown', e => {
  let fontColors = digitalRain.config.fontColors;
  let fontGravity = digitalRain.config.fontGravity;
  let threeDee = digitalRain.config.threeDee;
  let dirty = false;
  switch( e.key ){
    case 'c':
      fontColors = digitalRain.colors[randomArrayIndex( digitalRain.colors.length )];
      dirty = true;
      break;
    case 'g':
      fontGravity = !digitalRain.config.fontGravity;
      dirty = true;
      break;
    case 't':
      threeDee = !digitalRain.config.threeDee;
      dirty = true;
      break;
    default:
      break;
  }
  return !dirty || digitalRain.resetRain( { fontColors, fontGravity, threeDee } );
}, false );