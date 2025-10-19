// disable scroll
export function disableScroll(): void {
  const widthScroll = window.innerWidth - document.body.offsetWidth;
  document.body.style.overflow = "hidden";
  document.body.style.paddingRight = `${widthScroll}px`;
}

// enable scroll
export function enableScroll(): void {
  document.body.style.overflow = "auto";
  document.body.style.paddingRight = "0";
}
