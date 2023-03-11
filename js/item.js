const { Object } = await import('./object.js?ver='+window.srcVersion);

export class Item extends Object {

  imgElementObj = null;
  action = null;

  constructor(canvas, posX, posY, width, height, image, action = null) {
    super(canvas, posX, posY, width, height, 'item');

    this.cssClass = image;
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
        if (this.action['figureType'] != null) {
          this.canvas.willy.figureType = this.action['figureType'];
          switch (this.action['figureType']) {
            case 0: { // Willy
              this.canvas.willy.elementObj.src = 'images/willy.png';
              this.canvas.willy.imageWidth = 12;
                    break;
            }
            case 1: { // Jetpac
              this.canvas.willy.elementObj.src = 'images/willy-jetpac.png';
              this.canvas.willy.imageWidth = 12;
              break;
            }
            case 2: { // Willy in car
              this.canvas.willy.elementObj.src = 'images/willy-car.png';
              this.canvas.willy.imageWidth = 32;
              break;
            }
            case 3: { // Willy in plane
              this.canvas.willy.elementObj.src = 'images/willy-plane.png';
              this.canvas.willy.imageWidth = 32;
              break;
            }
          } // switch
          if (this.action['enableItem'] != null) {
            for (let i = 0; i < this.canvas.arrayItems.length; i++) {
              if (this.canvas.arrayItems[i].cssClass == this.action['enableItem']) {
                this.canvas.arrayItems[i].catch = 1;
                this.canvas.arrayItems[i].imgElementObj.style.visibility = 'visible';
              }
            }
          }
          this.canvas.willy.render();
        }
      } else {
        for (let i = 0; i < this.canvas.arrayObjects.length; i++) {
          if (this.canvas.arrayObjects[i].targetId == this.action['targetId']) {
            if (this.action['movePosY'] != null)
              this.canvas.arrayObjects[i].movePosY = this.action['movePosY'];
            if (this.action['moveHeight'] != null)
              this.canvas.arrayObjects[i].moveHeight = this.action['moveHeight'];
            break;
          }
        }    
      }
    }
  } // capture

} // class Item
