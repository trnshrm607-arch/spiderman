const spiderman = document.getElementById("spiderman");
const obstacle = document.getElementById("obstacle");
const scoreDisplay = document.getElementById("score");

let isJumping = false;
let score = 0;

// Jump function
function jump() {
  if (isJumping) return;
  isJumping = true;
  let position = 0;
  const upInterval = setInterval(() => {
    if (position >= 100) {
      clearInterval(upInterval);
      // fall down
      const downInterval = setInterval(() => {
        if (position <= 0) {
          clearInterval(downInterval);
          isJumping = false;
        }
        position -= 5;
        spiderman.style.bottom = position + "px";
      }, 20);
    }
    position += 5;
    spiderman.style.bottom = position + "px";
  }, 20);
}

// Move obstacle
function moveObstacle() {
  let obstaclePosition = 600;
  obstacle.style.left = obstaclePosition + "px";

  const moveInterval = setInterval(() => {
    if (obstaclePosition < -40) {
      obstaclePosition = 600;
      score++;
      scoreDisplay.textContent = "Score: " + score;
    } else {
      obstaclePosition -= 5;
    }

    obstacle.style.left = obstaclePosition + "px";

    // Collision detection
    let spidermanBottom = parseInt(spiderman.style.bottom) || 0;
    if (obstaclePosition > 50 && obstaclePosition < 90 && spidermanBottom < 40) {
      alert("Game Over! Final Score: " + score);
      score = 0;
      scoreDisplay.textContent = "Score: " + score;
      obstaclePosition = 600;
    }
  }, 20);
}

// Controls
document.addEventListener("keydown", (e) => {
  if (e.code === "Space") {
    jump();
  }
});

// Start game
moveObstacle();
