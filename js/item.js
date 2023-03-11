const { Object } = await import('./object.js?ver='+window.srcVersion);

export class Item extends Object {

  imgElementObj = null;

  constructor(canvas, posX, posY, width, height, image) {
    super(canvas, posX, posY, width, height, 'item');

    this.imgElementObj = document.createElement('img');
    this.imgElementObj.id =  'itemImg'+posX+posY;
    this.imgElementObj.className = 'itemImg';
    this.imgElementObj.src = 'images/'+image+'.png';
    this.elementObj.appendChild(this.imgElementObj);

    this.item = 1;
    this.catch = 1;
  } // constructor


  render() {
    super.render();
    this.imgElementObj.left = 8*this.canvas.scale+'px';
    this.imgElementObj.style.top = '0px';
    this.imgElementObj.style.width = (this.width-1)*this.canvas.scale+'px';
    this.imgElementObj.style.height = this.height*this.canvas.scale+'px';
  } // render


  animate() {
    if (this.catch == 1)
      this.imgElementObj.style.objectPosition =  -(this.canvas.longAnimationCounter*this.width)*this.canvas.scale+'px';
  } // animate

  
  checkTouch() {
    if (!this.catch)
      return;

    if ((this.canvas.willy.posX+this.canvas.willy.imageWidth-2 <= this.posX) ||
        (this.canvas.willy.posX >= this.posX+this.width) ||
        (this.canvas.willy.posY+this.canvas.willy.jump+this.canvas.deltaY+this.canvas.willy.imageHeight <= this.posY) ||
        (this.canvas.willy.posY+this.canvas.willy.jump+this.canvas.deltaY >= this.posY+this.height))
    {
      return;
    }
    this.capture();
  } // checkTouch


  capture() {
    this.catch = 0;
    this.imgElementObj.style.visibility = 'hidden';
  } // capture

} // class Item
