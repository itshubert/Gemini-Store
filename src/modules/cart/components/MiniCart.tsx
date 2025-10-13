import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useCartContext } from "../CartProvider";

const MiniCart = () => {
  const { items } = useCartContext();
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Calculate total number of items in cart
  const itemCount = items.reduce((total, item) => total + item.quantity, 0);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen]);

  const handleShoppingCart = () => {
    setIsOpen(false);
    navigate("/shopping-cart");
  };

  return (
    <div className="relative inline-block" ref={dropdownRef}>
      {/* Shopping Cart Icon */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="relative focus:outline-none"
        type="button"
      >
        <svg
          className="w-8 h-8"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
          aria-label={
            itemCount === 0
              ? "Empty shopping cart"
              : `Shopping cart with ${itemCount} items`
          }
          role="img"
        >
          <title>
            {itemCount === 0
              ? "Empty shopping cart"
              : `Shopping cart with ${itemCount} items`}
          </title>
          {itemCount === 0 ? (
            // Empty cart icon
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
            />
          ) : (
            // Cart with items
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
            />
          )}
        </svg>

        {/* Item Count Badge */}
        {itemCount > 0 && (
          <span className="absolute -top-2 -right-2 bg-red-600 text-white text-xs font-bold rounded-full h-6 w-6 flex items-center justify-center">
            {itemCount > 99 ? "99+" : itemCount}
          </span>
        )}
      </button>

      {/* Dropdown Menu */}
      {isOpen && (
        <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg z-50 border border-gray-200">
          <div className="py-1">
            <button
              onClick={handleShoppingCart}
              className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition-colors"
              type="button"
            >
              View Cart
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default MiniCart;
