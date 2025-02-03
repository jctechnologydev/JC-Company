function toggleMenu() {
  const menu = document.querySelector('.navbar ul');
  menu.classList.toggle('active');
}

// Example Code Snippets to Display
const codeSnippets = [
  "const greeting = 'Hello, welcome to our portfolio';",
  "function add(a, b) {",
  "  return a + b;",
  "}",
  "let result = add(5, 10);",
  "console.log(result);",
  "for (let i = 0; i < 10; i++) {",
  "  console.log('Iteration:', i);",
  "}",
  "if (result > 10) {",
  "  console.log('The result is greater than 10.');",
  "}",
  "// Our startup can do great things for you, check it out!",
];

// DOM Element
const codeContainer = document.getElementById("code-container");

// Typing Effect Function
let index = 0;
let charIndex = 0;

function typeCode() {
  if (index < codeSnippets.length) {
    const currentSnippet = codeSnippets[index];
    if (charIndex < currentSnippet.length) {
      codeContainer.textContent += currentSnippet[charIndex];
      charIndex++;
    } else {
      codeContainer.textContent += "\n";
      charIndex = 0;
      index++;
    }
  } else {
    index = 0; // Reset to loop
    codeContainer.textContent = ""; // Clear container
  }
  setTimeout(typeCode, 85); // Adjust typing speed here
}

// Start Typing
typeCode();

// Function to scale when mouse over Expertise element
// Devoloped on 26/01/2025 
document.querySelectorAll('.card').forEach((card) => {
  card.addEventListener('mouseover', () => {
    card.style.transform = 'scale(1.05)';
    card.style.transition = 'transform 0.3s ease';
  });
  card.addEventListener('mouseout', () => {
    card.style.transform = 'scale(1)';
  });
});

const images = document.querySelectorAll('.gallery img');
        const modal = document.getElementById('modal');
        const modalImage = document.getElementById('modalImage');
        function openModal(src) {
            modal.style.display = 'flex';
            modalImage.src = src;
        }
        function closeModal() {
            modal.style.display = 'none';
        }
        images.forEach(img => {
            img.addEventListener('click', () => openModal(img.src));
        });

