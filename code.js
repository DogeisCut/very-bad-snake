var canvas = document.getElementById("canvas");
var ctx = canvas.getContext("2d");
addEventListener("keydown", getArrowKeyInput);

//https://en.wikipedia.org/wiki/Snake_(video_game_genre)#Gameplay

var box = 20;
ctx.canvas.width = window.innerWidth;
ctx.canvas.height = window.innerHeight;

class snakeClass {
    constructor() {
        this.x = 0;
        this.y = 0;
        this.xspeed = 1;
        this.yspeed = 0;
        this.total = 0;
        this.tail = [];
    }
    
    draw() {
        ctx.fillStyle = "green";
        for (let i = 0; i < this.tail.length; i++) {
        ctx.fillRect(this.tail[i].x, this.tail[i].y, box, box);
        }
        ctx.fillRect(this.x, this.y, box, box);
    }
    
    update() {
        for (let i = 0; i < this.tail.length - 1; i++) {
        this.tail[i] = this.tail[i + 1];
        }
        this.tail[this.total - 1] = { x: this.x, y: this.y };
    
        this.x += this.xspeed * box;
        this.y += this.yspeed * box;
    }
    
    eat() {
        if (
        this.x === food.x &&
        this.y === food.y &&
        this.total < maxSize
        ) {
        this.total++;
        return true;
        }
        return false;
    }
    
    die() {
        for (let i = 0; i < this.tail.length; i++) {
        if (
            this.x === this.tail[i].x &&
            this.y === this.tail[i].y &&
            this.total > 1
        ) {
            this.total = 1;
            return true;
        } 
        if (this.x < 0 || this.x > canvas.width || this.y < 0 || this.y > canvas.height) {
            this.total = 1;
            return true;
        }
        return false;
    }
}
    
    changeDirection(direction) {
        switch (direction) {
        case "Up":
            this.xspeed = 0;
            this.yspeed = -1;
            break;
        case "Down":
            this.xspeed = 0;
            this.yspeed = 1;
            break;
        case "Left":
            this.xspeed = -1;
            this.yspeed = 0;
            break;
        case "Right":
            this.xspeed = 1;
            this.yspeed = 0;
            break;
        }
    }
}

class foodClass {
    constructor() {
        this.x = Math.floor(Math.random() * canvas.width/box) * box;
        this.y = Math.floor(Math.random() * canvas.height/box) * box;
    }
    
    draw() {
        ctx.fillStyle = "red";
        ctx.fillRect(this.x, this.y, box, box);
    }
}

snake = new snakeClass();
food = new foodClass();
score = 0;
maxSize = 999999999;
gameOver = false;
snake.total = 1;
snake.x = box;
snake.y = box;
snake.xspeed = 1;
snake.yspeed = 0;
snake.tail = [{ x: box, y: box }];

function getArrowKeyInput(e) {
    if (e.keyCode === 38) {
        snake.changeDirection("Up");
    } else if (e.keyCode === 40) {
        snake.changeDirection("Down");
    } else if (e.keyCode === 37) {
        snake.changeDirection("Left");
    } else if (e.keyCode === 39) {
        snake.changeDirection("Right");
    }
}

function gameLoop() {
    ctx.canvas.width = window.innerWidth;
    ctx.canvas.height = window.innerHeight;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    food.draw();
    snake.draw();
    snake.update();
    if (snake.eat()) {
        food = new foodClass();
    }
    if (snake.die()) {
        gameOver = true;
        clearInterval(game);
        drawDeathScreen()
    }
}

function calculateDeathCause() {
    if (snake.x < 0 || snake.x > canvas.width || snake.y < 0 || snake.y > canvas.height) {
        return "Out of bounds";
    }
    for (let i = 0; i < snake.tail.length; i++) {
        if (snake.x === snake.tail[i].x && snake.y === snake.tail[i].y) {
            return "Collision";
        }
    }
    return "Unknown";
}

function drawDeathScreen() {
    if (gameOver) {
    ctx.fillStyle = "black";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = "white";
    ctx.font = "50px Arial";
    ctx.fillText("Game Over", canvas.width / 2 - 150, canvas.height / 2);
    ctx.font = "30px Arial";
    ctx.fillText("Score: " + score, canvas.width / 2 - 50, canvas.height / 2 + 50);
    ctx.font = "30px Arial";
    ctx.fillText("Cause of death: " + calculateDeathCause(), canvas.width / 2 - 100, canvas.height / 2 + 100);
    ctx.font = "20px Arial";
    ctx.fillText("Refresh to restart", canvas.width / 2 - 50, canvas.height / 2 + 150);
    }
}

game = setInterval(gameLoop, 100);
