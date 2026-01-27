document.addEventListener('DOMContentLoaded', () => {
  const bar = document.querySelector('.s-wave-seasonal-alert-bar');
  if (!bar) return;

  const dismissKey = bar.dataset.dismissKey;
  if (dismissKey && window.localStorage?.getItem(dismissKey) === '1') {
    bar.style.display = 'none';
    return;
  }

  const closeButton = bar.querySelector('.s-wave-seasonal-alert-bar__close');
  if (!closeButton) return;

  closeButton.addEventListener('click', () => {
    if (dismissKey) {
      try {
        window.localStorage?.setItem(dismissKey, '1');
      } catch (error) {
        // ignore storage errors
      }
    }
    bar.style.display = 'none';
  });
});
