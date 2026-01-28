document.addEventListener('DOMContentLoaded', () => {
  const bars = document.querySelectorAll('.s-wave-seasonal-alert-bar');
  if (!bars.length) return;

  bars.forEach((bar) => {
    const dismissKey = bar.dataset.dismissKey;
    const dismissDays = parseInt(bar.dataset.dismissDays || '0', 10) || 0;
    const startTimeRaw = bar.dataset.startTime;
    const endTimeRaw = bar.dataset.endTime;
    const expiredBehavior = bar.dataset.expiredBehavior || 'hide';
    const expiredMessage = bar.dataset.expiredMessage || 'Promotion ended';

    const messageEl = bar.querySelector('.s-wave-seasonal-alert-bar__message');
    const ctaEl = bar.querySelector('.s-wave-seasonal-alert-bar__cta');

    const startTime = startTimeRaw ? new Date(startTimeRaw).getTime() : null;
    const endTime = endTimeRaw ? new Date(endTimeRaw).getTime() : null;

    const isDismissed = () => {
      if (!dismissKey || dismissDays <= 0) return false;
      const stored = window.localStorage?.getItem(dismissKey);
      if (!stored) return false;
      const lastDismissed = Number(stored);
      if (Number.isNaN(lastDismissed)) return false;
      const ttl = dismissDays * 24 * 60 * 60 * 1000;
      return Date.now() - lastDismissed < ttl;
    };

    const showBar = () => {
      bar.classList.add('is-visible');
      bar.setAttribute('aria-hidden', 'false');
    };

    const hideBar = () => {
      bar.classList.remove('is-visible');
      bar.setAttribute('aria-hidden', 'true');
    };

    const updateVisibility = () => {
      if (isDismissed()) {
        hideBar();
        return;
      }

      const now = Date.now();
      if (startTime && now < startTime) {
        hideBar();
        return;
      }

      if (endTime && now >= endTime) {
        if (expiredBehavior === 'message') {
          if (messageEl) {
            messageEl.textContent = expiredMessage;
          }
          if (ctaEl) {
            ctaEl.style.display = 'none';
          }
          showBar();
        } else {
          hideBar();
        }
        return;
      }

      showBar();
    };

    const closeButton = bar.querySelector('.s-wave-seasonal-alert-bar__close');
    if (closeButton) {
      closeButton.addEventListener('click', () => {
        if (dismissKey) {
          try {
            window.localStorage?.setItem(dismissKey, String(Date.now()));
          } catch (error) {
            // ignore storage errors
          }
        }
        hideBar();
      });
    }

    updateVisibility();
    setInterval(updateVisibility, 60000);
  });
});
