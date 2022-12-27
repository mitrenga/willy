import { Object } from './object.js';

export class Item extends Object {

  imgElementObj = null;

  constructor(canvas, posX, posY, width, height, image) {
    super(canvas, posX, posY, width, height, 'item');

    var newObject = document.createElement('img');
    newObject.id =  'itemImg'+posX+posY;
    newObject.className = 'itemImg';
    newObject.src = 'images/'+image+'.png';
    this.elementObj.appendChild(newObject);
    this.imgElementObj = document.getElementById('itemImg'+posX+posY);
  } // constructor


  render() {
    super.render();
    this.imgElementObj.left = 8*this.canvas.scale+'px';
    this.imgElementObj.style.top = '0px';
    this.imgElementObj.style.width = (this.width-1)*this.canvas.scale+'px';
    this.imgElementObj.style.height = this.height*this.canvas.scale+'px';
  } // render


  animate() {
    this.imgElementObj.style.objectPosition =  -(this.canvas.longAnimationCounter*this.width)*this.canvas.scale+'px';
  } // animate

} // class Item
