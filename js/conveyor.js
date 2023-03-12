const { Object } = await import('./object.js?ver='+window.srcVersion);

export class Conveyor extends Object {

  arrayImages = new Array();
  leftConveyor = 0;
  rightConveyor = 0;

  constructor(canvas, posX, posY, imgWidth, operation) {
    super(canvas, posX, posY, imgWidth, 8, 'conveyor');

    switch (operation) {
       case 'right': this.rightConveyor = 1; break;
       case 'left': this.leftConveyor = 1; break;
    }
    var length = imgWidth;
    var counter = 0;
    while (length > 0) {
      var newObject = document.createElement('img');
      newObject.id =  'conveyorImg'+posX+posY+counter;
      newObject.className = 'conveyorImg';
      newObject.src = 'images/conveyor.png';
      this.elementObj.appendChild(newObject);
      this.arrayImages.push(newObject);
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
      if (this.rightConveyor) {
        this.arrayImages[i].style.objectPosition =  -(56-this.canvas.animationCounter*8)*this.canvas.scale+'px';
      }
      if (this.leftConveyor) {
        this.arrayImages[i].style.objectPosition =  -(this.canvas.animationCounter*8)*this.canvas.scale+'px';
      }
    }
  } // animate

} // class Conveyor
