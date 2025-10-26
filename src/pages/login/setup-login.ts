export async function setupLogin() {
  const LOGIN_EL = document.getElementById("loginEl") as HTMLInputElement;
  const PASSWORD_EL = document.getElementById("passwordEl") as HTMLInputElement;
  const LOGIN_FORM = document.querySelector("#login-form") as HTMLFormElement;

  LOGIN_FORM.addEventListener("submit", (e) => {
    e.preventDefault();
    const user = {
      login: LOGIN_EL.value,
      password: PASSWORD_EL.value,
    };
    loginUser(user);
  });

  async function loginUser(user: { login: string; password: string }) {
    try {
      const MODAL = document.querySelector(".modal")!;
      MODAL.classList.add("modal-open");
      const res = await fetch(
        "https://6kt29kkeub.execute-api.eu-central-1.amazonaws.com/auth/login",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(user),
        }
      );
      const data = await res.json();
      const ERROR = document.querySelector(".error") as HTMLElement;

      if (!res.ok) {
        ERROR.classList.remove("error--hide");
        ERROR.textContent = data.error;
        MODAL.classList.remove("modal-open");
        return;
      }

      ERROR.classList.add("error--hide");
      MODAL.classList.remove("modal-open");
      const userData = { token: data.data.access_token, user: data.data.user };
      localStorage.setItem("user", JSON.stringify(userData));

      window.location.href = "/cart";
    } catch (err) {
      console.log(err);
    }
  }
}
