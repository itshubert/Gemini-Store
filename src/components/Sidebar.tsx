import { useState } from "react";
import { useCategories } from "../modules/products/hooks/useCategories";

interface SidebarProps {
  onCategorySelect: (categoryId: string) => void;
}

const Sidebar = ({ onCategorySelect }: SidebarProps) => {
  const { categories } = useCategories();
  const [selectedCategoryId, setSelectedCategoryId] = useState<string | null>(
    null,
  );

  const handleSelectCategory = (categoryId: string) => {
    setSelectedCategoryId(categoryId);
    onCategorySelect(categoryId);
  };

  return (
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
  );
};

export default Sidebar;
