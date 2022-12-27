export class Object {

  canvas = null;
  elementId = null;
  elementObj = null;
  posX = 0;
  posY = 0;
  width = 0;
  height = 0;
  backgroundSize = 8;
  
  impenetrable = 0;
  leftStair = 0;
  rightStair = 0;

  constructor(canvas, posX, posY, width, height, cssClass) {
    this.canvas = canvas;
    this.posX = posX;
    this.posY = posY;
    this.width = width;
    this.height = height;
    this.elementId = cssClass+posX+posY; 
    var newObject = document.createElement('div');
    newObject.id = this.elementId;
    newObject.className = cssClass;
    canvas.elementObj.appendChild(newObject);
    this.elementObj = document.getElementById(this.elementId);
  } // constructor
  
  
  render() {
    this.elementObj.style.left = this.canvas.width/2-(this.canvas.willy.posX+8)*this.canvas.scale+this.posX*this.canvas.scale+'px';
    this.elementObj.style.top = this.canvas.height/2-(this.posY+this.height-8)*this.canvas.scale+this.canvas.willy.posY*this.canvas.scale+'px';
    this.elementObj.style.width = this.width*this.canvas.scale+'px';
    this.elementObj.style.height = this.height*this.canvas.scale+'px';
    this.elementObj.style.backgroundSize = this.backgroundSize*this.canvas.scale+'px';
  } // render


  animate() {
  } // animate
  
} // class Object
