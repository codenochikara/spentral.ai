import Login from "../pages/auth/Login";
import Signup from "../pages/auth/Signup";
import Dashboard from "../pages/dashboard/Dashboard";
import Expenses from "../pages/expenses/Expenses";
import Incomes from "../pages/incomes/Incomes";

const routes = {
  "/": Login,
  "/login": Login,
  "/signup": Signup,
  "/dashboard": Dashboard,
  "/expenses": Expenses,
  "/incomes": Incomes,
  "/profile": Dashboard
};

export function initRouter() {
  const app = document.getElementById("app");

  const render = () => {
    const path = window.location.pathname;
    const Page = routes[path] || Login;
    app.innerHTML = "";
    app.appendChild(Page());
  };

  window.addEventListener("popstate", render);
  render();
}

export function navigate(path) {
  history.pushState({}, "", path);
  window.dispatchEvent(new Event("popstate"));
}
