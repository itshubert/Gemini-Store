import { useState } from "react";
import { Link, useNavigate } from "react-router";
import { useCartContext } from "../../modules/cart/CartProvider";
import type { Product } from "../../modules/products/types/product";

export const ShoppingCart = () => {
  const { items, adjustItemQuantity, removeItem } = useCartContext();
  const [itemToRemove, setItemToRemove] = useState<Product | null>(null);
  const navigate = useNavigate();

  const handleQuantityChange = (product: Product, newQuantity: number) => {
    if (newQuantity === 0) {
      setItemToRemove(product);
    } else if (newQuantity > 0) {
      adjustItemQuantity(product, newQuantity);
    }
  };

  const confirmRemoval = () => {
    if (itemToRemove) {
      removeItem(itemToRemove);
      setItemToRemove(null);
    }
  };

  const cancelRemoval = () => {
    setItemToRemove(null);
  };

  const subtotal = items.reduce(
    (sum, item) => sum + item.unitPrice * item.quantity,
    0,
  );
  const tax = subtotal * 0.1; // 10% tax
  const total = subtotal + tax;

  return (
    <div className="min-h-screen bg-gradient-to-br from-secondary-50 via-white to-primary-50 py-8">
      <div className="max-w-7xl mx-auto px-6">
        {/* Page Header */}
        <div className="mb-12">
          <div className="flex items-center gap-3 mb-2">
            <svg
              className="w-8 h-8 text-primary-600"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              role="img"
              aria-label="Shopping cart icon"
            >
              <title>Shopping cart</title>
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M3 3h2l.4 2M7 13h10l4-8H5.4m7.6 8L9 11h6"
              />
            </svg>
            <h1 className="text-4xl font-bold text-secondary-900">
              Shopping Cart
            </h1>
          </div>
          <p className="text-secondary-600">
            Review your items and proceed to checkout
          </p>
        </div>

        {items.length === 0 ? (
          <div className="bg-white rounded-2xl shadow-xl p-16 text-center max-w-2xl mx-auto">
            <div className="w-32 h-32 mx-auto mb-8 bg-gradient-to-br from-primary-100 to-primary-200 rounded-full flex items-center justify-center">
              <svg
                className="w-16 h-16 text-primary-600"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                aria-hidden="true"
              >
                <title>Empty cart icon</title>
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"
                />
              </svg>
            </div>
            <h2 className="text-3xl font-bold text-secondary-900 mb-4">
              Your cart is empty
            </h2>
            <p className="text-lg text-secondary-600 mb-8 max-w-md mx-auto">
              Looks like you haven't added anything to your cart yet. Start
              browsing our amazing products!
            </p>
            <a
              href="/"
              className="inline-flex items-center gap-3 bg-gradient-to-r from-primary-600 to-primary-700 text-white px-8 py-4 rounded-xl hover:from-primary-700 hover:to-primary-800 transition-all duration-200 font-semibold text-lg shadow-lg hover:shadow-xl hover:scale-105"
            >
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                role="img"
                aria-label="Back"
              >
                <title>Back</title>
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15 19l-7-7 7-7"
                />
              </svg>
              Continue Shopping
            </a>
          </div>
        ) : (
          <div className="grid grid-cols-1 xl:grid-cols-4 gap-8">
            {/* Cart Items */}
            <div className="xl:col-span-3 space-y-6">
              <div className="bg-white rounded-2xl shadow-lg p-1">
                <div className="bg-gradient-to-r from-primary-500 to-primary-600 text-white p-4 rounded-t-2xl">
                  <h2 className="text-xl font-semibold">
                    Items in your cart ({items.length})
                  </h2>
                </div>
                <div className="p-6 space-y-6">
                  {items.map((item) => (
                    <div
                      key={item.product.id}
                      className="group bg-gradient-to-r from-white to-secondary-50 rounded-xl p-6 border border-secondary-200 hover:border-primary-300 hover:shadow-lg transition-all duration-300"
                    >
                      <div className="flex flex-col lg:flex-row lg:items-center gap-6">
                        {/* Product Image Placeholder */}
                        <div className="w-24 h-24 bg-gradient-to-br from-primary-100 to-primary-200 rounded-xl flex items-center justify-center flex-shrink-0">
                          <span className="text-2xl opacity-60">📦</span>
                        </div>

                        {/* Product Info */}
                        <div className="flex-1 min-w-0">
                          <h3 className="text-xl font-bold text-secondary-900 mb-2 group-hover:text-primary-700 transition-colors">
                            {item.product.name}
                          </h3>
                          <p className="text-secondary-600 text-sm mb-4 line-clamp-2">
                            {item.product.description}
                          </p>
                          <div className="flex items-center gap-4">
                            <span className="text-2xl font-bold text-primary-600">
                              ${item.unitPrice.toFixed(2)}
                            </span>
                            <span className="text-sm text-secondary-500 bg-secondary-100 px-2 py-1 rounded-full">
                              per item
                            </span>
                          </div>
                        </div>

                        {/* Quantity Controls */}
                        <div className="flex flex-col items-center gap-4 bg-white rounded-xl p-4 border border-secondary-200">
                          <span className="text-sm font-semibold text-secondary-700">
                            Quantity
                          </span>
                          <div className="flex items-center gap-3">
                            <button
                              type="button"
                              onClick={() =>
                                handleQuantityChange(
                                  item.product,
                                  item.quantity - 1,
                                )
                              }
                              className="w-10 h-10 rounded-lg bg-secondary-100 hover:bg-primary-100 hover:text-primary-700 flex items-center justify-center font-bold text-secondary-600 transition-all duration-200 hover:scale-110"
                              aria-label="Decrease quantity"
                            >
                              −
                            </button>
                            <input
                              type="number"
                              min="1"
                              value={item.quantity}
                              onChange={(e) =>
                                handleQuantityChange(
                                  item.product,
                                  Math.max(
                                    0,
                                    Number.parseInt(e.target.value) || 0,
                                  ),
                                )
                              }
                              className="w-16 h-10 text-center border-2 border-secondary-300 rounded-lg font-bold text-secondary-900 focus:outline-none focus:border-primary-500 focus:ring-2 focus:ring-primary-200 transition-all"
                              aria-label="Item quantity"
                            />
                            <button
                              type="button"
                              onClick={() =>
                                handleQuantityChange(
                                  item.product,
                                  item.quantity + 1,
                                )
                              }
                              className="w-10 h-10 rounded-lg bg-secondary-100 hover:bg-primary-100 hover:text-primary-700 flex items-center justify-center font-bold text-secondary-600 transition-all duration-200 hover:scale-110"
                              aria-label="Increase quantity"
                            >
                              +
                            </button>
                          </div>
                        </div>

                        {/* Item Total & Actions */}
                        <div className="text-center lg:text-right space-y-3">
                          <div>
                            <p className="text-sm text-secondary-600 mb-1">
                              Item Total
                            </p>
                            <p className="text-3xl font-bold text-secondary-900">
                              ${(item.unitPrice * item.quantity).toFixed(2)}
                            </p>
                          </div>
                          <button
                            type="button"
                            onClick={() => setItemToRemove(item.product)}
                            className="inline-flex items-center gap-2 px-4 py-2 text-sm text-red-600 hover:text-red-800 hover:bg-red-50 rounded-lg transition-all duration-200 font-medium"
                          >
                            <svg
                              className="w-4 h-4"
                              fill="none"
                              stroke="currentColor"
                              viewBox="0 0 24 24"
                            >
                              <title>Remove item</title>
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                              />
                            </svg>
                            Remove
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Order Summary */}
            <div className="xl:col-span-1">
              <div className="bg-white rounded-2xl shadow-xl overflow-hidden sticky top-8">
                <div className="bg-gradient-to-r from-secondary-800 to-secondary-900 text-white p-6">
                  <h2 className="text-2xl font-bold flex items-center gap-3">
                    <svg
                      className="w-6 h-6"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <title>Order Summary</title>
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                      />
                    </svg>
                    Order Summary
                  </h2>
                </div>

                <div className="p-6">
                  <div className="space-y-4 mb-8">
                    <div className="flex justify-between items-center p-3 bg-secondary-50 rounded-lg">
                      <span className="font-medium text-secondary-700">
                        Subtotal ({items.length} items)
                      </span>
                      <span className="font-bold text-lg text-secondary-900">
                        ${subtotal.toFixed(2)}
                      </span>
                    </div>
                    <div className="flex justify-between items-center p-3 bg-secondary-50 rounded-lg">
                      <span className="font-medium text-secondary-700">
                        Tax (10%)
                      </span>
                      <span className="font-bold text-lg text-secondary-900">
                        ${tax.toFixed(2)}
                      </span>
                    </div>
                    <div className="flex justify-between items-center p-4 bg-gradient-to-r from-primary-100 to-primary-200 rounded-xl border border-primary-300">
                      <span className="text-xl font-bold text-primary-800">
                        Total
                      </span>
                      <span className="text-3xl font-bold text-primary-800">
                        ${total.toFixed(2)}
                      </span>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <button
                      type="button"
                      className="w-full bg-gradient-to-r from-green-600 to-green-700 text-white py-4 px-6 rounded-xl font-bold text-lg hover:from-green-700 hover:to-green-800 transition-all duration-200 shadow-lg hover:shadow-xl hover:scale-105 flex items-center justify-center gap-3"
                      onClick={() => navigate("/payment")}
                    >
                      <svg
                        className="w-6 h-6"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <title>Proceed to Payment</title>
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z"
                        />
                      </svg>
                      Proceed to Payment
                    </button>

                    <Link
                      className="w-full bg-secondary-100 text-secondary-700 py-3 px-6 rounded-xl font-semibold hover:bg-secondary-200 transition-all duration-200 flex items-center justify-center gap-3 border border-secondary-300"
                      to="/"
                    >
                      <svg
                        className="w-5 h-5"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <title>Continue Shopping</title>
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M15 19l-7-7 7-7"
                        />
                      </svg>
                      Continue Shopping
                    </Link>
                  </div>

                  {/* Trust Badges */}
                  <div className="grid grid-cols-2 gap-3 mt-8 pt-6 border-t border-secondary-200">
                    <div className="flex items-center gap-2 text-xs text-secondary-600">
                      <svg
                        className="w-4 h-4 text-green-600"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <title>Secure Checkout</title>
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                        />
                      </svg>
                      <span>Secure Checkout</span>
                    </div>
                    <div className="flex items-center gap-2 text-xs text-secondary-600">
                      <svg
                        className="w-4 h-4 text-blue-600"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <title>Fast Shipping</title>
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"
                        />
                      </svg>
                      <span>Fast Shipping</span>
                    </div>
                    <div className="flex items-center gap-2 text-xs text-secondary-600">
                      <svg
                        className="w-4 h-4 text-purple-600"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <title>Money Back Guarantee</title>
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                        />
                      </svg>
                      <span>Money Back</span>
                    </div>
                    <div className="flex items-center gap-2 text-xs text-secondary-600">
                      <svg
                        className="w-4 h-4 text-orange-600"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <title>24/7 Support</title>
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192L5.636 18.364M12 2.188l-4.95 4.95L12 12.187l4.95-4.95L12 2.188z"
                        />
                      </svg>
                      <span>24/7 Support</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Confirmation Modal */}
        {itemToRemove && (
          <div className="fixed inset-0 bg-black bg-opacity-60 backdrop-blur-sm flex items-center justify-center z-50 p-4 animate-fadeIn">
            <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full overflow-hidden animate-scaleIn">
              {/* Modal Header */}
              <div className="bg-gradient-to-r from-red-500 to-red-600 p-6">
                <div className="flex items-center gap-4 text-white">
                  <div className="w-16 h-16 rounded-full bg-red-400 bg-opacity-30 flex items-center justify-center flex-shrink-0">
                    <svg
                      className="w-8 h-8"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      aria-hidden="true"
                    >
                      <title>Warning icon</title>
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                      />
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold">Remove Item</h3>
                    <p className="text-red-100 text-sm">
                      This action cannot be undone
                    </p>
                  </div>
                </div>
              </div>

              {/* Modal Body */}
              <div className="p-6">
                <div className="mb-6">
                  <p className="text-secondary-700 text-lg mb-4">
                    Are you sure you want to remove{" "}
                    <span className="font-bold text-secondary-900 bg-secondary-100 px-2 py-1 rounded">
                      {itemToRemove.name}
                    </span>{" "}
                    from your cart?
                  </p>
                  <div className="bg-secondary-50 rounded-lg p-4 border border-secondary-200">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 bg-gradient-to-br from-primary-100 to-primary-200 rounded-lg flex items-center justify-center">
                        <span className="text-lg opacity-60">📦</span>
                      </div>
                      <div>
                        <p className="font-semibold text-secondary-900">
                          {itemToRemove.name}
                        </p>
                        <p className="text-sm text-secondary-600">
                          {itemToRemove.description}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="flex gap-4">
                  <button
                    type="button"
                    onClick={cancelRemoval}
                    className="flex-1 bg-secondary-100 text-secondary-700 py-3 px-6 rounded-xl font-semibold hover:bg-secondary-200 transition-all duration-200 border border-secondary-300"
                  >
                    Keep Item
                  </button>
                  <button
                    type="button"
                    onClick={confirmRemoval}
                    className="flex-1 bg-gradient-to-r from-red-600 to-red-700 text-white py-3 px-6 rounded-xl font-semibold hover:from-red-700 hover:to-red-800 transition-all duration-200 shadow-lg hover:shadow-xl flex items-center justify-center gap-2"
                  >
                    <svg
                      className="w-5 h-5"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <title>Remove Item</title>
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                      />
                    </svg>
                    Remove Item
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
