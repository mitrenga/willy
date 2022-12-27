import { Figure } from './figure.js';

export class Willy extends Figure {

  figureType = 0;


  constructor(canvas) {
    super(canvas, 'willy', 'willy', 'images/willy.png');
    this.posX = 20*8;
    this.posY = 1*8;
  } // constructor

  
  loop() {
    if (this.falling) {
      this.posY -= 4;
      this.canvas.sceneRender();
      if (this.isLanding ()) {
        this.falling = 0;
      }
      return;
    }
  
    if (((this.canvas.pressKeyLeft && !this.mustGoRight() || this.mustGoLeft()) && (!this.jumpCounter)) || (this.jumpDirection == 1)) {
      if (this.direction == 0) {
        this.direction = 1;
      }
      else {
        this.step -= 1;
        if (this.step < 0) {
          this.step = 3;
        }
        if (this.canGoLeft()) {
          this.posX -= 2;
          if (this.isStairLeftUp()) {
            this.posY += 2;
          } else if (this.isStairLeftDown()) {
            this.posY -= 2;
          }
        }
      }
      this.canvas.sceneRender();
      this.checkFalling();
    }
  
    if (((this.canvas.pressKeyRight && !this.mustGoLeft() || this.mustGoRight()) && (!this.jumpCounter)) || (this.jumpDirection == 2)) {
      if (this.direction == 1) {
        this.direction = 0;
      }
      else {
        this.step += 1;
        if (this.step > 3) {
          this.step = 0;
        }
        if (this.canGoRight()) {
          this.posX += 2;
          if (this.isStairRightUp()) {
            this.posY += 2;
          } else if (this.isStairRightDown()) {
            this.posY -= 2;
          }
        }
      }
      this.canvas.sceneRender();
      this.checkFalling();
    }
  
    if ((this.canvas.pressKeyUp) || (this.jumpCounter)) {
      if (this.jumpCounter == 0) {
        if (this.canvas.pressKeyLeft && !this.canvas.pressKeyRight && !this.mustGoRight() || this.mustGoLeft())
          this.jumpDirection = 1;
        if (this.canvas.pressKeyRight && !this.canvas.pressKeyLeft && !this.mustGoLeft() || this.mustGoRight())
          this.jumpDirection = 2;
          
        if (!this.isHeadImpact()) {
          this.jumpCounter = 1;
          this.jump += this.jumpMap[this.jumpCounter];
        }
        else {
          this.jumpDirection = 0;
        }
      }
      else {
        this.jumpCounter++;
        if ((this.jumpMap[this.jumpCounter] < 0) && this.isLanding ()) {
          this.canvas.deltaY += this.jump;
          this.jump = 0;
          this.jumpCounter = 0;
          this.jumpDirection = 0;
        }
        else {
          this.jump += this.jumpMap[this.jumpCounter];
          if (this.isHeadImpact ()) {
            this.canvas.deltaY += this.jump;
            this.jump = 0;
            this.jumpCounter = 0;
            this.jumpDirection = 0;
            this.checkFalling();
          }
        }
  
        if (this.jumpCounter == 17) {
          this.jumpCounter = 0;
          this.jumpDirection = 0;
          this.checkFalling();
        }
      }
      this.render();
    }
  } // loop


  render() {
    if ((this.imageWidth > 12) && (this.direction == 0))
      this.elementObj.style.left = this.canvas.width/2-(8+this.imageWidth-12)*this.canvas.scale+'px';
    else
      this.elementObj.style.left = this.canvas.width/2-8*this.canvas.scale+'px';
    this.elementObj.style.top = this.canvas.height/2-8*this.canvas.scale-(this.jump+this.canvas.deltaY)*this.canvas.scale+'px';
    this.elementObj.style.width = (this.imageWidth-2)*this.canvas.scale+'px';
    this.elementObj.style.height = this.imageHeight*this.canvas.scale+'px';
    this.elementObj.style.objectPosition = -(1+this.step*this.imageWidth+this.direction*this.imageWidth*4)*this.canvas.scale+'px';
  } // render


  isLanding() {
    for (let i = 0; i < this.canvas.arrayObjects.length; i++) {
      if ((this.posY+this.jump+this.canvas.deltaY == this.canvas.arrayObjects[i].posY+this.canvas.arrayObjects[i].height) &&
          (this.posX+this.imageWidth-2 > this.canvas.arrayObjects[i].posX) &&
          (this.posX < this.canvas.arrayObjects[i].posX+this.canvas.arrayObjects[i].width))
      {
        return 1;
      }
    }
    return 0;
  } // isLanding


  checkFalling() {
    if (this.jumpCounter) {
      return;
    }
    var deltaStairY = this.posY%8;
    for (let i = 0; i < this.canvas.arrayObjects.length; i++) {
      if ((this.posY+this.jump+this.canvas.deltaY == this.canvas.arrayObjects[i].posY+this.canvas.arrayObjects[i].height) &&
          (this.posX+this.imageWidth-2 > this.canvas.arrayObjects[i].posX) &&
          (this.posX < this.canvas.arrayObjects[i].posX+this.canvas.arrayObjects[i].width))
      {
        return;
      }
      if ((this.direction == 0) &&
          (this.canvas.arrayObjects[i].rightStair) &&
          (this.posX+this.imageWidth-2 == this.canvas.arrayObjects[i].posX+deltaStairY))
      {
        return;
      }
      if ((this.direction == 1) &&
          (this.canvas.arrayObjects[i].leftStair) &&
          (this.posX == this.canvas.arrayObjects[i].posX+this.canvas.arrayObjects[i].width-deltaStairY))
      {
        return;
      }
    }
    this.falling = 1;
  } // checkFalling


  isHeadImpact() {
    for (let i = 0; i < this.canvas.arrayObjects.length; i++) {
      if ((this.canvas.arrayObjects[i].impenetrable) &&
          (this.posY+this.jump+this.canvas.deltaY+this.imageHeight == this.canvas.arrayObjects[i].posY) &&
          (this.posX+this.imageWidth-2 > this.canvas.arrayObjects[i].posX) &&
          (this.posX < this.canvas.arrayObjects[i].posX+this.canvas.arrayObjects[i].width))
      {
        return 1;
      }
    }

    return 0;
  } // isHeadImpact

  
  mustGoLeft() {
    for (let i = 0; i < this.canvas.arrayObjects.length; i++) {
      if ((this.canvas.arrayObjects[i].leftConveyor) &&
          (this.posY+this.jump+this.canvas.deltaY == this.canvas.arrayObjects[i].posY+this.canvas.arrayObjects[i].height) &&
          (this.posX+this.imageWidth > this.canvas.arrayObjects[i].posX) &&
          (this.posX < this.canvas.arrayObjects[i].posX+this.canvas.arrayObjects[i].width))
      {
        return 1;
      }
    }
  
    return 0;
  } // mustGoLeft


  mustGoRight() {
    for (let i = 0; i < this.canvas.arrayObjects.length; i++) {
      if ((this.canvas.arrayObjects[i].rightConveyor) &&
          (this.posY+this.jump+this.canvas.deltaY == this.canvas.arrayObjects[i].posY+this.canvas.arrayObjects[i].height) &&
          (this.posX+this.imageWidth > this.canvas.arrayObjects[i].posX) &&
          (this.posX < this.canvas.arrayObjects[i].posX+this.canvas.arrayObjects[i].width))
      {
        return 1;
      }
    }
  
    return 0;
  } // mustGoRight
  

  canGoRight() {
    for (let i = 0; i < this.canvas.arrayObjects.length; i++) {
      if ((this.canvas.arrayObjects[i].impenetrable) &&
          (this.posX+this.imageWidth-2 == this.canvas.arrayObjects[i].posX) &&
          (this.posY+this.jump+this.canvas.deltaY < this.canvas.arrayObjects[i].posY+this.canvas.arrayObjects[i].height) &&
          (this.posY+this.jump+this.canvas.deltaY+this.imageHeight > this.canvas.arrayObjects[i].posY))
      {
        return 0;
      }
    }

    return 1;
  } // canGoRight
  

  canGoLeft() {
    for (let i = 0; i < this.canvas.arrayObjects.length; i++) {
      if ((this.canvas.arrayObjects[i].impenetrable) &&
          (this.posX == this.canvas.arrayObjects[i].posX+this.canvas.arrayObjects[i].width) &&
          (this.posY+this.jump+this.canvas.deltaY < this.canvas.arrayObjects[i].posY+this.canvas.arrayObjects[i].height) &&
          (this.posY+this.jump+this.canvas.deltaY+this.imageHeight > this.canvas.arrayObjects[i].posY))
      {
        return 0;
      }
    }

    return 1;
  } // canGoLeft
    

} // class Willy
