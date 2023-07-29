const { Object } = await import('./object.js?ver='+window.srcVersion);

export class Stair3Left extends Object {

  constructor(canvas, posX, posY, myId = '') {
    super(canvas, posX, posY, 1, 8, 'stair3Left', myId);
    this.leftStair = 1;
    this.backgroundSize = 1;
  } // constructor
  
} // class Stair3Left
