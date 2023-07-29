const { Object } = await import('./object.js?ver='+window.srcVersion);

export class StairRight extends Object {

  constructor(canvas, posX, posY, myId = '') {
    super(canvas, posX, posY, 8, 8, 'stairRight', myId);
    this.rightStair = 1;
  } // constructor
  
} // class StairRight
