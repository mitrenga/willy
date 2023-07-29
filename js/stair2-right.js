const { Object } = await import('./object.js?ver='+window.srcVersion);

export class Stair2Right extends Object {

  constructor(canvas, posX, posY, myId = '') {
    super(canvas, posX, posY, 4, 8, 'stair2Right', myId);
    this.rightStair = 1;
    this.backgroundSize = 4;
  } // constructor
  
} // class Stair2Right
