import { Link } from "react-router-dom";
import { useCart } from "../context/CartContext";

function ProductCard({ product }) {
  const { addToCart } = useCart();

  const discount = product.price >= 10000 ? 15 : 10;

  const originalPrice = Math.round(
    product.price / (1 - discount / 100)
  );

  return (
    <div className="product-card">
      {/* Wishlist */}
      <button
        type="button"
        className="wishlist-button"
        aria-label={`Add ${product.name} to wishlist`}
      >
        ♡
      </button>

      {/* Product Image */}
      <Link
        to={`/product/${product._id}`}
        className="product-image-link"
      >
        <div className="product-image-wrapper">
          <img
            src={product.image}
            alt={product.name}
            className="product-image"
          />
        </div>
      </Link>

      {/* Product Information */}
      <div className="product-info">
        <Link
          to={`/product/${product._id}`}
          className="product-name-link"
        >
          <h2>{product.name}</h2>
        </Link>

        {/* Rating */}
        <div className="product-rating">
          <span className="rating-badge">
            ⭐ {product.rating || "4.0"}
          </span>

          <span className="review-count">
            ({product.numReviews || 0} reviews)
          </span>
        </div>

        {/* Price */}
        <div className="product-price-row">
          <span className="current-price">
            ₹{product.price.toLocaleString("en-IN")}
          </span>

          <span className="original-price">
            ₹{originalPrice.toLocaleString("en-IN")}
          </span>

          <span className="discount">
            {discount}% OFF
          </span>
        </div>

        {/* Delivery / Stock */}
        <div className="product-delivery">
          <span>🚚</span>
          <span>Delivery available</span>
        </div>

        <p
          className={
            product.stock > 0
              ? "stock-status"
              : "stock-status out-of-stock"
          }
        >
          {product.stock > 0
            ? `${product.stock} items available`
            : "Out of stock"}
        </p>

        {/* Add to Cart */}
        <button
          type="button"
          className="add-to-cart-button"
          onClick={() => addToCart(product)}
          disabled={product.stock === 0}
        >
          {product.stock === 0
            ? "Out of Stock"
            : "🛒 Add to Cart"}
        </button>
      </div>
    </div>
  );
}

export default ProductCard;