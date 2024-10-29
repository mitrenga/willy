export class Figure {

  canvas = null;
  elementObj = null;
  imageFileName = '';
  imgWidth = 12;
  imgHeight = 16;
  posX = 0;
  posY = 0;
  step = 0; // 0..3
  direction = 0; // 0-right, 1-left
  jump = 0;
  jumpDirection = 0; // 0-none, 1-left, 2-right
  jumpCounter = 0;
  falling = 0;
  mainFigure = 0;
  figureType = 0; // 0-Willy or Kate, 1-Jetpac
  alien = 0;

  jumpMap = [0, 4, 4, 3, 3, 2, 2, 1, 1, 0, -1, -1, -2, -2, -3, -3, -4, -4];


  constructor(canvas, cssClass, imageFileName) {
    this.canvas = canvas;
    this.imageFileName = imageFileName;
    this.elementObj = document.createElement('img');
    this.elementObj.className = cssClass;
    this.elementObj.src = this.imageFileName;
    canvas.elementObj.appendChild(this.elementObj);
  } // constructor


  loop() {
    if (this.falling) {
      if ((this.figureType == 1) && (this.pressKeyUp())) { // Jetpac flying up
      } else {
        if (this.figureType == 1) { // animate Jetpac
          if (this.direction == 0) {
            this.step += 1;
            if (this.step > 3) {
              this.step = 0;
            }
          } else {
            this.step -= 1;
            if (this.step < 0) {
              this.step = 3;
            }
          }
        } // animate Jetpac

        for (let i = 0; i < 4; i++) {
          this.posY -= 1;
          if (this.isLanding ()) {
            this.falling = 0;
            break;
          }
        }
        return;
      }
    }

    if (((this.pressKeyLeft() && !this.mustGoRight() || this.mustGoLeft()) && (!this.jumpCounter)) || (this.jumpDirection == 1)) {
      if (this.direction == 0) {
        this.direction = 1;
      }
      else {
        if (this.figureType != 1) { // not Jetpac
          this.step -= 1;
          if (this.step < 0) {
            this.step = 3;
          }
        } // not Jetpac
        
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
        if (this.figureType != 1) { // not Jetpac
          this.step += 1;
          if (this.step > 3) {
            this.step = 0;
          }
        } // not Jetpac

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
  
    switch (this.figureType) {
      case 0: { // Willy or Kate
        if (((this.pressKeyUp()) || (this.jumpCounter))) {
          if (this.jumpCounter == 0) {
            if (this.pressKeyLeft() && !this.pressKeyRight() && !this.mustGoRight() || this.mustGoLeft())
              this.jumpDirection = 1;
            if (this.pressKeyRight() && !this.pressKeyLeft() && !this.mustGoLeft() || this.mustGoRight())
              this.jumpDirection = 2;
              
            if (!this.isHeadImpact(this.jumpMap[1])) {
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
                  } else {
                    this.posY += this.jump;
                  }
                  this.jump = 0;
                  this.jumpCounter = 0;
                  this.jumpDirection = 0;
                  break;
                }
                this.jump -= 1;
              }
            }
            else {
              this.jump += this.jumpMap[this.jumpCounter];
              if (this.isHeadImpact (this.jumpMap[this.jumpCounter])) {
                if (this.mainFigure) {
                  this.canvas.deltaY += this.jump;
                } else {
                  this.posY += this.jump;
                }
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
        break;
      } // case 0 - Willy

      case 1: { // Jetpac

        // animate Jetpac
        if (this.direction == 0) {
          this.step += 1;
          if (this.step > 3) {
            this.step = 0;
          }
        } else {
          this.step -= 1;
          if (this.step < 0) {
            this.step = 3;
          }
        }

        if (this.pressKeyUp()) {
          for (let i = 0; i < 4; i++) {
            if (this.isHeadImpact (0)) {
              break;
            }
            this.posY += 1;
          }
        } else {
          this.checkFalling();
        }
        break;
      } // case 1 - Jetpac

    } // switch
  } // loop


  render() {
    this.elementObj.style.left = this.canvas.canvasWidth/2-(this.canvas.willy.posX+8-this.posX)*this.canvas.scale+'px';
    this.elementObj.style.top = this.canvas.canvasHeight/2-(this.posY+this.jump-this.canvas.willy.posY+this.imgHeight-8)*this.canvas.scale+'px';
    this.elementObj.style.width = (this.imgWidth-2)*this.canvas.scale+'px';
    this.elementObj.style.height = this.imgHeight*this.canvas.scale+'px';
    this.elementObj.style.objectPosition = -(1+this.step*this.imgWidth+this.direction*this.imgWidth*4)*this.canvas.scale+'px';
  } // render


  animate() {
  } // animate
  

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
      if ((!this.canvas.arrayObjects[i].item) && (!this.canvas.arrayObjects[i].rightStair) && (!this.canvas.arrayObjects[i].leftStair) && (!this.canvas.arrayObjects[i].decoration) &&
          (this.posY+this.jump+this.canvas.deltaY*this.mainFigure == this.canvas.arrayObjects[i].posY+this.canvas.arrayObjects[i].imgHeight) &&
          (this.posX+this.imgWidth-2 > this.canvas.arrayObjects[i].posX) &&
          (this.posX < this.canvas.arrayObjects[i].posX+this.canvas.arrayObjects[i].imgWidth))
      {
        return 1;
      }
      if ((this.canvas.arrayObjects[i].rightStair) &&
          (this.posY+this.jump+this.canvas.deltaY*this.mainFigure == this.canvas.arrayObjects[i].posY+deltaStairY) &&
          (this.posX+this.imgWidth-4 == this.canvas.arrayObjects[i].posX+deltaStairY))
      {
        return 1;
      }
      if ((this.canvas.arrayObjects[i].leftStair) &&
          (this.posY+this.jump+this.canvas.deltaY*this.mainFigure == this.canvas.arrayObjects[i].posY+deltaStairY) &&
          (this.posX == this.canvas.arrayObjects[i].posX+this.canvas.arrayObjects[i].imgWidth-deltaStairY-2))
      {
        return 1;
      }
    }
    return 0;
  } // isLanding

  
  checkFalling() {
    if ((this.figureType == 1) && (this.pressKeyUp())) {
      return;
    }
    if (this.jumpCounter) {
      return;
    }

    var deltaStairY = this.posY%8;
    if (deltaStairY == 0)
      deltaStairY = 8;

    for (let i = 0; i < this.canvas.arrayObjects.length; i++) {
      if ((!this.canvas.arrayObjects[i].item) && (!this.canvas.arrayObjects[i].rightStair) && (!this.canvas.arrayObjects[i].leftStair) &&
          (this.posY+this.jump+this.canvas.deltaY*this.mainFigure == this.canvas.arrayObjects[i].posY+this.canvas.arrayObjects[i].imgHeight) &&
          (this.posX+this.imgWidth-2 > this.canvas.arrayObjects[i].posX) &&
          (this.posX < this.canvas.arrayObjects[i].posX+this.canvas.arrayObjects[i].imgWidth))
      {
        return;
      }
      if ((this.canvas.arrayObjects[i].rightStair) &&
          (this.posY+this.jump+this.canvas.deltaY*this.mainFigure == this.canvas.arrayObjects[i].posY+deltaStairY) &&
          (this.posX+this.imgWidth-4 == this.canvas.arrayObjects[i].posX+deltaStairY))
      {
        return;
      }
      if ((this.canvas.arrayObjects[i].leftStair) &&
          (this.posY+this.jump+this.canvas.deltaY*this.mainFigure == this.canvas.arrayObjects[i].posY+deltaStairY) &&
          (this.posX == this.canvas.arrayObjects[i].posX+this.canvas.arrayObjects[i].imgWidth-deltaStairY-2))
      {
        return;
      }
    }
    this.falling = 1;
  } // checkFalling


  isHeadImpact(jump) {
    for (let i = 0; i < this.canvas.arrayObjects.length; i++) {
      if ((this.canvas.arrayObjects[i].impenetrable) &&
          (Math.abs(this.posY+this.jump+this.canvas.deltaY*this.mainFigure+this.imgHeight-this.canvas.arrayObjects[i].posY) <= jump) &&
          (((this.posX >= this.canvas.arrayObjects[i].posX) &&
          (this.posX < this.canvas.arrayObjects[i].posX+this.canvas.arrayObjects[i].imgWidth)) ||
          ((this.posX+this.imgWidth-2 > this.canvas.arrayObjects[i].posX) &&
          (this.posX+this.imgWidth-2 <= this.canvas.arrayObjects[i].posX+this.canvas.arrayObjects[i].imgWidth))))
      {
        return 1;
      }
    }

    return 0;
  } // isHeadImpact

  
  mustGoLeft() {
    for (let i = 0; i < this.canvas.arrayObjects.length; i++) {
      if ((this.canvas.arrayObjects[i].leftConveyor) &&
          (this.posY+this.jump+this.canvas.deltaY*this.mainFigure == this.canvas.arrayObjects[i].posY+this.canvas.arrayObjects[i].imgHeight) &&
          (this.posX+this.imgWidth > this.canvas.arrayObjects[i].posX) &&
          (this.posX < this.canvas.arrayObjects[i].posX+this.canvas.arrayObjects[i].imgWidth))
      {
        return 1;
      }
    }
  
    return 0;
  } // mustGoLeft


  mustGoRight() {
    for (let i = 0; i < this.canvas.arrayObjects.length; i++) {
      if ((this.canvas.arrayObjects[i].rightConveyor) &&
          (this.posY+this.jump+this.canvas.deltaY*this.mainFigure == this.canvas.arrayObjects[i].posY+this.canvas.arrayObjects[i].imgHeight) &&
          (this.posX+this.imgWidth > this.canvas.arrayObjects[i].posX) &&
          (this.posX < this.canvas.arrayObjects[i].posX+this.canvas.arrayObjects[i].imgWidth))
      {
        return 1;
      }
    }
  
    return 0;
  } // mustGoRight
  

  canGoRight() {
    var toleration = 2;
    if (this.jump+this.canvas.deltaY*this.mainFigure != 0)
      toleration = 0;
    for (let i = 0; i < this.canvas.arrayObjects.length; i++) {
      if ((this.canvas.arrayObjects[i].impenetrable) &&
          (this.posX+this.imgWidth-2 == this.canvas.arrayObjects[i].posX) &&
          (this.posY+this.jump+this.canvas.deltaY*this.mainFigure < this.canvas.arrayObjects[i].posY+this.canvas.arrayObjects[i].imgHeight-toleration) &&
          (this.posY+this.jump+this.canvas.deltaY*this.mainFigure+this.imgHeight > this.canvas.arrayObjects[i].posY))
      {
        return 0;
      }
    }

    return 1;
  } // canGoRight
  

  canGoLeft() {
    var toleration = 2;
    if (this.jump+this.canvas.deltaY*this.mainFigure != 0)
      toleration = 0;
    for (let i = 0; i < this.canvas.arrayObjects.length; i++) {
      if ((this.canvas.arrayObjects[i].impenetrable) &&
          (this.posX == this.canvas.arrayObjects[i].posX+this.canvas.arrayObjects[i].imgWidth) &&
          (this.posY+this.jump+this.canvas.deltaY*this.mainFigure < this.canvas.arrayObjects[i].posY+this.canvas.arrayObjects[i].imgHeight-toleration) &&
          (this.posY+this.jump+this.canvas.deltaY*this.mainFigure+this.imgHeight > this.canvas.arrayObjects[i].posY))
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
      (this.posX+this.imgWidth-6 == this.canvas.arrayObjects[i].posX+deltaStairY))
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
        (this.posX+this.imgWidth-4 == this.canvas.arrayObjects[i].posX+deltaStairY-2))
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
          (this.posX+2 == this.canvas.arrayObjects[i].posX+this.canvas.arrayObjects[i].imgWidth-deltaStairY-2))
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
          (this.posX == this.canvas.arrayObjects[i].posX+this.canvas.arrayObjects[i].imgWidth-deltaStairY))
      {
        return 1;
      }
    }

    return 0;
  } // isStairLeftDown


  checkTouch() {
    if (!this.alien)
      return;

    if ((this.canvas.willy.posX+this.canvas.willy.imgWidth-2 <= this.posX) ||
        (this.canvas.willy.posX >= this.posX+this.imgWidth) ||
        (this.canvas.willy.posY+this.canvas.willy.jump+this.canvas.deltaY+this.canvas.willy.imgHeight <= this.posY) ||
        (this.canvas.willy.posY+this.canvas.willy.jump+this.canvas.deltaY >= this.posY+this.imgHeight))
    {
      return;
    }
    this.capture();
  } // checkTouch


  capture() {
    if (!this.canvas.elementObj.classList.contains('crashAnimation'))
      this.canvas.elementObj.classList.add('crashAnimation');
    this.canvas.elementObj.style.animationName = 'none';
    requestAnimationFrame(() => {
      setTimeout(() => {
        this.canvas.elementObj.style.animationName = ''
      }, 0);
    });
    this.canvas.resetRoom();
  } // capture

} // class Figure
