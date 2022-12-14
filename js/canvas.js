import { Figure } from './figure.js';
import { Willy } from './willy.js';
import { Kate } from './kate.js';

export class Canvas {
  element = document.getElementById('canvas');
  arrayFigures = new Array();
  willy = null;

  constructor() {
    this.initScene();
  } // constructor

  initScene(){
    this.addFigure(new Kate(this));
    this.addFigure(this.willy = new Willy(this));
  } // initScene

  addFigure(/*Figure*/figure) {
    this.arrayFigures.push(figure);
  } // addFigure

  render() {
  } // render

  animation() {
  } // animation
  
} // class Canvas
