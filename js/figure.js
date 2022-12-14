export class Figure {

  canvas = null;
  elementId = null;
  elementObj = null;
  imageFileName = '';

  constructor(canvas, elementId, imageFileName) {
    this.canvas = canvas;
    this.elementId = elementId;
    this.imageFileName = imageFileName;
    var newObject = document.createElement('img');
    newObject.id = this.elementId;
    newObject.src = this.imageFileName;
    canvas.element.appendChild(newObject);
    this.elementObj = document.getElementById(this.elementId);
  } // constructor

  render() {
  } // render

  animation() {
  } // animation
 
} // class Figure
