// Parallax effect for article cards
document.addEventListener('DOMContentLoaded', function() {
  const cards = document.querySelectorAll('.article-card');

  cards.forEach(card => {
    const background = card.querySelector('.card-background');

    if (!background) return;

    card.addEventListener('mousemove', function(e) {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      const centerX = rect.width / 2;
      const centerY = rect.height / 2;

      const percentX = (x - centerX) / centerX;
      const percentY = (y - centerY) / centerY;

      const moveX = percentX * 10;
      const moveY = percentY * 10;

      background.style.transform = `scale(1.15) translate(${moveX}px, ${moveY}px)`;
    });

    card.addEventListener('mouseleave', function() {
      background.style.transform = 'scale(1.1)';
    });
  });
});
