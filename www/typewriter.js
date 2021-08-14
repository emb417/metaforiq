/*********************
 * 
 * TYPEWRITER
 * 
 */
const Typewriter = function( id, opts ) {
  opts = {
    messages: [],
    messagesIndex: 0,
    startX: 0,
    endX: window.innerWidth,
    startY: 0,
    interval: 4000,
    gap: 1000,
    fontSize: '16',
    fontFace: 'symbol',
    cookieName: "typewriter",
    ...opts
  };
  // create and append dom element
  const cnvs = document.createElement( "canvas" );
  cnvs.setAttribute( 'id', id );
  cnvs.setAttribute( 'style', `z-index: 10; background: transparent;` );
  document.body.appendChild( cnvs );

  // spread default opts and return object
  return {
    ...opts,
    canvas: document.getElementById( id ),
    clearMessage: function( self, delay ) {
      this.clearing = setTimeout( ()  => {
        self.context.clearRect( 0, 0, self.canvas.width, self.canvas.height );
      }, delay );
    },
    initialize: function() {
      const cnvs = this.canvas;
      this.context = cnvs.getContext( '2d' );
      cnvs.setAttribute( 'height', window.innerHeight );
      cnvs.setAttribute( 'width', window.innerWidth );
      if ( this.status === "active" ){
        this.stopMessage();
      } else {
        this.startMessage();
      }
    },
    isMobileDevice: function() {
      return ( typeof window.orientation !== "undefined" ) || ( navigator.userAgent.indexOf( 'IEMobile' ) !== -1 );
    },
    getCookie: function( cname ){
      let name = cname + "=";
      let decodedCookie = decodeURIComponent( document.cookie );
      let ca = decodedCookie.split( ';' );
      for( let i = 0; i <ca.length; i++ ) {
        let c = ca[ i ];
        while ( c.charAt( 0 ) == ' ' ) {
          c = c.substring(1);
        }
        if ( c.indexOf( name ) == 0 ) {
          return c.substring( name.length, c.length );
        }
      }
      return 0;
    },
    setCookie: function( cname, cvalue ){
      const d = new Date();
      d.setTime(d.getTime() + (30 * 24 * 60 * 60 * 1000));
      let expires = "expires="+d.toUTCString();
      document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
    },
    startMessage: function() {
      this.status = "active";

      // start message immediately
      this.messagesIndex = parseInt( this.getCookie( this.cookieName ) );
      const message = this.messages[ this.messagesIndex ];
      this.typing( message );
      this.clearMessage( this, this.interval - this.gap );
      this.messagesIndex += 1;
      this.setCookie( this.cookieName, this.messagesIndex );

      // loop thru remaining messages
      const self = this;
      this.doMessage = setInterval( () => {
        const message = self.messages[ self.messagesIndex ];
        self.typing( message );
        self.clearMessage( self, self.interval - self.gap );
        if ( self.messagesIndex == self.messages.length ) {
          self.setCookie( self.cookieName, 0 );
          self.stopMessage();
        }
        else {
          self.messagesIndex += 1;
          self.setCookie( self.cookieName, self.messagesIndex );
        }
      }, this.interval );
    },
    stopMessage: function() {
      this.status = "disabled";
      clearTimeout( this.clearing );
      clearInterval( this.startTyping );
      clearInterval( this.doMessage );
      this.clearMessage( this, 0 );
    },
    typing: function( stringToType ) {
      // set color, font, and line height
      const ctx = this.context;
      ctx.fillStyle = 'white';
      ctx.font = `small-caps ${ this.fontSize }pt ${ this.fontFace }`;
      const lineHeight = this.fontSize + 2;
  
      // sets initial x/y for typing
      let cursorX = this.startX;
      let cursorY = this.startY;
      
      // start at the beginning
      let i = 0;
      const self = this;
      this.startTyping = setInterval( () => {
        // find words to measure for word wrapping
        const rem = stringToType.substr( i );
        let space = rem.indexOf( ' ' );
        space = ( space === -1 ) ? stringToType.length : space;
        const wordwidth = ctx.measureText( rem.substring( 0, space ) ).width;
        const w = ctx.measureText( stringToType.charAt( i ) ).width;
        
        // wrap words once length reaches border
        if( cursorX + wordwidth >= self.endX ) {
            cursorX = self.startX;
            cursorY += lineHeight;
        }

        // write letter
        ctx.fillText( stringToType.charAt( i ), cursorX, cursorY );

        // move cursor and letter index
        cursorX += w;
        i += 1;

        // if at end of string, stop
        if( i === stringToType.length ) {
            clearInterval( self.startTyping );
        }
      }, 42 );
    },
  }
};

/**********************
 * 
 *  LOAD AUREBESH FONT
 * 
 */
const aurebeshFont = new FontFace('Aurebesh', 'url(AurebeshAF-Canon.otf)');
aurebeshFont.load().then( ( font ) => { document.fonts.add(font); } );

/**********************
 * 
 * WELCOME
 * 
 */
const welcomeConfig = {
  'startX': 70,
  'interval': 15000,
  'gap': 12000,
};

 const welcome = new Typewriter( "welcome", {
   ...welcomeConfig,
  'startY': 80,
  'cookieName': 'welcomeIndex',
} );

const welcomeAurebesh = new Typewriter( "welcomeAurebesh", {
  ...welcomeConfig,
  'startY': window.innerHeight - 80,
  'fontFace': 'Aurebesh',
  'cookieName': 'welcomeAurebeshIndex',
} );

const welcomeMessages = [];
welcomeMessages.push( `${ welcome.isMobileDevice() ? 'two finger tap' : 'press h' } to toggle help` );
welcomeMessages.push( "welcome to metaforiq" );
welcome.messages = welcomeAurebesh.messages = welcomeMessages;
welcome.initialize();
welcomeAurebesh.initialize();

setInterval( () => {
  welcome.startMessage();
  welcomeAurebesh.startMessage();
}, 35000 );

/********************** 
 * 
 * HELP
 *
 */
const helpConfig = {
  'startX': ( window.innerWidth / 5 ),
  'endX': window.innerWidth - ( window.innerWidth / 5 ),
  'interval': 6000,
  'gap': 2000,
};

const help = new Typewriter( "help", {
  ...helpConfig,
  'startY': 120,
  'cookieName': "helpIndex",
} );

const helpAurebesh = new Typewriter( "helpAurebesh", {
  ...helpConfig,
  'startY': window.innerHeight - 120,
  'fontFace': 'Aurebesh',
  'cookieName': "helpAurebeshIndex",
} );

const helpMessages = [];
helpMessages.push( `${ help.isMobileDevice() ? 'swipe up' : 'press g' } to change gravity` );
helpMessages.push( `${ help.isMobileDevice() ? 'swipe left' : 'press c' } to change colors` );
helpMessages.push( `${ help.isMobileDevice() ? 'swipe down' : 'press t' } to change 2d/3d effect` );
helpMessages.push( `${ help.isMobileDevice() ? 'swipe right' : 'press m' } to toggle messages` );
help.messages = helpAurebesh.messages = helpMessages;
help.messagesIndex = help.getCookie( help.cookieName );
helpAurebesh.messagesIndex = helpAurebesh.getCookie( helpAurebesh.cookieName );
help.status = helpAurebesh.status = ( help.getCookie( 'visited' ) != "" ) ? "active" : "disabled";

const startHelping = setTimeout( () => {
  help.initialize();
  helpAurebesh.initialize();
  help.setCookie( 'visited', 1 );
}, ( help.getCookie( 'visited' ) != "" ) ? 0 : 6000 );


/********************** 
 * 
 * INSPIRATIONAL
 * 
 */
const inspirationalConfig = {
  'startX': ( window.innerWidth / 5 ),
  'endX': window.innerWidth - ( window.innerWidth / 5 ),
  'interval': 10000,
  'gap': 3000,
  'fontSize': 32,
};

const inspirational = new Typewriter( "inspirational", {
  ...inspirationalConfig,
  'startY': ( window.innerHeight / 4 ),
  'cookieName': "inspirationalIndex",
} );

const inspirationalAurebesh = new Typewriter( "inspirationalAurebesh", {
  ...inspirationalConfig,
  'startY': window.innerHeight - ( window.innerHeight / 3 ),
  'fontFace': 'Aurebesh',
  'cookieName': "inspirationalAurebeshIndex",
} );

const inspirationalMessages = [ // from:sw:tcw
  "great leaders inspire greatness in others",
  "belief is not a matter of choice, but of conviction",
  "easy is the path to wisdom for those not blinded by ego",
  "a plan is only as good as those who see it through",
  "the best confidence builder is experience",
  "trust in your friends, and they’ll have reason to trust in you",
  "you hold onto friends by keeping your heart a little softer than your head",
  "heroes are made by the times",
  "fail with honor rather than succeed by fraud",
  "greed and fear of loss are the roots that lead to the tree of evil",
  "arrogance diminishes wisdom",
  "truth enlightens the mind, but won’t always bring happiness to your heart",
  "fear is a disease; hope is its only cure",
  "it is a rough road that leads to the heights of greatness",
  "compromise is a virtue to be cultivated, not a weakness to be despised",
  "a secret shared is a trust formed",
  "a lesson learned is a lesson earned",
  "overconfidence is the most dangerous form of carelessness",
  "the first step to correcting a mistake is patience",
  "a true heart should never be doubted",
  "believe in yourself or no one else will",
  "no gift is more precious than trust",
  "sometimes, accepting help is harder than offering it",
  "attachment is not compassion",
  "it is the quest for honor that makes one honorable",
  "if you ignore the past, you jeopardize the future",
  "a wise leader knows when to follow",
  "where there’s a will, there’s a way",
  "the challenge of hope is to overcome corruption",
  "those who enforce the law must obey the law",
  "the future has many paths, choose wisely",
  "a failure in planning is a plan for failure",
  "he who seeks to control fate shall never find peace",
  "adaptation is the key to survival",
  "anything that can go wrong will",
  "without honor, victory is hollow",
  "without humility, courage is a dangerous game",
  "a great student is what the teacher hopes to be",
  "when destiny calls, the chosen have no choice",
  "who a person truly is cannot be seen with the eye",
  "understanding is honoring the truth beneath the surface",
  "who’s the more foolish, the fool or the fool who follows him?",
  "the first step towards loyalty is trust",
  "the path of ignorance is guided by fear",
  "the wise man leads, the strong man follows",
  "our actions define our legacy",
  "where we are going always reflects where we came from",
  "keep your friends close, but keep your enemies closer",
  "trust is the greatest of gifts, but it must be earned",
  "who we are never changes, who we think we are does",
  "to seek something is to believe in its possibility",
  "struggles often begin and end with the truth",
  "disobedience is a demand for change",
  "when we rescue others, we rescue ourselves",
  "choose your enemies wisely, as they may be your last hope",
  "humility is the only defense against humiliation",
  "you must trust in others or success is impossible",
  "one vision can have many interpretations",
  "courage begins by trusting oneself",
  "never become desperate enough to trust the untrustworthy",
  "never give up hope, no matter how dark things seem",
  "the truth about yourself is always the hardest to accept",
  "the wise benefit from a second opinion",
  "when in doubt, go to the source",
  "the popular belief isn’t always the correct one",
  "to love, is to trust. to trust is to believe",
  "jealousy is the path to chaos",
  "facing all that you fear will free you from yourself",
];
inspirational.messages = inspirationalAurebesh.messages = inspirationalMessages;
inspirational.messagesIndex = inspirational.getCookie( inspirational.cookieName );
inspirationalAurebesh.messagesIndex =  inspirationalAurebesh.getCookie( inspirationalAurebesh.cookieName );

const startInspiring = setTimeout( () => {
  inspirational.initialize();
  inspirationalAurebesh.initialize();
}, ( inspirational.getCookie( 'visited' ) != "" ) ? 1000 : 30000 );

/*****************
 * 
 * AUREBESH CHARSET abcdefghijklmnopqrstuvwxyz 1234567890 {}[]:;|.,'"?!$ @#%^&*()-_=+/><\
 * EOF
 * 
 */