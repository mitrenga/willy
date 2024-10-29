const { Willy } = await import('./willy.js?ver='+window.srcVersion);
const { Kate } = await import('./kate.js?ver='+window.srcVersion);
const { Alien } = await import('./alien.js?ver='+window.srcVersion);
const { Rocket } = await import('./rocket.js?ver='+window.srcVersion);
const { Bird } = await import('./bird.js?ver='+window.srcVersion);
const { Car } = await import('./car.js?ver='+window.srcVersion);
const { Floor } = await import('./floor.js?ver='+window.srcVersion);
const { Wall } = await import('./wall.js?ver='+window.srcVersion);
const { StairRight } = await import('./stair-right.js?ver='+window.srcVersion);
const { StairLeft } = await import('./stair-left.js?ver='+window.srcVersion);
const { Stair2Right } = await import('./stair2-right.js?ver='+window.srcVersion);
const { Stair2Left } = await import('./stair2-left.js?ver='+window.srcVersion);
const { Stair3Right } = await import('./stair3-right.js?ver='+window.srcVersion);
const { Stair3Left } = await import('./stair3-left.js?ver='+window.srcVersion);
const { Conveyor } = await import('./conveyor.js?ver='+window.srcVersion);
const { RoofLeft } = await import('./roof-left.js?ver='+window.srcVersion);
const { RoofRight } = await import('./roof-right.js?ver='+window.srcVersion);
const { Item } = await import('./item.js?ver='+window.srcVersion);

export class Canvas {
  elementObj = document.getElementById('canvas');
  canvasWidth = 0;
  canvasHeight = 0;
  scale = 1;
  deltaY = 0;
  arrayFigures = new Array();
  arrayObjects = new Array();
  arrayItems = new Array();
  willy = null;
  loopCounter = 0;
  animationCounter = 0;
  longAnimationCounter = 0;

  pressKeyUp = 0;
  pressKeyLeft = 0;
  pressKeyRight = 0;

  pauseGame = 0;

  actionsResetRoom = new Array();


  constructor() {
    this.sceneInit();
  } // constructor


  sceneInit() {
    const http = new XMLHttpRequest();
    http.canvasObj = this;
    http.open('GET', '001.level');
    http.send();
    
    http.onreadystatechange = function () {
      if (this.readyState == 4 && this.status == 200) {
        const dataJSON = JSON.parse(http.responseText);
        Object.keys(dataJSON).forEach(key => {
          const objKey = dataJSON[key];
          let posX = objKey['posX']*8;
          if (objKey.hasOwnProperty('softlyX')) {
            posX += objKey['softlyX'];
          }
          let posY = objKey['posY']*8;
          if (objKey.hasOwnProperty('softlyY')) {
            posY += objKey['softlyY'];
          }
          let imgWidth = 0;
          if (objKey.hasOwnProperty('imgWidth')) {
            imgWidth = objKey['imgWidth']*8;
          }
          if (objKey.hasOwnProperty('softlyWidth')) {
            imgWidth += objKey['softlyWidth'];
          }
          let imgHeight = 0;
          if (objKey.hasOwnProperty('imgHeight')) {
            imgHeight = objKey['imgHeight']*8;
          }
          if (objKey.hasOwnProperty('softlyHeight')) {
            imgHeight += objKey['softlyHeight'];
          }
          let cssClass = '';
          if (objKey.hasOwnProperty('cssClass')) {
            cssClass = objKey['cssClass'];
          }
          let loopFrom = 0;
          let loopTo = 1;
          if (objKey.hasOwnProperty('loop')) {
            loopFrom = objKey['loop']['from'];
            loopTo = (objKey['loop']['to'])+1;
          }
          let actions = null;
          if (objKey.hasOwnProperty('actions')) {
            actions = Array();
            let tmp = objKey['actions'];
            if (Array.isArray(tmp)) {
              for (let i = 0; i < tmp.length; i++) {
                if (tmp[i].hasOwnProperty('changePosX'))
                  tmp[i]['changePosX'] *= 8;
                if (tmp[i].hasOwnProperty('changePosY'))
                  tmp[i]['changePosY'] *= 8;
                if (tmp[i].hasOwnProperty('changeHeight'))
                  tmp[i]['changeHeight'] *= 8;
                if (tmp[i].hasOwnProperty('changeWidth'))
                  tmp[i]['changeWidth'] *= 8;
                if (tmp[i].hasOwnProperty('setPosX'))
                  tmp[i]['setPosX'] *= 8;
                if (tmp[i].hasOwnProperty('setPosY'))
                  tmp[i]['setPosY'] *= 8;
                if (tmp[i].hasOwnProperty('setHeight'))
                  tmp[i]['setHeight'] *= 8;
                if (tmp[i].hasOwnProperty('setWidth'))
                  tmp[i]['setWidth'] *= 8;
                actions.push (tmp[i]);
              }
            } else {
              if (tmp.hasOwnProperty('changePosX'))
                tmp['changePosX'] *= 8;
              if (tmp.hasOwnProperty('changePosY'))
                tmp['changePosY'] *= 8;
              if (tmp.hasOwnProperty('changeHeight'))
                tmp['changeHeight'] *= 8;
              if (tmp.hasOwnProperty('changeWidth'))
                tmp['changeWidth'] *= 8;
              if (tmp.hasOwnProperty('setPosX'))
                tmp['setPosX'] *= 8;
              if (tmp.hasOwnProperty('setPosY'))
                tmp['setPosY'] *= 8;
              if (tmp.hasOwnProperty('setHeight'))
                tmp['setHeight'] *= 8;
              if (tmp.hasOwnProperty('setWidth'))
                tmp['setWidth'] *= 8;
              actions.push (tmp);
            }
          }
          let myId = '';
          if (objKey.hasOwnProperty('myId')) {
            myId = objKey['myId'];
          }
          let decoration = 0;
          if (objKey.hasOwnProperty('decoration')) {
            decoration = objKey['decoration'];
          }
          let noRepeat = 0;
          if (objKey.hasOwnProperty('noRepeat')) {
            noRepeat = objKey['noRepeat'];
          }

          for (let i = loopFrom; i < loopTo; i++) 
          {
            if (i > loopFrom) {
              posX += (objKey['loop']['posX'])*8;
              posY += (objKey['loop']['posY'])*8
            }
            let newObject = null;
            switch (objKey['class']) {
              case 'Willy':       this.canvasObj.addFigure(this.canvasObj.willy = new Willy(this.canvasObj, posX, posY)); break;
              case 'Kate':        this.canvasObj.addFigure(new Kate(this.canvasObj, posX, posY)); break;
              case 'Floor':       this.canvasObj.addObject(new Floor(this.canvasObj, posX, posY, imgWidth, cssClass, myId, decoration)); break;
              case 'Wall':        this.canvasObj.addObject(newObject = new Wall(this.canvasObj, posX, posY, imgWidth, imgHeight, cssClass, myId)); break;
              case 'Item':        this.canvasObj.addObject(new Item(this.canvasObj, posX, posY, imgWidth, imgHeight, cssClass, actions, myId)); break;
              case 'StairRight':  this.canvasObj.addObject(new StairRight(this.canvasObj, posX, posY, myId)); break;
              case 'StairLeft':   this.canvasObj.addObject(new StairLeft(this.canvasObj, posX, posY, myId)); break;
              case 'Stair2Right': this.canvasObj.addObject(new Stair2Right(this.canvasObj, posX, posY, myId)); break;
              case 'Stair2Left':  this.canvasObj.addObject(new Stair2Left(this.canvasObj, posX, posY, myId)); break;
              case 'Stair3Right': this.canvasObj.addObject(new Stair3Right(this.canvasObj, posX, posY, myId)); break;
              case 'Stair3Left':  this.canvasObj.addObject(new Stair3Left(this.canvasObj, posX, posY, myId)); break;
              case 'Conveyor':    this.canvasObj.addObject(new Conveyor(this.canvasObj, posX, posY, imgWidth, objKey['operation'])); break;
              case 'Alien':       this.canvasObj.addFigure(new Alien(this.canvasObj, posX, posY, imgWidth, objKey['version'], (objKey['minX'])*8, (objKey['maxX'])*8)); break;
              case 'RoofLeft':    this.canvasObj.addObject(new RoofLeft(this.canvasObj, posX, posY)); break;
              case 'RoofRight':   this.canvasObj.addObject(new RoofRight(this.canvasObj, posX, posY)); break;
              case 'Rocket':      this.canvasObj.addFigure(new Rocket(this.canvasObj, posX, posY)); break;
              case 'Bird':        this.canvasObj.addFigure(new Bird(this.canvasObj, posX, posY)); break;
            } // switch
            if (newObject && noRepeat)
              newObject.backgroundSize = imgWidth;
          } // for
          
          if (objKey.hasOwnProperty('resetRoom')) {
            this.canvasObj.actionsResetRoom = actions;
          } // resetRoom
        });
        this.canvasObj.scale = this.canvasObj.willy.elementObj.clientHeight / 16;
        this.canvasObj.sceneRender();
      }
    }
  } // sceneInit


  addFigure(figure) {
    this.arrayFigures.push(figure);
  } // addFigure


  addObject(object) {
    this.arrayObjects.push(object);
    if (object.catch == 1) {
      this.arrayItems.push(object);
    }

    if (object.actions != null) {
      if (Array.isArray (object.actions)) {
        for (let i = 0; i < object.actions.length; i++) {
          if ((object.actions[i]['default'] != null) && (object.actions[i]['default'] == 'hidden')) {
            object.animate();
            object.catch = 0;
            object.imgElementObj.style.visibility = 'hidden';
          }
        }
      } else {
        if ((object.actions['default'] != null) && (object.actions['default'] == 'hidden')) {
          object.animate();
          object.catch = 0;
          object.imgElementObj.style.visibility = 'hidden';
        }
      }
    }
  } // addObject


  sceneLoop() {
    if (this.pauseGame)
      return;

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
    
    if (this.willy != null) {
      this.willy.keyLeft = this.pressKeyLeft;
      this.willy.keyRight = this.pressKeyRight;
      this.willy.keyUp = this.pressKeyUp;
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
      this.sceneAnimate();
    }
  
    if (((this.willy.figureType == 0) || (this.willy.figureType == 1)) && (this.loopCounter != 0))
      return;

    for (let i = 0; i < this.arrayFigures.length; i++) {
      this.arrayFigures[i].loop();
    }
    for (let i = 0; i < this.arrayItems.length; i++) {
      this.arrayItems[i].checkTouch();
    }
    for (let i = 0; i < this.arrayFigures.length; i++) {
      this.arrayFigures[i].checkTouch();
    }
  } // sceneLoop


  sceneRender() {
    this.canvasWidth = this.elementObj.clientWidth;
    this.canvasHeight = this.elementObj.clientHeight;
    for (let i = 0; i < this.arrayFigures.length; i++) {
      this.arrayFigures[i].render();
    }
    for (let i = 0; i < this.arrayObjects.length; i++) {
      this.arrayObjects[i].render();
    }    
  } // sceneRender


  sceneAnimate() {
    for (let i = 0; i < this.arrayObjects.length; i++) {
      this.arrayObjects[i].animate();
    }
  } // sceneAnimate


  resetRoom() {
    this.willy.posX = this.willy.defaultX;
    this.willy.posY = this.willy.defaultY;
    this.willy.step = 0;
    this.willy.direction = 0;
    this.willy.jump = 0;
    this.willy.jumpDirection = 0;
    this.willy.jumpCounter = 0;
    this.willy.falling = 0;
    this.deltaY = 0;
    for (let i = 0; i < this.actionsResetRoom.length; i++) {
      this.arrayItems[0].setAction(this.actionsResetRoom[i]);
    }
  } // resetRoom

  eventKeyDown(key) {
    if (key == 'ArrowLeft') {
      this.pressKeyLeft = 1;
    }
  
    if (key == 'ArrowRight') {
      this.pressKeyRight = 1;
    }
  
    if ((key == ' ') || (key == 'ArrowUp')) {
      this.pressKeyUp = 1;
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
