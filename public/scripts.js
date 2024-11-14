let flappyList = [];
let gravity = 0.05;
let paddleY;
let paddleWidth;
let paddleHeight;
let Points = 0;
let Lives = 3;
let flappyTimer;



var flappy1

function preload () {
  backgroundImage = loadImage( "Landscape.png");
  flappyImage = loadImage("FlappyBird pix.png");
  gameOverImage = loadImage( "Gmae over screen.png");
}

function setup() {
    createCanvas(windowWidth,windowWidth / 4);
    createFlappies();
    paddleY = windowWidth/4 - 50;
    paddleWidth = windowWidth/20;
    paddleHeight = windowWidth/50;
  }
  function draw() {
    background("brown");
    image(backgroundImage, 0, 0, windowWidth, windowWidth / 4);
    createPaddle();

    textSize(32)
    fill("red")
    text("Points:" + Points, 20,50)
    textSize(20)
    fill("black")
    text("Lives:" + Lives, 20,75)

    
    flappyList.forEach(function(flappyObject, index) {
      flappyObject.move();
      if (flappyObject.x > windowWidth) {
        flappyList.splice(index, 1);
        Points = Points + 1
      }

      if (flappyObject.y > windowWidth / 4) {
        flappyList.splice(index, 1);
        Lives = Lives - 1;
        if (Lives === 0) {
          GameOver();
        }
      }
    });
  }

  function GameOver() {
    noLoop();
    image(gameOverImage, 0, 0, windowWidth, windowWidth / 4);
    clearTimeout(flappyTimer);

  };
  
  function createPaddle(){
    fill("#ff4dd2")
    rect(mouseX, paddleY, paddleWidth, paddleHeight, 20, 20, 20, 20,);
  }

  function createFlappies() {
    flappyObject = new Flappy ();
    flappyList.unshift(flappyObject)
    console.log(flappyList)
    flappyTimer = setTimeout(createFlappies, 4000)
  }


  class Flappy {
  constructor() {
    this.x = 0;
    this.y = windowWidth/6;
    this.width = 70;
    this.height = 60;
    this.Xspeed = random(2,5);
    this.Yspeed = -5;
  }
  
  move() {
    this.Yspeed = this.Yspeed + gravity;
    this.y = this.y + this.Yspeed;
    if(this.y + this.height > paddleY && this.y < paddleY + paddleHeight && this.x + this.width > mouseX && this.x < mouseX + paddleWidth){
      this.Yspeed = -abs(this.Yspeed);
    }
    this.x = this.x + this.Xspeed;
    image(flappyImage, this.x, this.y, this.width, this.height);
  }
  }