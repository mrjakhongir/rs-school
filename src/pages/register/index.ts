import "./register.css";

export function RegsiterPage() {
  return `<section id="register">
      <div class="container">
        <h1 class="page-title">Registration</h1>
        <form id="register-form">
          <div class="form-item">
            <label>Login</label>
            <input type="text" placeholder="Login" id="loginEl" />
          </div>
          <div class="form-item">
            <label>Password</label>
            <input type="password" placeholder="Password" id="passwordEl" />
          </div>
          <div class="form-item">
            <label>Confirm password</label>
            <input
              type="password"
              placeholder="Confirm password"
              id="confirmPasswordEl"
            />
          </div>
          <div class="form-item">
            <label>City</label>
            <input type="text" placeholder="City" id="cityEl" />
          </div>
          <div class="form-item">
            <label>Street</label>
            <input type="text" placeholder="Street" id="streetEl" />
          </div>
          <div class="form-item">
            <label>House number</label>
            <input type="number" placeholder="House number" id="houseNumberEl" />
          </div>
          <div class="form-item">
            <label>Pay by</label>
            <div class="radio-group">
              <label for="cash">
                <input type="radio" name="payment" checked id="cash" />
                <span>Cash</span>
              </label>
              <label for="card">
                <input type="radio" name="payment" id="card" />
                <span>Card</span>
              </label>
            </div>
          </div>
        </form>
        <button class="register-btn">Registration</button>
      </div>
    </section>`;
}
