import { Link } from "react-router";
import { usePagedProducts } from "../hooks/usePagedProducts";
import type { Category } from "../types/category";

interface ProductListingProps {
  category: Category | null;
}

export const ProductListing = ({ category }: ProductListingProps) => {
  const { pagedProducts, error: productsError } = usePagedProducts({
    categoryId: category?.id || null,
    page: 1,
    pageSize: 10,
  });

  if (productsError) {
    return (
      <div className="flex flex-col items-center justify-center py-16">
        <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mb-4">
          <svg className="w-8 h-8 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        </div>
        <h3 className="text-xl font-semibold text-secondary-900 mb-2">Oops! Something went wrong</h3>
        <p className="text-secondary-600">We couldn't load the products. Please try again.</p>
      </div>
    );
  }

  if (!pagedProducts) {
    return (
      <div className="space-y-6">
        {/* Loading skeleton */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <div key={i} className="bg-white rounded-xl shadow-md overflow-hidden animate-pulse">
              <div className="h-48 bg-secondary-200" />
              <div className="p-6 space-y-4">
                <div className="h-6 bg-secondary-200 rounded animate-shimmer" />
                <div className="space-y-2">
                  <div className="h-4 bg-secondary-200 rounded animate-shimmer" />
                  <div className="h-4 bg-secondary-200 rounded w-3/4 animate-shimmer" />
                </div>
                <div className="h-8 bg-secondary-200 rounded w-24 animate-shimmer" />
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (!category) {
    return;
  }

  return (
    <div className="space-y-8">
      {/* Category Header */}
      <div className="flex items-center gap-4">
        <div className="w-12 h-12 bg-gradient-to-br from-primary-500 to-primary-600 rounded-xl flex items-center justify-center">
          <span className="text-xl text-white">📦</span>
        </div>
        <div>
          <h2 className="text-3xl font-bold text-secondary-900">{category?.name}</h2>
          <p className="text-secondary-600">Discover amazing products in this category</p>
        </div>
      </div>

      {/* Products Grid */}
      {pagedProducts.items && pagedProducts.items.length > 0 ? (
        <div>
          <div className="flex items-center justify-between mb-6">
            <p className="text-secondary-600">
              Showing <span className="font-semibold">{pagedProducts.items.length}</span> products
            </p>
            <div className="flex items-center gap-2">
              <span className="text-sm text-secondary-600">Sort by:</span>
              <select className="text-sm border border-secondary-300 rounded-lg px-3 py-1 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent">
                <option>Featured</option>
                <option>Price: Low to High</option>
                <option>Price: High to Low</option>
                <option>Name</option>
              </select>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {pagedProducts.items.map((product) => (
              <Link
                key={product.id}
                to={`/product-details/${product.id}`}
                className="group bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden border border-secondary-200 hover:border-primary-300 hover:-translate-y-2"
              >
                {/* Product Image */}
                <div className="relative h-48 bg-gradient-to-br from-primary-100 to-primary-200 flex items-center justify-center overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-br from-primary-50 to-primary-100 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  <span className="text-4xl opacity-60 group-hover:scale-110 transition-transform duration-300">📦</span>
                  
                  {/* Hover overlay */}
                  <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-20 transition-all duration-300 flex items-center justify-center">
                    <div className="transform translate-y-8 group-hover:translate-y-0 opacity-0 group-hover:opacity-100 transition-all duration-300">
                      <div className="bg-white text-primary-600 px-4 py-2 rounded-lg font-semibold text-sm shadow-lg">
                        View Details
                      </div>
                    </div>
                  </div>
                  
                  {/* Status badge */}
                  <div className="absolute top-3 right-3">
                    <span className={`px-2 py-1 rounded-full text-xs font-semibold ${
                      product.active 
                        ? 'bg-green-100 text-green-800 border border-green-200' 
                        : 'bg-red-100 text-red-800 border border-red-200'
                    }`}>
                      {product.active ? 'In Stock' : 'Out of Stock'}
                    </span>
                  </div>
                </div>

                {/* Product Details */}
                <div className="p-6">
                  <h3 className="text-lg font-bold text-secondary-900 mb-2 group-hover:text-primary-600 transition-colors line-clamp-1">
                    {product.name}
                  </h3>
                  <p className="text-secondary-600 text-sm mb-4 line-clamp-2 leading-relaxed">
                    {product.description}
                  </p>
                  
                  <div className="flex items-center justify-between">
                    <div>
                      <span className="text-2xl font-bold text-primary-600">
                        ${product.price}
                      </span>
                      <div className="flex items-center gap-1 mt-1">
                        <div className="flex text-yellow-400">
                          {[1,2,3,4,5].map(star => (
                            <svg key={star} className="w-4 h-4 fill-current" viewBox="0 0 20 20">
                              <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z"/>
                            </svg>
                          ))}
                        </div>
                        <span className="text-xs text-secondary-500 ml-1">(4.8)</span>
                      </div>
                    </div>
                    
                    <button className="w-10 h-10 bg-primary-100 text-primary-600 rounded-lg hover:bg-primary-200 transition-colors flex items-center justify-center group-hover:scale-110 transform duration-200">
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4m7.6 8L9 11h6" />
                      </svg>
                    </button>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      ) : (
        <div className="text-center py-16">
          <div className="w-24 h-24 bg-secondary-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <svg className="w-12 h-12 text-secondary-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" />
            </svg>
          </div>
          <h3 className="text-xl font-semibold text-secondary-900 mb-2">No products found</h3>
          <p className="text-secondary-600">We don't have any products in this category yet. Check back soon!</p>
        </div>
      )}
    </div>
  );
};
