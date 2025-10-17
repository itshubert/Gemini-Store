import { Route, Routes } from "react-router-dom";
import Home from "../pages/Home/Home";
import { Payment } from "../pages/Home/Payment/Payment";
import { OrderHistory } from "../pages/OrderHistory/OrderHistory";
import { OrderSuccess } from "../pages/OrderSuccess/OrderSuccess";
import { ProductDetails } from "../pages/ProductDetails/ProductDetails";
import { ShoppingCart } from "../pages/ShoppingCart/ShoppingCart";
import SignIn from "../pages/SignIn/SignIn";
import SignUp from "../pages/SignUp/SignUp";
import { Header } from "./Header";

export const MainRouterOutlet = () => {
  return (
    <Routes>
      <Route element={<Header />}>
        <Route path="/" element={<Home />} />
        <Route path="/product-details/:id" element={<ProductDetails />} />
        <Route path="/shopping-cart" element={<ShoppingCart />} />
        <Route path="/payment" element={<Payment />} />
        <Route path="/order-success" element={<OrderSuccess />} />
        <Route path="/order-history" element={<OrderHistory />} />
      </Route>

      <Route path="/sign-in" element={<SignIn />} />
      <Route path="/sign-up" element={<SignUp />} />
    </Routes>
  );
};
