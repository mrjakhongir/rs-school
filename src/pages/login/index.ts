import "./login.css";

export function LoginPage() {
  return `
    <section id="login">
      <div class="container">
        <h1 class="page-title">Sign in</h1>
        <form id="login-form">
          <label class="form-item">
            <span>Login</span>
            <input 
              type="text" 
              placeholder="Login" 
              id='loginEl' 
              pattern="^[A-Za-z][A-Za-z]{2,}$" 
              required
              title="At least 3 letters, must start with a letter, only English letters allowed" 
            />
          </label>
          <label class="form-item">
            <span>Password</span>
            <input 
              type="password" 
              placeholder="Password" id='passwordEl' 
              id='passwordEl'
              required
              pattern="^(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{6,}$"
              title="At least 6 characters and must contain at least 1 special character." 
            />
          </label>
          <div class='error error--hide'></div>
          <div class='modal'>
            <div class='loader'>
              <div class='spinner'></div>
            </div>
          </div>  
          <button class="login-btn" type="submit">Sign in</button>
        </form>
      </div>
    </section>
    `;
}
