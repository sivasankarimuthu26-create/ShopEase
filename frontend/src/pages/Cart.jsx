
import { Link } from "react-router-dom";
import { useCart } from "../context/CartContext";
function Cart() {
  const {
    cartItems,
    increaseQuantity,
    decreaseQuantity,
    removeFromCart,
    clearCart,
  } = useCart();

  const totalPrice = cartItems.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  return (
    <div>
      <h1>Your Cart</h1>

      {cartItems.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <>
          {cartItems.map((item) => (
            <div key={item._id}>
              <h2>{item.name}</h2>

              <p>Price: ₹{item.price}</p>

              <div>
                <span>Quantity: {item.quantity}</span>

                <button
                  type="button"
                  onClick={() => decreaseQuantity(item._id)}
                >
                  −
                </button>

                <button
                  type="button"
                  onClick={() => increaseQuantity(item._id)}
                >
                  +
                </button>

                <button
                  type="button"
                  onClick={() => removeFromCart(item._id)}
                >
                  Remove
                </button>
              </div>

              <p>
                Subtotal: ₹{item.price * item.quantity}
              </p>
            </div>
          ))}

<button
  type="button"
  onClick={clearCart}
>
  Clear Cart
</button>

          <h2>Total: ₹{totalPrice}</h2>

          <Link to="/checkout">
  <button type="button">
    Proceed to Checkout
  </button>
</Link>
        </>
      )}
    </div>
  );
}

export default Cart;