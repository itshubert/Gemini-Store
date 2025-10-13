import { Route, Routes } from "react-router-dom";
import { ProductDetails } from "../modules/products/components/ProductDetails";
import Home from "../pages/Home/Home";
import SignIn from "../pages/SignIn/SignIn";
import SignUp from "../pages/SignUp/SignUp";
import { Header } from "./Header";

export const MainRouterOutlet = () => {
  return (
    <Routes>
      <Route element={<Header />}>
        <Route path="/" element={<Home />} />
        <Route path="/product-details/:id" element={<ProductDetails />} />
      </Route>

      <Route path="/sign-in" element={<SignIn />} />
      <Route path="/sign-up" element={<SignUp />} />
    </Routes>
  );
};
