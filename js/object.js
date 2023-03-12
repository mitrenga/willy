export class Object {

  canvas = null;
  elementId = null;
  elementObj = null;
  cssClass = '';
  targetId = '';
  posX = 0;
  posY = 0;
  imgWidth = 0;
  imgHeight = 0;

  movePosX = 0;
  movePosY = 0;
  moveWidth = 0;
  moveHeight = 0;

  backgroundSize = 8;
  
  impenetrable = 0;
  leftStair = 0;
  rightStair = 0;
  item = 0;
  catch = 0;

  constructor(canvas, posX, posY, imgWidth, imgHeight, cssClass, targetId = '') {
    this.canvas = canvas;
    this.posX = posX;
    this.posY = posY;
    this.imgWidth = imgWidth;
    this.imgHeight = imgHeight;
    this.elementId = cssClass+posX+posY; 
    this.targetId = targetId;
    this.elementObj = document.createElement('div');
    this.elementObj.id = this.elementId;
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
    if (this.movePosY > 1) {
      this.movePosY -= 2;
      this.posY += 2;
    }
    if (this.moveHeight < -1) {
      this.moveHeight += 2;
      this.imgHeight -= 2;
    }
  } // animate


  checkTouch() {
  } // checkTouch


  capture() {
  } // capture
  
} // class Object
