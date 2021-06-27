  // random functions
  const randomArrayIndex = ( length = 0 ) => Math.floor( Math.random() * length );
  const randomRoll = ( size ) => Math.abs( Math.random() * size );

  const digitalRain = {
    canvas: document.getElementById( 'digital-rain' ),
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
      const noc = digitalRain.config.numberOfColumns = Math.ceil( window.innerWidth / this.config.initialFontSize );
      return Array.from( new Array( noc ), ( x, i ) => ( {
                          'fontColor': this.selectFontColor( opts ),
                          'fontGravity': opts.fontGravity,
                          'fontSize': opts.initialFontSize,
                          'xPosition': ( i * opts.initialFontSize ),
                          'yPosition': randomArrayIndex( randomRoll( noc ) * opts.initialFontSize ),
                        } ) );
    },
    config: {
      'charset': Array.from( new Array(42), (x, i) => String.fromCharCode(i + 65393) ),
      'colorsIndex': -1,
      'fontFace': 'symbol',
      'fontFadeSpeed': 0.05,
      'fontGravity': 1,
      'fontRenderSpeed': 60,
      'fontSizeOffsets': [ 0.3, 0.6, 1.0, 1.3, 1.6, 2.0, 3.0 ],
      'fontSpacing': 4,
      'initialFontSize': 8,
      'themeColor': '0,0,0',
      'threeDee': false,
    },
    resetRain: function( opts ) {
      clearInterval( digitalRain.rainDrops );
      makeItRain( opts );
    },
    initialize: function( opts ) {
      makeItRain( opts );
    },
    selectFontColor: ( { colorsIndex } ) => { 
      colorsIndex = ( colorsIndex == -1 ) ? randomArrayIndex(digitalRain.colors.length) : colorsIndex; 
      fontColors = digitalRain.colors[ colorsIndex ];
      return fontColors[ randomArrayIndex(fontColors.length) ];
    },
    selectFontGravity: ( { fontGravity } ) => {
      return fontGravity || Math.round( Math.random() );
    },
    selectFontSize: ( { initialFontSize, threeDee } ) => {
      const { fontSizeOffsets } = digitalRain.config;
      return threeDee
        && initialFontSize * fontSizeOffsets[ randomArrayIndex(fontSizeOffsets.length) ]
        || initialFontSize;
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
    const ctx = cnvs.getContext('2d', { alpha: false, desynchronized: true });
    ctx.fillStyle = `rgba( ${ what.themeColor } )`;
    ctx.fillRect( 0, 0, cnvs.width, cnvs.height );

    const columns = digitalRain.columns( what );

    // draw a character at an interval based on font speed
    digitalRain.rainDrops = setInterval( () => {
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
          column.yPosition = randomRoll( what.numberOfColumns ) * column.fontSize;
        }
        else {
          column.yPosition = Math.abs( column.yPosition + ( column.fontGravity ? column.fontSize + what.fontSpacing : -column.fontSize - what.fontSpacing ) );
        }
      });
    }, what.fontRenderSpeed );
  };

digitalRain.initialize({
  colorsIndex: 2,
  fontGravity: 0,
  threeDee: true,
});

window.addEventListener('resize', e => {
  digitalRain.resetRain();
}, false);

window.addEventListener('keydown', e => {
  let { colorsIndex, fontGravity, threeDee } = digitalRain.config;
  let dirty = false;
  switch( e.key ){
    case 'c':
      colorsIndex = ( colorsIndex < digitalRain.colors.length - 1 ) ? colorsIndex + 1 : -1;
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
  return !dirty || digitalRain.resetRain( { colorsIndex, fontGravity, threeDee } );
}, false );