const helpMessages = {
  canvas: document.getElementById( 'help-messages' ),
  clearMessage: function( delay ) {
    this.clearing = setTimeout( ()  => {
      helpMessages.context.clearRect( 0, 0, helpMessages.canvas.width, helpMessages.canvas.height );
    }, delay );
  },
  initialize: function( fontSize = 16, fontFace = 'symbol', messageX = 100, messageY = 100, typingSpeed = 42 ) {
    this.fontSize = fontSize;
    this.fontFace = fontFace;
    this.messageX = messageX;
    this.messageY = messageY;
    this.typingSpeed = typingSpeed;
    if( this.messages.length === 0 ){
      this.messages.push( "Welcome to Metaforiq" );
      this.messages.push( "Some hints for you..." );
      this.messages.push( `${ helpMessages.isMobileDevice() ? 'swipe up' : 'press g' } to change gravity` );
      this.messages.push( `${ helpMessages.isMobileDevice() ? 'swipe left' : 'press c' } to change colors` );
      this.messages.push( `${ helpMessages.isMobileDevice() ? 'swipe down' : 'press t' } to change 2d/3d effect` );
      this.messages.push( `${ helpMessages.isMobileDevice() ? 'swipe right' : 'press m' } to toggle messages` );
    }
    const cnvs = this.canvas;
    this.context = cnvs.getContext( '2d', { desynchronized: true } );
    cnvs.setAttribute( 'height', window.innerHeight );
    cnvs.setAttribute( 'width', window.innerWidth );
    this.startMessage();
  },
  isMobileDevice: function() {
    return ( typeof window.orientation !== "undefined" ) || ( navigator.userAgent.indexOf('IEMobile') !== -1 );
  },
  messages: [],
  startMessage: function() {
    if ( this.status === "active" ){
      this.stopMessage();
    }
    this.status = "active";
    this.context.font = `small-caps ${ this.fontSize }pt ${ this.fontFace }`;
    this.context.fillStyle = 'white';
    this.helpIndex = 0;
    const message = this.messages[ this.helpIndex ];
    this.typing( message, this.messageX, this.messageY, ( this.fontSize * 1.3 ), this.messageX );
    this.clearMessage( 2000 );
    this.helpIndex += 1;
    this.doMessage = setInterval( () => {
      const message = helpMessages.messages[ helpMessages.helpIndex ];
      helpMessages.typing( message, helpMessages.messageX, helpMessages.messageY, ( helpMessages.fontSize * 1.3 ), helpMessages.messageX );
      helpMessages.clearMessage( 2000 );
      if ( helpMessages.helpIndex == helpMessages.messages.length ) { helpMessages.stopMessage(); }
      else { helpMessages.helpIndex += 1; }
    }, 3000 );
  },
  stopMessage: function() {
    this.status = "disabled";
    clearTimeout( this.clearing );
    clearInterval( this.startTyping );
    clearInterval( this.doMessage );
    this.clearMessage( 0 );
  },
  typing: function( str = '', startX = 0, startY = 0, lineHeight = 32, padding = 10 ) {
    let cursorX = startX;
    let cursorY = startY;
    let i = 0;
    this.startTyping = setInterval( () => {
        const rem = str.substr( i );
        let space = rem.indexOf( ' ' );
        space = ( space === -1 ) ? str.length : space;
        const wordwidth = helpMessages.context.measureText( rem.substring( 0, space ) ).width;
        const w = helpMessages.context.measureText( str.charAt( i ) ).width;
        if( cursorX + wordwidth >= helpMessages.canvas.width - padding ) {
            cursorX = startX;
            cursorY += lineHeight;
        }
        helpMessages.context.fillText( str.charAt( i ), cursorX, cursorY );
        i += 1;
        cursorX += w;
        if( i === str.length ) {
            clearInterval( helpMessages.startTyping );
        }
    }, helpMessages.typingSpeed );
  }
};

helpMessages.initialize();