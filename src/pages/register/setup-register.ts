const streets: Record<string, string[]> = {
  bukhara: [
    "Khodja Nurobod Street",
    "Samarkand Street",
    "Gijduvan Street",
    "Alpomish Street",
    "Naqshband Street",
    "Amir Temur Street",
    "Ipak Yuli Street",
    "Mustaqillik Street",
    "Bahor Street",
    "Shofirkon Street",
  ],
  tashkent: [
    "Amir Temur Avenue",
    "Nukus Street",
    "Shota Rustaveli Street",
    "Yangi Qo‘yliq Street",
    "Bobur Street",
    "Buyuk Ipak Yuli Stree",
    "Chilonzor Street",
    "Furqat Street",
    "Mirabad Street",
    "Labzak Street",
  ],
  munich: [
    "Leopoldstraße",
    "Am Schloss",
    "Hauptstraße",
    "Sonnenstraße",
    "Maximilianstraße",
    "Schwanthalerstraße",
    "Lindwurmstraße",
    "Kaufingerstraße",
    "Dachauer Straße",
    "Theresienstraße",
  ],
};
interface User {
  login: string;
  password: string;
  city: string;
  street: string;
  houseNumber: number;
}

export default async function setupRegister() {
  const LOGIN_EL = document.querySelector("#loginEl") as HTMLInputElement;
  const PASSWORD_EL = document.querySelector("#passwordEl") as HTMLInputElement;
  const CONFIRM_PASSWORD_EL = document.querySelector(
    "#confirmPasswordEl"
  ) as HTMLInputElement;
  const CITY_EL = document.querySelector("#cityEl") as HTMLSelectElement;
  const STREET_EL = document.querySelector("#streetEl") as HTMLInputElement;
  const HOUSE_EL = document.querySelector("#houseNumberEl") as HTMLInputElement;
  const RADIO_INPUTS = document.querySelectorAll(
    "input[type='radio']"
  ) as NodeListOf<HTMLInputElement>;

  CONFIRM_PASSWORD_EL.addEventListener("input", () => {
    if (CONFIRM_PASSWORD_EL.value !== PASSWORD_EL.value) {
      CONFIRM_PASSWORD_EL.setCustomValidity("Password must match");
    } else {
      CONFIRM_PASSWORD_EL.setCustomValidity("");
    }
  });

  CITY_EL.addEventListener("change", () => {
    STREET_EL.innerHTML = `<option value="" disabled selected>Street</option>`;
    streets[CITY_EL.value].forEach((street) => {
      const option = document.createElement("option");
      option.value = street;
      option.textContent = street;
      STREET_EL.appendChild(option);
    });
  });

  let newUser = {
    login: "",
    password: "",
    confirmPassword: "",
    city: "",
    street: "",
    houseNumber: 0,
    paymentMethod: "",
  };

  RADIO_INPUTS.forEach((radio) => {
    radio.addEventListener(
      "change",
      () => (newUser.paymentMethod = radio.value)
    );
  });

  const REGISTER_FORM = document.querySelector(
    "#register-form"
  ) as HTMLFormElement;

  REGISTER_FORM.addEventListener("submit", (e) => {
    e.preventDefault();

    newUser = {
      login: LOGIN_EL.value,
      password: PASSWORD_EL.value,
      confirmPassword: CONFIRM_PASSWORD_EL.value,
      city: CITY_EL.value,
      street: STREET_EL.value,
      houseNumber: +HOUSE_EL.value,
      paymentMethod: "cash",
    };
    createUser(newUser);
  });

  async function createUser(user: User) {
    try {
      const MODAL = document.querySelector(".modal")!;
      MODAL.classList.add("modal-open");
      const res = await fetch(
        "https://6kt29kkeub.execute-api.eu-central-1.amazonaws.com/auth/register",
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
      localStorage.setItem("token", data.data.access_token);

      window.location.href = "/cart";
    } catch (err) {
      console.log(err);
    }
  }
}
