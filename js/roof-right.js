import { Object } from './object.js';

export class RoofRight extends Object {

  constructor(canvas, posX, posY) {
    super(canvas, posX, posY, 8, 8, 'roofRight');
    this.impenetrable = 1;
    this.rightStair = 1;
  } // constructor
  
} // class RoofRight
