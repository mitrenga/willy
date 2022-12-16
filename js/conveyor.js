import { Object } from './object.js';

export class Conveyor extends Object {

  arrayImages = new Array();

  constructor(canvas, posX, posY, width) {
    super(canvas, posX, posY, width, 8, 'conveyor');
    this.leftConveyor = 1;
    var length = width;
    var counter = 0;
    while (length > 0) {
      var newObject = document.createElement('img');
      newObject.id =  'conveyorImg'+posX+posY+counter;
      newObject.className = 'conveyorImg';
      newObject.src = 'images/conveyor.png';
      this.elementObj.appendChild(newObject);
      this.arrayImages.push(document.getElementById('conveyorImg'+posX+posY+counter));
      counter++;
      length -= 8;
    } // while
  } // constructor


  render() {
    super.render();
    for (let i = 0; i < this.arrayImages.length; i++) {
      this.arrayImages[i].style.left = i*8*this.canvas.scale+'px';
      this.arrayImages[i].style.top = '0px';
      this.arrayImages[i].style.width = 8*this.canvas.scale+'px';
      this.arrayImages[i].style.height = 8*this.canvas.scale+'px';
    }
  } // render


  animate() {
    for (let i = 0; i < this.arrayImages.length; i++) {
      this.arrayImages[i].style.objectPosition =  -(this.canvas.animationCounter*8)*this.canvas.scale+'px';
    }
  } // animate

} // class Conveyor
