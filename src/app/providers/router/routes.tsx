import HomePage from "@/pages/home/ui/home-page";
import MenuPage from "@/pages/menu/ui/menu-page";
import { createBrowserRouter } from "react-router-dom";

import AuthLayout from "@/pages/auth/auth-layout";
import LoginPage from "@/pages/auth/login/ui/login-page";
import RegisterPage from "@/pages/auth/register/ui/register-page";
import { RoutePaths } from "@/shared/routes/route-paths";

export const router = createBrowserRouter([
  {
    path: RoutePaths.HOME,
    element: <HomePage />,
  },
  {
    path: RoutePaths.HOME,
    element: <MenuPage />,
  },

  {
    element: <AuthLayout />,
    children: [
      {
        path: RoutePaths.AUTH.LOGIN,
        element: <LoginPage />,
      },
      {
        path: RoutePaths.AUTH.REGISTER,
        element: <RegisterPage />,
      },
    ],
  },
]);
