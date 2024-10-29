const { Figure } = await import('./figure.js?ver='+window.srcVersion);

export class Willy extends Figure {
  defaultX = 0;
  defaultY = 0;

  keyUp = 0;
  keyLeft = 0;
  keyRight = 0;


  constructor(canvas, posX, posY) {
    super(canvas, 'willy', 'images/robot.png');
    this.posX = posX;
    this.posY = posY;
    this.defaultX = posX;
    this.defaultY = posY;
    this.mainFigure = 1;
  } // constructor

  
  render() {
    if ((this.imgWidth > 12) && (this.direction == 0))
      this.elementObj.style.left = this.canvas.canvasWidth/2-(8+this.imgWidth-12)*this.canvas.scale+'px';
    else
      this.elementObj.style.left = this.canvas.canvasWidth/2-8*this.canvas.scale+'px';
    this.elementObj.style.top = this.canvas.canvasHeight/2-8*this.canvas.scale-(this.jump+this.canvas.deltaY)*this.canvas.scale+'px';
    this.elementObj.style.width = (this.imgWidth-2)*this.canvas.scale+'px';
    this.elementObj.style.height = this.imgHeight*this.canvas.scale+'px';
    this.elementObj.style.objectPosition = -(1+this.step*this.imgWidth+this.direction*this.imgWidth*4)*this.canvas.scale+'px';
  } // render


  pressKeyLeft() {
    return this.keyLeft;
  } // pressKeyLeft


  pressKeyRight() {
    return this.keyRight;
  } // pressKeyRight


  pressKeyUp() {
    return this.keyUp;
  } // pressKeyUp

} // class Willy
