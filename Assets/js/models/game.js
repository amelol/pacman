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
    this.score = document.getElementById("game-score")
    this.ghosts = []

    for (let i = 0; i <= 10; i++) {
      this.addCoin()
    }
    
    this.drawCount = 0
    this.drawCountGhost = 100

    this.audio = new Audio('./assets/sound/theme.mp3')
  }

  start() {
    this.audio.play()

    this.intervalId = setInterval(() => {
      this.clear()
    
      if (this.drawCount % 25 === 0) {
        this.move()
      }

      if (this.drawCount > this.drawCountGhost) {
        this.drawCountGhost = Math.random() * 200 + 600
        this.drawCount = 0
        this.addGhost() 
      }
      this.draw()
      this.checkCollisions()
    }, 1000 / 60)
  }

  checkCollisions() {
    const collidePacmanCoin = this.coins.find(coin => this.pacman.collidesWith(coin))
    if (collidePacmanCoin) {
      this.coins = this.coins.filter(function(coin){ 
        return coin != collidePacmanCoin; 
      });
      this.addCoin()
      this.updateScore()
    }

    const collidePacmanGhost = this.ghosts.find(ghost => this.pacman.collidesWith(ghost))
    if (collidePacmanGhost) {
      this.gameOver()
      console.log("game over")
    }    
  }

  updateScore() {
    this.score.innerText = Number(this.score.innerText) + 1
  }

  addCoin() { 
    const coinX = Math.floor(Math.random() * 19) * this.gridWidth + this.gridWidth/2 + 1
    const coinY = Math.floor(Math.random() * 15) * this.gridWidth + this.gridWidth/2 + 3
    const coin = new Coin(this.ctx, coinX, coinY)
    this.coins.push(coin)
  }

  addGhost() { 
    const ghostX = this.background.w - this.gridWidth
    const ghostY = Math.floor(Math.random() * 15) * this.gridWidth + this.gridWidth
    const ghost = new Ghost(this.ctx, ghostX, ghostY)
    this.ghosts.push(ghost)
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
    this.ghosts.forEach(ghost => ghost.draw())
  }

  move() {
    this.pacman.move() 
    // this.ghosts.forEach(ghost => ghost.move())
  }

  gameOver() {
    this.ctx.font = "50px Arial";
    this.ctx.textAlign = "center";
    this.ctx.fillStyle = "white";
    this.ctx.fillText(
      "GAME OVER",
      this.ctx.canvas.width / 2,
      this.ctx.canvas.height / 2
    );

    clearInterval(this.intervalId)
  }
}
    
