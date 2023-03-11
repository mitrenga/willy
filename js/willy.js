const { Figure } = await import('./figure.js?ver='+window.srcVersion);

export class Willy extends Figure {

  figureType = 0;


  constructor(canvas) {
    super(canvas, 'willy', 'willy', 'images/willy.png');
    this.posX = 24*8;
    this.posY = 1*8;
    this.mainFigure = 1;
  } // constructor

  
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


  pressKeyLeft() {
    return this.canvas.pressKeyLeft;
  } // pressKeyLeft


  pressKeyRight() {
    return this.canvas.pressKeyRight;
  } // pressKeyRight


  pressKeyUp() {
    return this.canvas.pressKeyUp;
  } // pressKeyUp

} // class Willy
