import "./home.css";

export function HomePage() {
  return `<section id="welcome">
        <div class="container">
          <div class="welcome__inner">
            <video class="welcome__bg" autoplay muted loop>
              <source src="./assets/videos/bg-video.mp4" type="video/mp4" />
              Your browser does not support the video tag.
            </video>
            <div class="welcome__content">
              <h1 class="welcome__title">
                <span>Enjoy</span> premium coffee at our charming cafe
              </h1>
              <p class="welcome__text">
                With its inviting atmosphere and delicious coffee options, the
                Coffee House Resource is a popular destination for coffee lovers
                and those seeking a warm and inviting space to enjoy their
                favorite beverage.
              </p>
              <a href="/menu" class="menu-btn">
                <span>Menu</span>
                <img
                  src="./assets/images/icons/coffee-cup.svg"
                  alt="coffee cup"
                />
              </a>
            </div>
          </div>
        </div>
      </section>
      <section id="favorite-coffee">
        <div class="container">
          <div class="favorite-coffee__inner">
            <h2 class="section-title favorite-coffee__title">
              Choose your <span>favorite</span> coffee
            </h2>
            <div class="slider">
              <button class="slider__btn btn-prev">
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
                  <div class="slider-item">
                    <img
                      src="./assets/images/pictures/coffee-slider-1.png"
                      alt="S’mores Frappuccino"
                    />
                    <h3 class="slider-item__title">S’mores Frappuccino</h3>
                    <p class="slider-item__text">
                      This new drink takes an espresso and mixes it with brown
                      sugar and cinnamon before being topped with oat milk.
                    </p>
                    <div class="slider-item__price">$5.50</div>
                  </div>
                  <div class="slider-item">
                    <img
                      src="./assets/images/pictures/coffee-slider-2.png"
                      alt="S’mores Frappuccino"
                    />
                    <h3 class="slider-item__title">Caramel Macchiatoo</h3>
                    <p class="slider-item__text">
                      Fragrant and unique classic espresso with rich
                      caramel-peanut syrup, with cream under whipped thick foam.
                    </p>
                    <div class="slider-item__price">$5.00</div>
                  </div>
                  <div class="slider-item">
                    <img
                      src="./assets/images/pictures/coffee-slider-3.png"
                      alt="S’mores Frappuccino"
                    />
                    <h3 class="slider-item__title">Ice coffee</h3>
                    <p class="slider-item__text">
                      A popular summer drink that tones and invigorates.
                      Prepared from coffee, milk and ice.
                    </p>
                    <div class="slider-item__price">$4.50</div>
                  </div>
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
              </button>
            </div>
            <div class="slider-navigation">
              <div class="navigation-item"><div></div></div>
              <div class="navigation-item"><div></div></div>
              <div class="navigation-item"><div></div></div>
            </div>
          </div>
        </div>
      </section>
      <section id="about">
        <div class="container">
          <div class="about__inner">
            <h2 class="section-title about__title">
              Resource is <span> the perfect and cozy place </span> where you
              can enjoy a variety of hot beverages, relax, catch up with
              friends, or get some work done.
            </h2>
            <div class="about__images">
              <div class="left-col">
                <div class="image-wrapper">
                  <img src="./assets/images/pictures/about-1.jpg" alt="" />
                </div>
                <div class="image-wrapper">
                  <img src="./assets/images/pictures/about-2.jpg" alt="" />
                </div>
              </div>
              <div class="right-col">
                <div class="image-wrapper">
                  <img src="./assets/images/pictures/about-3.jpg" alt="" />
                </div>
                <div class="image-wrapper">
                  <img src="./assets/images/pictures/about-4.jpg" alt="" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section id="mobile-app">
        <div class="container">
          <div class="mobile-app__inner">
            <div class="mobile-app__content">
              <h2 class="section-title mobile-app__title">
                <span>Download</span> our apps to start ordering
              </h2>
              <p class="mobile-app__text">
                Download the Resource app today and experience the comfort of
                ordering your favorite coffee from wherever you are
              </p>
              <div class="mobile-app__links">
                <a class="app-link" href="#">
                  <div class="app-link__img app-store"></div>
                  <div class="app-link__content">
                    <span>Available on the</span>
                    <span>App Store</span>
                  </div>
                </a>
                <a class="app-link" href="#">
                  <div class="app-link__img google-play"></div>
                  <div class="app-link__content">
                    <span>Available on</span>
                    <span>Google Play</span>
                  </div>
                </a>
              </div>
            </div>
            <div class="mobile-app__image">
              <img
                src="./assets/images/pictures/mobile-screens.png"
                alt="mobile-screens"
              />
            </div>
          </div>
        </div>
      </section>`;
}
