import { Canvas } from './canvas.js';

var debug = 0;
//var debug = 'posWillyX';
//var debug = ['posWillyX', 'posWillyY', 'jumpWilly', 'deltaY', 'jumpWillyCounter', 'fallingWilly'];

var canvas = new Canvas();

const jumpMap = [0, 4, 4, 3, 3, 2, 2, 1, 1, 0, -1, -1, -2, -2, -3, -3, -4, -4];

// init room objects
for (let i = 0; i < 3; i++) {
  var newObject = document.createElement('div');
  newObject.className = 'floor';
  newObject.id = 'floor'+i;
  canvas.element.appendChild(newObject);
}
for (let i = 0; i < 2; i++) {
  var newObject = document.createElement('div');
  newObject.className = 'wall';
  newObject.id = 'wall'+i;
  canvas.element.appendChild(newObject);
}
for (let i = 0; i < 9; i++) {
  var newObject = document.createElement('img');
  newObject.className = 'conveyor';
  newObject.id = 'conveyor'+i;
  newObject.src = 'images/conveyor.png';
  canvas.element.appendChild(newObject);
}
if ((typeof debug === 'string') || (debug instanceof Array)) {
  var newObject = document.createElement('div');
  newObject.id = 'debug';
  canvas.element.appendChild(newObject);
}

// Willy
var objWilly = canvas.willy.elementObj;
var posWillyX = 26;
var posWillyY = 8;
var spriteWillyWidth = 12;
var spriteWillyHeight = 16;
var stepWilly = 0;
var directionWilly = 0;
var jumpWilly = 0;
var jumpWillyDirection = 0;
var jumpWillyCounter = 0;
var fallingWilly = 0;
var figureWilly = 0;

// Kate
var objKate = document.getElementById('kate');
var posKateX = 16;
var posKateY = 8;
var spriteKateWidth = 12;
var spriteKateHeight = 16;
var stepKate = 1;
var directionKate = 0;
var jumpKate = 0;
var jumpKateDirection = 0;
var jumpKateCounter = 0;
var fallingKate = 0;

// others
var loopCounter = 0;
var animationCounter = 0;
var scale = objWilly.clientHeight/16;
var deltaY = 0;

var pressKeyUp = 0;
var pressKeyLeft = 0;
var pressKeyRight = 0;

// init app
window.addEventListener('resize', renderScene);
renderScene();
animationItems();
setInterval(onLoop, 1000/60);


function renderScene() {
  // canvas
  var canvasWidth = canvas.element.clientWidth;
  var canvasHeight = canvas.element.clientHeight;

  // Willy
  if ((spriteWillyWidth > 12) && (directionWilly == 0))
    objWilly.style.left = canvasWidth/2-(8+spriteWillyWidth-12)*scale+'px';
  else
    objWilly.style.left = canvasWidth/2-8*scale+'px';
  objWilly.style.top = canvasHeight/2-8*scale-(jumpWilly+deltaY)*scale+'px';
  objWilly.style.width = (spriteWillyWidth-2)*scale+'px';
  objWilly.style.height = 16*scale+'px';
  objWilly.style.objectPosition = -(1+stepWilly*spriteWillyWidth+directionWilly*spriteWillyWidth*4)*scale+'px';
  
  // Kate
  objKate.style.left = canvasWidth/2-(posWillyX+8-posKateX)*scale+'px';
  objKate.style.top = canvasHeight/2-(posKateY+jumpKate-posWillyY+8)*scale+'px';
  objKate.style.width = (spriteKateWidth-2)*scale+'px';
  objKate.style.height = 16*scale+'px';
  objKate.style.objectPosition = -(1+stepKate*spriteKateWidth+directionKate*spriteKateWidth*4)*scale+'px';

  // floors
  document.getElementById('floor0').style.left = canvasWidth/2-(posWillyX+8)*scale+'px';
  document.getElementById('floor1').style.left = canvasWidth/2-(posWillyX+8)*scale+34*8*scale+'px';
  document.getElementById('floor2').style.left = canvasWidth/2-(posWillyX+8)*scale+36*8*scale+'px';
  document.getElementById('floor0').style.top = canvasHeight/2+posWillyY*scale+'px';
  document.getElementById('floor1').style.top = canvasHeight/2-2*8*scale+posWillyY*scale+'px';
  document.getElementById('floor2').style.top = canvasHeight/2-4*8*scale+posWillyY*scale+'px';
  document.getElementById("floor0").style.width = 8*40*scale+'px';
  document.getElementById("floor1").style.width = 8*5*scale+'px';
  document.getElementById("floor2").style.width = 8*3*scale+'px';
  for (let i = 0; i < 3; i++) {
    document.getElementById('floor'+i).style.backgroundSize = 8*scale+'px';
    document.getElementById('floor'+i).style.height = 8*scale+'px';
  }

  // walls
  document.getElementById('wall0').style.left = canvasWidth/2-(posWillyX+8)*scale+'px';
  document.getElementById('wall1').style.left = canvasWidth/2-(posWillyX+8)*scale+8*39*scale+'px';
  for (let i = 0; i < 2; i++) {
    const wallElement = document.getElementById('wall'+i);
    wallElement.style.top = canvasHeight/2-9*8*scale+posWillyY*scale+'px';
    wallElement.style.backgroundSize = 8*scale+'px';
    wallElement.style.width = 8*2*scale+'px';
    wallElement.style.height = 8*9*scale+'px';
  }

  // conveyors
  for (let i = 0; i < 9; i++) {
    const conveyorElement = document.getElementById('conveyor'+i);
    conveyorElement.style.left = canvasWidth/2-(posWillyX+8)*scale+8*(25+i)*scale+'px';
    conveyorElement.style.top = canvasHeight/2-6*8*scale+posWillyY*scale+'px';
    conveyorElement.style.backgroundSize = 8*scale+'px';
    conveyorElement.style.width = 8*scale+'px';
    conveyorElement.style.height = 8*scale+'px';
  }

  // debug info
  if (debug === 0) {
  // not debug
  }
  else if (typeof debug === 'string'){
    document.getElementById('debug').textContent = debug+'='+window[debug];
  }
  else if (debug instanceof Array){
    document.getElementById("debug").innerHTML = '';
    for (let x of debug) {
      document.getElementById("debug").innerHTML += x+'='+window[x]+'; ';
    }
  }
} // renderScene


function animationItems() {
  const collection = document.getElementsByClassName('conveyor');
  for (let i = 0; i < collection.length; i++) {
    collection[i].style.objectPosition =  -(animationCounter*8)*scale+'px';
  }
} // animationItems


function onLoop() {
  if (deltaY > 0) {
    deltaY--;
    posWillyY++;
    renderScene();
  }
  if (deltaY < 0) {
    deltaY++;
    renderScene();
  }

  loopCounter++;
  if (loopCounter > 3)
    loopCounter = 0;

  if (loopCounter % 2 == 0) {
      animationCounter ++;
    if (animationCounter > 7)
      animationCounter = 0;
    animationItems();
  }

  if ((figureWilly == 0) && (loopCounter != 0))
    return;

  if (fallingWilly) {
    posWillyY -= 4;
    renderScene();
    if (isLanding ()) {
      fallingWilly = 0;
      renderScene();
    }
    return;
  }

  if (((pressKeyLeft && !mustGoRight() || mustGoLeft()) && (!jumpWillyCounter)) || (jumpWillyDirection == 1)) {
    if (directionWilly == 0) {
      directionWilly = 1;
    }
    else {
        stepWilly -= 1;
      if (stepWilly < 0) {
        stepWilly = 3;
      }
      if (canGoLeft())
        posWillyX -= 2;
    }
    renderScene();
    checkFalling();
  }

  if (((pressKeyRight && !mustGoLeft() || mustGoRight()) && (!jumpWillyCounter)) || (jumpWillyDirection == 2)) {
    if (directionWilly == 1) {
      directionWilly = 0;
    }
    else {
      stepWilly += 1;
      if (stepWilly > 3) {
        stepWilly = 0;
      }
      if (canGoRight())
        posWillyX += 2;
    }
    renderScene();
    checkFalling();
  }

  if ((pressKeyUp) || (jumpWillyCounter)) {
    if (jumpWillyCounter == 0) {
      if (pressKeyLeft && !pressKeyRight && !mustGoRight() || mustGoLeft())
        jumpWillyDirection = 1;
      if (pressKeyRight && !pressKeyLeft && !mustGoLeft() || mustGoRight())
        jumpWillyDirection = 2;
        
      jumpWillyCounter = 1;
      jumpWilly += jumpMap[jumpWillyCounter];
    }
    else {
      jumpWillyCounter++;
      if ((jumpMap[jumpWillyCounter] < 0) && isLanding ()) {
        deltaY += jumpWilly;
        jumpWilly = 0;
        jumpWillyCounter = 0;
        jumpWillyDirection = 0;
      }
      else
        jumpWilly += jumpMap[jumpWillyCounter];
      if (jumpWillyCounter == 17) {
        jumpWillyCounter = 0;
        jumpWillyDirection = 0;
        checkFalling();
      }
    }
    renderScene();
  }
} // onLoop


function isLanding() {
  if (posWillyY+jumpWilly+deltaY == 8)
    return 1;
  if ((posWillyY+jumpWilly+deltaY == 24) && (posWillyX > 262))
    return 1;
  if ((posWillyY+jumpWilly+deltaY == 40) && (posWillyX > 278))
    return 1;
  if ((posWillyY+jumpWilly+deltaY == 56) && (posWillyX > 190) && (posWillyX < 272))
    return 1;

  return 0;
} // isLanding


function checkFalling() {
  if (jumpWillyCounter)
    return;
  if ((posWillyY+jumpWilly+deltaY == 24) && (posWillyX <= 262)) {
    fallingWilly = 1;
    return;
  }
  if ((posWillyY+jumpWilly+deltaY == 40) && (posWillyX <= 278)) {
    fallingWilly = 1;
    return;
  }
  if ((posWillyY+jumpWilly+deltaY == 56) && ((posWillyX <= 190) || (posWillyX >= 272))) {
    fallingWilly = 1;
    return;
  }
} // checkFalling


function mustGoLeft() {
  if ((posWillyY+jumpWilly+deltaY == 56) && (posWillyX > 190) && (posWillyX < 272))
    return 1;

  return 0;
} // mustGoLeft


function mustGoRight() {
  return 0;
} // mustGoRight


function canGoRight() {
  if (posWillyX >= 39*8-10)
    return 0;
  return 1;
} // canGoRight


function canGoLeft() {
  if (posWillyX <= 1*8)
    return 0;
  return 1;
} // canGoLeft


document.addEventListener('keydown', (event) => {
  if (event.key == 'ArrowLeft')
    pressKeyLeft = 1;

  if (event.key == 'ArrowRight')
    pressKeyRight = 1;

  if (((event.key == ' ') || (event.key == 'ArrowUp')) && (!figureWilly))
    pressKeyUp = 1;

  if ((event.key == 'c') || (event.key == 'C')) {
    if ((figureWilly == 0) && !jumpWilly && !fallingWilly && (posWillyY+deltaY == 8)) {
      figureWilly = 1;
      objWilly.src = 'images/willy-car.png';
      spriteWillyWidth = 32;
    } 
    else if (figureWilly == 1) {
      figureWilly = 2;
      objWilly.src = 'images/willy-plane.png';
      spriteWillyWidth = 32;
    }
    else {
      figureWilly = 0;
      objWilly.src = 'images/willy.png';
      spriteWillyWidth = 12;
    }
    renderScene();
  }
}); // document.addEventListener('keydown', (event)


document.addEventListener('keyup', (event) => {
  if (event.key == 'ArrowLeft') {
    pressKeyLeft = 0;
  }
  if (event.key == 'ArrowRight') {
    pressKeyRight = 0;
  }
  if ((event.key == ' ') || (event.key == 'ArrowUp')) {
    pressKeyUp = 0;
  }
}); // document.addEventListener('keyup', (event)
