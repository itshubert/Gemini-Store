import { useMemo, useState } from "react";
import { Header } from "../../components/Header";
import Sidebar from "../../components/Sidebar";
import { useCategories } from "../../modules/products/hooks/useCategories";
import { usePagedProducts } from "../../modules/products/hooks/usePagedProducts";
import type { Category } from "../../modules/products/types/category";

const Home = () => {
  const { categories } = useCategories();
  const [selectedCategory, setSelectedCategoryId] = useState<Category | null>(
    null,
  );

  const { pagedProducts, error: productsError } = usePagedProducts({
    categoryId: selectedCategory?.id || null,
    page: 1,
    pageSize: 10,
  });

  const handleSelectCategory = (categoryId: string) => {
    if (!categories) {
      return;
    }

    const category = categories.find((cat) => cat.id === categoryId) || null;
    setSelectedCategoryId(category);
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
    <>
      <Header />
      <div className="app-container">
        <Sidebar onCategorySelect={handleSelectCategory} />

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
    </>
  );
};

export default Home;
