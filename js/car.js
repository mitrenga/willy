import { Figure } from './figure.js';

export class Car extends Figure {
  
  constructor(canvas) {
    super(canvas, 'car', 'car', 'images/car.png');
    this.posX = 55*8;
    this.posY = 1*8;
    this.imageWidth = 26;
    this.imageHeight = 16;
  } // constructor

} // class Rocket