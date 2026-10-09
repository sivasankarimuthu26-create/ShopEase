import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext";
import { useAuth } from "../context/AuthContext";

function Checkout() {
  const { cartItems, clearCart } = useCart();
  const { token } = useAuth();
  const navigate = useNavigate();

  const [fullName, setFullName] = useState("");
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [pinCode, setPinCode] = useState("");
  const [phone, setPhone] = useState("");
  const [loading, setLoading] = useState(false);

  const totalPrice = cartItems.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (cartItems.length === 0) {
      alert("Your cart is empty.");
      return;
    }

    setLoading(true);

    try {
      const orderItems = cartItems.map((item) => ({
        product: item._id,
        name: item.name,
        price: item.price,
        quantity: item.quantity,
        image: item.image,
      }));

      const response = await fetch(
        "http://localhost:5000/api/orders",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            items: orderItems,
            shippingAddress: {
              fullName,
              address,
              city,
              pinCode,
              phone,
            },
            totalPrice,
          }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        alert(data.message || "Failed to place order.");
        return;
      }

      alert("Order placed successfully!");

      clearCart();

      navigate("/");
    } catch (error) {
      console.error("Place order error:", error);
      alert("Unable to connect to server.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h1>Checkout</h1>

      <h2>Order Summary</h2>

      {cartItems.map((item) => (
        <div key={item._id}>
          <p>
            {item.name} × {item.quantity}
          </p>

          <p>
            ₹{item.price * item.quantity}
          </p>
        </div>
      ))}

      <h2>Total: ₹{totalPrice}</h2>

      <h2>Shipping Details</h2>

      <form onSubmit={handleSubmit}>
        <div>
          <label>Full Name</label>
          <input
            type="text"
            value={fullName}
            onChange={(event) => setFullName(event.target.value)}
            required
          />
        </div>

        <div>
          <label>Address</label>
          <textarea
            value={address}
            onChange={(event) => setAddress(event.target.value)}
            required
          />
        </div>

        <div>
          <label>City</label>
          <input
            type="text"
            value={city}
            onChange={(event) => setCity(event.target.value)}
            required
          />
        </div>

        <div>
          <label>PIN Code</label>
          <input
            type="text"
            value={pinCode}
            onChange={(event) => setPinCode(event.target.value)}
            required
          />
        </div>

        <div>
          <label>Phone Number</label>
          <input
            type="tel"
            value={phone}
            onChange={(event) => setPhone(event.target.value)}
            required
          />
        </div>

        <button type="submit" disabled={loading}>
          {loading ? "Placing Order..." : "Place Order"}
        </button>
      </form>
    </div>
  );
}

export default Checkout;