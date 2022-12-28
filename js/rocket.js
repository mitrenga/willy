const { Figure } = await import('./figure.js?ver='+window.srcVersion);

export class Rocket extends Figure {
  
  constructor(canvas) {
    super(canvas, 'rocket', 'rocket', 'images/rocket.png');
    this.posX = -10*8;
    this.posY = 1*8;
    this.imageWidth = 18;
    this.imageHeight = 50;
  } // constructor

} // class Rocket