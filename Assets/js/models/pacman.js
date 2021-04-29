class Pacman {

  constructor(ctx) {
    this.ctx = ctx

    this.x = 2
    this.y = 460
    this.y0 = this.y

    this.vx = 0
    this.vy = 0

    this.w = 55
    this.h = 55
    this.h0 = this.h

    this.img = new Image()
    this.img.drawCount = 0
    this.img.frames = 3
    this.img.frameIndex = 0
    this.img.src = './assets/img/pacman.png'
  }


  onKeyEvent(event) {
  }

  draw() {
    this.img.drawCount++

    if (this.img.drawCount >= 10) {
      this.img.drawCount = 0
      this.animate()
    }

    this.ctx.drawImage(
      this.img,
      this.img.frameIndex * this.img.width / this.img.frames,
      0,
      this.img.width / 3,
      this.img.height,
      this.x,
      this.y,
      this.w,
      this.h
    )
  }

  animate() {
    this.img.frameIndex++

    if (this.img.frameIndex >= this.img.frames){
      this.img.frameIndex = 0
    }
  }

}