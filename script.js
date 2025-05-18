var money = 0;
let button1 = document.querySelector(".button");
let upgrade1 = document.querySelector(".special_button");
let plusmoney = 1;
let upgradeUsed = false;
let upgradeUsed2 = false;

resetPlusMoney();
const clickSound = document.getElementById("myAudio");




const canvas = document.getElementById('background');
const ctx = canvas.getContext('2d');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let mouse = { x: null, y: null };
let dots = [];

class Dot {
  constructor() {
    this.x = Math.random() * canvas.width;
    this.y = Math.random() * canvas.height;
    this.radius = 2;
  }

  // Draw dot
  draw() {
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
    ctx.fillStyle = '#aaa';
    ctx.fill();
  }

  // Connect dot to mouse cursor
  connectToCursor() {
    if (mouse.x !== null && mouse.y !== null) {
      const dx = mouse.x - this.x;
      const dy = mouse.y - this.y;
      const distance = Math.sqrt(dx * dx + dy * dy);

      // Only connect dots within a certain distance
      if (distance < 100) {
        ctx.beginPath();
        ctx.moveTo(this.x, this.y);
        ctx.lineTo(mouse.x, mouse.y);
        ctx.strokeStyle = `rgba(170, 170, 170, ${1 - distance / 100})`;
        ctx.lineWidth = 1;
        ctx.stroke();
      }
    }
  }
}

// Create dots
for (let i = 0; i < 150; i++) {
  dots.push(new Dot());
}

// Update mouse position
window.addEventListener('mousemove', function (e) {
  mouse.x = e.x;
  mouse.y = e.y;
});

// Animate the background
function animate() {
  ctx.clearRect(0, 0, canvas.width, canvas.height); // Clear canvas

  dots.forEach(dot => {
    dot.draw();
    dot.connectToCursor();
  });

  requestAnimationFrame(animate); // Loop the animation
}

animate();






document.querySelectorAll(".button").forEach(button => {
  button.addEventListener("click", () => {
    // Rewind to start in case it's clicked rapidly
    clickSound.currentTime = 0;
    clickSound.play();
  });
});
function changemoney() {
    money += plusmoney;
    document.getElementById("money").innerHTML = '$' + money;

    // Show $100 upgrade if not used yet
    if (money >= 100 && !upgradeUsed) {
        upgrade1.innerHTML = 'buy a bike for $100, +$1 per click';
        upgrade1.style.display = 'block';
    }

    // Show $500 upgrade if $100 is already bought
    else if (money >= 500 && upgradeUsed && !upgradeUsed2) {
        upgrade1.innerHTML = 'buy a TV for $500, +$2 per click';
        upgrade1.style.display = 'block';
    }
}

function upgrade(a) {
    if (a === 1 && !upgradeUsed && money >= 100) {
        plusmoney += 1;
        money -= 100;
        upgradeUsed = true;
        upgrade1.style.display = 'none';
        document.getElementById("money").innerHTML = '$' + money;
    }

    else if (a === 2 && upgradeUsed && !upgradeUsed2 && money >= 500) {
        plusmoney += 2;
        money -= 500;
        upgradeUsed2 = true;
        upgrade1.style.display = 'none';
        document.getElementById("money").innerHTML = '$' + money;
    }
}

function resetPlusMoney() {
    plusmoney = 1;
}

button1.addEventListener('click', changemoney);

upgrade1.addEventListener('click', function() {
    if (!upgradeUsed && money >= 100) {
        upgrade(1);
    } else if (upgradeUsed && !upgradeUsed2 && money >= 500) {
        upgrade(2);
    }
});

document.getElementById("money").innerHTML = '$' + money;








function showFloatingText(variable, x, y) {
    const text = document.createElement("div");
    text.className = "floating-text";
    text.innerText = `+${variable}`;
    text.style.left = `${x}px`;
    text.style.top = `${y}px`;
  
    document.body.appendChild(text); // now using body as container
  
    setTimeout(() => {
      text.remove();
    }, 1000);
  }
  
  // Example usage:
  button1.addEventListener("click", (e) => {
    showFloatingText(plusmoney, e.clientX, e.clientY);
  });




