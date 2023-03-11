const { Object } = await import('./object.js?ver='+window.srcVersion);

export class Item extends Object {

  imgElementObj = null;
  action = null;

  constructor(canvas, posX, posY, width, height, image, action = null) {
    super(canvas, posX, posY, width, height, 'item');

    this.imgElementObj = document.createElement('img');
    this.imgElementObj.id =  'itemImg'+posX+posY;
    this.imgElementObj.className = 'itemImg';
    this.imgElementObj.src = 'images/'+image+'.png';
    this.elementObj.appendChild(this.imgElementObj);

    this.item = 1;
    this.catch = 1;
    this.action = action;
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
    if (this.action != null) {
      if (this.action['targetId'] == '@willy') {
        this.canvas.willy.figureType = 1;
        this.canvas.willy.elementObj.src = 'images/willy-jetpac.png';
        this.canvas.willy.imageWidth = 12;
        this.canvas.willy.render();
      } else {
        for (let i = 0; i < this.canvas.arrayObjects.length; i++) {
          if (this.canvas.arrayObjects[i].targetId == this.action['targetId']) {
            if (this.action['movePosY'])
              this.canvas.arrayObjects[i].movePosY = this.action['movePosY'];
            if (this.action['moveHeight'])
              this.canvas.arrayObjects[i].moveHeight = this.action['moveHeight'];
            break;
          }
        }    
      }
    }
  } // capture

} // class Item
