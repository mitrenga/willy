const { Figure } = await import('./figure.js?ver='+window.srcVersion);

export class Alien extends Figure {
  
  minX = 0;
  maxX = 0;

  constructor(canvas, posX, posY, imgWidth, version, minX, maxX) {
    super(canvas, 'alien', 'images/alien'+version+'.png');
    this.posX = posX;
    this.posY = posY;
    this.imgWidth = imgWidth;
    this.minX = minX;
    this.maxX = maxX;
    this.alien = 1;
  } // constructor


  pressKeyLeft() {
    if (this.direction == 1) {
      if (this.posX > this.minX) {
        return 1;
      }
      else {
        this.direction = 0;
      }
    }
    return 0;
  } // pressKeyLeft


  pressKeyRight() {
    if (this.direction == 0) {
      if (this.posX+this.imgWidth-2 < this.maxX) {
        return 1;
      }
      else {
        this.direction = 1;
      }
    }
    return 0;
  } // pressKeyRight

} // class Alien
