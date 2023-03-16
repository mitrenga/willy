const { Figure } = await import('./figure.js?ver='+window.srcVersion);

export class Kate extends Figure {
  
  constructor(canvas) {
    super(canvas, 'kate', 'images/kate.png');
    this.posX = 16;
    this.posY = 8;
  } // constructor


  pressKeyLeft() {
    if (this.direction == 1) {
      if (this.posX > 1*8) {
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
      if (this.posX+this.imgWidth-2 < 13*8) {
        return 1;
      }
      else {
        this.direction = 1;
      }
    }
    return 0;
  } // pressKeyRight

} // class Kate
