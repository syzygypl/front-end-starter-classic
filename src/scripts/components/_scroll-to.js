import { scrollTo } from "../_helpers";

const $scrollTriggers = window.document.querySelectorAll('[data-scroll-to]');
const $scrollingEl = window.document.scrollingElement || window.document.documentElement;

$scrollTriggers && $scrollTriggers.forEach($item => {
  const $scrollTrigger = $item;
  $scrollTrigger.addEventListener('click', (e) => {
    const href = $scrollTrigger.getAttribute('data-scroll-to') || $scrollTrigger.getAttribute('href').substring(1);

    if (href) {
      e.preventDefault();
      const $target = window.document.getElementById(href);
      const $navigation = window.document.getElementById('top');
      const offset = $navigation ? $navigation.offsetHeight : 0;
      const to = $target ? $scrollingEl.scrollTop + $target.getBoundingClientRect().top - offset : 0;

      scrollTo(to, 750);
    }
  });
});
