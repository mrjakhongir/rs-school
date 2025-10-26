import images from "../../../public/data/images.json";
import { disableScroll, enableScroll } from "../../utils/utils";
import type { ProductItem } from "./menu";

type Category = "coffee" | "tea" | "dessert";

interface Product {
  id: number;
  name: string;
  description: string;
  price: string;
  discountPrice: string;
  category: Category;
}

export default function setupMenu() {
  const REFRESH_BTN = document.querySelector(
    ".refresh-button"
  ) as HTMLButtonElement;
  const MENU_ITEMS = document.querySelector(".menu__items")!;
  const MENU_TABS = document.querySelectorAll(
    ".menu__tab"
  ) as NodeListOf<HTMLAnchorElement>;

  let count = 4;
  let startIndex = 0;
  let currentCategory = "coffee";
  let menuItems: Product[] | null = null;
  let currentWidth: number = window.innerWidth;

  currentWidth = window.innerWidth;
  if (currentWidth >= 1024) {
    count = 8;
    REFRESH_BTN.classList.add("refresh-button--hide");
  }

  async function renderMenu() {
    try {
      MENU_ITEMS.classList.add("menu__items--loading");
      MENU_ITEMS.innerHTML = `
        <div class="loader">
          <div class='spinner'></div>
        </div>
      `;

      const res = await fetch(
        "https://6kt29kkeub.execute-api.eu-central-1.amazonaws.com/products"
      );

      if (!res.ok) {
        MENU_ITEMS.innerHTML = `
        <div class="error">
          <h2>Something went wrong. Please, refresh the page</h2>
        </div>
      `;

        REFRESH_BTN.classList.add("refresh-button--hide");

        return;
      }

      const data = await res.json();
      menuItems = data.data;
      MENU_ITEMS.innerHTML = "";
      MENU_ITEMS.classList.remove("menu__items--loading");
      filterItemsByCategory(currentCategory);
    } catch (err) {
      console.log(err);
    }
  }

  function filterItemsByCategory(category: string) {
    if (!menuItems) return;
    const REFRESH_BTN = document.querySelector(
      ".refresh-button"
    ) as HTMLButtonElement;

    const currentData = menuItems.filter((item) => item.category === category);
    if (currentWidth >= 1024) {
      count = currentData.length;
      REFRESH_BTN.classList.add("refresh-button--hide");
    } else {
      if (currentData.length <= count) {
        REFRESH_BTN.classList.add("refresh-button--hide");
      } else {
        REFRESH_BTN.classList.remove("refresh-button--hide");
      }
    }
    const data = currentData.slice(
      startIndex,
      Math.min(count, currentData.length)
    );

    populateItems(data);
  }

  function populateItems(data: Product[]) {
    const MENU_ITEMS = document.querySelector(".menu__items")!;
    data.map((item, index) => {
      const img = images[item.category].find((img) => img.id === item.id);
      const menuItem = document.createElement("div");
      menuItem.className = "menu__item populate-item";
      menuItem.setAttribute("key", index.toString());
      menuItem.innerHTML = `
            <div class="image-wrapper">
              <img src=${img?.img} alt=${item.name} />
            </div>
            <div class="menu__item-info">
                <h2 class="menu__item_title">${item.name}</h2>
                <p class="menu__item_description">
                    ${item.description}
                </p>
                <span class="menu__item_price">$${item.price}</span>
            </div>
        `;
      menuItem.addEventListener("click", () => openModal(item.id));
      MENU_ITEMS.appendChild(menuItem);
    });
  }

  function loadMore() {
    count += 4;
    startIndex += 4;
    filterItemsByCategory(currentCategory);
  }

  MENU_TABS.forEach((tab) => {
    tab.addEventListener("click", () => {
      MENU_TABS.forEach((tab) => tab.classList.remove("menu__tab--active"));
      tab.classList.add("menu__tab--active");

      MENU_ITEMS.innerHTML = "";
      count = 4;
      currentCategory = tab.dataset.category || "coffee";

      filterItemsByCategory(currentCategory);
    });
  });

  REFRESH_BTN.addEventListener("click", loadMore);

  // MODAL
  const MODAL = document.querySelector(".modal")!;

  async function openModal(id: number) {
    disableScroll();
    const ERROR_EL = document.querySelector("#error")!;

    try {
      MODAL.classList.add("modal-open");

      MODAL.innerHTML = `
        <div class='loader'>
          <div class='spinner'></div>
        </div>
      `;

      ERROR_EL.innerHTML = "";

      const res = await fetch(
        `https://6kt29kkeub.execute-api.eu-central-1.amazonaws.com/products/${id}`
      );

      if (!res.ok) {
        ERROR_EL.innerHTML = `
          <div class="error">
            <h2>Something went wrong. Please, try again</h2>
          </div>
        `;
        MODAL.classList.remove("modal-open");
        enableScroll();
      }

      const data: { data: ProductItem } = await res.json();
      const selectedItem = data.data;

      const img = images[selectedItem.category].find(
        (img) => img.id === selectedItem.id
      );

      let sizePrice = parseFloat(selectedItem.price);
      let additivesPrice = 0;
      let size = selectedItem.sizes.s.size;
      let sizeChar = "s";
      let additives: string[] = [];

      MODAL.innerHTML = `
        <div class="modal-content">
            <button class="modal-close"">
              <img src='/public/assets/images/icons/close.svg' alt='close' />
            </button>
            <div class="modal__img">
                <img src=${img?.img} alt=${selectedItem.name} />
            </div>
            <div class="modal__info">
                <div>
                    <h3 class="modal__title">${selectedItem.name}</h3>
                    <p class="modal__description">
                    ${selectedItem.description}
                    </p>
                </div>
                <div class="filters">
                    <span class="filter-title">Size</span>
                    <div class="filter-btns">
                    ${Object.entries(selectedItem.sizes)
                      .map(([label, { size, price }]) => {
                        return `
                        <label class="filter-btn" for="size-${label}">
                            <span>${label.toUpperCase()}</span>
                            <span>${size}</span>
                            <input
                              type="radio"
                              id="size-${label}"
                              name="size"
                              data-price="${price}"
                              data-size="${size}"
                              data-sizeChar="${label}"
                              ${label === "s" ? "checked" : ""}
                            />
                            <div class="tooltip">
                              <p>Price: $${price}</p>
                              <p>Discount price: $${
                                selectedItem.discountPrice || 0
                              }</p>
                            </div>
                        </label>
                    `;
                      })
                      .join("")}
                    </div>
                </div>
                <div class="filters">
                    <span class="filter-title">Additives</span>
                    <div class="filter-btns">
                        ${selectedItem.additives
                          .map(({ name, price }, index) => {
                            return `
                                    <label class="filter-btn" for="additive-${index}">
                                        <span>${index + 1}</span>
                                        <span>${name}</span>
                                        <input type="checkbox"
                                          id="additive-${index}"
                                          data-price="${price}"
                                          data-name="${name}" 
                                        />

                                        <div class="tooltip">
                                          <p>Price: $${price}</p>
                                          <p>Discount price: $${
                                            selectedItem.discountPrice || 0
                                          }</p>
                                        </div>
                                    </label>
                                `;
                          })
                          .join("")}
                    </div>
                </div>
                <div class="modal__price">
                    <span>Total:</span>
                    <span id="total-price">$${selectedItem.price}</span>
                </div>
                <div class="modal__disclaimer">
                    <img
                        src="../assets/images/icons/info-empty.svg"
                        alt="info"
                        width="16"
                        height="16"
                    />
                    <p>
                        The cost is not final. Download our mobile app to see the final
                        price and place your order. Earn loyalty points and enjoy your
                        favorite coffee with up to 20% discount.
                    </p>
                </div>
                <button class="modal__add_to_cart">Add to cart</button>
            </div>
        </div>
    `;

      const ADD_TO_CART_BTN = document.querySelector(".modal__add_to_cart")!;
      ADD_TO_CART_BTN.addEventListener("click", addTocard);

      const CLOSE_BTN = document.querySelector(".modal-close")!;
      CLOSE_BTN.addEventListener("click", closeModal);

      window.addEventListener("keydown", (e) => {
        e.key === "Escape" && closeModal();
      });

      const RADIO_INPUTS = document.querySelectorAll(
        "input[type='radio']"
      ) as NodeListOf<HTMLInputElement>;

      RADIO_INPUTS.forEach((radio) => {
        radio.addEventListener("change", () => changeSize(radio));
      });

      const CHECKBOX_INPUTS = document.querySelectorAll(
        "input[type='checkbox']"
      ) as NodeListOf<HTMLInputElement>;

      CHECKBOX_INPUTS.forEach((checkbox) => {
        checkbox.addEventListener("change", () => addAdditive(checkbox));
      });
      function changeSize(radio: HTMLInputElement) {
        size = radio.dataset.size || selectedItem.sizes.s.size;
        sizeChar = radio.dataset.sizeChar || "s";
        const totalPrice = document.getElementById("total-price")!;
        sizePrice = parseFloat(radio.dataset.price || "0");
        totalPrice.textContent = `$${(sizePrice + additivesPrice).toFixed(2)}`;
      }

      function addAdditive(checkbox: HTMLInputElement) {
        const totalPrice = document.getElementById("total-price")!;
        additives.push(checkbox.dataset.name || "");
        const price = parseFloat(checkbox.dataset.price ?? "0");
        if (checkbox.checked) {
          additivesPrice += price;
        } else {
          additivesPrice -= price;
        }

        totalPrice.textContent = `$${(sizePrice + additivesPrice).toFixed(2)}`;
      }

      function closeModal() {
        MODAL.classList.remove("modal-open");
        const INPUTS = document.querySelectorAll(
          ".filter-btn input"
        ) as NodeListOf<HTMLInputElement>;
        INPUTS.forEach((input) => (input.checked = false));
        sizePrice = 0;
        additivesPrice = 0;
        enableScroll();
      }

      function addTocard() {
        const CART_COUNT = document.getElementById("cart-count")!;
        const products: Product[] = JSON.parse(
          localStorage.getItem("products") || "[]"
        );

        if (
          !products.length ||
          products.find((product) => product.id !== selectedItem.id)
        ) {
          const product = {
            id: selectedItem.id,
            name: selectedItem.name,
            img: images[selectedItem.category].find(
              (img) => img.id === selectedItem.id
            ),
            size,
            sizeChar,
            additives,
            totalPrice: `$${(sizePrice + additivesPrice).toFixed(2)}`,
            price: `$${selectedItem.price}`,
            discountPrice: selectedItem.discountPrice
              ? `$${selectedItem.discountPrice}`
              : "",
          };

          const updatedProducts = [...products, product];
          localStorage.setItem("products", JSON.stringify(updatedProducts));

          CART_COUNT.textContent = String(updatedProducts.length);
        }
        closeModal();
      }

      MODAL.addEventListener("click", function (e) {
        if (e.target === MODAL) {
          closeModal();
        }
      });
    } catch (err) {
      console.log(err);
    }
  }

  return renderMenu();
}
