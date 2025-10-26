import "./register.css";

export function RegsiterPage() {
  return `<section id="register">
      <div class="container">
        <h1 class="page-title">Registration</h1>
        <form id="register-form">
          <div class="form-item">
            <label>Login</label>
            <input type="text" placeholder="Login" id="loginEl" pattern="^[A-Za-z][A-Za-z]{2,}$" required
              title="At least 3 letters, must start with a letter, only English letters allowed" />
          </div>

          <div class="form-item">
            <label for="passwordEl">Password</label>
            <input
              type="password"
              id="passwordEl"
              placeholder="Password"
              required
              pattern="^(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{6,}$"
              title="At least 6 characters and must contain at least 1 special character."
            />
          </div>

          <div class="form-item">
            <label>Confirm password</label>
            <input
              type="password"
              placeholder="Confirm password"
              id="confirmPasswordEl"
              required
            />
          </div>
          <div class="form-item">
            <label>City</label>
            <select id="cityEl" name="city" required>
              <option value="" disabled selected>City</option>
              <option value="bukhara">Bukhara</option>
              <option value="tashkent">Tashkent</option>
              <option value="munich">Munich</option>
            </select>
          </div>
          <div class="form-item">
            <label>Street</label>
            <select id="streetEl" name="streetEl" required>
              <option value="" disabled selected>Street</option>
            </select>
          </div>
          <div class="form-item">
            <label>House number</label>
            <input type="number" placeholder="House number" id="houseNumberEl" min="1" required />
          </div>
          <div class="form-item">
            <label>Pay by</label>
            <div class="radio-group">
              <label for="cash">
                <input type="radio" name="payment" id="cash" value="cash" checked />
                <span>Cash</span>
              </label>
              <label for="card">
                <input type="radio" name="payment" id="card" value="card" />
                <span>Card</span>
              </label>
            </div>
          </div>
        </form>
        <div class='error error--hide'></div>
        <div class='modal'>
          <div class='loader'>
            <div class='spinner'></div>
          </div>
        </div>
        <button class="register-btn" type="submit" form="register-form">Registration</button>
      </div>
    </section>`;
}
