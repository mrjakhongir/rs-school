import images from "../../../public/data/images.json";

interface FavoriteCoffee {
  id: 8;
  name: string;
  price: string;
  category: string;
  description: string;
  discountPrice: string;
}

const gameState = {
  isLoading: false,
  isError: false,
  data: [] as FavoriteCoffee[],
};

export default async function setupHome() {
  // Slider

  const SLIDER = document.querySelector(".slider");
  if (!SLIDER) return;

  try {
    SLIDER.innerHTML = `
      <div class="loader">
        <div class='spinner'></div>
      </div>
    `;
    const res = await fetch(
      "https://6kt29kkeub.execute-api.eu-central-1.amazonaws.com/products/favorites"
    );

    if (!res.ok) {
      return (SLIDER.innerHTML = `
      <div class="error">
        <h2>Something went wrong. Please, refresh the page</h2>
      </div>
    `);
    }

    const data = await res.json();
    gameState.data = data.data;
    SLIDER.innerHTML = "";

    SLIDER.innerHTML = `<button class="slider__btn btn-prev">
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M6 12H18.5M18.5 12L12.5 6M18.5 12L12.5 18"
                    stroke="#403F3D"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                </svg>
              </button>
              <div class="slider-wrapper">
                <div class="slider__items">

                </div>
              </div>
              <button class="slider__btn btn-next">
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M6 12H18.5M18.5 12L12.5 6M18.5 12L12.5 18"
                    stroke="#403F3D"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                </svg>
              </button>`;

    const SLIDER_ITEMS = document.querySelector(
      ".slider__items"
    ) as HTMLDivElement;
    const SLIDER_BTN_NEXT = document.querySelector(".btn-next")!;
    const SLIDER_BTN_PREV = document.querySelector(".btn-prev")!;

    SLIDER_ITEMS.innerHTML = "";

    gameState.data.map((item) => {
      const image = images.coffee.find((img) => img.id === item.id);
      const coffee = `<div class="slider-item" key=${item.id}>
                            <div class="slider-item__img-wrapper">
                              <img
                                src=${image?.img}
                                alt="S’mores Frappuccino"
                              />
                            </div>

                            <h3 class="slider-item__title">${item.name}</h3>
                            <p class="slider-item__text">
                              ${item.description}
                            </p>
                            <div class="slider-item__price">$${item.price}</div>
                          </div>`;

      SLIDER_ITEMS.innerHTML += coffee;
    });

    let slideWidth: number;
    let maxTranslateX: number;
    let currentIndex = 0;
    const totalSlides = SLIDER_ITEMS.children.length;

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
    const SLIDER_NAV_WRAPPER = document.querySelector(".slider-navigation")!;

    SLIDER_NAV_WRAPPER.innerHTML = `
          <div class="slider-navigation">
            <div class="navigation-item">
              <div></div>
            </div>
            <div class="navigation-item">
              <div></div>
            </div>
            <div class="navigation-item">
              <div></div>
            </div>
          </div>
    `;

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
  } catch (err) {
    console.log(err);
    // SLIDER.innerHTML = `
    //   <div class="error">
    //     <h2>Something went wrong. Please, refresh the page</h2>
    //   </div>
    // `;
  }
}
