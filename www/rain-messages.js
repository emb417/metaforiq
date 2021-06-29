const rainMessages = {
  canvas: document.getElementById( 'rain-messages' ),
  clearMessage: function( delay ) {
    rainMessages.clearing = setTimeout( ()  => {
      rainMessages.context.clearRect( 0, 0, rainMessages.canvas.width, rainMessages.canvas.height );
    }, delay );
  },
  help: [
    "swipe left to change colors",
    "swipe up to change gravity",
    "swipe down to change 2d/3d effect",
    "swipe right to toggle messages",
  ],
  initialize: function( fontSize = 32, fontFace = 'symbol', messageX = 0, messageY  = 0, typingSpeed = 42 ) {
    this.fontSize = fontSize;
    this.fontFace = fontFace;
    this.messageX = messageX || Math.floor( window.innerWidth / 4 );
    this.messageY = messageY || Math.floor( window.innerHeight / 3 );
    this.typingSpeed = typingSpeed;
    const cnvs = this.canvas;
    this.context = cnvs.getContext( '2d', { desynchronized: true } );
    cnvs.setAttribute( 'height', window.innerHeight );
    cnvs.setAttribute( 'width', window.innerWidth );
    this.startMessage();
  },
  messages: [ // from:sw:tcw
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
  ],
  startMessage: function() {
    this.status = "active";
    this.context.font = `small-caps ${ this.fontSize }pt ${ this.fontFace }`;
    this.context.fillStyle = 'white';
    const message = this.messages[ randomArrayIndex( this.messages.length ) ];
    this.typing( message, this.messageX, this.messageY, ( this.fontSize * 1.3 ), this.messageX );
    this.clearMessage( 6000 );
    this.doMessage = setInterval( () => {
      const message = rainMessages.messages[ randomArrayIndex( rainMessages.messages.length ) ];
      rainMessages.typing( message, rainMessages.messageX, rainMessages.messageY, ( rainMessages.fontSize * 1.3 ), rainMessages.messageX );
      rainMessages.clearMessage( 6000 );
    }, 9000 );
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
        const wordwidth = rainMessages.context.measureText( rem.substring( 0, space ) ).width;
        const w = rainMessages.context.measureText( str.charAt( i ) ).width;
        if( cursorX + wordwidth >= rainMessages.canvas.width - padding ) {
            cursorX = startX;
            cursorY += lineHeight;
        }
        rainMessages.context.fillText( str.charAt( i ), cursorX, cursorY );
        i += 1;
        cursorX += w;
        if( i === str.length ) {
            clearInterval( rainMessages.startTyping );
        }
    }, rainMessages.typingSpeed );
  }
};

rainMessages.initialize();