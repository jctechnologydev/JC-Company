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

document.addEventListener('DOMContentLoaded', function () {
  const openBtn = document.getElementById('open_btn');
  const sidebar = document.getElementById('sidebar');

  if (openBtn && sidebar) {
    openBtn.addEventListener('click', function (e) {
      e.stopPropagation();
      sidebar.classList.toggle('open-sidebar');
    });

    // Fecha quando clicar fora
    document.addEventListener('click', function (e) {
      const isClickInsideSidebar = sidebar.contains(e.target);
      const isClickOnButton = openBtn.contains(e.target);

      if (!isClickInsideSidebar && !isClickOnButton) {
        sidebar.classList.remove('open-sidebar');
      }
    });
  }
});

/* Animated Slider cards Styles */

var shadow = '0 20px 50px rgba(0,34,45,0.5)';

function styles(item_id, x, y, z, opacity, shadow, focus = false) {
    let element = document.getElementById(item_id);
    element.style.transform = 'translate3d(' + x + 'px, ' + y + 'px, ' + z + 'px)';
    element.style.opacity = opacity;
    element.style.boxShadow = shadow;
    element.style.cursor = focus ? 'pointer' : 'unset';
}

let currentCursor = 1;
let cardLength = 0;
let timeoutCardAnimated = null;

window.addEventListener("load", () => {
    cardLength = document.getElementsByClassName('card-block-wrap')[0].children.length;
    getCardAnimated(currentCursor)
    loopCardAnimated();
});


function focusCursor(index) {
    let cursor = document.getElementById('card_cursor_' + index);
    cursor.classList.add('focus');
}
function removeFocusCursor(index) {
    let cursor = document.getElementById('card_cursor_' + index);
    cursor.classList.remove('focus');
}

function showCardContent(index) {
    let cardContent = document.getElementById('card_content_' + index);
    cardContent.style.display = 'block';
}
function hideCardContent(index) {
    let cardContent = document.getElementById('card_content_' + index);
    cardContent.style.display = 'none';
}

function getCardAnimated(index, manual = false) {
    if (manual) {

        oldCursor = currentCursor
        currentCursor = index;
        clearTimeout(timeoutCardAnimated)
        setTimeout(loopCardAnimated, 10000)

        if (index == oldCursor) {
            return
        }
    }
    for (let i = 1; i <= cardLength; i++) {
        let x_prop = (Math.floor(Math.random() * 40) * (i - index) * (Math.floor(Math.random() * 3) - 1));
        x_prop = x_prop > 50 ? 50 : x_prop;
        x_prop = x_prop < -50 ? -50 : x_prop;


        let y_prop = Math.floor(Math.random() * 30) + (10 * i);
        y_prop = y_prop > 60 ? 60 : y_prop;
        y_prop = y_prop < -60 ? -60 : y_prop;

        let z_prop = Math.floor(Math.random() * 50) * -1;
        let opacity_prop = 0.6;
        let shadow_prop = 'none'
        if (index == i) {
            x_prop = 0;
            y_prop = 0;
            z_prop = 50;
            opacity_prop = 1;
            shadow_prop = shadow;
            showCardContent(i);
            focusCursor(i)
        } else {

            removeFocusCursor(i)
            hideCardContent(i);
        }
        styles('card_' + i, x_prop, y_prop, z_prop, opacity_prop, shadow_prop, index == i);
    }
}

function loopCardAnimated() {
    if (timeoutCardAnimated) {
        clearTimeout(timeoutCardAnimated)
    }
    timeoutCardAnimated = setInterval(() => {
        currentCursor++
        if (currentCursor > cardLength) {
            currentCursor = 1;
        }
        getCardAnimated(currentCursor)
    }, 10000)
}