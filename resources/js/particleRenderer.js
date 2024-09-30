const canvas = document.querySelector('.particles');
const ctx = canvas.getContext('2d');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let particlesArray = [];

class Particle {
    constructor(x, y) {
        this.x = x; // Particle's initial x position
        this.y = y; // Particle's initial y position
        this.size = Math.random() * 3 + 1; // Random size between 1 and 4
        this.speedX = Math.random() * 0.5 - 0.25; // Random speed on x-axis
        this.speedY = Math.random() * 0.5 - 0.25; // Random speed on y-axis
    }

    update() {
        this.x += this.speedX;
        this.y += this.speedY;

        // Loop particles back to the other side of the canvas
        if (this.size < 0.3) this.size = 0; // Remove very small particles
        if (this.x > canvas.width + this.size || this.x < 0 - this.size || this.y > canvas.height + this.size || this.y < 0 - this.size) {
            this.reset();
        }
    }

    reset() {
        this.x = Math.random() * canvas.width; // Random x position
        this.y = Math.random() * canvas.height; // Random y position
        this.size = Math.random() * 3 + 1; // Random size between 1 and 4
    }

    draw() {
        ctx.fillStyle = 'rgba(255, 255, 255, 0.1)'; // Subtle white particles
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2); // Create a circular particle
        ctx.closePath();
        ctx.fill(); // Fill the particle with color
    }
}

function init() {
    particlesArray = [];
    for (let i = 0; i < 30; i++) { // Create 30 particles
        particlesArray.push(new Particle(Math.random() * canvas.width, Math.random() * canvas.height));
    }
}

function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height); // Clear the canvas
    particlesArray.forEach(particle => {
        particle.update(); // Update each particle's position
        particle.draw(); // Draw each particle
    });
    requestAnimationFrame(animate); // Request the next frame
}

window.addEventListener('resize', () => {
    canvas.width = window.innerWidth; // Update canvas width
    canvas.height = window.innerHeight; // Update canvas height
    init(); // Reinitialize particles
});

// Start the animation
init();
animate();