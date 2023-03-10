const { Object } = await import('./object.js?ver='+window.srcVersion);

export class RoofRight extends Object {

  constructor(canvas, posX, posY) {
    super(canvas, posX, posY, 8, 8, 'roofRight');
    this.impenetrable = 0;
    this.leftStair = 1;
  } // constructor
  
} // class RoofRight
