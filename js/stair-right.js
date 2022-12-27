import { Object } from './object.js';

export class StairRight extends Object {

  constructor(canvas, posX, posY) {
    super(canvas, posX, posY, 8, 8, 'stairRight');
    this.rightStair = 1;
  } // constructor
  
} // class StairRight
