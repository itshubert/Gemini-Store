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
    return <div>Error loading products</div>;
  }

  if (!pagedProducts) {
    return <div>Loading products...</div>;
  }

  if (!category) {
    return;
  }

  return (
    <div>
      <h2 className="text-2xl font-bold mt-8">{category?.name}</h2>
      <ul>
        {pagedProducts.items?.map((product) => (
          <li key={product.id}>
            <Link to={`/product-details/${product.id}`}>
              <div className="border p-4 my-2">
                <h3 className="text-xl font-semibold">{product.name}</h3>
                <p className="text-gray-600">{product.description}</p>
                <p className="text-green-600 font-bold">${product.price}</p>
              </div>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};
