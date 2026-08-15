/* Live-site polish + reliable motion */
(() => {
  // Make the navigation language match the story of the site.
  const mindLink = document.querySelector('.nav nav a[href="#mind"]');
  if (mindLink) mindLink.textContent = 'Curious';

  // Replace the closing CTA with a non-clickable contact label.
  const closingAction = document.querySelector('.closing .button-main');
  if (closingAction) {
    const contact = document.createElement('span');
    contact.className = 'button button-main closing-contact';
    contact.textContent = 'dheva608@gmail.com';
    closingAction.replaceWith(contact);
  }

  // Remove the old constellation centre caption from the DOM entirely.
  document.querySelector('.board-center')?.remove();

  const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  // Reliable marquee loop. The ticker contains two identical content sets,
  // so moving by exactly half the track width produces a seamless cycle.
  const ticker = document.querySelector('.ticker-track');
  if (ticker && !reduced) {
    let cycle = Math.max(1, ticker.scrollWidth / 2);
    const speed = 42; // px/sec
    const started = performance.now();

    const resize = () => {
      cycle = Math.max(1, ticker.scrollWidth / 2);
    };
    addEventListener('resize', resize, { passive: true });

    const animateTicker = (now) => {
      const elapsed = (now - started) / 1000;
      const offset = (elapsed * speed) % cycle;
      ticker.style.transform = `translate3d(${-offset}px,0,0)`;
      requestAnimationFrame(animateTicker);
    };
    requestAnimationFrame(animateTicker);
  } else if (ticker) {
    ticker.style.transform = 'translate3d(0,0,0)';
  }

  // Animate the football by updating SVG coordinates rather than relying on
  // CSS transforms on an SVG circle.
  const ball = document.querySelector('.field-ball');
  if (ball && !reduced) {
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
  }
})();
