import "./cart.css";

export function CartPage() {
  return `<div id="cart">
          <div class="container">
            <div class='error error--hide'></div>
            <div class='modal'>
              <div class='loader'>
                <div class='spinner'></div>
              </div>
            </div> 
            <h1 class="page-title">Cart</h1>
            <section class="cart-items"></section>

            <div class="total">
              <span class="item-price">Total:</span>
              <span class="item-price" id="total-price">$0.00</span>
            </div>

            <section class='order-info' id='order-info'>
              <div class="total">
                <span class="item-price">Address:</span>
                <span class="item-price" id="address">City, Street, 7</span>
              </div>
              <div class="total">
                <span class="item-price">Pay by:</span>
                <span class="item-price" id="payment-type">Card</span>
              </div>
              <button class="login-btn" id="confirm-btn" disabled>Confirm</button>
            </section>
            
            <div class="buttons" id="auth-btns">
              <a class="login-btn" href="/login">Sign in</a>
              <a class="login-btn" href="/register">Registration</a>
            </div>

          </div>
        </div>`;
}
