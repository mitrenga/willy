const { Object } = await import('./object.js?ver='+window.srcVersion);

export class Floor extends Object {

  constructor(canvas, posX, posY, imgWidth, cssClass) {
    super(canvas, posX, posY, imgWidth, 8, cssClass);
  } // constructor
  
} // class Floor
