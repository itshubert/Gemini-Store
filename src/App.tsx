import { useMemo, useState } from "react";
import "./App.css";
import { useCategories } from "./modules/products/hooks/useCategories";
import { usePagedProducts } from "./modules/products/hooks/usePagedProducts";

function App() {
  const { categories } = useCategories();
  const [selectedCategoryId, setSelectedCategoryId] = useState<string | null>(
    null,
  );

  const { pagedProducts, error: productsError } = usePagedProducts({
    categoryId: selectedCategoryId,
    page: 1,
    pageSize: 10,
  });

  const selectedCategory = useMemo(() => {
    return categories?.find((cat) => cat.id === selectedCategoryId) || null;
  }, [categories, selectedCategoryId]);

  const handleSelectCategory = (categoryId: string) => {
    setSelectedCategoryId(categoryId);
  };

  const productListing = useMemo(() => {
    if (productsError) {
      return <div>Error loading products</div>;
    }
    if (!pagedProducts) {
      return <div>Loading products...</div>;
    }

    if (!selectedCategory) {
      return;
    }

    return (
      <div>
        <h2 className="text-2xl font-bold mt-8">{selectedCategory?.name}</h2>
        <ul>
          {pagedProducts.items?.map((product) => (
            <li key={product.id}>
              <div className="border p-4 my-2">
                <h3 className="text-xl font-semibold">{product.name}</h3>
                <p className="text-gray-600">{product.description}</p>
                <p className="text-green-600 font-bold">${product.price}</p>
              </div>
            </li>
          ))}
        </ul>
      </div>
    );
  }, [pagedProducts, productsError, selectedCategory]);

  return (
    <div className="app-container">
      <aside className="sidebar">
        <h2 className="sidebar-title">Categories</h2>
        <ul className="category-list">
          {categories?.map((category) => (
            <li key={category.id}>
              <button
                type="button"
                className={`category-button ${selectedCategoryId === category.id ? "active" : ""}`}
                onClick={() => handleSelectCategory(category.id)}
              >
                {category.name}
              </button>
            </li>
          ))}
        </ul>
      </aside>

      <main className="main-content">
        {!selectedCategory ? (
          <div className="empty-state">
            <h2>Welcome to Gemini Store</h2>
            <p>Select a category from the sidebar to browse products</p>
          </div>
        ) : (
          productListing
        )}
      </main>
    </div>
  );
}

export default App;
