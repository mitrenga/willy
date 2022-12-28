const { Canvas } = await import('./canvas.js?ver='+window.srcVersion);

var canvas = new Canvas();

// init app
window.addEventListener('resize', resize);
canvas.sceneRender();
canvas.sceneAnimation();
setInterval(onLoop, 1000/60);


function resize() {
  canvas.sceneRender();
} // resize


function onLoop() {
  canvas.sceneLoop();
} // onLoop


document.addEventListener('keydown', (event) => {
  canvas.eventKeyDown(event.key);
}); // document.addEventListener('keydown', (event)


document.addEventListener('keyup', (event) => {
  canvas.eventKeyUp(event.key);
}); // document.addEventListener('keyup', (event)

if (window.matchMedia("(pointer: coarse)").matches) { // if touch device
  var newObject = document.createElement('div');
  newObject.id = 'leftButton';
  newObject.className = 'leftButton';
  canvas.elementObj.appendChild(newObject);
  newObject.addEventListener('touchstart', handleStartArrowLeft);
  newObject.addEventListener('touchend', handleEndArrowLeft);

  newObject = document.createElement('div');
  newObject.id = 'rightButton';
  newObject.className = 'rightButton';
  canvas.elementObj.appendChild(newObject);
  newObject.addEventListener('touchstart', handleStartArrowRight);
  newObject.addEventListener('touchend', handleEndArrowRight);

  newObject = document.createElement('div');
  newObject.id = 'upButton';
  newObject.className = 'upButton';
  canvas.elementObj.appendChild(newObject);
  newObject.addEventListener('touchstart', handleStartArrowUp);
  newObject.addEventListener('touchend', handleEndArrowUp);
} // if touch device


function handleStartArrowLeft(ev) {
  canvas.eventKeyDown('ArrowLeft');
} // handleStartArrowLeft


function handleEndArrowLeft(ev) {
  canvas.eventKeyUp('ArrowLeft');
} // handleEndArrowLeft


function handleStartArrowRight(ev) {
  canvas.eventKeyDown('ArrowRight');
} // handleStartArrowRight


function handleEndArrowRight(ev) {
  canvas.eventKeyUp('ArrowRight');
} // handleEndArrowRight


function handleStartArrowUp(ev) {
  canvas.eventKeyDown('ArrowUp');
} // handleStartArrowUp


function handleEndArrowUp(ev) {
  canvas.eventKeyUp('ArrowUp');
} // handleEndArrowUp
