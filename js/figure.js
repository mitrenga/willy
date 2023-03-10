export class Figure {

  canvas = null;
  elementId = null;
  elementObj = null;
  imageFileName = '';
  imageWidth = 12;
  imageHeight = 16;
  posX = 0;
  posY = 0;
  imageWidth = 12;
  imageHeight = 16;
  step = 0;
  direction = 0;
  jump = 0;
  jumpDirection = 0;
  jumpCounter = 0;
  falling = 0;
  mainFigure = 0;

  jumpMap = [0, 4, 4, 3, 3, 2, 2, 1, 1, 0, -1, -1, -2, -2, -3, -3, -4, -4];


  constructor(canvas, elementId, cssClass, imageFileName) {
    this.canvas = canvas;
    this.elementId = elementId;
    this.imageFileName = imageFileName;
    this.elementObj = document.createElement('img');
    this.elementObj.id = this.elementId;
    this.elementObj.className = cssClass;
    this.elementObj.src = this.imageFileName;
    canvas.elementObj.appendChild(this.elementObj);
  } // constructor


  loop() {
    if (this.falling) {
      for (let i = 0; i < 4; i++) {
        this.posY -= 1;
        if (this.isLanding ()) {
          this.falling = 0;
          break;
        }
      }
      this.canvas.sceneRender();
      return;
    }

    if (((this.pressKeyLeft() && !this.mustGoRight() || this.mustGoLeft()) && (!this.jumpCounter)) || (this.jumpDirection == 1)) {
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
          } else if (this.isStairRightDown()) {
            this.posY -= 2;
          }
        }
      }
      this.canvas.sceneRender();
      this.checkFalling();
    }
  
    if (((this.pressKeyRight() && !this.mustGoLeft() || this.mustGoRight()) && (!this.jumpCounter)) || (this.jumpDirection == 2)) {
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
          } else if (this.isStairLeftDown()) {
            this.posY -= 2;
          }
        }
      }
      this.canvas.sceneRender();
      this.checkFalling();
    }
  
    if ((this.pressKeyUp()) || (this.jumpCounter)) {
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
        if (this.jumpMap[this.jumpCounter] < 0) {
          for (let i = 0; i > this.jumpMap[this.jumpCounter]; i--) {
            if (this.isLanding ()) {
              if (this.mainFigure) {
                this.canvas.deltaY += this.jump;
                this.jump = 0;
              }
              this.jumpCounter = 0;
              this.jumpDirection = 0;
              break;
            }
            this.jump -= 1;
          }
        }
        else {
          this.jump += this.jumpMap[this.jumpCounter];
          if (this.isHeadImpact ()) {
            if (this.mainFigure) {
              this.canvas.deltaY += this.jump;
              this.jump = 0;
            }
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
    this.elementObj.style.left = this.canvas.width/2-(this.canvas.willy.posX+8-this.posX)*this.canvas.scale+'px';
    this.elementObj.style.top = this.canvas.height/2-(this.posY+this.jump-this.canvas.willy.posY+this.imageHeight-8)*this.canvas.scale+'px';
    this.elementObj.style.width = (this.imageWidth-2)*this.canvas.scale+'px';
    this.elementObj.style.height = this.imageHeight*this.canvas.scale+'px';
    this.elementObj.style.objectPosition = -(1+this.step*this.imageWidth+this.direction*this.imageWidth*4)*this.canvas.scale+'px';
  } // render


  animation() {
  } // animation
  

  pressKeyLeft() {
    return 0;
  } // pressKeyLeft


  pressKeyRight() {
    return 0;
  } // pressKeyRight


  pressKeyUp() {
    return 0;
  } // pressKeyUp


  isLanding() {
    var deltaStairY = this.posY%8;
    if (deltaStairY == 0)
      deltaStairY = 8;

    for (let i = 0; i < this.canvas.arrayObjects.length; i++) {
      if ((!this.canvas.arrayObjects[i].rightStair) && (!this.canvas.arrayObjects[i].leftStair) &&
          (this.posY+this.jump+this.canvas.deltaY*this.mainFigure == this.canvas.arrayObjects[i].posY+this.canvas.arrayObjects[i].height) &&
          (this.posX+this.imageWidth-2 > this.canvas.arrayObjects[i].posX) &&
          (this.posX < this.canvas.arrayObjects[i].posX+this.canvas.arrayObjects[i].width))
      {
        return 1;
      }
      if ((this.canvas.arrayObjects[i].rightStair) &&
          (this.posY+this.jump+this.canvas.deltaY*this.mainFigure == this.canvas.arrayObjects[i].posY+deltaStairY) &&
          (this.posX+this.imageWidth-4 == this.canvas.arrayObjects[i].posX+deltaStairY))
      {
        return 1;
      }
      if ((this.canvas.arrayObjects[i].leftStair) &&
          (this.posY+this.jump+this.canvas.deltaY*this.mainFigure == this.canvas.arrayObjects[i].posY+deltaStairY) &&
          (this.posX == this.canvas.arrayObjects[i].posX+this.canvas.arrayObjects[i].width-deltaStairY-2))
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
    if (deltaStairY == 0)
      deltaStairY = 8;

    for (let i = 0; i < this.canvas.arrayObjects.length; i++) {
      if ((!this.canvas.arrayObjects[i].rightStair) && (!this.canvas.arrayObjects[i].leftStair) &&
          (this.posY+this.jump+this.canvas.deltaY*this.mainFigure == this.canvas.arrayObjects[i].posY+this.canvas.arrayObjects[i].height) &&
          (this.posX+this.imageWidth-2 > this.canvas.arrayObjects[i].posX) &&
          (this.posX < this.canvas.arrayObjects[i].posX+this.canvas.arrayObjects[i].width))
      {
        return;
      }
      if ((this.canvas.arrayObjects[i].rightStair) &&
          (this.posY+this.jump+this.canvas.deltaY*this.mainFigure == this.canvas.arrayObjects[i].posY+deltaStairY) &&
          (this.posX+this.imageWidth-4 == this.canvas.arrayObjects[i].posX+deltaStairY))
      {
        return;
      }
      if ((this.canvas.arrayObjects[i].leftStair) &&
          (this.posY+this.jump+this.canvas.deltaY*this.mainFigure == this.canvas.arrayObjects[i].posY+deltaStairY) &&
          (this.posX == this.canvas.arrayObjects[i].posX+this.canvas.arrayObjects[i].width-deltaStairY-2))
      {
        return;
      }
    }
    this.falling = 1;
  } // checkFalling


  isHeadImpact() {
    for (let i = 0; i < this.canvas.arrayObjects.length; i++) {
      if ((this.canvas.arrayObjects[i].impenetrable) &&
          (this.posY+this.jump+this.canvas.deltaY*this.mainFigure+this.imageHeight == this.canvas.arrayObjects[i].posY) &&
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
          (this.posY+this.jump+this.canvas.deltaY*this.mainFigure == this.canvas.arrayObjects[i].posY+this.canvas.arrayObjects[i].height) &&
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
          (this.posY+this.jump+this.canvas.deltaY*this.mainFigure == this.canvas.arrayObjects[i].posY+this.canvas.arrayObjects[i].height) &&
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
          (this.posY+this.jump+this.canvas.deltaY*this.mainFigure < this.canvas.arrayObjects[i].posY+this.canvas.arrayObjects[i].height) &&
          (this.posY+this.jump+this.canvas.deltaY*this.mainFigure+this.imageHeight > this.canvas.arrayObjects[i].posY))
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
          (this.posY+this.jump+this.canvas.deltaY*this.mainFigure < this.canvas.arrayObjects[i].posY+this.canvas.arrayObjects[i].height) &&
          (this.posY+this.jump+this.canvas.deltaY*this.mainFigure+this.imageHeight > this.canvas.arrayObjects[i].posY))
      {
        return 0;
      }
    }

    return 1;
  } // canGoLeft
    

  isStairRightUp() {
    var deltaStairY = this.posY%8;
    for (let i = 0; i < this.canvas.arrayObjects.length; i++) {
      if ((this.canvas.arrayObjects[i].rightStair) &&
      (this.posY+this.jump+this.canvas.deltaY*this.mainFigure == this.canvas.arrayObjects[i].posY+deltaStairY) &&
      (this.posX+this.imageWidth-6 == this.canvas.arrayObjects[i].posX+deltaStairY))
      {
        return 1;
      }
    }

    return 0;
  } // isStairRightUp


  isStairRightDown() {
    var deltaStairY = this.posY%8;
    if (deltaStairY == 0)
      deltaStairY = 8;

      for (let i = 0; i < this.canvas.arrayObjects.length; i++) {
        if ((this.canvas.arrayObjects[i].rightStair) &&
        (this.posY+this.jump+this.canvas.deltaY*this.mainFigure == this.canvas.arrayObjects[i].posY+deltaStairY) &&
        (this.posX+this.imageWidth-4 == this.canvas.arrayObjects[i].posX+deltaStairY-2))
        {
          return 1;
        }
      }
  
    return 0;
  } // isStairRightDown
  

  isStairLeftUp() {
    var deltaStairY = this.posY%8;
    for (let i = 0; i < this.canvas.arrayObjects.length; i++) {
      if ((this.canvas.arrayObjects[i].leftStair) &&
          (this.posY+this.jump+this.canvas.deltaY*this.mainFigure == this.canvas.arrayObjects[i].posY+deltaStairY) &&
          (this.posX+2 == this.canvas.arrayObjects[i].posX+this.canvas.arrayObjects[i].width-deltaStairY-2))
      {
        return 1;
      }
    }

    return 0;
  } // isStairLeftUp
  

  isStairLeftDown() {
    var deltaStairY = this.posY%8;
    if (deltaStairY == 0)
      deltaStairY = 8;

      for (let i = 0; i < this.canvas.arrayObjects.length; i++) {
      if ((this.canvas.arrayObjects[i].leftStair) &&
          (this.posY+this.jump+this.canvas.deltaY*this.mainFigure == this.canvas.arrayObjects[i].posY+deltaStairY) &&
          (this.posX == this.canvas.arrayObjects[i].posX+this.canvas.arrayObjects[i].width-deltaStairY))
      {
        return 1;
      }
    }

    return 0;
  } // isStairLeftDown

} // class Figure
