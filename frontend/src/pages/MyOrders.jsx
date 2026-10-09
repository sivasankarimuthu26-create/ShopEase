import { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";

function MyOrders() {
  const { token } = useAuth();

  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await fetch(
          "http://localhost:5000/api/orders/my-orders",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        const data = await response.json();

        if (!response.ok) {
          throw new Error(data.message || "Failed to fetch orders.");
        }

        setOrders(data.orders);
      } catch (error) {
        console.error("Fetch orders error:", error);
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, [token]);

  if (loading) {
    return <p>Loading orders...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <div>
      <h1>My Orders</h1>

      {orders.length === 0 ? (
        <p>You have not placed any orders yet.</p>
      ) : (
        orders.map((order) => (
          <div key={order._id}>
            <hr />

            <h2>Order #{order._id}</h2>

            <p>
              Date:{" "}
              {new Date(order.createdAt).toLocaleDateString()}
            </p>

            <p>
              Status: <strong>{order.status}</strong>
            </p>

            <h3>Products</h3>

            {order.items.map((item) => (
              <div key={item.product}>
                <p>
                  {item.name} × {item.quantity}
                </p>

                <p>
                  ₹{item.price * item.quantity}
                </p>
              </div>
            ))}

            <h2>Total: ₹{order.totalPrice}</h2>
          </div>
        ))
      )}
    </div>
  );
}

export default MyOrders;