let scrollY = 0;
let isLocked = false;

export function lockScroll() {
  if (isLocked) return;
  isLocked = true;

  scrollY = window.scrollY;
  document.body.style.position = "fixed";
  document.body.style.top = `-${scrollY}px`;
  document.body.style.width = "100%";
  document.body.style.overflow = "hidden";
  document.body.style.touchAction = "none"; // prevent mobile touch freeze
}

export function unlockScroll() {
  if (!isLocked) return;
  isLocked = false;

  document.body.style.position = "";
  document.body.style.top = "";
  document.body.style.width = "";
  document.body.style.overflow = "";
  document.body.style.touchAction = "";
  window.scrollTo(0, scrollY);
}
