import { Figure } from './figure.js';

export class Bird extends Figure {
  
  constructor(canvas) {
    super(canvas, 'bird', 'bird', 'images/bird.png');
    this.posX = -20*8;
    this.posY = 10*8;
    this.imageHeight = 16;
    this.imageWidth = 16;
  } // constructor

  mustGoLeft() {
    //return super.mustGoLeft();
    if (this.direction == 1) {
      if (this.posX > -40*8) {
        return 1;
      }
      else {
        this.direction = 0;
      }
    }
    return 0;
  } // mustGoLeft

  mustGoRight() {
    //return super.mustGoRight();
    if (this.direction == 0) {
      if (this.posX+this.imageWidth-2 < -10*8) {
        return 1;
      }
      else {
        this.direction = 1;
      }
    }
    return 0;
  } // mustGoRight


  isLanding() {
    return 1;
  } // isLanding


  checkFalling() {
    return 0;
  } // checkFalling

} // class Bird
