import { disableScroll, enableScroll } from "../../utils/utils";

export function setupHeader() {
  const HAMBURGER = document.querySelector(".hamburger")!;
  const NAV = document.querySelector(".nav")!;
  const NAV_ITEMS = document.querySelectorAll(".nav__links a")!;

  let isNavOpen = false;

  HAMBURGER.addEventListener("click", () => {
    if (isNavOpen) {
      NAV.classList.remove("nav-open");
      HAMBURGER.classList.remove("hamburger-open");
      enableScroll();
    } else {
      NAV.classList.add("nav-open");
      HAMBURGER.classList.add("hamburger-open");
      disableScroll();
    }

    isNavOpen = !isNavOpen;
  });

  NAV_ITEMS.forEach((item) => {
    item.addEventListener("click", () => {
      NAV.classList.remove("nav-open");
      HAMBURGER.classList.remove("hamburger-open");
      enableScroll();
    });
  });
}
