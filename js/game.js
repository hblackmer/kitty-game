let start = document.getElementById("start");
let kitty = document.querySelector("#kitty");
let pepper = document.querySelector("#pepper");
let counter = 0;
let highScore = 0;

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

const gameLogic = function () {
    const game = setInterval(function () {
        pepper.style.webkitAnimationPlayState = "running";
        start.style.display = "none";
        let kittyTop = parseInt(window.getComputedStyle(kitty).getPropertyValue("top"));
        let pepperLeft = parseInt(window.getComputedStyle(pepper).getPropertyValue("left"));
        kitty.style.webkitAnimationPlayState = "running";
        if (pepperLeft < 20 && pepperLeft > -20 && kittyTop >= 130) {
            pepper.style.animation = "none";
            counter = 0;
            pepper.style.animation = "pepper 1s infinite linear";
        } else {
            counter++;
            let score = Math.floor(counter / 100);
            document.getElementById("score").innerHTML = score
            if (highScore < score) {
                highScore = score;
                document.getElementById("highScore").innerHTML = highScore;
            }
        }
    }, 10);
}