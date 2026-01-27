document.addEventListener('DOMContentLoaded', () => {
  const bar = document.querySelector('.s-wave-seasonal-alert-bar');
  if (!bar) return;

  const closeButton = bar.querySelector('.s-wave-seasonal-alert-bar__close');
  if (!closeButton) return;

  closeButton.addEventListener('click', () => {
    bar.style.display = 'none';
  });
});
