  // random functions
  const randomArrayIndex = ( length = 0 ) => Math.floor( Math.random() * length );
  const randomRoll = ( size ) => Math.abs( Math.random() * size );

  const digitalRain = {
    canvas: document.getElementById( 'digital-rain' ),
    charset: Array.from( new Array(53), (x, i) => String.fromCharCode( i + 65382 ) ),
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
    ],
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
    ],
    fontFace: 'symbol',
    fontFadeSpeed: 0.2,
    fontRenderSpeed: 80,
    fontSizeOffsets: [ 0.3, 0.6, 1.0, 1.3, 1.6, 2.0 ],
    fontSpacing: 4,
    initialFontSize: 10,
    initialize: function( colorsIndex, gravity = 0, threeDee = true ) {
      this.colorsIndex = colorsIndex ?? this.selectColorSet();
      this.gravity = gravity;
      this.threeDee = threeDee;
      const cnvs = digitalRain.canvas;
      // set background, height and width
      cnvs.setAttribute('height', window.innerHeight);
      cnvs.setAttribute('width', window.innerWidth);
      // set context, fill with black
      const ctx = this.context = cnvs.getContext('2d', { desynchronized: true });
      ctx.fillStyle = `rgba( ${ digitalRain.themeColor } )`;
      ctx.fillRect( 0, 0, cnvs.width, cnvs.height );
      this.makeItRain();
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
    selectColorSet: function() {
      const currentDate = new Date().setHours(0,0,0,0);
      let color;
      // look for holiday match and set initial color
      for( let i = 0; i < this.colorHolidays.length; i++ ){
        const ci = this.colorHolidays[i];
        const holidayDate = new Date( ci.date ).setHours(0,0,0,0);
        if( holidayDate == currentDate ){
          color =  ci.color;
        }
      }
      return color ?? randomArrayIndex( this.colors.length );
    },
    selectFontColor: function() { 
      const fontColors = this.colors[ ( this.colorsIndex === -1 ) ? randomArrayIndex( this.colors.length ) : this.colorsIndex ];
      return fontColors[ randomArrayIndex( fontColors.length ) ];
    },
    themeColor: '0,0,0',
  };

digitalRain.initialize();