const { Figure } = await import('./figure.js?ver='+window.srcVersion);

export class Rocket extends Figure {
  
  constructor(canvas, posX, posY) {
    super(canvas, 'rocket', 'images/rocket.png');
    this.posX = posX;
    this.posY = posY;
    this.imgWidth = 18;
    this.imgHeight = 50;
  } // constructor

} // class Rocket