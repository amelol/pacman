class Game {
  
  constructor(canvasId) {
    this.intervalId = null
    
    const canvas = document.getElementById(canvasId)
    canvas.height = 492
    canvas.width = 620
    this.ctx = canvas.getContext("2d")

    this.background = new Background(this.ctx)
    this.pacman = new Pacman(this.ctx)

    this.drawCount = 0

    this.audio = new Audio('./assets/sound/theme.mp3')
  }

  start() {
    this.audio.play()

    this.intervalId = setInterval(() => {
      this.clear()
      if (this.drawCount > 30) {
        this.drawCount = 0
        this.move()
      }
      this.draw()
    }, 1000 / 60)
  }

  stop() {
    clearInterval(this.intervalId)
  }

  onKeyEvent(event) {
    this.pacman.onKeyEvent(event)
  }

  clear() {
    this.ctx.clearRect(0, 0, this.ctx.canvas.width, this.ctx.canvas.height)
  }

  draw() {
    this.drawCount++
    this.background.draw()
    this.pacman.draw()
  }

  move() {
    this.pacman.move() 
  }
    
}