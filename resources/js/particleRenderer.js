const canvas = document.querySelector('.particles');
const ctx = canvas.getContext('2d');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const particlesArray = [];
const mouse = { x: null, y: null, radius: 150 }; // Mouse coordinates and interaction radius

class Particle {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.size = Math.random() * 3 + 1;
        this.speedX = Math.random() - 0.5;
        this.speedY = Math.random() - 0.5;
    }

    update() {
        this.x += this.speedX;
        this.y += this.speedY;

        // Reverse direction if particle goes out of canvas bounds
        if (this.x > canvas.width || this.x < 0) this.speedX *= -1;
        if (this.y > canvas.height || this.y < 0) this.speedY *= -1;

        const dx = mouse.x - this.x; // Difference in x-coordinates
        const dy = mouse.y - this.y; // Difference in y-coordinates
        const distance = Math.sqrt(dx * dx + dy * dy); // Distance from mouse to particle

        // If within mouse radius, apply a force that pushes the particle away from the mouse
        if (distance < mouse.radius) {
            const force = (mouse.radius - distance) / mouse.radius; // Calculate force based on distance
            this.x -= (dx / distance) * force * 5;
            this.y -= (dy / distance) * force * 5;
        }
    }

    draw() {
        ctx.fillStyle = 'rgba(255, 255, 255, 0.1)';
        ctx.shadowBlur = 15;
        ctx.shadowColor = 'rgba(255, 255, 255, 0.8)';
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();
    }
}

const particleDensityFactor = 0.0001;

function init() {
    particlesArray.length = 0; // Clear previous particles
    const numberOfParticles = Math.floor((canvas.width * canvas.height) * particleDensityFactor);

    // Create new particles and add them to the array
    Array.from({ length: numberOfParticles }).forEach(() => {
        const x = Math.random() * canvas.width;
        const y = Math.random() * canvas.height;
        particlesArray.push(new Particle(x, y));
    });
}

function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height); // Clear canvas for each frame
    particlesArray.forEach(particle => {
        particle.update();
        particle.draw();
    });
    requestAnimationFrame(animate);
}

// Adjust canvas size and reinitialize particles on window resize
window.addEventListener('resize', () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    init();
});

// Update mouse coordinates on mouse movement
window.addEventListener('mousemove', (event) => {
    mouse.x = event.x;
    mouse.y = event.y;
});

init();
animate();