import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import { api } from "../../../common/utils/api";
import { AddToCart } from "../../cart/components/AddToCart";
import type { Product } from "../types/product";
import BuyForm from "./BuyForm";

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
      <div className="container mx-auto p-4">
        <div className="text-center">Loading product details...</div>
      </div>
    );
  }

  if (error || !product) {
    return (
      <div className="container mx-auto p-4">
        <div className="text-red-600">{error || "Product not found"}</div>
        <button
          type="button"
          onClick={() => navigate("/")}
          className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          Back to Home
        </button>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-4">
      <button
        type="button"
        onClick={() => navigate("/")}
        className="mb-4 px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600"
      >
        ← Back
      </button>

      <div className="max-w-2xl mx-auto">
        <div className="border rounded-lg p-6 shadow-lg">
          <h1 className="text-3xl font-bold mb-4">{product.name}</h1>
          <p className="text-gray-700 mb-4 text-lg">{product.description}</p>
          <div className="flex items-center justify-between">
            <p className="text-green-600 font-bold text-2xl">
              ${product.price}
            </p>
            <span
              className={`px-3 py-1 rounded ${
                product.active
                  ? "bg-green-100 text-green-800"
                  : "bg-red-100 text-red-800"
              }`}
            >
              {product.active ? "Available" : "Unavailable"}
            </span>
            <button
              type="button"
              className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
              onClick={() => setBuying(true)}
            >
              Buy
            </button>
          </div>
        </div>
      </div>

      {buying && (
        <div className="mt-4 inset-0 flex items-center justify-center">
          <div className="border-1 border-black p-4">
            <AddToCart product={product} />
          </div>
        </div>
      )}
    </div>
  );
};
