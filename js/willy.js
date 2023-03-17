const { Figure } = await import('./figure.js?ver='+window.srcVersion);

export class Willy extends Figure {

  constructor(canvas) {
    super(canvas, 'willy', 'images/willy.png');
    this.posX = 11*8+4;
    //this.posX = 61*8+4;
    this.posY = 1*8;
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
    return this.canvas.pressKeyLeft;
  } // pressKeyLeft


  pressKeyRight() {
    return this.canvas.pressKeyRight;
  } // pressKeyRight


  pressKeyUp() {
    return this.canvas.pressKeyUp;
  } // pressKeyUp

} // class Willy
