import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";

import { SkeletonTheme } from "react-loading-skeleton";
import { AdminRoute, PrivateRoute } from "./components/index";
import {
  HomePage,
  OrderDetailsPage,
  ProductDetailsPage,
  RegisterPage,
  LoginPage,
  CartPage,
  ShippingPage,
  PaymentPage,
  PlaceOrderPage,
  ProfilePage,
  Layout,
  OrderListPage,
  ProductListPage,
  UserListPage,
  CreateProductPage,
  ProductEditPage,
} from "./pages/index";
import UserEditPage from "./pages/admin/UserEditPage";

function App() {
  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path="/" element={<Layout />}>
        <Route index={true} path="/" element={<HomePage />} />
        <Route path="/page/:pageNumber" element={<HomePage />} />
        <Route path="/page/:pageNumber" element={<HomePage />} />
        <Route path="/search/:keyword" element={<HomePage />} />
        <Route path="/search/:keyword/page/:pageNumber" element={<HomePage />} />
        <Route path="/product/:id" element={<ProductDetailsPage />} />
        <Route path="/cart" element={<CartPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        {/* Registered users */}
        <Route path="" element={<PrivateRoute />}>
          <Route path="/shipping" element={<ShippingPage />} />
          <Route path="/payment" element={<PaymentPage />} />
          <Route path="/placeorder" element={<PlaceOrderPage />} />
          <Route path="/order/:id" element={<OrderDetailsPage />} />
          <Route path="/profile" element={<ProfilePage />} />
        </Route>
        {/* Admin */}
        <Route path="" element={<AdminRoute />}>
          <Route path="/admin/order-list" element={<OrderListPage />} />
          <Route path="/admin/user-list" element={<UserListPage />} />
          <Route path="/admin/product-list" element={<ProductListPage />} />
          <Route
            path="/admin/product-list/:pageNumber"
            element={<ProductListPage />}
          />
          <Route path="/admin/product/:id/edit" element={<ProductEditPage />} />
          <Route path="/admin/product/create" element={<CreateProductPage />} />
          <Route path="/admin/user/:id/edit" element={<UserEditPage />} />
        </Route>
      </Route>
    )
  );

  return (
    <SkeletonTheme baseColor="#C1C1C1" highlightColor="#747272">
      <RouterProvider router={router} />
    </SkeletonTheme>
  );
}

export default App;
