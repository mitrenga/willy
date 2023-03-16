export class Object {

  canvas = null;
  elementObj = null;
  cssClass = '';
  targetId = '';
  posX = 0;
  posY = 0;
  imgWidth = 0;
  imgHeight = 0;

  changePosX = 0;
  changePosY = 0;
  changeWidth = 0;
  changeHeight = 0;

  backgroundSize = 8;
  
  impenetrable = 0;
  leftStair = 0;
  rightStair = 0;
  item = 0;
  catch = 0;
  decoration = 0;

  constructor(canvas, posX, posY, imgWidth, imgHeight, cssClass, targetId = '', decoration = 0) {
    this.canvas = canvas;
    this.posX = posX;
    this.posY = posY;
    this.imgWidth = imgWidth;
    this.imgHeight = imgHeight;
    this.targetId = targetId;
    this.decoration = decoration;
    this.elementObj = document.createElement('div');
    this.elementObj.className = cssClass;
    this.cssClass = cssClass;
    canvas.elementObj.appendChild(this.elementObj);
  } // constructor
  
  
  render() {
    this.elementObj.style.left = this.canvas.canvasWidth/2-(this.canvas.willy.posX+8)*this.canvas.scale+this.posX*this.canvas.scale+'px';
    this.elementObj.style.top = this.canvas.canvasHeight/2-(this.posY+this.imgHeight-8)*this.canvas.scale+this.canvas.willy.posY*this.canvas.scale+'px';
    this.elementObj.style.width = this.imgWidth*this.canvas.scale+'px';
    this.elementObj.style.height = this.imgHeight*this.canvas.scale+'px';
    this.elementObj.style.backgroundSize = this.backgroundSize*this.canvas.scale+'px';
  } // render


  animate() {
    if (this.changePosX > 1) {
      this.changePosX -= 2;
      this.posX += 2;
    }
    if (this.changePosX < -1) {
      this.changePosX += 2;
      this.posX -= 2;
    }
    
    if (this.changePosY > 1) {
      this.changePosY -= 2;
      this.posY += 2;
    }
    if (this.changePosY < -1) {
      this.changePosY += 2;
      this.posY -= 2;
    }

    if (this.imgWidth > 1) {
      this.imgWidth -= 2;
      this.imgWidth += 2;
    }
    if (this.imgWidth < -1) {
      this.imgWidth += 2;
      this.imgWidth -= 2;
    }

    if (this.changeHeight > 1) {
      this.changeHeight -= 2;
      this.imgHeight += 2;
    }
    if (this.changeHeight < -1) {
      this.changeHeight += 2;
      this.imgHeight -= 2;
    }
  } // animate


  checkTouch() {
  } // checkTouch


  capture() {
  } // capture
  
} // class Object
