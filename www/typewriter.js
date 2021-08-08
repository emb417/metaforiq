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
    startY: 0,
    interval: 4000,
    fontSize: '16',
    fontFace: 'symbol',
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
      this.context = cnvs.getContext( '2d', { desynchronized: true } );
      cnvs.setAttribute( 'height', window.innerHeight );
      cnvs.setAttribute( 'width', window.innerWidth );
      if ( this.status === "active" ){
        this.stopMessage();
      } else {
        this.startMessage();
      }
    },
    isMobileDevice: function() {
      return ( typeof window.orientation !== "undefined" ) || ( navigator.userAgent.indexOf('IEMobile') !== -1 );
    },
    startMessage: function() {
      this.status = "active";
      this.context.font = `small-caps ${ this.fontSize }pt ${ this.fontFace }`;
      this.context.fillStyle = 'white';
      
      // start message immediately
      this.messagesIndex = ( this.messagesIndex === this.messages.length ) ? 0 : this.messagesIndex;
      const message = this.messages[ this.messagesIndex ];
      this.typing( message );
      this.clearMessage( this, this.interval - 1000 );
      this.messagesIndex += 1;

      // loop thru remaining messages
      const self = this;
      this.doMessage = setInterval( () => {
        const message = self.messages[ self.messagesIndex ];
        self.typing( message );
        self.clearMessage( self, self.interval - 1000 );
        if ( self.messagesIndex == self.messages.length ) { self.stopMessage(); }
        else { self.messagesIndex += 1; }
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
      const self = this;
      const lineHeight = this.fontSize + 2;
  
      // sets initial x/y for typing
      let cursorX = this.startX;
      let cursorY = this.startY;
      
      let i = 0;
      this.startTyping = setInterval( () => {
        const ctx = self.context;
        const rem = stringToType.substr( i );
        let space = rem.indexOf( ' ' );
        space = ( space === -1 ) ? stringToType.length : space;
        const wordwidth = ctx.measureText( rem.substring( 0, space ) ).width;
        const w = ctx.measureText( stringToType.charAt( i ) ).width;
        if( cursorX + wordwidth >= self.canvas.width - ( self.canvas.width / 5 ) ) {
            cursorX = self.startX;
            cursorY += lineHeight;
        }
        ctx.fillText( stringToType.charAt( i ), cursorX, cursorY );
        i += 1;
        cursorX += w;
        if( i === stringToType.length ) {
            clearInterval( self.startTyping );
        }
      }, 42 );
    },
  }
};

/********************** 
 * 
 * HELP
 * 
 */
const help = new Typewriter( "help", { 'startX': 70, 'startY': 80 } );
const helpMessages = [ " Welcome to Metaforiq!" ];
helpMessages.push( `${ help.isMobileDevice() ? 'swipe up' : 'press g' } to change gravity` );
helpMessages.push( `${ help.isMobileDevice() ? 'swipe left' : 'press c' } to change colors` );
helpMessages.push( `${ help.isMobileDevice() ? 'swipe down' : 'press t' } to change 2d/3d effect` );
helpMessages.push( `${ help.isMobileDevice() ? 'swipe right' : 'press m' } to toggle messages` );
helpMessages.push( `${ help.isMobileDevice() ? 'two finger tap' : 'press h' } to toggle help` );
help.messages = helpMessages;
help.initialize();

/***********************
 * 
 * HELP IN AUREBESH
 * 
 */
const aurebeshCharset = ` abcdefg hijklmnop qrstuv wxyz 1234567890 {}[]:;| .,'"?!$ @#%^&*() -_=+ /><\\`;
const aurebesh = new Typewriter( "aurebesh", { 'startX': 70, 'startY': window.innerHeight - 80, 'fontFace': 'Aurebesh' } );
aurebesh.messages = helpMessages;
aurebesh.initialize();


/********************** 
 * 
 * INSPIRATIONAL
 * 
 */
const inspirational = new Typewriter( "inspirational", {
  'startX': ( window.innerWidth / 5 ),
  'startY': ( window.innerHeight / 4 ),
  interval: 6000,
  fontSize: 32,
} );

const inspirationalAurebesh = new Typewriter( "inspirationalAurebesh", {
  'startX': ( window.innerWidth / 5 ),
  'startY': window.innerHeight - ( window.innerHeight / 3 ),
  interval: 6000,
  fontSize: 32,
  fontFace: 'Aurebesh'
} );

const inspirationalMessages = [ // from:sw:tcw
  "Great leaders inspire greatness in others.",
  "Belief is not a matter of choice, but of conviction.",
  "Easy is the path to wisdom for those not blinded by ego.",
  "A plan is only as good as those who see it through.",
  "The best confidence builder is experience.",
  "Trust in your friends, and they’ll have reason to trust in you.",
  "You hold onto friends by keeping your heart a little softer than your head.",
  "Heroes are made by the times.",
  "Fail with honor rather than succeed by fraud.",
  "Greed and fear of loss are the roots that lead to the tree of evil.",
  "Arrogance diminishes wisdom.",
  "Truth enlightens the mind, but won’t always bring happiness to your heart.",
  "Fear is a disease; hope is its only cure.",
  "It is a rough road that leads to the heights of greatness.",
  "Compromise is a virtue to be cultivated, not a weakness to be despised.",
  "A secret shared is a trust formed.",
  "A lesson learned is a lesson earned.",
  "Overconfidence is the most dangerous form of carelessness.",
  "The first step to correcting a mistake is patience.",
  "A true heart should never be doubted.",
  "Believe in yourself or no one else will.",
  "No gift is more precious than trust.",
  "Sometimes, accepting help is harder than offering it.",
  "Attachment is not compassion.",
  "It is the quest for honor that makes one honorable.",
  "If you ignore the past, you jeopardize the future.",
  "A wise leader knows when to follow.",
  "Where there’s a will, there’s a way.",
  "The challenge of hope is to overcome corruption.",
  "Those who enforce the law must obey the law.",
  "The future has many paths – choose wisely.",
  "A failure in planning is a plan for failure.",
  "He who seeks to control fate shall never find peace.",
  "Adaptation is the key to survival.",
  "Anything that can go wrong will.",
  "Without honor, victory is hollow.",
  "Without humility, courage is a dangerous game.",
  "A great student is what the teacher hopes to be.",
  "When destiny calls, the chosen have no choice.",
  "Who a person truly is cannot be seen with the eye.",
  "Understanding is honoring the truth beneath the surface.",
  "Who’s the more foolish, the fool or the fool who follows him?",
  "The first step towards loyalty is trust.",
  "The path of ignorance is guided by fear.",
  "The wise man leads, the strong man follows.",
  "Our actions define our legacy.",
  "Where we are going always reflects where we came from.",
  "Keep your friends close, but keep your enemies closer.",
  "Trust is the greatest of gifts, but it must be earned.",
  "Who we are never changes, who we think we are does.",
  "To seek something is to believe in its possibility.",
  "Struggles often begin and end with the truth.",
  "Disobedience is a demand for change.",
  "When we rescue others, we rescue ourselves.",
  "Choose your enemies wisely, as they may be your last hope.",
  "Humility is the only defense against humiliation.",
  "You must trust in others or success is impossible.",
  "One vision can have many interpretations.",
  "Courage begins by trusting oneself.",
  "Never become desperate enough to trust the untrustworthy.",
  "Never give up hope, no matter how dark things seem.",
  "The truth about yourself is always the hardest to accept.",
  "The wise benefit from a second opinion.",
  "When in doubt, go to the source.",
  "The popular belief isn’t always the correct one.",
  "To love, is to trust. To trust is to believe.",
  "Jealousy is the path to chaos.",
  "Facing all that you fear will free you from yourself.",
];
inspirational.messages = inspirationalAurebesh.messages = inspirationalMessages;

const startInspiring = setTimeout( () => {
  inspirational.initialize();
  inspirationalAurebesh.initialize();
}, 22000 );

/*****************
 * 
 * EOF
 * 
 */