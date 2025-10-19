export default function setupHome() {
  // Slider

  const SLIDER_ITEMS = document.querySelector(
    ".slider__items"
  ) as HTMLDivElement;
  const SLIDER_BTN_NEXT = document.querySelector(".btn-next")!;
  const SLIDER_BTN_PREV = document.querySelector(".btn-prev")!;

  SLIDER_BTN_NEXT.addEventListener("click", () => {
    stopAutoSlide();
    moveLeft();
    startAutoSlide();
  });
  SLIDER_BTN_PREV.addEventListener("click", () => {
    stopAutoSlide();
    moveRight();
    startAutoSlide();
  });

  let slideWidth: number;
  let maxTranslateX: number;
  let currentIndex = 0;
  const totalSlides = SLIDER_ITEMS.children.length;

  // adjust slider size
  function correctSizes() {
    if (window.innerWidth < 768) {
      slideWidth = 348;
      maxTranslateX = -(totalSlides - 1) * slideWidth;
    } else {
      slideWidth = 480;
      maxTranslateX = -(totalSlides - 1) * slideWidth;
    }
  }
  correctSizes();
  window.addEventListener("resize", correctSizes);

  let translateX = 0;
  function moveLeft() {
    if (translateX === maxTranslateX) {
      translateX = 0;
      currentIndex = 0;
    } else {
      translateX -= slideWidth;
      currentIndex += 1;
    }
    SLIDER_ITEMS.style.transform = `translateX(${translateX}px)`;
    startFilling();
  }

  function moveRight() {
    if (translateX === 0) {
      translateX = maxTranslateX;
      currentIndex = totalSlides - 1;
    } else {
      translateX += slideWidth;
      currentIndex -= 1;
    }
    SLIDER_ITEMS.style.transform = `translateX(${translateX}px)`;
    startFilling();
  }

  // mouse & touch slide

  let startX = 0;
  let currentX = 0;
  let isSwiping = false;

  function startSwipe(e: { preventDefault: () => void; clientX: number }) {
    e.preventDefault();
    startX = e.clientX;
    isSwiping = true;
    SLIDER_ITEMS.addEventListener("mousemove", moveSwipe);
  }

  function moveSwipe(event: { clientX: number }) {
    if (isSwiping) {
      currentX = event.clientX;
    }
  }

  function endSwipe() {
    if (!isSwiping) return;
    stopAutoSlide();
    const diffX = startX - currentX;
    const swipeThreshold = 50;

    if (diffX > swipeThreshold) {
      moveLeft();
    } else if (diffX < -swipeThreshold) {
      moveRight();
    }
    startAutoSlide();
    isSwiping = false;
  }

  SLIDER_ITEMS.addEventListener("mousedown", startSwipe);
  SLIDER_ITEMS.addEventListener("mouseup", endSwipe);
  SLIDER_ITEMS.addEventListener("mouseleave", endSwipe);
  //   SLIDER_ITEMS.addEventListener("touchstart", startSwipe);
  //   SLIDER_ITEMS.addEventListener("touchmove", moveSwipe);
  SLIDER_ITEMS.addEventListener("touchend", endSwipe);

  // NAVIGATION
  const SLIDER_NAV = document.querySelectorAll(".navigation-item");

  // Auto slide
  let autoSlideInterval: number | undefined;

  function startAutoSlide() {
    autoSlideInterval = setInterval(() => {
      SLIDER_NAV[currentIndex].classList.remove("navigation-item--active");
      moveLeft();
    }, 5000);
  }

  startAutoSlide();

  function startFilling() {
    SLIDER_NAV.forEach((item) =>
      item.classList.remove("navigation-item--active")
    );
    SLIDER_NAV[currentIndex].classList.add("navigation-item--active");
  }
  startFilling();

  function stopAutoSlide() {
    clearInterval(autoSlideInterval);
  }
}
