import { useEffect, useState } from "react";
import { api } from "../../common/utils/api";
import { useAuthContext } from "../../modules/authentication/AuthProvider";
import type { Order } from "../../modules/orders/types/Order";

export const OrderHistory = () => {
  const { customer } = useAuthContext();
  const [orders, setOrders] = useState<Order[] | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!customer) {
      setLoading(false);
      return;
    }

    const fetchOrderHistory = async () => {
      try {
        setLoading(true);
        setError(null);
        const orders = await api.Get<Order[]>(
          `/orders/by-customer/${customer.id}`,
        );

        setOrders(
          orders.sort((a, b) => {
            return (
              new Date(b.orderDate).getTime() - new Date(a.orderDate).getTime()
            );
          }),
        );
      } catch (err) {
        setError("Failed to load order history. Please try again later.");
        console.error("Error fetching orders:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchOrderHistory();
  }, [customer]);

  if (!customer && !loading) {
    return (
      <div style={{ padding: "2rem" }}>
        <h1>Order History</h1>
        <p>Please sign in to view your order history.</p>
      </div>
    );
  }

  if (loading) {
    return (
      <div style={{ padding: "2rem" }}>
        <h1>Order History</h1>
        <p>Loading your orders...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div style={{ padding: "2rem" }}>
        <h1>Order History</h1>
        <p style={{ color: "red" }}>{error}</p>
      </div>
    );
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-GB", {
      day: "numeric",
      month: "long",
      year: "numeric",
    });
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
    }).format(amount);
  };

  return (
    <div style={{ padding: "2rem", maxWidth: "1200px", margin: "0 auto" }}>
      <h1 style={{ marginBottom: "2rem" }}>Order History</h1>

      {!orders || orders.length === 0 ? (
        <div
          style={{
            padding: "2rem",
            backgroundColor: "#f5f5f5",
            borderRadius: "8px",
            textAlign: "center",
          }}
        >
          <p>You haven't placed any orders yet.</p>
        </div>
      ) : (
        <div
          style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}
        >
          {orders.map((order) => (
            <div
              key={order.id}
              style={{
                border: "1px solid #ddd",
                borderRadius: "8px",
                padding: "1.5rem",
                backgroundColor: "white",
                boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
              }}
            >
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  marginBottom: "1rem",
                  paddingBottom: "1rem",
                  borderBottom: "1px solid #eee",
                }}
              >
                <div>
                  <h3 style={{ margin: "0 0 0.5rem 0" }}>Order #{order.id}</h3>
                  <p style={{ margin: 0, color: "#666" }}>
                    Placed on {formatDate(order.orderDate)}
                  </p>
                </div>
                <div style={{ textAlign: "right" }}>
                  <span
                    style={{
                      padding: "0.5rem 1rem",
                      borderRadius: "20px",
                      backgroundColor:
                        order.status === "Completed"
                          ? "#d4edda"
                          : order.status === "Processing"
                            ? "#fff3cd"
                            : order.status === "Shipped"
                              ? "#d1ecf1"
                              : "#f8d7da",
                      color:
                        order.status === "Completed"
                          ? "#155724"
                          : order.status === "Processing"
                            ? "#856404"
                            : order.status === "Shipped"
                              ? "#0c5460"
                              : "#721c24",
                      fontWeight: "bold",
                      fontSize: "0.9rem",
                    }}
                  >
                    {order.status}
                  </span>
                </div>
              </div>

              <div style={{ marginBottom: "1rem" }}>
                <h4 style={{ margin: "0 0 0.75rem 0" }}>Items:</h4>
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    gap: "0.5rem",
                  }}
                >
                  {order.items.map((item) => (
                    <div
                      key={item.id}
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                        padding: "0.5rem",
                        backgroundColor: "#f9f9f9",
                        borderRadius: "4px",
                      }}
                    >
                      <span>
                        <strong>{item.productName}</strong>
                        <span style={{ color: "#666", marginLeft: "0.5rem" }}>
                          × {item.quantity}
                        </span>
                      </span>
                      <span>
                        {formatCurrency(item.unitPrice * item.quantity)}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              <div
                style={{
                  display: "flex",
                  justifyContent: "flex-end",
                  paddingTop: "1rem",
                  borderTop: "1px solid #eee",
                }}
              >
                <div style={{ textAlign: "right" }}>
                  <p style={{ margin: "0 0 0.25rem 0", color: "#666" }}>
                    Total Amount:
                  </p>
                  <p
                    style={{
                      margin: 0,
                      fontSize: "1.5rem",
                      fontWeight: "bold",
                    }}
                  >
                    {formatCurrency(order.totalAmount)}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
