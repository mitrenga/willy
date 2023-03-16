const { Figure } = await import('./figure.js?ver='+window.srcVersion);

export class Rocket extends Figure {
  
  constructor(canvas) {
    super(canvas, 'rocket', 'images/rocket.png');
    this.posX = -10*8;
    this.posY = 1*8;
    this.imgWidth = 18;
    this.imgHeight = 50;
  } // constructor

} // class Rocket