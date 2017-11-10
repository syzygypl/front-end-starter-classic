Math.easeInOutQuad = (t, b, c, d) => {
  t /= d/2;
  if (t < 1) return c/2*t*t + b;
  t--;
  return -c/2 * (t*(t-2) - 1) + b;
};

export function scrollTo(to, duration) {
  const $scrollingEl = window.document.scrollingElement || window.document.documentElement;
  const start = $scrollingEl.scrollTop;
  const change = to - start;
  const increment = 20;
  let scrollToTimer;
  let currentTime = 0;

  const animateScroll = () => {
    currentTime += increment;
    $scrollingEl.scrollTop = Math.easeInOutQuad(currentTime, start, change, duration);

    if (currentTime < duration) {
      scrollToTimer = setTimeout(animateScroll, increment);
    }
  };

  animateScroll(start);
}
