  // random functions
  const randomArrayIndex = ( length = 0 ) => Math.floor( Math.random() * length );
  const randomRoll = ( size ) => Math.abs( Math.random() * size );

  const digitalRain = {
    canvas: document.getElementById( 'digital-rain' ),
    charset: Array.from( new Array(53), (x, i) => String.fromCharCode( i + 65382 ) ),
    colors: [
      ['255,0,0', '248,36,164'], // red, pink
      ['0,255,255', '255,0,255', '255,95,31'],  // aqua, purple, orange
      ['255,0,0'], // red
      ['255,95,31', '255,255,255', '255,255,0'],  // orange, white, yellow
      ['255,0,0','0,0,255'], // red, blue
      ['255,0,255'],  // purple
      ['0,255,0', '255,255,0'],  // green, yellow
      ['0,0,255'],  // blue
      ['0,255,0', '255,255,255'],  // green, white
      ['255,0,255', '255,255,0'],  // purple, yellow
      ['0,255,0'],  // green
      ['255,0,0', '255,255,255', '0,0,255'], // red, white, blue
      ['255,255,0'],  // yellow
      ['0,255,0', '255,0,255'],  // green, purple
      ['0,255,255'],  // aqua
      ['0,255,0', '255,0,0'],  // green, red
    ],
    colorHolidays:[
      { "month": "2", "date": "14", "color": 0 },
      { "month": "3", "date": "17", "color": 6 },
      { "month": "7", "date": "4", "color": 11 },
      { "month": "10", "date": "31", "color": 13 },
      { "month": "11", "date": "25", "color": 3 },
      { "month": "12", "date": "25", "color": 15 },
    ],
    fontFace: 'symbol',
    fontFadeSpeed: 0.2,
    fontRenderSpeed: 80,
    fontSizeOffsets: [ 0.3, 0.6, 1.0, 1.3, 1.6, 2.0 ],
    fontSpacing: 4,
    initialFontSize: 10,
    initialize: function( colorsIndex, gravity = 0, threeDee = true ) {
      this.colorsIndex = this.selectColorSet();
      console.log(this.colorsIndex);
      this.gravity = gravity;
      this.threeDee = threeDee;
      const cnvs = digitalRain.canvas;
      // set background, height and width
      cnvs.setAttribute('height', window.innerHeight);
      cnvs.setAttribute('width', window.innerWidth);
      const ctx = this.context = cnvs.getContext('2d', { desynchronized: true });
      ctx.fillStyle = `rgba( ${ digitalRain.themeColor } )`;
      ctx.fillRect( 0, 0, cnvs.width, cnvs.height );
      this.makeItRain();
    },
    selectColorSet: function() {
      const currentDate = new Date();
      const month = currentDate.getMonth() + 1
      const date = currentDate.getDate()
      let color = -1;
      for( let i = 0; i < this.colorHolidays.length; i++ ){
        const ci = this.colorHolidays[i];
        if( ci.month == month && ci.date == date ){
          color =  ci.color;
        }
      }
      color = ( color === -1 ) ? randomArrayIndex( this.colors.length ) : color;
      return color;
    },
    makeItRain: function() {
      /**** 
      ** create array of columns based on canvas width and font size
      ** and initialize each column with an x position and random y start position
      ** also initialize each column with an initial font color, gravity, and font size
      ****/
      const noc = this.numberOfColumns = Math.ceil( window.innerWidth / this.initialFontSize );
      const columns = Array.from( new Array( noc ), ( x, i ) => ( {
                          'fontColor': this.selectFontColor(),
                          'gravity': this.gravity,
                          'fontSize': this.initialFontSize,
                          'xPosition': ( i * this.initialFontSize ),
                          'yPosition': randomRoll( this.canvas.height ),
                        } ) );
      // draw a character at an interval based on font speed
      this.rainDrops = setInterval( () => {
        const ctx = digitalRain.context;
        // overlays transparent background color for fade effect
        ctx.fillStyle = `rgba( ${ digitalRain.themeColor }, ${ digitalRain.fontFadeSpeed } )`;
        ctx.fillRect( 0, 0, digitalRain.canvas.width, digitalRain.canvas.height );
  
        // what is the matrix, columns of chaotic beauty
        columns.map( ( column ) => {
          // set font color, size and face
          ctx.fillStyle = `rgba( ${ column.fontColor } ) `;
          ctx.font = `${ column.fontSize }pt ${ digitalRain.fontFace }`;
          // grab a random character from the charset and draw in column x at position y
          ctx.fillText( digitalRain.charset[ randomArrayIndex(digitalRain.charset.length) ],
                        column.xPosition,
                        column.yPosition
                      );
          // randomly decide to get new random starting position
          // OR draw next character below previous character
          if( ( column.gravity && column.yPosition > ( randomRoll(10) * digitalRain.canvas.height ) )
          || ( !column.gravity && column.yPosition < ( digitalRain.canvas.height / randomRoll(20) ) ) ) {
            column.fontColor = digitalRain.selectFontColor();
            column.gravity = ( this.gravity === 2 ) ? Math.round( Math.random() ) : this.gravity;
            column.fontSize = this.threeDee && this.initialFontSize * this.fontSizeOffsets[ randomArrayIndex(this.fontSizeOffsets.length) ] || this.initialFontSize;
            column.yPosition = randomRoll( digitalRain.canvas.height );
          }
          else {
            column.yPosition = Math.abs( column.yPosition + ( column.gravity ? column.fontSize + digitalRain.fontSpacing : -column.fontSize - digitalRain.fontSpacing ) );
          }
        });
      }, this.fontRenderSpeed );
    },
    resetRain: function( colorsIndex, gravity, threeDee ) {
      clearInterval( this.rainDrops );
      this.initialize( colorsIndex, gravity, threeDee );
    },
    selectFontColor: function() { 
      const fontColors = this.colors[ ( this.colorsIndex === -1 ) ? randomArrayIndex( this.colors.length ) : this.colorsIndex ];
      return fontColors[ randomArrayIndex( fontColors.length ) ];
    },
    themeColor: '0,0,0',
  };

digitalRain.initialize();