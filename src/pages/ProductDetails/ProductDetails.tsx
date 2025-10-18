import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import { api } from "../../common/utils/api";
import { AddToCart } from "../../modules/cart/components/AddToCart";
import type { Product } from "../../modules/products/types/product";

export const ProductDetails = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [buying, setBuying] = useState(false);

  useEffect(() => {
    const fetchProduct = async () => {
      if (!id) {
        setError("No product ID provided");
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        const data = await api.Get<Product>(`/products/${id}/summary`);
        setProduct(data);
        setError(null);
      } catch (err) {
        setError("Failed to load product details");
        console.error("Error fetching product:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-primary-50 via-white to-secondary-50">
        {/* Loading Header */}
        <div className="bg-white shadow-sm border-b border-secondary-200">
          <div className="max-w-7xl mx-auto px-6 py-4">
            <div className="flex items-center gap-4">
              <div className="w-32 h-6 bg-secondary-200 rounded animate-pulse" />
              <div className="flex items-center gap-2">
                <div className="w-12 h-4 bg-secondary-200 rounded animate-pulse" />
                <span>/</span>
                <div className="w-16 h-4 bg-secondary-200 rounded animate-pulse" />
              </div>
            </div>
          </div>
        </div>

        {/* Loading Content */}
        <div className="max-w-7xl mx-auto px-6 py-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Image Skeleton */}
            <div className="space-y-4">
              <div className="aspect-square bg-secondary-200 rounded-2xl animate-pulse" />
              <div className="grid grid-cols-4 gap-3">
                {[1, 2, 3, 4].map((i) => (
                  <div key={i} className="aspect-square bg-secondary-200 rounded-lg animate-pulse" />
                ))}
              </div>
            </div>

            {/* Info Skeleton */}
            <div className="space-y-8">
              <div className="space-y-4">
                <div className="w-3/4 h-12 bg-secondary-200 rounded animate-pulse" />
                <div className="w-32 h-8 bg-secondary-200 rounded animate-pulse" />
                <div className="flex items-center gap-4">
                  <div className="w-24 h-12 bg-secondary-200 rounded animate-pulse" />
                  <div className="w-16 h-6 bg-secondary-200 rounded animate-pulse" />
                </div>
              </div>
              
              <div className="space-y-3">
                <div className="w-24 h-6 bg-secondary-200 rounded animate-pulse" />
                <div className="space-y-2">
                  <div className="w-full h-4 bg-secondary-200 rounded animate-pulse" />
                  <div className="w-5/6 h-4 bg-secondary-200 rounded animate-pulse" />
                  <div className="w-4/5 h-4 bg-secondary-200 rounded animate-pulse" />
                </div>
              </div>
              
              <div className="flex gap-4">
                <div className="flex-1 h-12 bg-secondary-200 rounded-xl animate-pulse" />
                <div className="w-16 h-12 bg-secondary-200 rounded-xl animate-pulse" />
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (error || !product) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-red-50 via-white to-red-50 flex items-center justify-center">
        <div className="max-w-md w-full mx-4">
          <div className="bg-white rounded-2xl shadow-2xl p-8 text-center space-y-6">
            <div className="w-20 h-20 bg-red-100 rounded-full flex items-center justify-center mx-auto">
              <svg className="w-10 h-10 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            
            <div className="space-y-2">
              <h2 className="text-2xl font-bold text-secondary-900">Product Not Found</h2>
              <p className="text-secondary-600">{error || "We couldn't find the product you're looking for. It may have been removed or is no longer available."}</p>
            </div>
            
            <div className="flex gap-3">
              <button
                type="button"
                onClick={() => navigate("/")}
                className="flex-1 bg-gradient-to-r from-primary-600 to-primary-700 text-white font-semibold py-3 px-6 rounded-xl hover:from-primary-700 hover:to-primary-800 transition-all duration-200 flex items-center justify-center gap-2"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                </svg>
                Back to Store
              </button>
              
              <button
                type="button"
                onClick={() => window.location.reload()}
                className="px-6 py-3 border-2 border-secondary-300 text-secondary-700 rounded-xl hover:border-primary-300 hover:text-primary-700 hover:bg-primary-50 transition-all duration-200"
              >
                Retry
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-50 via-white to-secondary-50">
      {/* Hero Section with Breadcrumbs */}
      <div className="bg-white shadow-sm border-b border-secondary-200">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center gap-4">
            <button
              type="button"
              onClick={() => navigate("/")}
              className="flex items-center gap-2 px-4 py-2 text-secondary-600 hover:text-primary-600 hover:bg-primary-50 rounded-lg transition-all duration-200 group"
            >
              <svg className="w-4 h-4 transform group-hover:-translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
              Back to Store
            </button>
            <div className="flex items-center gap-2 text-sm text-secondary-500">
              <span>Home</span>
              <span>/</span>
              <span>Products</span>
              <span>/</span>
              <span className="text-primary-600 font-medium">{product.name}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Product Details */}
      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Product Image Placeholder */}
          <div className="space-y-4">
            <div className="aspect-square bg-gradient-to-br from-primary-100 to-primary-200 rounded-2xl p-12 flex items-center justify-center shadow-lg">
              <div className="text-center space-y-4">
                <div className="text-6xl opacity-60">📦</div>
                <p className="text-primary-700 font-medium">Product Image</p>
                <p className="text-sm text-primary-600">High-quality product photography coming soon</p>
              </div>
            </div>
            
            {/* Thumbnail Gallery */}
            <div className="grid grid-cols-4 gap-3">
              {[1, 2, 3, 4].map((i) => (
                <div key={i} className="aspect-square bg-gradient-to-br from-secondary-100 to-secondary-200 rounded-lg flex items-center justify-center opacity-60 hover:opacity-100 transition-opacity cursor-pointer">
                  <span className="text-xl">📷</span>
                </div>
              ))}
            </div>
          </div>

          {/* Product Info */}
          <div className="space-y-8">
            {/* Title and Status */}
            <div className="space-y-4">
              <div className="flex items-start justify-between">
                <h1 className="text-4xl font-bold text-secondary-900 leading-tight">{product.name}</h1>
                <span
                  className={`px-4 py-2 rounded-full text-sm font-semibold flex items-center gap-2 ${
                    product.active
                      ? "bg-green-100 text-green-800 border border-green-200"
                      : "bg-red-100 text-red-800 border border-red-200"
                  }`}
                >
                  <div className={`w-2 h-2 rounded-full ${
                    product.active ? "bg-green-500" : "bg-red-500"
                  }`} />
                  {product.active ? "In Stock" : "Out of Stock"}
                </span>
              </div>
              
              {/* Price */}
              <div className="flex items-baseline gap-4">
                <span className="text-5xl font-bold text-primary-600">${product.price}</span>
                <span className="text-lg text-secondary-500 line-through">$99.99</span>
                <span className="bg-red-100 text-red-700 px-3 py-1 rounded-full text-sm font-medium">25% OFF</span>
              </div>
            </div>

            {/* Description */}
            <div className="space-y-4">
              <h3 className="text-xl font-semibold text-secondary-800">Description</h3>
              <p className="text-lg text-secondary-600 leading-relaxed">{product.description}</p>
            </div>

            {/* Features */}
            <div className="space-y-4">
              <h3 className="text-xl font-semibold text-secondary-800">Key Features</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {[
                  "Premium Quality Materials",
                  "30-Day Money Back Guarantee",
                  "Free Shipping Worldwide",
                  "24/7 Customer Support"
                ].map((feature, i) => (
                  <div key={i} className="flex items-center gap-3 p-3 bg-secondary-50 rounded-lg">
                    <div className="w-2 h-2 bg-primary-500 rounded-full" />
                    <span className="text-secondary-700 font-medium">{feature}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Actions */}
            <div className="space-y-6 pt-6 border-t border-secondary-200">
              {/* Quantity Selector */}
              <div className="flex items-center gap-4">
                <label className="text-sm font-medium text-secondary-700">Quantity:</label>
                <div className="flex items-center border border-secondary-300 rounded-lg">
                  <button className="px-3 py-2 text-secondary-600 hover:text-primary-600 hover:bg-primary-50 transition-colors">
                    −
                  </button>
                  <span className="px-4 py-2 text-secondary-900 font-medium">1</span>
                  <button className="px-3 py-2 text-secondary-600 hover:text-primary-600 hover:bg-primary-50 transition-colors">
                    +
                  </button>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex gap-4">
                <button
                  type="button"
                  onClick={() => setBuying(true)}
                  disabled={!product.active}
                  className="flex-1 bg-gradient-to-r from-primary-600 to-primary-700 text-white font-semibold py-4 px-8 rounded-xl hover:from-primary-700 hover:to-primary-800 disabled:opacity-50 disabled:cursor-not-allowed transform hover:scale-105 transition-all duration-200 shadow-lg hover:shadow-xl flex items-center justify-center gap-3"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4m7.6 8L9 11m0 0l1.5 1.5L15 7.5M9 11h6m-6 0V9a2 2 0 012-2h2a2 2 0 012 2v2" />
                  </svg>
                  Add to Cart
                </button>
                
                <button
                  type="button"
                  className="px-6 py-4 border-2 border-secondary-300 text-secondary-700 rounded-xl hover:border-primary-300 hover:text-primary-700 hover:bg-primary-50 transition-all duration-200 flex items-center justify-center"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                  </svg>
                </button>
              </div>
            </div>

            {/* Trust Badges */}
            <div className="flex items-center justify-center gap-6 pt-6 border-t border-secondary-200">
              {[
                { icon: "🔒", text: "Secure Payment" },
                { icon: "🚚", text: "Fast Delivery" },
                { icon: "↩️", text: "Easy Returns" }
              ].map((badge, i) => (
                <div key={i} className="flex items-center gap-2 text-secondary-600">
                  <span className="text-lg">{badge.icon}</span>
                  <span className="text-sm font-medium">{badge.text}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Add to Cart Modal */}
      {buying && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          {/* Backdrop */}
          <div 
            className="absolute inset-0 bg-black bg-opacity-50 backdrop-blur-sm"
            onClick={() => setBuying(false)}
          />
          
          {/* Modal */}
          <div className="relative bg-white rounded-2xl shadow-2xl max-w-md w-full mx-4 p-6 transform transition-all">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-2xl font-bold text-secondary-900">Add to Cart</h3>
              <button
                onClick={() => setBuying(false)}
                className="p-2 text-secondary-400 hover:text-secondary-600 hover:bg-secondary-100 rounded-lg transition-colors"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            <AddToCart product={product} />
          </div>
        </div>
      )}
    </div>
  );
};
