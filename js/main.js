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
