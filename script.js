function toggleMenu() {
  const menu = document.querySelector('.navbar ul');
  menu.classList.toggle('active');
}

// Example Code Snippets to Display
const codeSnippets = [
  "const greeting = 'Hello, World!';",
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
  "// End of example code.",
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
  setTimeout(typeCode, 80); // Adjust typing speed here
}

// Start Typing
typeCode();