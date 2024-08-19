import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Layout from "./pages/Layout";
import HomePage from "./pages/HomePage";
import ProductDetailsPage from "./pages/ProductDetailsPage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import "./App.css";
import { SkeletonTheme } from "react-loading-skeleton";
import CartPage from "./pages/CartPage";

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Layout />,
      children: [
        {
          path: "/",
          element: <HomePage />,
        },
        {
          path: "/product/:id",
          element: <ProductDetailsPage />,
        },
        {
          path: "/cart",
          element: <CartPage />,
        },
        {
          path: "/login",
          element: <LoginPage />,
        },
        {
          path: "/register",
          element: <RegisterPage />,
        },
      ],
    },
  ]);

  return (
    <SkeletonTheme baseColor="#C1C1C1" highlightColor="#747272">
      <RouterProvider router={router} />;
    </SkeletonTheme>
  );
}

export default App;
