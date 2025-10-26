export function renderLayout(content: string): string {
  return `
    <header class="header">
      <div class="container">
        <div class="header__inner">
          <a class="header__logo" href="/home">
            <img src="../assets/images/icons/logo.svg" alt="Coffe House logo" />
          </a>
          <nav class="nav">
            <ul class="nav__links">
              <li>
                <a href="/home#favorite-coffee">Favorite coffee</a>
              </li>
              <li><a href="/home#about">About</a></li>
              <li><a href="/home#mobile-app">Mobile app</a></li>
              <li><a href="#contacts">Contact us</a></li>
              <li>
                <a href="./menu">
                  <span>Menu</span>
                  <img
                    class="cup"
                    src="assets/images/icons/coffee-cup.svg"
                    alt="cup"
                    width="40"
                    height="40"
                  />
                </a>
              </li>
            </ul>
          </nav>
          <div class='header-left'>
            ${
              localStorage.getItem("user") || localStorage.getItem("products")
                ? `<a class='cart-bag' href='/cart'>
                <img
                class="cart-img"
                src="../assets/images/icons/shopping-bag.svg"
                alt="cup"
                />
                <span class="cart-count" id="cart-count">${
                  JSON.parse(localStorage.products || "[]").length
                }</span>
              </a>`
                : ""
            }
            <a class="menu-link" href="/menu">
              <span>Menu</span>
              <img
                class="cup"
                src="../assets/images/icons/coffee-cup.svg"
                alt="cup"
              />
            </a>
          </div>
          <div class="hamburger">
            <div></div>
            <div></div>
          </div>
        </div>
      </div>
    </header>

    <main>
      ${content}
    </main>

    <footer id="contacts">
      <div class="container">
        <div class="footer__inner">
          <div>
            <h2 class="section-title footer__title">
              Sip, Savor, Smile. <span>It’s coffee time!</span>
            </h2>
            <div class="social-links">
              <div class="social-link"><div class="twitter"></div></div>
              <div class="social-link"><div class="instagram"></div></div>
              <div class="social-link"><div class="facebook"></div></div>
            </div>
          </div>
          <div>
            <h3 class="footer__subtitle">Contact us</h3>
            <ul class="footer__contacts">
              <li>
                <a class="contacts-link" href="#">
                  <img src="../assets/images/icons/pin.svg" alt="pin" />
                  <span>8558 Green Rd., LA</span>
                </a>
              </li>
              <li>
                <a class="contacts-link" href="tel:+16035550123">
                  <img src="../assets/images/icons/phone.svg" alt="phone" />
                  <span>+1 (603) 555-0123</span>
                </a>
              </li>
              <li class="address-link">
                <img src="../assets/images/icons/clock.svg" alt="clock" />
                <span>Mon-Sat: 9:00 AM - 23:00 PM</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </footer>
  `;
}
