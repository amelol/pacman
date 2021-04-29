class Game {
  
  constructor(canvasId) {
    this.intervalId = null
    
    const canvas = document.getElementById(canvasId)
    canvas.height = 518
    canvas.width = 520
    this.ctx = canvas.getContext("2d")

    this.background = new Background(this.ctx)
    // this.pacman = new Pacman(this.ctx)

    // this.obstacles = [
    //   new Obstacle(this.ctx)
    // ]

    this.drawCount = 0

    this.audio = new Audio('./assets/sound/theme.mp3')
  }

  start() {
    this.audio.play()

    this.intervalId = setInterval(() => {
      this.clear()
      this.move()
      this.draw()
      // this.checkCollisions()
      // if (this.drawCount > 200) {
      //   this.drawCount = 0
      //   this.addObstacle()
      // }
    }, 1000 / 60)
  }

  // checkCollisions() {
  //   const collision = this.obstacles.some(obstacle => {
  //     const colX = (
  //       this.mario.x + this.mario.w >= obstacle.x &&
  //       this.mario.x <= obstacle.x + obstacle.w
  //     )

  //     const colY = this.mario.y + this.mario.h >= obstacle.y

  //     return colX && colY
  //   })

  //   if (collision) {
  //     this.stop()
  //   }
  // }

  stop() {
    clearInterval(this.intervalId)
  }

  onKeyEvent(event) {
  //   this.pacman.onKeyEvent(event)
  }

  clear() {
    this.ctx.clearRect(0, 0, this.ctx.canvas.width, this.ctx.canvas.height)

    // this.obstacles = this.obstacles.filter(o => {
    //   return o.x + o.w >= 0
    // })
  }

  draw() {
    this.drawCount++
    this.background.draw()
    // this.pacman.draw()
    //this.obstacles.forEach(o => o.draw())
  }

  move() {
    // this.pacman.move()
    // this.obstacles.forEach(o => o.move())
  }

  // addObstacle() {
  //   const newObstacle = new Obstacle(this.ctx)

  //   this.obstacles.push(newObstacle)    
  // }
}