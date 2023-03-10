const { Object } = await import('./object.js?ver='+window.srcVersion);

export class RoofLeft extends Object {

  constructor(canvas, posX, posY) {
    super(canvas, posX, posY, 8, 8, 'roofLeft');
    this.impenetrable = 0;
    this.rightStair = 1;
  } // constructor
  
} // class RoofLeft
