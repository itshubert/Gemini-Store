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
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-blue-50 py-16">
      <div className="max-w-4xl mx-auto px-6">
        {/* Success Animation & Header */}
        <div className="text-center mb-12">
          <div className="relative mb-8">
            {/* Animated Success Icon */}
            <div className="w-32 h-32 mx-auto relative">
              <div className="absolute inset-0 bg-gradient-to-br from-green-400 to-green-600 rounded-full animate-pulse shadow-2xl shadow-green-500/30" />
              <div className="absolute inset-2 bg-white rounded-full flex items-center justify-center">
                <svg
                  className="w-16 h-16 text-green-600 animate-bounce"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <title>Success checkmark</title>
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={3}
                    d="M5 13l4 4L19 7"
                  />
                </svg>
              </div>
            </div>
            
            {/* Confetti Effect */}
            <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
              <div className="flex gap-1">
                {['🎉', '✨', '🎊', '⭐', '🌟'].map((emoji, i) => (
                  <span 
                    key={i} 
                    className="text-2xl animate-bounce opacity-70"
                    style={{ animationDelay: `${i * 0.1}s` }}
                  >
                    {emoji}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Success Message */}
          <h1 className="text-5xl font-bold bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent mb-6">
            Order Placed Successfully!
          </h1>
          <p className="text-xl text-secondary-600 mb-8 max-w-2xl mx-auto leading-relaxed">
            🎉 Thank you for your purchase! We've received your order and will send
            you a confirmation email shortly. Get ready for an amazing shopping experience!
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Order Details Card */}
          <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
            <div className="bg-gradient-to-r from-blue-500 to-blue-600 p-6">
              <h2 className="text-2xl font-bold text-white flex items-center gap-3">
                <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
                Order Details
              </h2>
            </div>

            <div className="p-6">
              <div className="space-y-4">
                <div className="flex justify-between items-center p-3 bg-secondary-50 rounded-lg">
                  <span className="font-medium text-secondary-700 flex items-center gap-2">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 20l4-16m2 16l4-16M6 9h14M4 15h14" />
                    </svg>
                    Order ID
                  </span>
                  <span className="font-bold text-secondary-900 font-mono bg-secondary-100 px-3 py-1 rounded">
                    #{paymentResponse.id.slice(-8).toUpperCase()}
                  </span>
                </div>
                <div className="flex justify-between items-center p-3 bg-secondary-50 rounded-lg">
                  <span className="font-medium text-secondary-700 flex items-center gap-2">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3a2 2 0 012-2h4a2 2 0 012 2v4m-6 8h6M3 9l2 2m0 0l2-2m-2 2v8a1 1 0 001 1h1" />
                    </svg>
                    Order Date
                  </span>
                  <span className="font-semibold text-secondary-900">{orderDate}</span>
                </div>
                <div className="flex justify-between items-center p-3 bg-green-50 rounded-lg border border-green-200">
                  <span className="font-medium text-green-700 flex items-center gap-2">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    Status
                  </span>
                  <span className="font-bold text-green-700 bg-green-100 px-3 py-1 rounded-full text-sm">
                    {paymentResponse.status}
                  </span>
                </div>
                <div className="flex justify-between items-center p-4 bg-gradient-to-r from-blue-100 to-blue-200 rounded-xl border border-blue-300">
                  <span className="font-bold text-blue-800 text-lg flex items-center gap-2">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z" />
                    </svg>
                    Total Amount
                  </span>
                  <span className="font-bold text-blue-800 text-2xl">
                    {paymentResponse.currency} ${paymentResponse.totalAmount.toFixed(2)}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* What's Next Card */}
          <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
            <div className="bg-gradient-to-r from-purple-500 to-purple-600 p-6">
              <h2 className="text-2xl font-bold text-white flex items-center gap-3">
                <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
                What's Next?
              </h2>
            </div>
            
            <div className="p-6">
              <div className="space-y-4">
                {[
                  {
                    icon: "📧",
                    title: "Email Confirmation",
                    description: "You'll receive an order confirmation email within minutes",
                    color: "text-blue-600"
                  },
                  {
                    icon: "📦",
                    title: "Order Processing",
                    description: "We'll start preparing your order for shipment",
                    color: "text-orange-600"
                  },
                  {
                    icon: "🚚",
                    title: "Shipping Notification",
                    description: "Track your package once it's on its way to you",
                    color: "text-green-600"
                  },
                  {
                    icon: "🎁",
                    title: "Enjoy Your Purchase",
                    description: "Your order will arrive within 3-5 business days",
                    color: "text-purple-600"
                  }
                ].map((step, i) => (
                  <div key={i} className="flex items-start gap-4 p-4 bg-secondary-50 rounded-xl hover:bg-secondary-100 transition-colors">
                    <div className="w-12 h-12 bg-white rounded-lg flex items-center justify-center shadow-sm">
                      <span className="text-xl">{step.icon}</span>
                    </div>
                    <div className="flex-1">
                      <h3 className={`font-semibold ${step.color} mb-1`}>{step.title}</h3>
                      <p className="text-sm text-secondary-600">{step.description}</p>
                    </div>
                    <div className="w-6 h-6 rounded-full border-2 border-green-300 bg-green-100 flex items-center justify-center">
                      <div className="w-2 h-2 bg-green-600 rounded-full" />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-6 justify-center mt-12">
          <button
            type="button"
            onClick={() => navigate("/")}
            className="flex items-center justify-center gap-3 px-8 py-4 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-xl hover:from-blue-700 hover:to-blue-800 transition-all duration-200 font-bold text-lg shadow-lg hover:shadow-xl hover:scale-105"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4m7.6 8L9 11h6" />
            </svg>
            Continue Shopping
          </button>
          
          <button
            type="button"
            onClick={() => navigate("/order-history")}
            className="flex items-center justify-center gap-3 px-8 py-4 bg-secondary-100 text-secondary-700 rounded-xl hover:bg-secondary-200 transition-all duration-200 font-semibold text-lg border border-secondary-300 hover:border-secondary-400"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
            </svg>
            View All Orders
          </button>
        </div>
      </div>
    </div>
  );
};
