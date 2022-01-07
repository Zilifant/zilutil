/**
 * Remove Preload Class
 * 
 * Remove `preload` CSS class from all elements after 1 second.
 * The `preload` class disables css transitions/animations.
 */

export function rmPreloadClass({ firstLoad }) {
  function remove() {
    setTimeout(() => {
      let targetNodes = document.querySelectorAll('.preload');
      for (let i = 0; i < targetNodes.length; i++) {
        targetNodes[i].classList.remove('preload');
      };
    }, 1000);
  };

  firstLoad ? document.addEventListener("DOMContentLoaded", remove) : remove();
};