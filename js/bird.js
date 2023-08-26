const { Figure } = await import('./figure.js?ver='+window.srcVersion);

export class Bird extends Figure {
  
  constructor(canvas, posX, posY) {
    super(canvas, 'bird', 'images/bird.png');
    this.posX = posX;
    this.posY = posY;
    this.imgHeight = 16;
    this.imgWidth = 16;
    this.alien = 1;
  } // constructor

  pressKeyLeft() {
    if (this.direction == 1) {
      if (this.posX > -40*8) {
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
      if (this.posX+this.imgWidth-2 < -10*8) {
        return 1;
      }
      else {
        this.direction = 1;
      }
    }
    return 0;
  } // pressKeyRight


  isLanding() {
    return 1;
  } // isLanding


  checkFalling() {
    return 0;
  } // checkFalling

} // class Bird
