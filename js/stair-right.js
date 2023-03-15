const { Object } = await import('./object.js?ver='+window.srcVersion);

export class StairRight extends Object {

  constructor(canvas, posX, posY, targetId = '') {
    super(canvas, posX, posY, 8, 8, 'stairRight', targetId);
    this.rightStair = 1;
  } // constructor
  
} // class StairRight
