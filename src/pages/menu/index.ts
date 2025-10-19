import "./menu.css";

export function MenuPage() {
  return `<section id="menu">
            <div class="container">
              <div class="menu__inner">
                <h1 class="section-title menu__title">
                  Behind each of our cups hides an <span>amazing surprise</span>
                </h1>
                <div class="menu__tabs">
                  <button
                    class="menu__tab menu__tab--active"
                    data-category="coffee"
                  >
                    <span>☕</span>
                    <span>Coffee</span>
                  </button>
                  <button class="menu__tab" data-category="tea">
                    <span>🫖</span>
                    <span>Tea</span>
                  </button>
                  <button class="menu__tab" data-category="dessert">
                    <span>🍰</span>
                    <span>Dessert</span>
                  </button>
                </div>
                <div class="menu__items"></div>
                <div class="refresh-button">
                  <img
                    src="../assets/images/icons/refresh.svg"
                    alt="refresh"
                    width="24"
                    height="24"
                  />
                </div>
              </div>
            </div>
          </section>
          <section class="modal"></section>
  `;
}
