import { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";

function AdminOrders() {
  const { token } = useAuth();

  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await fetch(
          "http://localhost:5000/api/orders/all",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        const data = await response.json();

        if (!response.ok) {
          throw new Error(
            data.message || "Failed to fetch orders."
          );
        }

        setOrders(data.orders);
      } catch (error) {
        console.error("Admin orders error:", error);
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
      <h1>Admin Orders</h1>

      <p>Total Orders: {orders.length}</p>

      {orders.length === 0 ? (
        <p>No orders found.</p>
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
              Customer:{" "}
              {order.user?.name || "Unknown Customer"}
            </p>

            <p>
              Email:{" "}
              {order.user?.email || "Unknown Email"}
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

            <h3>Total: ₹{order.totalPrice}</h3>

            <h3>Shipping Address</h3>

            <p>{order.shippingAddress.fullName}</p>
            <p>{order.shippingAddress.address}</p>
            <p>{order.shippingAddress.city}</p>
            <p>PIN: {order.shippingAddress.pinCode}</p>
            <p>Phone: {order.shippingAddress.phone}</p>
          </div>
        ))
      )}
    </div>
  );
}

export default AdminOrders;