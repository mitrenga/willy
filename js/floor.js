const { Object } = await import('./object.js?ver='+window.srcVersion);

export class Floor extends Object {

  constructor(canvas, posX, posY, width, cssClass) {
    super(canvas, posX, posY, width, 8, cssClass);
  } // constructor
  
} // class Floor
