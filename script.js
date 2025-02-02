function toggleMenu() {
  const menu = document.querySelector('.navbar ul');
  menu.classList.toggle('active');
}


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

