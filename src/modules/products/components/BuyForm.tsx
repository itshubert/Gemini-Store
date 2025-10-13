import { useForm } from "react-hook-form";
import { api } from "../../../common/utils/api";
import { useAuthContext } from "../../authentication/AuthProvider";
import type { BuyRequest } from "../types/buy-request";
import type { Product } from "../types/product";

interface BuyFormProps {
  product: Product;
}

export const BuyForm = ({ product }: BuyFormProps) => {
  const { customer } = useAuthContext();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<BuyRequest>({
    defaultValues: {
      customerId: customer?.id,
      firstName: customer?.firstName || "",
      lastName: customer?.lastName || "",
      email: customer?.email || "",
      currency: "USD",
      shippingAddress: {
        addressLine1: "",
        addressLine2: "",
        city: "",
        state: "",
        postCode: "",
        country: "",
      },
      items: [
        {
          productId: product.id,
          quantity: 1,
          unitPrice: product.price,
        },
      ],
    },
  });

  const onSubmit = async (data: BuyRequest) => {
    // Update the items array with current quantity and price
    data.items = [
      {
        productId: product.id,
        quantity: data.items[0].quantity,
        unitPrice: product.price,
      },
    ];

    try {
      const result = await api.Post("/orders", data);
      console.log("Order submitted successfully:", result);
    } catch (error) {
      console.error("Error submitting order:", error);
    }
  };

  return (
    <div className="buy-form">
      <h3 className="text-lg font-semibold mb-4">Buy {product.name}</h3>
      <p className="mb-4 text-gray-600">Price: ${product.price}</p>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        {/* Quantity Field */}
        <div>
          <label htmlFor="quantity" className="block text-sm font-medium mb-1">
            Quantity
          </label>
          <input
            id="quantity"
            type="number"
            min="1"
            {...register("items.0.quantity", {
              required: "Quantity is required",
              min: { value: 1, message: "Quantity must be at least 1" },
              valueAsNumber: true,
            })}
            className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          {errors.items?.[0]?.quantity && (
            <p className="text-red-500 text-sm mt-1">
              {errors.items[0].quantity.message}
            </p>
          )}
        </div>

        {/* Customer Information - only show if customer is not available */}
        {!customer && (
          <>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label
                  htmlFor="firstName"
                  className="block text-sm font-medium mb-1"
                >
                  First Name
                </label>
                <input
                  id="firstName"
                  type="text"
                  {...register("firstName", {
                    required: "First name is required",
                  })}
                  className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                {errors.firstName && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.firstName.message}
                  </p>
                )}
              </div>

              <div>
                <label
                  htmlFor="lastName"
                  className="block text-sm font-medium mb-1"
                >
                  Last Name
                </label>
                <input
                  id="lastName"
                  type="text"
                  {...register("lastName", {
                    required: "Last name is required",
                  })}
                  className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                {errors.lastName && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.lastName.message}
                  </p>
                )}
              </div>
            </div>

            <div>
              <label htmlFor="email" className="block text-sm font-medium mb-1">
                Email
              </label>
              <input
                id="email"
                type="email"
                {...register("email", {
                  required: "Email is required",
                  pattern: {
                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                    message: "Invalid email address",
                  },
                })}
                className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              {errors.email && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.email.message}
                </p>
              )}
            </div>
          </>
        )}

        {/* Shipping Address */}
        <div className="border-t pt-4">
          <h4 className="text-md font-semibold mb-3">Shipping Address</h4>

          <div>
            <label
              htmlFor="addressLine1"
              className="block text-sm font-medium mb-1"
            >
              Address Line 1
            </label>
            <input
              id="addressLine1"
              type="text"
              {...register("shippingAddress.addressLine1", {
                required: "Address is required",
              })}
              className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            {errors.shippingAddress?.addressLine1 && (
              <p className="text-red-500 text-sm mt-1">
                {errors.shippingAddress.addressLine1.message}
              </p>
            )}
          </div>

          <div className="mt-3">
            <label
              htmlFor="addressLine2"
              className="block text-sm font-medium mb-1"
            >
              Address Line 2 (Optional)
            </label>
            <input
              id="addressLine2"
              type="text"
              {...register("shippingAddress.addressLine2")}
              className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div className="grid grid-cols-2 gap-4 mt-3">
            <div>
              <label htmlFor="city" className="block text-sm font-medium mb-1">
                City
              </label>
              <input
                id="city"
                type="text"
                {...register("shippingAddress.city", {
                  required: "City is required",
                })}
                className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              {errors.shippingAddress?.city && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.shippingAddress.city.message}
                </p>
              )}
            </div>

            <div>
              <label htmlFor="state" className="block text-sm font-medium mb-1">
                State
              </label>
              <input
                id="state"
                type="text"
                {...register("shippingAddress.state", {
                  required: "State is required",
                })}
                className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              {errors.shippingAddress?.state && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.shippingAddress.state.message}
                </p>
              )}
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4 mt-3">
            <div>
              <label
                htmlFor="postCode"
                className="block text-sm font-medium mb-1"
              >
                Post Code
              </label>
              <input
                id="postCode"
                type="text"
                {...register("shippingAddress.postCode", {
                  required: "Post code is required",
                })}
                className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              {errors.shippingAddress?.postCode && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.shippingAddress.postCode.message}
                </p>
              )}
            </div>

            <div>
              <label
                htmlFor="country"
                className="block text-sm font-medium mb-1"
              >
                Country
              </label>
              <input
                id="country"
                type="text"
                {...register("shippingAddress.country", {
                  required: "Country is required",
                })}
                className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              {errors.shippingAddress?.country && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.shippingAddress.country.message}
                </p>
              )}
            </div>
          </div>
        </div>

        {/* Currency (hidden field with default value) */}
        <input type="hidden" {...register("currency")} value="USD" />

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 font-medium"
        >
          Buy Now
        </button>
      </form>
    </div>
  );
};

export default BuyForm;
