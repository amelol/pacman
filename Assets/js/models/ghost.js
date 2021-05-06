class Ghost {

  constructor(ctx, x, y) {
    this.ctx = ctx

    this.w = 32.6
    this.h = 32.8    

    this.x = x
    this.y = y
 

    this.vx = 5
    this.vy = 5

    this.img = new Image()
    this.img.drawCount = 0
    this.img.frames = 2
    this.img.frameIndex = 0
    this.img.src = './assets/img/ghost.png'
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
      this.img.width / 2,
      this.img.height,
      this.x,
      this.y,
      this.w,
      this.h
    )
  } 
    
  move() {
    this.x += this.vx
    this.y += this.vy
  }

  animate() {
    this.img.frameIndex++

    if (this.img.frameIndex >= this.img.frames){
      this.img.frameIndex = 0
    }
  }

  collidesWith(element){
    return this.x < element.x + element.w &&
    this.x + this.w > element.x &&
    this.y < element.y + element.h &&
    this.y + this.h> element.y
  }

}