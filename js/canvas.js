import { Willy } from './willy.js';
import { Kate } from './kate.js';
import { Floor } from './floor.js';
import { Wall } from './wall.js';
import { Conveyor } from './conveyor.js';

export class Canvas {
  elementObj = document.getElementById('canvas');
  width = 0;
  height = 0;
  scale = 1;
  deltaY = 0;
  arrayFigures = new Array();
  arrayObjects = new Array();
  willy = null;
  loopCounter = 0;
  animationCounter = 0;
  
  pressKeyUp = 0;
  pressKeyLeft = 0;
  pressKeyRight = 0;


  constructor() {
    this.sceneInit();
  } // constructor


  sceneInit() {
    this.addFigure(new Kate(this));
    this.addFigure(this.willy = new Willy(this));

    this.addObject(new Floor(this, 0*8, 0*8, 40*8));
    this.addObject(new Floor(this, 1*8, 5*8, 12*8));
    this.addObject(new Floor(this, 13*8, 4*8, 2*8));
    this.addObject(new Floor(this, 17*8, 2*8, 4*8));
    this.addObject(new Floor(this, 34*8, 2*8, 5*8));
    this.addObject(new Floor(this, 36*8, 4*8, 3*8));
    this.addObject(new Floor(this, 38*8, 6*8, 1*8));

    this.addObject(new Wall(this, 0*8, 1*8, 1*8, 20*8));
    this.addObject(new Wall(this, 39*8, 1*8, 1*8, 20*8));
    this.addObject(new Wall(this, 11*8, 1*8, 2*8, 1*8));
    this.addObject(new Wall(this, 11*8, 6*8, 2*8, 1*8));
    this.addObject(new Wall(this, 15*8, 3*8, 2*8, 2*8));

    this.addObject(new Conveyor(this, 25*8, 6*8, 9*8));
    this.addObject(new Conveyor(this, 36*8, 8*8, 3*8));
} // sceneInit


  addFigure(figure) {
    this.arrayFigures.push(figure);
  } // addFigure


  addObject(object) {
    this.arrayObjects.push(object);
  } // addObject


  sceneLoop() {
    if (this.deltaY > 0) {
      this.deltaY--;
      this.willy.posY++;
      this.sceneRender();
    }

    if (this.deltaY < 0) {
      this.deltaY++;
      this.sceneRender();
    }
  
    this.loopCounter++;
    if (this.loopCounter > 3) {
      this.loopCounter = 0;
    }
  
    if (this.loopCounter % 2 == 0) {
      this.animationCounter ++;
      if (this.animationCounter > 7) {
        this.animationCounter = 0;
      }
      this.sceneAnimation();
    }
  
    if ((this.willy.figureType == 0) && (this.loopCounter != 0))
      return;

    for (let i = 0; i < this.arrayFigures.length; i++) {
      this.arrayFigures[i].loop();
    }
  } // sceneLoop


  sceneRender() {
    this.scale = this.elementObj.clientHeight/400;
    this.width = this.elementObj.clientWidth;
    this.height = this.elementObj.clientHeight;
    for (let i = 0; i < this.arrayFigures.length; i++) {
      this.arrayFigures[i].render();
    }
    for (let i = 0; i < this.arrayObjects.length; i++) {
      this.arrayObjects[i].render();
    }
  } // sceneRender


  sceneAnimation() {
    for (let i = 0; i < this.arrayObjects.length; i++) {
      this.arrayObjects[i].animate();
    }
  } // sceneAnimation


  eventKeyDown(key) {
    if (key == 'ArrowLeft') {
      this.pressKeyLeft = 1;
    }
  
    if (key == 'ArrowRight') {
      this.pressKeyRight = 1;
    }
  
    if (((key == ' ') || (key == 'ArrowUp')) && (!this.willy.figureType)) {
      this.pressKeyUp = 1;
    }
  
    if ((key == 'c') || (key == 'C')) {
      if ((this.willy.figureType == 0) && !this.willy.jump && !this.willy.falling && (this.willy.posY+this.deltaY == 8)) {
        this.willy.figureType = 1;
        this.willy.elementObj.src = 'images/willy-car.png';
        this.willy.imageWidth = 32;
      } 
      else if (this.willy.figureType == 1) {
        this.willy.figureType = 2;
        this.willy.elementObj.src = 'images/willy-plane.png';
        this.willy.imageWidth = 32;
      }
      else {
        this.willy.figureType = 0;
        this.willy.elementObj.src = 'images/willy.png';
        this.willy.imageWidth = 12;
      }
      this.sceneRender();
    } 
  } // eventKeyDown(key)
  
  
  eventKeyUp(key) {
    if (key == 'ArrowLeft') {
      this.pressKeyLeft = 0;
    }
    if (key == 'ArrowRight') {
      this.pressKeyRight = 0;
    }
    if ((key == ' ') || (key == 'ArrowUp')) {
      this.pressKeyUp = 0;
    }
  } // eventKeyUp(key)
    
} // class Canvas
