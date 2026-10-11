// On a hard load the preloader covers the page, so entrance animations started
// straight away would play unseen. Calls `start` once the preloader begins to
// lift (or at once if there isn't one) and returns a cleanup.
export function afterPreloader(start: () => void, delay = 350) {
  const preloader = document.querySelector(".preloader");
  if (!preloader || preloader.hasAttribute("data-leaving")) {
    start();
    return () => {};
  }

  let timer = 0;
  const observer = new MutationObserver(() => {
    if (preloader.isConnected && !preloader.hasAttribute("data-leaving")) return;
    observer.disconnect();
    timer = window.setTimeout(start, delay);
  });
  observer.observe(preloader, { attributes: true, attributeFilter: ["data-leaving"] });
  if (preloader.parentNode) observer.observe(preloader.parentNode, { childList: true });

  return () => {
    observer.disconnect();
    window.clearTimeout(timer);
  };
}
