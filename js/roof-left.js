import { Object } from './object.js';

export class RoofLeft extends Object {

  constructor(canvas, posX, posY) {
    super(canvas, posX, posY, 8, 8, 'roofLeft');
    this.impenetrable = 1;
    this.leftStair = 1;
  } // constructor
  
} // class RoofLeft
