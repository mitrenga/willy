import { Figure } from './figure.js';

export class Alien extends Figure {
  
  minX = 0;
  maxX = 0;

  constructor(canvas, version, id, posX, posY, minX, maxX) {
    super(canvas, 'alien'+version+id, 'alien'+version, 'images/alien'+version+'.png');
    this.posX = posX;
    this.posY = posY;
    this.minX = minX;
    this.maxX = maxX;
  } // constructor

  mustGoLeft() {
    if (this.direction == 1) {
      if (this.posX > this.minX) {
        return 1;
      }
      else {
        this.direction = 0;
      }
    }
    return 0;
  } // mustGoLeft

  mustGoRight() {
    if (this.direction == 0) {
      if (this.posX+this.imageWidth-2 < this.maxX) {
        return 1;
      }
      else {
        this.direction = 1;
      }
    }
    return 0;
  } // mustGoRight

} // class Alien
