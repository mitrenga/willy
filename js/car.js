const { Figure } = await import('./figure.js?ver='+window.srcVersion);

export class Car extends Figure {
  
  constructor(canvas) {
    super(canvas, 'car', 'car', 'images/car.png');
    this.posX = 55*8;
    this.posY = 1*8;
    this.imgWidth = 26;
    this.imgHeight = 16;
  } // constructor

} // class Rocket