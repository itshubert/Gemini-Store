import "./App.css";
import { MainRouterOutlet } from "./components/MainRouterOutlet";
import { AuthProvider } from "./modules/authentication/AuthProvider";
import { CartProvider } from "./modules/cart/CartProvider";

function App() {
  return (
    <AuthProvider>
      <CartProvider>
        <MainRouterOutlet />
      </CartProvider>
    </AuthProvider>
  );
}

export default App;
