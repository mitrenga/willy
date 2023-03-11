const { Object } = await import('./object.js?ver='+window.srcVersion);

export class Wall extends Object {

  constructor(canvas, posX, posY, width, height, cssClass, targetId = '') {
    super(canvas, posX, posY, width, height, cssClass, targetId);
    this.impenetrable = 1;
  } // constructor
  
} // class Wall
