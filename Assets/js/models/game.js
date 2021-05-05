class Game {
  
  constructor(canvasId) {
    this.intervalId = null
    
    const canvas = document.getElementById(canvasId)
    canvas.height = 492
    canvas.width = 620
    this.ctx = canvas.getContext("2d")
    this.gridWidth = 32.5
    this.background = new Background(this.ctx)
    this.pacman = new Pacman(this.ctx)
    this.coins = []

    for (let i = 0; i <= 10; i++) {
      this.addCoin()
    }
    
    this.drawCount = 0

    this.audio = new Audio('./assets/sound/theme.mp3')
  }

  start() {
    this.audio.play()

    this.intervalId = setInterval(() => {
      this.clear()
      if (this.drawCount > 25) {
        this.drawCount = 0
        this.move()
      }
      this.draw()
      this.checkCollisions()
    }, 1000 / 60)
  }

  checkCollisions() {
    const collidePacmanCoin = this.coins.some(coin => this.pacman.collidesWith(coin))
    if (collidePacmanCoin) {
      console.log('collision')
    }
  }

  // updateScore() {
  // this.score.value += 1
  // }

  addCoin() { 
    const coinX = Math.floor(Math.random() * 19) * this.gridWidth + this.gridWidth/2 + 1
    const coinY = Math.floor(Math.random() * 15) * this.gridWidth + this.gridWidth/2 + 3
    const coin = new Coin(this.ctx, coinX, coinY)
    this.coins.push(coin)
  }

  // eatCoins() {
  //   this.coins = this.coins.filter((o) => {
  //     if (o.isEaten()) {
  //       return true
  //     } else {
  //       this.updateScore()
  //     }
  //   })
  // }

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
    this.coins.forEach(coin => coin.draw())
  }

  move() {
    this.pacman.move() 
  }

  gameOver() {
    clearInterval(this.intervalId)
    //add pacman dead animation
    this.audio = new Audio('./assets/sound/die.mp3')
    this.audio.play()

    this.ctx.textAlign = "center";
    this.ctx.fillText(
      "GAME OVER",
      this.ctx.canvas.width / 2,
      this.ctx.canvas.height / 2
    );
  }
}
    
