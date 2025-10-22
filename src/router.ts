import { renderLayout } from "./layout";
import { CartPage } from "./pages/cart";
import { HomePage } from "./pages/home";
import setupHome from "./pages/home/setup-home";
import { LoginPage } from "./pages/login";
import { MenuPage } from "./pages/menu";
import setupMenu from "./pages/menu/setup-menu";
import { RegsiterPage } from "./pages/register";
import { setupHeader } from "./setups/header";
import "./style.css";

const routes: Record<string, () => string> = {
  "/": HomePage,
  "/home": HomePage,
  "/menu": MenuPage,
  "/cart": CartPage,
  "/login": LoginPage,
  "/register": RegsiterPage,
};

export function navigateTo(url: string) {
  history.pushState(null, "", url);
  renderRoute();
}

export function renderRoute() {
  const path = location.pathname in routes ? location.pathname : "/home";
  const page = routes[path] || (() => "<h1>404 Not Found</h1>");
  document.getElementById("app")!.innerHTML = renderLayout(page());

  setupHeader();

  if (path === "/menu") {
    setupMenu();
  }

  if (path === "/home" || path === "/") {
    setupHome();
  }
}
