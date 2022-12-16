import { Object } from './object.js';

export class Wall extends Object {

  constructor(canvas, posX, posY, width, height) {
    super(canvas, posX, posY, width, height, 'wall');
    this.impenetrable = 1;
  } // constructor
  
} // class Wall
