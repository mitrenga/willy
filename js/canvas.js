import { Willy } from './willy.js';
import { Kate } from './kate.js';
import { Alien } from './alien.js';
import { Rocket } from './rocket.js';
import { Bird } from './bird.js';
import { Car } from './car.js';
import { Floor } from './floor.js';
import { Wall } from './wall.js';
import { StairRight } from './stair-right.js';
import { StairLeft } from './stair-left.js';
import { Conveyor } from './conveyor.js';
import { RoofLeft } from './roof-left.js';
import { RoofRight } from './roof-right.js';
import { Item } from './item.js';

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
  longAnimationCounter = 0;

  pressKeyUp = 0;
  pressKeyLeft = 0;
  pressKeyRight = 0;


  constructor() {
    this.sceneInit();
  } // constructor


  sceneInit() {
    this.addFigure(new Kate(this));
    this.addFigure(this.willy = new Willy(this));

    // first floor
    this.addObject(new Floor(this, 0*8, 0*8, 40*8, 'concrete'));
    this.addObject(new Wall(this, 0*8, 1*8, 1*8, 11*8, 'wall'));
    this.addObject(new Wall(this, 11*8, 1*8, 3*8, 1*8, 'wall'));
    this.addObject(new Wall(this, 12*8, 2*8, 2*8, 1*8, 'wall'));
    this.addObject(new Wall(this, 13*8, 3*8, 1*8, 1*8, 'wall'));
    this.addObject(new Floor(this, 7*8, 4*8, 3*8, 'floor'));
    this.addObject(new Wall(this, 13*8, 4*8, 1*8, 3*8, 'grille'));
    this.addObject(new Conveyor(this, 4*8, 6*8, 9*8, 'right'));

    this.addObject(new Floor(this, 14*8, 3*8, 8*8, 'floor'));
    this.addFigure(new Alien(this, '001', 1, 14*8, 4*8, 14*8, 22*8));

    this.addObject(new Floor(this, 34*8, 6*8, 5*8, 'floor'));
    this.addFigure(new Alien(this, '001', 2, 34*8, 7*8, 34*8, 39*8));

    this.addObject(new Wall(this, 39*8, 4*8, 1*8, 8*8, 'wall')); 
    this.addObject(new Wall(this, 39*8, 1*8, 1*8, 3*8, 'grille'));
    this.addObject(new Item(this, 38*8, 4*8, 8, 8, 'key'));

    // stair
    for (let i = 28; i < 34; i++) {
      this.addObject(new StairRight(this, i*8, (i-27)*8));
      this.addObject(new StairLeft(this, i*8, (40-i)*8));
    }

    // second floor
    this.addObject(new Wall(this, -4*8, 12*8, 32*8, 1*8, 'ceiling'));
    this.addObject(new Wall(this, -4*8, 13*8, 1*8, 2*8, 'handrail'));
    this.addObject(new Wall(this, 0*8, 16*8, 1*8, 2*8, 'wall'));

    this.addObject(new Wall(this, 32*8, 12*8, 12*8, 1*8, 'ceiling'));
    this.addObject(new Wall(this, 43*8, 13*8, 1*8, 2*8, 'handrail'));
    this.addObject(new Wall(this, 39*8, 13*8, 1*8, 5*8, 'wall'));

    //under roof
    this.addObject(new Conveyor(this, 13*8, 17*8, 14*8, 'left'));
    this.addObject(new Floor(this, 34*8, 14*8, 3*8, 'floor'));
    this.addObject(new Floor(this, 30*8, 16*8, 3*8, 'floor'));
    this.addObject(new Wall(this, 20*8, 20*8, 1*8, 11*8, 'wall'));
    this.addObject(new Item(this, 20*8, 31*8, 8, 8, 'key'));
    this.addObject(new Conveyor(this, 21*8, 19*8, 5*8, 'right'));
    this.addObject(new Conveyor(this, 21*8, 23*8, 3*8, 'right'));
    this.addObject(new Conveyor(this, 21*8, 27*8, 1*8, 'right'));
    this.addObject(new Floor(this, 15*8, 19*8, 6*8, 'floor'));
    this.addObject(new Wall(this, 19*8, 21*8, 1*8, 1*8, 'wall'));
    this.addObject(new Floor(this, 16*8, 23*8, 4*8, 'floor'));
    this.addObject(new Wall(this, 19*8, 25*8, 1*8, 1*8, 'wall'));
    this.addObject(new Floor(this, 17*8, 27*8, 3*8, 'floor'));
    this.addObject(new Wall(this, 19*8, 29*8, 1*8, 1*8, 'wall'));

    // roof
    for (let i = -1; i < 20; i++) {
      this.addObject(new RoofLeft(this, i*8, (18+i)*8));
      this.addObject(new RoofRight(this, (39-i)*8, (18+i)*8));
      if (i < 19) {
        this.addObject(new Floor(this, i*8+8, (18+i)*8, 1*8, 'roofLeftExt'));
        this.addObject(new Floor(this, (39-i)*8-8, (18+i)*8, 1*8, 'roofRightExt'));
      }
    }

    // garden - left side
    this.addObject(new Floor(this, -100*8, 0*8, 100*8, 'grass'));
    var treeTrunk = new Wall(this, -25*8, 1*8, 16, 18, 'treeTrunk')
    treeTrunk.backgroundSize = 16;
    this.addObject(treeTrunk);
    var treeCrown = new Wall(this, -25*8, 1*8+18, 26, 18, 'treeCrown')
    treeCrown.backgroundSize = 26;
    this.addObject(treeCrown);
    this.addFigure(new Rocket(this));
    this.addFigure(new Bird(this));
    this.addObject(new Item(this, -2*8, 1*8, 16, 12, 'jetpac'));

    // garage - right side
    this.addObject(new Floor(this, 40*8, 0*8, 8*8, 'grass'));
    this.addObject(new Floor(this, 48*8, 0*8, 116*8, 'road'));
    this.addObject(new Wall(this, 48*8, 1*8, 1*8, 3*8, 'grille'));
    this.addObject(new Wall(this, 48*8, 4*8, 1*8, 2*8, 'wall'));
    this.addObject(new Wall(this, 63*8, 1*8, 1*8, 3*8, 'grille'));
    this.addObject(new Wall(this, 63*8, 4*8, 1*8, 2*8, 'wall'));
    this.addObject(new Item(this, 62*8, 4*8, 8, 8, 'key'));
    this.addObject(new Floor(this, 48*8, 6*8, 16*8, 'ceiling'));
    this.addObject(new Wall(this, 63*8, 7*8, 1*8, 3*8, 'handrail'));
    this.addFigure(new Car(this));
    var labelStore = new Wall(this, 80*8, 1*8, 32, 32, 'labelStore')
    labelStore.backgroundSize = 32;
    this.addObject(labelStore);

    this.scale = this.willy.elementObj.clientHeight / 16;
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
      if (this.animationCounter == 0 || this.animationCounter == 4) {
        this.longAnimationCounter++;
        if (this.longAnimationCounter > 4) {
          this.longAnimationCounter = 0;
        }
      }
      this.sceneAnimation();
    }
  
    if (((this.willy.figureType == 0) || (this.willy.figureType == 1)) && (this.loopCounter != 0))
      return;

    for (let i = 0; i < this.arrayFigures.length; i++) {
      this.arrayFigures[i].loop();
    }
  } // sceneLoop


  sceneRender() {
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
      if ((this.willy.figureType == 0) && !this.willy.jump && !this.willy.falling) {
        this.willy.figureType = 1;
        this.willy.elementObj.src = 'images/willy-jetpac.png';
        this.willy.imageWidth = 12;
      } 
/*      else if (this.willy.figureType == 1) {
        this.willy.figureType = 2;
        this.willy.elementObj.src = 'images/willy-plane.png';
        this.willy.imageWidth = 32;
      }*/
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
