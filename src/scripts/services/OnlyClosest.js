export function onlyClosest(selector, handler) {
  return (e) => {
    const $target = e.target.closest(selector);
    if ($target) {
      e.preventDefault();
      handler(e, $target);
    }
  };
}

export default {
  onlyClosest,
};
