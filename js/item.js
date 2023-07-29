const { Object } = await import('./object.js?ver='+window.srcVersion);

export class Item extends Object {

  imgElementObj = null;
  actions = null;

  constructor(canvas, posX, posY, imgWidth, imgHeight, cssClass, actions = null, myId = '') {
    super(canvas, posX, posY, imgWidth, imgHeight, 'item', myId);

    this.cssClass = cssClass;
    this.imgElementObj = document.createElement('img');
    this.imgElementObj.className = 'itemImg';
    this.imgElementObj.src = 'images/'+cssClass+'.png';
    this.elementObj.appendChild(this.imgElementObj);

    this.item = 1;
    this.catch = 1;
    this.actions = actions;
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
    if (this.actions != null) {
      for (let i = 0; i < this.actions.length; i++) {
        this.setActions (this.actions[i]);
      }
    }
  } // capture


  setActions(actions) {
    if (actions['targetId'] == '@willy') {
      if (actions['figureType'] != null) {
        this.canvas.willy.figureType = actions['figureType'];
        switch (actions['figureType']) {
          case 0: { // Willy
            this.canvas.willy.elementObj.src = 'images/willy.png';
            this.canvas.willy.imgWidth = 12;
            break;
          }
          case 1: { // Jetpac
            this.canvas.willy.elementObj.src = 'images/willy-jetpac.png';
            this.canvas.willy.imgWidth = 12;
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
        if (this.canvas.willy.jump) {
          this.canvas.deltaY = this.canvas.willy.jump;
          this.canvas.willy.jump = 0;
          this.canvas.willy.jumpCounter = 0;
          this.canvas.willy.jumpDirection = 0;
        }
        this.canvas.willy.render();
      }
    } else {
      for (let i = 0; i < this.canvas.arrayObjects.length; i++) {
        if (this.canvas.arrayObjects[i].myId == actions['targetId']) {
          if (actions['changePosX'] != null)
            this.canvas.arrayObjects[i].changePosX = actions['changePosX'];
          if (actions['setPosX'] != null)
            this.canvas.arrayObjects[i].changePosX = actions['setPosX']-this.canvas.arrayObjects[i].posX;
          if (actions['changePosY'] != null)
            this.canvas.arrayObjects[i].changePosY = actions['changePosY'];
          if (actions['setPosY'] != null)
            this.canvas.arrayObjects[i].changePosY = actions['setPosY']-this.canvas.arrayObjects[i].posY;
          if (actions['changeWidth'] != null)
            this.canvas.arrayObjects[i].changeWidth = actions['changeWidth'];
          if (actions['setWidth'] != null)
            this.canvas.arrayObjects[i].changeWidth = actions['setWidth']-this.canvas.arrayObjects[i].imgWidth;
          if (actions['changeHeight'] != null)
            this.canvas.arrayObjects[i].changeHeight = actions['changeHeight'];
          if (actions['setHeight'] != null)
            this.canvas.arrayObjects[i].changeHeight = actions['setHeight']-this.canvas.arrayObjects[i].imgHeight;
          if (actions['enable'] != null) {
            this.canvas.arrayObjects[i].catch = 1;
            this.canvas.arrayObjects[i].imgElementObj.style.visibility = 'visible';
          }
          if (actions['disable'] != null) {
            this.canvas.arrayObjects[i].catch = 0;
            this.canvas.arrayObjects[i].imgElementObj.style.visibility = 'hidden';
          }
        }
      }    
    }
  } // setActions

} // class Item
