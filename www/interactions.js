/*****************************
 * Resize Interaction
 * 
 */

window.addEventListener('resize', e => {
  rainMessages.stopMessage();
  digitalRain.resetRain();
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

  let { colorsIndex, fontGravity, threeDee } = digitalRain.config;
  if ( Math.abs( xDiff ) > Math.abs( yDiff ) ) { // most significant
      if ( xDiff > 0 ) {
      colorsIndex = ( colorsIndex < digitalRain.colors.length - 1 ) ? colorsIndex + 1 : -1;
      digitalRain.resetRain( { colorsIndex } ) 
      } else {
        if ( rainMessages.status === "active" ) {
          rainMessages.stopMessage();
        } else {
          rainMessages.initialize();
        }
      }
  } else {
    if ( yDiff > 0 ) {
      fontGravity = !digitalRain.config.fontGravity;
      digitalRain.resetRain( { fontGravity } )
    } else {
      threeDee = !digitalRain.config.threeDee;
      digitalRain.resetRain( { threeDee } )
    }
  }

  xDown = null;
  yDown = null;
}, false);

/*****************************
 * Keyboard Interactions
 * 
 */

window.addEventListener('keydown', e => {
// rainMessages event handling
if( e.key == 'm' && rainMessages.status === "active" ){
  rainMessages.stopMessage();
}
else if( e.key == 'm' && rainMessages.status === "disabled" ){
  rainMessages.startMessage();
}

// digitalRain event handling
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