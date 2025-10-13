import { useState } from "react";
import Sidebar from "../../components/Sidebar";
import { ProductListing } from "../../modules/products/components/ProductListing";
import { useCategories } from "../../modules/products/hooks/useCategories";
import type { Category } from "../../modules/products/types/category";

const Home = () => {
  const { categories } = useCategories();
  const [selectedCategory, setSelectedCategory] = useState<Category | null>(
    null,
  );

  const handleSelectCategory = (categoryId: string) => {
    if (!categories) {
      return;
    }

    const category = categories.find((cat) => cat.id === categoryId) || null;
    setSelectedCategory(category);
  };

  return (
    <>
      {/* <Header /> */}
      <div className="app-container">
        <Sidebar onCategorySelect={handleSelectCategory} />

        <main className="main-content">
          {!selectedCategory ? (
            <div className="empty-state">
              <h2>Welcome to Gemini Store</h2>
              <p>Select a category from the sidebar to browse products</p>
            </div>
          ) : (
            <ProductListing category={selectedCategory} />
          )}
        </main>
      </div>
    </>
  );
};

export default Home;
