function toggleMenu() {
    const menu = document.querySelector('.navbar ul');
    menu.classList.toggle('active');
}

const canvas = document.getElementById("hexCanvas");
const ctx = canvas.getContext("2d");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const hexRadius = 80;
const hexWidth = Math.sqrt(10) * hexRadius;
const hexHeight = 2 * hexRadius;
const hexOffsetY = hexHeight * 2 / 4;
const hexOffsetX = hexWidth;
const glowColor = "#ee4406";
let mouseX = null, mouseY = null;

// Eventos de mouse para interação
canvas.addEventListener("mousemove", (event) => {
    mouseX = event.clientX;
    mouseY = event.clientY;
});

canvas.addEventListener("mouseleave", () => {
    mouseX = null;
    mouseY = null;
});

// Função para desenhar hexágonos
function drawHexagon(x, y, radius, glow) {
    ctx.beginPath();
    for (let i = 0; i < 6; i++) {
        let angle = (Math.PI / 3) * i;
        let px = x + radius * Math.cos(angle);
        let py = y + radius * Math.sin(angle);
        ctx.lineTo(px, py);
    }
    ctx.closePath();
    ctx.strokeStyle = glow ? glowColor : "transparent";
    ctx.lineWidth = glow ? 2 : 2;
    ctx.shadowBlur = glow ? 20 : 400;
    ctx.shadowColor = glow ? glowColor : "transparent";
    ctx.stroke();
}

// Função de animação
function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    for (let row = 0; row < canvas.height / hexOffsetY; row++) {
        for (let col = 0; col < canvas.width / hexOffsetX; col++) {
            let x = col * hexOffsetX + (row % 2 === 1 ? hexOffsetX / 2 : 0);
            let y = row * hexOffsetY;

            let distance = mouseX !== null ? Math.hypot(mouseX - x, mouseY - y) : Infinity;
            let glow = distance < 100;

            drawHexagon(x, y, hexRadius, glow);
        }
    }

    requestAnimationFrame(animate);
}

animate();

// Ajuste do canvas em redimensionamento
window.addEventListener("resize", () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
});

window.addEventListener("scroll", function () {
    let header = document.querySelector('#header')
    header.classList.toggle('roll', window.scrollY > 0)
});


window.addEventListener("scroll", function () {
    let nav = document.querySelector('#nav')
    nav.classList.toggle('roll', window.scrollY > 0)
});

const myObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
        if (entry.isIntersecting) {
            entry.target.classList.add('showicones')
        } else {
            entry.target.classList.remove('showicones')
        }
    })
});
const elements = document.querySelectorAll('.icones')

elements.forEach((element) => myObserver.observe(element));



const shapes = document.querySelectorAll('.shape');

const observer = new IntersectionObserver(
    (entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            } else {
                entry.target.classList.remove('visible');
            }
        });
    },
    {
        threshold: 0.5 // quanto da área do elemento deve estar visível para ativar (50%)
    }
);
shapes.forEach(shape => observer.observe(shape));



document.querySelectorAll('.shape').forEach(el => observer.observe(el));


const shapes1 = document.querySelectorAll('.shape');

window.addEventListener('scroll', () => {
    const triggerBottom = window.innerHeight * 1; // 80% da altura da janela

    shapes.forEach((shape, index) => {
        const rect = shape.getBoundingClientRect();
        const visibleRatio = Math.min(Math.max((triggerBottom - rect.top) / triggerBottom, 0), 1);

        shape.style.opacity = visibleRatio;
        shape.style.transform = `translateY(${50 * (1 - visibleRatio)}px)`;
    });
});