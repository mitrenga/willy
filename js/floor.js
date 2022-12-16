import { Object } from './object.js';

export class Floor extends Object {

  constructor(canvas, posX, posY, width) {
    super(canvas, posX, posY, width, 8, 'floor');
  } // constructor
  
} // class Floor
