import { createContext, type FC, useContext, useEffect, useState } from "react";
import type { CartItem } from "../products/types/buy-request";

interface CartProviderProps {
  items: CartItem[];
  addItem: (item: CartItem) => void;
  removeItem: (productId: string) => void;
  adjustItemQuantity: (productId: string, quantity: number) => void;
  clearCart: () => void;
}

export const CartContext = createContext<CartProviderProps | null>(null);

export const useCartContext = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCartContext must be used within a CartProvider");
  }
  return context;
};

export const CartProvider: FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [items, setItems] = useState<CartItem[]>(() => {
    const storedCart = localStorage.getItem("cart");
    return storedCart ? JSON.parse(storedCart) : [];
  });

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(items));
  }, [items]);

  const addItem = (item: CartItem) => {
    setItems((prevItems) => {
      const existingItem = prevItems.find(
        (i) => i.productId === item.productId,
      );
      if (existingItem) {
        return prevItems.map((i) =>
          i.productId === item.productId
            ? { ...i, quantity: i.quantity + item.quantity }
            : i,
        );
      }
      return [...prevItems, item];
    });
  };

  const removeItem = (productId: string) => {
    setItems((prevItems) =>
      prevItems.filter((item) => item.productId !== productId),
    );
  };

  const adjustItemQuantity = (productId: string, quantity: number) => {
    setItems((prevItems) =>
      prevItems.map((item) =>
        item.productId === productId ? { ...item, quantity } : item,
      ),
    );
  };

  const clearCart = () => {
    setItems([]);
  };

  return (
    <CartContext.Provider
      value={{ items, addItem, removeItem, adjustItemQuantity, clearCart }}
    >
      {children}
    </CartContext.Provider>
  );
};
