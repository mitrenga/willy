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

  jumpMap = [0, 4, 4, 3, 3, 2, 2, 1, 1, 0, -1, -1, -2, -2, -3, -3, -4, -4];


  constructor(canvas, elementId, imageFileName) {
    this.canvas = canvas;
    this.elementId = elementId;
    this.imageFileName = imageFileName;
    var newObject = document.createElement('img');
    newObject.id = this.elementId;
    newObject.src = this.imageFileName;
    canvas.elementObj.appendChild(newObject);
    this.elementObj = document.getElementById(this.elementId);
  } // constructor


  loop() {
    if (this.falling) {
      this.posY -= 4;
      this.render();
      if (this.isLanding ()) {
        this.falling = 0;
      }
      return;
    }
  
    if (((0/*this.canvas.pressKeyLeft*/ && !this.mustGoRight() || this.mustGoLeft()) && (!this.jumpCounter)) || (this.jumpDirection == 1)) {
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
        }
      }
      this.render();
      this.checkFalling();
    }
  
    if (((0/*this.canvas.pressKeyRight*/ && !this.mustGoLeft() || this.mustGoRight()) && (!this.jumpCounter)) || (this.jumpDirection == 2)) {
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
        }
      }
      this.render();
      this.checkFalling();
    }
  
    if ((0/*this.canvas.pressKeyUp*/) || (this.jumpCounter)) {
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
          this.posY += this.jump;
          this.jump = 0;
          this.jumpCounter = 0;
          this.jumpDirection = 0;
        }
        else {
          this.jump += this.jumpMap[this.jumpCounter];
          if (this.isHeadImpact ()) {
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
    this.elementObj.style.top = this.canvas.height/2-(this.posY+this.jump-this.canvas.willy.posY+8)*this.canvas.scale+'px';
    this.elementObj.style.width = (this.imageWidth-2)*this.canvas.scale+'px';
    this.elementObj.style.height = 16*this.canvas.scale+'px';
    this.elementObj.style.objectPosition = -(1+this.step*this.imageWidth+this.direction*this.imageWidth*4)*this.canvas.scale+'px';
  } // render


  animation() {
  } // animation
  

  isLanding() {
    for (let i = 0; i < this.canvas.arrayObjects.length; i++) {
      if ((this.posY+this.jump == this.canvas.arrayObjects[i].posY+this.canvas.arrayObjects[i].height) &&
          (this.posX+this.imageWidth > this.canvas.arrayObjects[i].posX) &&
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
    if (!this.isLanding()) {
      this.falling = 1;
      return;
    }
  } // checkFalling

  
  isHeadImpact() {
    for (let i = 0; i < this.canvas.arrayObjects.length; i++) {
      if ((this.canvas.arrayObjects[i].impenetrable) &&
          (this.posY+this.jump+this.imageHeight == this.canvas.arrayObjects[i].posY) &&
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
          (this.posY+this.jump == this.canvas.arrayObjects[i].posY+this.canvas.arrayObjects[i].height) &&
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
          (this.posY+this.jump == this.canvas.arrayObjects[i].posY+this.canvas.arrayObjects[i].height) &&
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
          (this.posY+this.jump < this.canvas.arrayObjects[i].posY+this.canvas.arrayObjects[i].height) &&
          (this.posY+this.jump+this.imageHeight > this.canvas.arrayObjects[i].posY))
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
          (this.posY+this.jump < this.canvas.arrayObjects[i].posY+this.canvas.arrayObjects[i].height) &&
          (this.posY+this.jump+this.imageHeight > this.canvas.arrayObjects[i].posY))
      {
        return 0;
      }
    }

    return 1;
  } // canGoLeft
    
} // class Figure
