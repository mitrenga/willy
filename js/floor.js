const { Object } = await import('./object.js?ver='+window.srcVersion);

export class Floor extends Object {

  constructor(canvas, posX, posY, imgWidth, cssClass, targetId = '', decoration = 0) {
    super(canvas, posX, posY, imgWidth, 8, cssClass, targetId, decoration);
  } // constructor
  
} // class Floor
