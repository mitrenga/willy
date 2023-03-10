const { Figure } = await import('./figure.js?ver='+window.srcVersion);

export class Alien extends Figure {
  
  minX = 0;
  maxX = 0;

  constructor(canvas, version, id, posX, posY, imageWidth, minX, maxX) {
    super(canvas, 'alien'+version+id, 'alien', 'images/alien'+version+'.png');
    this.posX = posX;
    this.posY = posY;
    this.imageWidth = imageWidth;
    this.minX = minX;
    this.maxX = maxX;
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
      if (this.posX+this.imageWidth-2 < this.maxX) {
        return 1;
      }
      else {
        this.direction = 1;
      }
    }
    return 0;
  } // pressKeyRight

} // class Alien
