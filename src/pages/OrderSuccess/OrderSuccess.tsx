import { useLocation, useNavigate } from "react-router";
import type { PaymentResponse } from "../../modules/customer/types/PaymentResponse";

export const OrderSuccess = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const paymentResponse = location.state?.paymentResponse as
    | PaymentResponse
    | undefined;

  // If no payment data, redirect to home (prevents direct access)
  if (!paymentResponse) {
    return (
      <div className="max-w-3xl mx-auto px-4 py-16">
        <div className="bg-white rounded-lg shadow-lg p-8 text-center">
          <h1 className="text-2xl font-bold text-gray-800 mb-4">
            No Order Found
          </h1>
          <p className="text-gray-600 mb-6">
            We couldn't find any order information. Please check your email for
            order confirmation.
          </p>
          <button
            type="button"
            onClick={() => navigate("/")}
            className="px-8 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium"
          >
            Continue Shopping
          </button>
        </div>
      </div>
    );
  }

  // Format the order date
  const orderDate = new Date(paymentResponse.orderDate).toLocaleDateString(
    "en-US",
    {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    },
  );

  return (
    <div className="max-w-3xl mx-auto px-4 py-16">
      <div className="bg-white rounded-lg shadow-lg p-8 text-center">
        {/* Success Icon */}
        <div className="flex justify-center mb-6">
          <div className="rounded-full bg-green-100 p-6">
            <svg
              className="w-16 h-16 text-green-600"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <title>Success checkmark</title>
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M5 13l4 4L19 7"
              />
            </svg>
          </div>
        </div>

        {/* Success Message */}
        <h1 className="text-3xl font-bold text-gray-800 mb-4">
          Order Placed Successfully!
        </h1>
        <p className="text-lg text-gray-600 mb-2">
          Thank you for your purchase. We've received your order and will send
          you a confirmation email shortly.
        </p>

        {/* Order Details */}
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-8">
          <div className="grid grid-cols-2 gap-3 text-sm">
            <div className="text-gray-600">Order ID:</div>
            <div className="font-semibold text-gray-800">
              {paymentResponse.id}
            </div>
            <div className="text-gray-600">Order Date:</div>
            <div className="font-semibold text-gray-800">{orderDate}</div>
            <div className="text-gray-600">Status:</div>
            <div className="font-semibold text-green-600">
              {paymentResponse.status}
            </div>
            <div className="text-gray-600">Total Amount:</div>
            <div className="font-bold text-gray-800 text-lg">
              {paymentResponse.currency} $
              {paymentResponse.totalAmount.toFixed(2)}
            </div>
          </div>
        </div>

        {/* Additional Info */}
        <div className="bg-gray-50 rounded-lg p-6 mb-8 text-left">
          <h2 className="text-lg font-semibold text-gray-800 mb-3">
            What's Next?
          </h2>
          <ul className="space-y-2 text-gray-600">
            <li className="flex items-start gap-2">
              <svg
                className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <title>Check</title>
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M5 13l4 4L19 7"
                />
              </svg>
              <span>You'll receive an order confirmation email</span>
            </li>
            <li className="flex items-start gap-2">
              <svg
                className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <title>Check</title>
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M5 13l4 4L19 7"
                />
              </svg>
              <span>We'll notify you when your order ships</span>
            </li>
            <li className="flex items-start gap-2">
              <svg
                className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <title>Check</title>
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M5 13l4 4L19 7"
                />
              </svg>
              <span>Track your order status in your account</span>
            </li>
          </ul>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button
            type="button"
            onClick={() => navigate("/")}
            className="px-8 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium"
          >
            Continue Shopping
          </button>
          <button
            type="button"
            onClick={() => navigate("/")}
            className="px-8 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors font-medium"
          >
            View Orders
          </button>
        </div>
      </div>
    </div>
  );
};
