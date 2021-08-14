/**********************
 * 
 * PWA
 * 
 */
 window.onload = () => {
  "use strict";

  if ( "serviceWorker" in navigator ) {
    navigator.serviceWorker.register( "/sw.js" );
  }
};

/**********************
 * Tracking Events
 */
const trackInteraction = ( type, dims = {} ) => gtag( 'event', type, dims );

/*****************************
 * Resize Interaction
 * 
 */

window.addEventListener('resize', e => {
  help.stopMessage();
  helpAurebesh.stopMessage();  
  inspirational.stopMessage();
  inspirationalAurebesh.stopMessage();
  digitalRain.resetRain( digitalRain.colorsIndex, digitalRain.gravity, digitalRain.threeDee );
  help.initialize();
  helpAurebesh.startY = window.innerHeight - 80;
  helpAurebesh.initialize();
  inspirational.startX = inspirationalAurebesh.startX = ( window.innerWidth / 5 );
  inspirational.endX = inspirationalAurebesh.endX = window.innerWidth - ( window.innerWidth / 5 );
  inspirational.startY = ( window.innerHeight / 4 );
  inspirationalAurebesh.startY = window.innerHeight - ( window.innerHeight / 3 );
  inspirational.initialize();
  inspirationalAurebesh.initialize();
  trackInteraction( 'resize', {
    'colorsIndex': digitalRain.colorsIndex,
    'gravity': digitalRain.gravity,
    'threeDee': digitalRain.threeDee
  } );
}, false);

/*****************************
 * Touch Interactions
 * 
 */

let xDown = null;
let yDown = null;

document.addEventListener('touchstart', e => {
  const firstTouch = e.touches[0];
  xDown = firstTouch.clientX;
  yDown = firstTouch.clientY;
}, false);

document.addEventListener('touchmove', e => {
  if ( ! xDown || ! yDown ) {
      return;
  }

  const xUp = e.touches[0].clientX;
  const yUp = e.touches[0].clientY;

  const xDiff = xDown - xUp;
  const yDiff = yDown - yUp;

  let { colors, colorsIndex, gravity, threeDee } = digitalRain;
  if ( Math.abs( xDiff ) > Math.abs( yDiff ) ) { // most significant
      if ( xDiff > 0 ) {
        colorsIndex = ( colorsIndex < colors.length - 1 ) ? colorsIndex + 1 : -1;
        digitalRain.resetRain( colorsIndex, gravity, threeDee );
        trackInteraction( 'change_color', { colorsIndex, gravity, threeDee } );
      } else {
        if ( inspirational.status === "active" ) {
          inspirational.stopMessage();
          inspirationalAurebesh.stopMessage();
          trackInteraction( 'stop_messages' );
        } else {
          clearTimeout( startInspiring );
          inspirational.initialize();
          inspirationalAurebesh.initialize();
          trackInteraction( 'start_messages' );
        }
      }
  } else {
    if ( yDiff > 0 ) {
      gravity = ( gravity === 2 ) ? 0 : gravity + 1;
      digitalRain.resetRain( colorsIndex, gravity, threeDee );
      trackInteraction( 'change_gravity', { colorsIndex, gravity, threeDee } );
    } else {
      threeDee = !threeDee;
      digitalRain.resetRain( colorsIndex, gravity, threeDee );
      trackInteraction( 'change_threedee', { colorsIndex, gravity, threeDee } );
    }
  }
  xDown = null;
  yDown = null;
}, false);

document.addEventListener( 'touchend', e => {
  if ( e.changedTouches.length > 1 ){ 
    if( help.status === "active" ){
      help.stopMessage();
      helpAurebesh.stopMessage();
      trackInteraction( 'stop_help' );
    }
    else {
      help.initialize();
      helpAurebesh.initialize();
      trackInteraction( 'start_help' );
    }
  }
}, false);

/*****************************
 * Keyboard Interactions
 * 
 */

window.addEventListener('keydown', e => {
  // help
  if ( e.key == 'h' ) {
    if( help.status === "active" ){
      help.stopMessage();
      helpAurebesh.stopMessage();
      trackInteraction( 'stop_help' );
    }
    else {
      help.initialize();
      helpAurebesh.initialize();
      trackInteraction( 'start_help' );
    }
  }

  // inspirational
  if( e.key == 'm' ) {
    if ( inspirational.status === "active" ){
      inspirational.stopMessage();
      inspirationalAurebesh.stopMessage();
      trackInteraction( 'stop_messages' );
    }
    else {
      clearTimeout( startInspiring );
      inspirational.initialize();
      inspirationalAurebesh.initialize();
      trackInteraction( 'start_messages' );
    }
  }

  // digitalRain
  let { colors, colorsIndex, gravity, threeDee } = digitalRain;
  let dirty = false;
  let eventType = "change";
  switch( e.key ){
    case 'c':
      colorsIndex = ( colorsIndex < colors.length - 1 ) ? colorsIndex + 1 : -1;
      eventType = "change_color";
      dirty = true;
      break;
    case 'g':
      gravity = ( gravity === 2 ) ? 0 : gravity + 1;
      eventType = "change_gravity";
      dirty = true;
      break;
    case 't':
      threeDee = !threeDee;
      eventType = "change_threedee";
      dirty = true;
      break;
    default:
      break;
  }
  if ( dirty ) { trackInteraction( eventType, { colorsIndex, gravity, threeDee } ); }
  return !dirty || digitalRain.resetRain( colorsIndex, gravity, threeDee );
}, false );