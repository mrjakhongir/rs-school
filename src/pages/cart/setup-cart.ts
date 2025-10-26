export interface ProductStorage {
  id: number;
  name: string;
  img: { id: number; img: string };
  size: string;
  additives: string[];
  totalPrice: string;
  price: string;
  discountPrice: string;
  sizeChar: string;
  quantity: number;
}

export async function setupCart() {
  const data = JSON.parse(localStorage.getItem("user") || "{}");

  const AUTH_BTNS = document.getElementById("auth-btns")!;
  const ORDER_INFO = document.getElementById("order-info")!;
  const CART_ITEMS = document.querySelector(".cart-items")!;

  const ADDRESS = document.getElementById("address")!;
  const PAYMENT_TYPE = document.getElementById("payment-type")!;
  const TOTAL_PRICE = document.getElementById("total-price")!;
  const CART_COUNT = document.getElementById("cart-count")!;
  const CONFIRM_BTN = document.getElementById(
    "confirm-btn"
  ) as HTMLButtonElement;

  if (data && data.token) {
    CART_ITEMS.innerHTML = "";
    AUTH_BTNS.classList.add("hide");
    ORDER_INFO.classList.remove("hide");

    const products: ProductStorage[] = JSON.parse(
      localStorage.getItem("products") || "[]"
    );

    let totalPrice = 0;
    products.forEach((product) => {
      totalPrice += parseFloat(product.totalPrice.replace("$", ""));
    });
    TOTAL_PRICE.textContent = `$${totalPrice.toFixed(2)}`;

    function populateItems(data: ProductStorage[]) {
      if (data.length === 0) {
        CART_ITEMS.innerHTML = "";
        CONFIRM_BTN.disabled = true;

        return;
      }
      CART_ITEMS.innerHTML = "";
      CONFIRM_BTN.disabled = false;

      data.forEach((product) => {
        const cartItem = document.createElement("div");
        cartItem.classList.add("cart-item");
        cartItem.innerHTML = `
        <div class="cart-item">
            <div class="item-info">
                <button class="delete-btn">
                    <img src="./assets/images/icons/trash.svg" alt="trash can" data-id=${
                      product.id
                    } />
                </button>
                <div class="item-img-wrapper">
                    <img class="item-img" src=${product.img.img} alt="" />
                    </div>
                    <div class="item-description">
                        <h2>${product.name}</h2>
                        <p>${product.size} ${product.additives
          .map((a) => a)
          .join(", ")}
                        </p>
                    </div>
                </div>
            </div>
            <div>
              <span class="item-price discount-price">${
                product.discountPrice || ""
              }</span>
              <span class="item-price">${product.totalPrice}</span>
            </div>
        </div>
      `;
        CART_ITEMS.appendChild(cartItem);
      });
    }

    populateItems(products);
    addDeleteListeners(products);
    CONFIRM_BTN.addEventListener("click", placeOrder);

    function addDeleteListeners(products: ProductStorage[]) {
      const DELETE_BTNs = document.querySelectorAll(".delete-btn");

      DELETE_BTNs.forEach((btn) => {
        btn.addEventListener("click", (e) => {
          const el = e.target as HTMLButtonElement;
          const id = Number(el.dataset.id);
          const newProducts = products.filter((p) => p.id !== id);

          localStorage.setItem("products", JSON.stringify(newProducts));
          CART_COUNT.textContent = String(newProducts.length);

          const totalPrice = newProducts.reduce(
            (acc, p) => acc + parseFloat(p.totalPrice.replace("$", "")),
            0
          );
          TOTAL_PRICE.textContent = `$${totalPrice.toFixed(2)}`;

          populateItems(newProducts);
          addDeleteListeners(newProducts); // 🔥 reattach handlers
        });
      });
    }

    ADDRESS.innerText = `${data.user.city}, ${data.user.street}, ${data.user.houseNumber}`;
    PAYMENT_TYPE.innerText = data.user.paymentMethod;

    async function placeOrder() {
      const items = products.map((p) => {
        return {
          productId: p.id,
          size: p.sizeChar,
          additives: p.additives,
          quantity: 1,
        };
      });

      const newOrder = {
        items,
        totalPrice,
      };

      try {
        CONFIRM_BTN.disabled = true;
        CONFIRM_BTN.textContent = "Placing order...";
        const MODAL = document.querySelector(".modal")!;
        MODAL.classList.add("modal-open");

        const res = await fetch(
          "https://6kt29kkeub.execute-api.eu-central-1.amazonaws.com/orders/confirm",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${data.token}`,
            },
            body: JSON.stringify(newOrder),
          }
        );

        const ERROR = document.querySelector(".error") as HTMLElement;

        if (!res.ok) {
          CONFIRM_BTN.disabled = false;
          CONFIRM_BTN.textContent = "Place order";
          ERROR.classList.remove("error--hide");
          ERROR.textContent = "Something went wrong. Please, try again";
          MODAL.classList.remove("modal-open");
          return;
        }

        ERROR.classList.add("error--hide");
        MODAL.classList.remove("modal-open");
        CONFIRM_BTN.disabled = false;
        CONFIRM_BTN.textContent = "Place order";

        localStorage.removeItem("products");
        CART_COUNT.textContent = "0";
        TOTAL_PRICE.textContent = "$0.00";
        CART_ITEMS.innerHTML =
          "<h2>Thank you for your order! Our managers will contact you shortly.</h2>";
      } catch (err) {
        console.log(err);
      }
    }
  } else {
    CART_ITEMS.innerHTML = "";
    AUTH_BTNS.classList.remove("hide");
    ORDER_INFO.classList.add("hide");
  }
}
