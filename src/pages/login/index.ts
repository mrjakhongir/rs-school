import "./login.css";

export function LoginPage() {
  return `
    <section id="login">
      <div class="container">
        <h1 class="page-title">Sign in</h1>
        <form id="login-form">
          <label class="form-item">
            <span>Login</span>
            <input type="text" placeholder="Login" id='loginEl' required />
          </label>
          <label class="form-item">
            <span>Password</span>
            <input type="password" placeholder="Password" id='passwordEl' required />
          </label>
          <button class="login-btn">Sign in</button>
        </form>
      </div>
    </section>
    `;
}
