const { Object } = await import('./object.js?ver='+window.srcVersion);

export class Wall extends Object {

  constructor(canvas, posX, posY, imgWidth, imgHeight, cssClass, targetId = '') {
    super(canvas, posX, posY, imgWidth, imgHeight, cssClass, targetId);
    this.impenetrable = 1;
  } // constructor
  
} // class Wall
