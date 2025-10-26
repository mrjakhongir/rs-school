import { renderRoute } from "./router";

window.addEventListener("hashchange", renderRoute);
window.addEventListener("load", renderRoute);
