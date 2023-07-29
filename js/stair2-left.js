const { Object } = await import('./object.js?ver='+window.srcVersion);

export class Stair2Left extends Object {

  constructor(canvas, posX, posY, myId = '') {
    super(canvas, posX, posY, 4, 8, 'stair2Left', myId);
    this.leftStair = 1;
    this.backgroundSize = 4;
  } // constructor
  
} // class Stair2Left
