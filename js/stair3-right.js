const { Object } = await import('./object.js?ver='+window.srcVersion);

export class Stair3Right extends Object {

  constructor(canvas, posX, posY, myId = '') {
    super(canvas, posX, posY, 1, 8, 'stair3Right', myId);
    this.rightStair = 1;
    this.backgroundSize = 1;
  } // constructor
  
} // class Stair3Right
