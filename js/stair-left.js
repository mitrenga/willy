const { Object } = await import('./object.js?ver='+window.srcVersion);

export class StairLeft extends Object {

  constructor(canvas, posX, posY, myId = '') {
    super(canvas, posX, posY, 8, 8, 'stairLeft', myId);
    this.leftStair = 1;
  } // constructor
  
} // class StairLeft
