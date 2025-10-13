import { useForm } from "react-hook-form";
import type { CartItem } from "../../products/types/buy-request";
import type { Product } from "../../products/types/product";
import { useCartContext } from "../CartProvider";

interface AddToCartProps {
  product: Product;
}

export const AddToCart = ({ product }: AddToCartProps) => {
  const { addItem } = useCartContext();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<CartItem>({
    defaultValues: {
      product,
      quantity: 1,
      unitPrice: product.price,
    },
  });

  const onAdd = (data: CartItem) => {
    addItem(data);
  };

  return (
    <div className="cart-form">
      <form onSubmit={handleSubmit(onAdd)} className="flex items-center gap-2">
        <div>
          <label htmlFor="quantity" className="block text-sm font-medium">
            Quantity
          </label>
          <input
            type="number"
            id="quantity"
            min={1}
            {...register("quantity", {
              required: "Quantity is required",
              min: { value: 1, message: "Minimum quantity is 1" },
              valueAsNumber: true,
            })}
            className="mt-1 block w-20 border border-gray-300 rounded-md p-2"
          />
          {errors.quantity && (
            <p className="text-red-600 text-sm mt-1">
              {errors.quantity.message}
            </p>
          )}
        </div>
        <button
          type="submit"
          className="mt-6 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
        >
          Add to Cart
        </button>
      </form>
    </div>
  );
};
