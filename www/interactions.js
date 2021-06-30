/*****************************
 * Resize Interaction
 * 
 */

window.addEventListener('resize', e => {
  rainMessages.stopMessage();
  digitalRain.resetRain( digitalRain.colorsIndex, digitalRain.gravity, digitalRain.threeDee );
  rainMessages.initialize();
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
      } else {
        if ( rainMessages.status === "active" ) {
          rainMessages.stopMessage();
        } else {
          rainMessages.initialize();
        }
      }
  } else {
    if ( yDiff > 0 ) {
      gravity = ( gravity === 2 ) ? 0 : gravity + 1;
      digitalRain.resetRain( colorsIndex, gravity, threeDee );
    } else {
      threeDee = !threeDee;
      digitalRain.resetRain( colorsIndex, gravity, threeDee );
    }
  }
  xDown = null;
  yDown = null;
}, false);

document.addEventListener( 'touchend', e => {
  if ( e.changedTouches.length > 1 ){ 
    if( helpMessages.status === "active" ){
      helpMessages.stopMessage();
    }
    else {
      helpMessages.initialize();
    }
  }
}, false);

/*****************************
 * Keyboard Interactions
 * 
 */

window.addEventListener('keydown', e => {
  // helpMessages
  if ( e.key == 'h' ) {
    if( helpMessages.status === "active" ){
      helpMessages.stopMessage();
    }
    else {
      helpMessages.initialize();
    }
  }

  // rainMessages
  if( e.key == 'm' ) {
    if ( rainMessages.status === "active" ){
      rainMessages.stopMessage();
    }
    else {
      rainMessages.initialize();
    }
  }

  // digitalRain
  let { colors, colorsIndex, gravity, threeDee } = digitalRain;
  let dirty = false;
  switch( e.key ){
    case 'c':
      colorsIndex = ( colorsIndex < colors.length - 1 ) ? colorsIndex + 1 : -1;
      dirty = true;
      break;
    case 'g':
      gravity = ( gravity === 2 ) ? 0 : gravity + 1;
      dirty = true;
      break;
    case 't':
      threeDee = !threeDee;
      dirty = true;
      break;
    default:
      break;
  }
  return !dirty || digitalRain.resetRain( colorsIndex, gravity, threeDee );
}, false );