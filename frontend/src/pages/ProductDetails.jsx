import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { getProductById } from "../services/api";
import { useCart } from "../context/CartContext";

function ProductDetails() {
  const { id } = useParams();
  const { addToCart } = useCart();

  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const data = await getProductById(id);
        setProduct(data.product);
      } catch (error) {
        setError("Failed to load product.");
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  if (loading) {
    return <p>Loading product...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  if (!product) {
    return <p>Product not found.</p>;
  }

  return (
    <div className="product-details-page">
      <Link to="/">← Back to Products</Link>
  
      <div className="product-details">
        <div className="product-details-image">
          <img
            src={product.image}
            alt={product.name}
          />
        </div>
  
        <div className="product-details-info">
          <h1>{product.name}</h1>
  
          <p className="product-brand">
            Brand: {product.brand}
          </p>
  
          <p className="product-rating">
            ⭐ {product.rating} ({product.numReviews} reviews)
          </p>
  
          <h2 className="product-price">
            ₹{product.price}
          </h2>
  
          <p>{product.description}</p>
  
          <p>
            <strong>Category:</strong> {product.category}
          </p>
  
          <p>
            <strong>Stock:</strong> {product.stock}
          </p>
  
          <button
            type="button"
            onClick={() => addToCart(product)}
            disabled={product.stock === 0}
          >
            {product.stock === 0
              ? "Out of Stock"
              : "Add to Cart"}
          </button>
        </div>
      </div>
    </div>
  );
}

export default ProductDetails;