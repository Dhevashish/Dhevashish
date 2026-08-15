/* Live-site polish + reliable football motion */
(() => {
  // Replace the closing CTA with a non-clickable contact label.
  const closingAction = document.querySelector('.closing .button-main');
  if (closingAction) {
    const contact = document.createElement('span');
    contact.className = 'button button-main closing-contact';
    contact.textContent = 'dheva608@gmail.com';
    closingAction.replaceWith(contact);
  }

  // Animate the football itself by moving SVG coordinates rather than relying on
  // CSS transforms on an SVG circle, which are inconsistent across browsers.
  const ball = document.querySelector('.field-ball');
  if (!ball || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

  const start = { x: 245, y: 205 };
  const end = { x: 585, y: 315 };
  const duration = 4200;
  const begin = performance.now();

  const animateBall = (now) => {
    const raw = ((now - begin) % duration) / duration;
    const eased = raw < 0.5
      ? 2 * raw * raw
      : 1 - Math.pow(-2 * raw + 2, 2) / 2;
    const x = start.x + (end.x - start.x) * eased;
    const y = start.y + (end.y - start.y) * eased - Math.sin(raw * Math.PI) * 42;
    ball.setAttribute('cx', x.toFixed(1));
    ball.setAttribute('cy', y.toFixed(1));
    requestAnimationFrame(animateBall);
  };

  requestAnimationFrame(animateBall);
})();
