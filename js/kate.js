const { Figure } = await import('./figure.js?ver='+window.srcVersion);

export class Kate extends Figure {
  
  constructor(canvas) {
    super(canvas, 'kate', 'kate', 'images/kate.png');
    this.posX = 16;
    this.posY = 8;
  } // constructor

  mustGoLeft() {
    //return super.mustGoLeft();
    if (this.direction == 1) {
      if (this.posX > 1*8) {
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
      if (this.posX+this.imageWidth-2 < 11*8) {
        return 1;
      }
      else {
        this.direction = 1;
      }
    }
    return 0;
  } // mustGoRight

} // class Kate
