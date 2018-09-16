/* global document XMLHttpRequest */

const CONFIG = {
  attr: 'data-icon-sprite',
};

const Icons = {
  init() {
    const $iconSprite = document.querySelector(`[${CONFIG.attr}]`);
    const path = $iconSprite.getAttribute(CONFIG.attr) || null;

    if (!path) {
      return;
    }

    const ajax = new XMLHttpRequest();
    ajax.open('GET', path, true);
    ajax.send();

    ajax.onload = () => {
      $iconSprite.insertAdjacentHTML('beforeend', ajax.responseText);
    };
  },
};

export default Icons;
