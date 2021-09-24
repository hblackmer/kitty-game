const start = document.getElementById("start");
const kitty = document.querySelector("#kitty");
const pepper = document.querySelector("#pepper");
const pepperAnimation = document.querySelector(".pepper-animation");
let counter = 0;
let highScore = 0;
let randomizeSpeed = 0;
let interval = 0;

// Game paused until START button is clicked or ENTER keyboard input.
pepper.style.webkitAnimationPlayState = "paused";
kitty.style.webkitAnimationPlayState = "paused";

// Kitty jump animation.
function jump() {
    if (kitty.style.webkitAnimationPlayState === "running") {
        if (kitty.classList == "animate") { return }
        kitty.classList.add("animate");
        setTimeout(function () {
            kitty.classList.remove("animate");
        }, 300);
    }
}

// Kitty jumps with UP or SPACEBAR keyboard input. Option to start game with ENTER keyboard input.
document.addEventListener("keydown", function (e) {
    if (e.keyCode === 32 || e.keyCode === 38) {
        jump();
    }
    if (e.keyCode == 13) {
        gameLogic();
    }
});

// Start game with START button click.
start.addEventListener("click", function () {
    gameLogic();
});

// Randomize pepper speed.
const pepperSpeed = function () {
    randomizeSpeed = Math.floor(Math.random() * 3);
    if (randomizeSpeed === 2) {
        pepper.classList.add("pepper-animation-slow");
        pepper.classList.remove("pepper-animation-fast");
        pepper.classList.remove("pepper-animation");
    } else if (randomizeSpeed === 1) {
        pepper.classList.add("pepper-animation-fast");
        pepper.classList.remove("pepper-animation-slow");
        pepper.classList.remove("pepper-animation");
    } else {
        pepper.classList.add("pepper-animation");
        pepper.classList.remove("pepper-animation-fast");
        pepper.classList.remove("pepper-animation-slow");
    }
}

const gameLogic = function () {
    clearInterval(interval);

    pepper.style.animation = "pepper 0.85s infinite linear";
    start.style.display = "none";
    let kittyTop = parseInt(window.getComputedStyle(kitty).getPropertyValue("top"));
    let pepperLeft = parseInt(window.getComputedStyle(pepper).getPropertyValue("left"));
    kitty.style.webkitAnimationPlayState = "running";
    if (pepperLeft < 20 && pepperLeft > -20) {
        if (kittyTop >= 130) {
            pepper.style.animation = "none";
            counter = 0;
            pepper.style.animation = "pepper 0.85s infinite linear";
        }
        // Randomize next pepper speed.
        pepperSpeed();
    } else {
        counter++;
        let score = Math.floor(counter / 100);
        document.getElementById("score").innerHTML = score
        if (highScore < score) {
            highScore = score;
            document.getElementById("highScore").innerHTML = highScore;
        }
    }

    // Set counter timer based on speed of pepper.
    interval = setInterval(gameLogic, randomizeSpeed === 0 ? 8.95 : randomizeSpeed === 1 ? 6.5 : 9.95);
}