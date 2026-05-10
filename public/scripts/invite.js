document.addEventListener('DOMContentLoaded', () => {

    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.15
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('is-visible');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    document.querySelectorAll('.fade-in-up, .slide-in, .slide-in-left, .slide-in-right').forEach(el => {
        observer.observe(el);
    });

    const canvas = document.getElementById('petal-canvas');
    if (!canvas) return;

    const ctx = canvas.getContext('2d');

    function resizeCanvas() {
        canvas.width = canvas.offsetWidth;
        canvas.height = canvas.offsetHeight;
    }
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    const PETAL_COLORS = [
        'rgba(245, 182, 193, 0.75)',
        'rgba(255, 210, 220, 0.65)',
        'rgba(230, 190, 210, 0.70)',
        'rgba(210, 190, 230, 0.60)',
        'rgba(255, 228, 225, 0.80)',
    ];

    const PETAL_COUNT = 38;
    const petals = [];

    function drawPetal(ctx, x, y, size, angle, color) {
        ctx.save();
        ctx.translate(x, y);
        ctx.rotate(angle);
        ctx.beginPath();
        ctx.moveTo(0, 0);
        ctx.bezierCurveTo(size, -size, size * 2, size, 0, size * 2.2);
        ctx.bezierCurveTo(-size * 2, size, -size, -size, 0, 0);
        ctx.closePath();
        ctx.fillStyle = color;
        ctx.fill();
        ctx.restore();
    }

    function createPetal() {
        const size = Math.random() * 7 + 5;
        return {
            x: Math.random() * canvas.width,
            y: Math.random() * -canvas.height,
            size,
            speed: Math.random() * 1.0 + 0.5,
            drift: (Math.random() - 0.5) * 0.8,
            angle: Math.random() * Math.PI * 2,
            spin: (Math.random() - 0.5) * 0.03,
            sway: Math.random() * 0.6 + 0.2,
            swayOff: Math.random() * Math.PI * 2,
            color: PETAL_COLORS[Math.floor(Math.random() * PETAL_COLORS.length)],
            opacity: Math.random() * 0.5 + 0.5,
        };
    }

    for (let i = 0; i < PETAL_COUNT; i++) {
        const p = createPetal();
        p.y = Math.random() * canvas.height;
        petals.push(p);
    }

    let frame = 0;

    function animate() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        frame++;

        petals.forEach(p => {
            p.x += p.drift + Math.sin(frame * 0.012 + p.swayOff) * p.sway;
            p.y += p.speed;
            p.angle += p.spin;

            if (p.y > canvas.height + 20) {
                Object.assign(p, createPetal());
                p.y = -20;
                p.x = Math.random() * canvas.width;
            }

            ctx.globalAlpha = p.opacity;
            drawPetal(ctx, p.x, p.y, p.size, p.angle, p.color);
        });

        ctx.globalAlpha = 1;
        requestAnimationFrame(animate);
    }

    animate();
});


const itemRevealObserver = new IntersectionObserver((entries, obs) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('revealed');
            obs.unobserve(entry.target);
        }
    });
}, { root: null, rootMargin: '0px 0px -60px 0px', threshold: 0.12 });

document.querySelectorAll('.gallery-stack .gallery-item').forEach(el => {
    itemRevealObserver.observe(el);
});
