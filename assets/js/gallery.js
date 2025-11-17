// Gallery modal functionality
document.addEventListener('DOMContentLoaded', function() {
  const modal = document.getElementById('gallery-modal');
  const modalImg = document.getElementById('gallery-modal-img');
  const closeBtn = document.querySelector('.gallery-close');
  const galleryItems = document.querySelectorAll('.gallery-thumbnail');

  if (!modal) return;

  galleryItems.forEach(item => {
    item.addEventListener('click', function() {
      modal.classList.add('active');
      modalImg.src = this.src;
      document.body.style.overflow = 'hidden';
    });
  });

  if (closeBtn) {
    closeBtn.addEventListener('click', closeModal);
  }

  modal.addEventListener('click', function(e) {
    if (e.target === modal) {
      closeModal();
    }
  });

  function closeModal() {
    modal.classList.remove('active');
    document.body.style.overflow = 'auto';
  }

  // Close on Escape key
  document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape') {
      closeModal();
    }
  });
});
