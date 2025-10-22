import "./cart.css";

export function CartPage() {
  return `<div id="cart">
          <div class="container">
            <h1 class="page-title">Cart</h1>
            <section class="cart-items">
              <div class="cart-item">
                <div class="item-info">
                  <button class="delete-btn">
                    <!-- <img src="trash.svg" alt="trash can" /> -->
                  </button>
                  <div class="item-img-wrapper">
                    <img class="item-img" src="" alt="" />
                  </div>
                  <div class="item-description">
                    <h2>Marble cheesecake</h2>
                    <p>50g, Berries, Nuts</p>
                  </div>
                </div>
                <span class="item-price">$3.50</span>
              </div>
              <div class="total">
                <span class="item-price">Total:</span>
                <span class="item-price">$3.50</span>
              </div>
            </section>
            <div class="buttons">
              <button class="login-btn">Sign in</button>
              <button class="login-btn">Registration</button>
            </div>
          </div>
        </div>`;
}
