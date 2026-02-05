// Buttons and elements
const yesBtn = document.getElementById('yesBtn');
const noBtn = document.getElementById('noBtn');
const celebration = document.getElementById('celebration');
const heartsContainer = document.getElementById('hearts-container');

let noClicks = 0;
let yesSize = 120; // initial width of Yes button

// Texts for No button clicks
const noTexts = [
  "Are you sure?",
  "Think again…",
  "One more time??",
  "Actually, no",
  "Babe stwoppp",
  "I'm sad baby!"
];

// Handle No button clicks
noBtn.addEventListener('click', () => {
  if (noClicks < noTexts.length) {
    noBtn.innerText = noTexts[noClicks];
    noClicks++;

    // Grow Yes button
    yesSize += 40;
    yesBtn.style.width = `${yesSize}px`;
    yesBtn.style.height = `${yesSize/2}px`;

    // Shrink No button
    const newWidth = Math.max(40, 120 - noClicks*15);
    const newHeight = Math.max(20, 60 - noClicks*10);
    noBtn.style.width = `${newWidth}px`;
    noBtn.style.height = `${newHeight}px`;
  }
});

// Handle Yes button click
yesBtn.addEventListener('click', () => {
    celebration.classList.remove('hidden'); // show celebration
    triggerHearts();
    triggerConfetti();
    triggerFireworks();
});

// Floating hearts
function triggerHearts() {
  for (let i = 0; i < 30; i++) {
    const heart = document.createElement('div');
    heart.innerText = '❤️';
    heart.style.left = Math.random() * window.innerWidth + 'px';
    heart.style.top = window.innerHeight + 'px';
    heart.style.fontSize = `${Math.random()*30+20}px`;
    heart.style.animationDuration = `${2+Math.random()*3}s`;
    heartsContainer.appendChild(heart);

    setTimeout(() => heart.remove(), 5000);
  }
}

// Confetti
function triggerConfetti() {
    const colors = ['#ff4d6d', '#ffb3c1', '#fff100', '#00ffff', '#ff66ff'];
    for (let i = 0; i < 100; i++) {
        const confetti = document.createElement('div');
        confetti.innerText = '🎉';
        confetti.style.position = 'fixed';
        confetti.style.left = Math.random() * window.innerWidth + 'px';
        confetti.style.top = Math.random() * window.innerHeight + 'px';
        confetti.style.fontSize = `${Math.random()*30+20}px`;
        confetti.style.pointerEvents = 'none';
        confetti.style.animation = `confettiFall ${2+Math.random()*2}s ease-out forwards`;
        document.body.appendChild(confetti);
        setTimeout(() => confetti.remove(), 4000);
    }
}

// Simple fireworks
function triggerFireworks() {
    const canvas = document.getElementById('fireworks');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    const ctx = canvas.getContext('2d');

    const particles = [];
    for (let i = 0; i < 100; i++) {
        particles.push({
            x: Math.random()*canvas.width,
            y: Math.random()*canvas.height,
            vx: (Math.random()-0.5)*10,
            vy: (Math.random()-0.5)*10,
            color: `hsl(${Math.random()*360}, 100%, 50%)`,
            life: 100
        });
    }

    function animate() {
        ctx.clearRect(0,0,canvas.width,canvas.height);
        particles.forEach(p => {
            ctx.fillStyle = p.color;
            ctx.beginPath();
            ctx.arc(p.x, p.y, 5, 0, Math.PI*2);
            ctx.fill();
            p.x += p.vx;
            p.y += p.vy;
            p.life--;
        });
        if (particles.some(p => p.life > 0)) requestAnimationFrame(animate);
    }
    animate();
}
