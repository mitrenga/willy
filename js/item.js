const { Object } = await import('./object.js?ver='+window.srcVersion);

export class Item extends Object {

  imgElementObj = null;
  options = null;

  constructor(canvas, posX, posY, imgWidth, imgHeight, image, options = null, targetId = '') {
    super(canvas, posX, posY, imgWidth, imgHeight, 'item', targetId);

    this.cssClass = image;
    this.imgElementObj = document.createElement('img');
    this.imgElementObj.className = 'itemImg';
    this.imgElementObj.src = 'images/'+image+'.png';
    this.elementObj.appendChild(this.imgElementObj);

    this.item = 1;
    this.catch = 1;
    this.options = options;
} // constructor


  render() {
    super.render();
    this.imgElementObj.left = 8*this.canvas.scale+'px';
    this.imgElementObj.style.top = '0px';
    this.imgElementObj.style.width = (this.imgWidth-1)*this.canvas.scale+'px';
    this.imgElementObj.style.height = this.imgHeight*this.canvas.scale+'px';
  } // render


  animate() {
    super.animate();
    if (this.catch == 1)
      this.imgElementObj.style.objectPosition =  -(this.canvas.longAnimationCounter*this.imgWidth)*this.canvas.scale+'px';
  } // animate

  
  checkTouch() {
    if (!this.catch)
      return;

    if ((this.canvas.willy.posX+this.canvas.willy.imgWidth-2 <= this.posX) ||
        (this.canvas.willy.posX >= this.posX+this.imgWidth) ||
        (this.canvas.willy.posY+this.canvas.willy.jump+this.canvas.deltaY+this.canvas.willy.imgHeight <= this.posY) ||
        (this.canvas.willy.posY+this.canvas.willy.jump+this.canvas.deltaY >= this.posY+this.imgHeight))
    {
      return;
    }
    this.capture();
  } // checkTouch


  capture() {
    this.catch = 0;
    this.imgElementObj.style.visibility = 'hidden';
    if (this.options != null) {
      if (Array.isArray(this.options)) {
        for (let i = 0; i < this.options.length; i++) {
          this.setAction (this.options[i]);
        }
      } else {
        this.setAction (this.options);
      }
    }
  } // capture


  setAction(options) {
    if (options['targetId'] == '@willy') {
      if (options['figureType'] != null) {
        this.canvas.willy.figureType = options['figureType'];
        switch (options['figureType']) {
          case 0: { // Willy
            this.canvas.willy.elementObj.src = 'images/willy.png';
            this.canvas.willy.imgWidth = 12;
            break;
          }
          case 1: { // Jetpac
            this.canvas.willy.elementObj.src = 'images/willy-jetpac.png';
            this.canvas.willy.imgWidth = 12;
            if (this.canvas.willy.jump) {
              this.canvas.deltaY = this.canvas.willy.jump;
              this.canvas.willy.jump = 0;
              this.canvas.willy.jumpCounter = 0;
              this.canvas.willy.jumpDirection = 0;
            }
            break;
          }
          case 2: { // Willy in car
            this.canvas.willy.elementObj.src = 'images/willy-car.png';
            this.canvas.willy.imgWidth = 32;
            break;
          }
          case 3: { // Willy in plane
            this.canvas.willy.elementObj.src = 'images/willy-plane.png';
            this.canvas.willy.imgWidth = 32;
            break;
          }
        } // switch
        this.canvas.willy.render();
      }
    } else {
      for (let i = 0; i < this.canvas.arrayObjects.length; i++) {
        if (this.canvas.arrayObjects[i].targetId == options['targetId']) {
          if (options['changePosX'] != null)
            this.canvas.arrayObjects[i].changePosX = options['changePosX'];
          if (options['setPosX'] != null)
            this.canvas.arrayObjects[i].changePosX = options['setPosX']-this.canvas.arrayObjects[i].posX;
          if (options['changePosY'] != null)
            this.canvas.arrayObjects[i].changePosY = options['changePosY'];
          if (options['setPosY'] != null)
            this.canvas.arrayObjects[i].changePosY = options['setPosY']-this.canvas.arrayObjects[i].posY;
          if (options['changeWidth'] != null)
            this.canvas.arrayObjects[i].changeWidth = options['changeWidth'];
          if (options['setWidth'] != null)
            this.canvas.arrayObjects[i].changeWidth = options['setWidth']-this.canvas.arrayObjects[i].imgWidth;
          if (options['changeHeight'] != null)
            this.canvas.arrayObjects[i].changeHeight = options['changeHeight'];
          if (options['setHeight'] != null)
            this.canvas.arrayObjects[i].changeHeight = options['setHeight']-this.canvas.arrayObjects[i].imgHeight;
          if (options['enable'] != null) {
            this.canvas.arrayObjects[i].catch = 1;
            this.canvas.arrayObjects[i].imgElementObj.style.visibility = 'visible';
          }
          if (options['disable'] != null) {
            this.canvas.arrayObjects[i].catch = 0;
            this.canvas.arrayObjects[i].imgElementObj.style.visibility = 'hidden';
          }
        }
      }    
    }
  } // setAction

} // class Item
