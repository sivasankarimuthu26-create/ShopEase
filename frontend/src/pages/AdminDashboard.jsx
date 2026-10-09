import { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";

function AdminDashboard() {
  const { token } = useAuth();

  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [editingProduct, setEditingProduct] = useState(null);
  const [saving, setSaving] = useState(false);

  // Fetch all products
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch(
          "http://localhost:5000/api/products"
        );

        const data = await response.json();

        if (!response.ok) {
          throw new Error(
            data.message || "Failed to fetch products."
          );
        }

        setProducts(data.products);
      } catch (error) {
        console.error("Admin products error:", error);
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [token]);

  // Delete product
  const handleDelete = async (productId) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this product?"
    );

    if (!confirmDelete) {
      return;
    }

    try {
      const response = await fetch(
        `http://localhost:5000/api/products/${productId}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data.message || "Failed to delete product."
        );
      }

      setProducts((currentProducts) =>
        currentProducts.filter(
          (product) => product._id !== productId
        )
      );

      alert("Product deleted successfully.");
    } catch (error) {
      console.error("Delete product error:", error);
      alert(error.message);
    }
  };

  // Save edited product
  const handleUpdate = async (event) => {
    event.preventDefault();

    if (!editingProduct) {
      return;
    }

    setSaving(true);

    try {
      const response = await fetch(
        `http://localhost:5000/api/products/${editingProduct._id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            name: editingProduct.name,
            description: editingProduct.description,
            price: Number(editingProduct.price),
            category: editingProduct.category,
            brand: editingProduct.brand,
            image: editingProduct.image,
            stock: Number(editingProduct.stock),
          }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data.message || "Failed to update product."
        );
      }

      setProducts((currentProducts) =>
        currentProducts.map((product) =>
          product._id === editingProduct._id
            ? data.product
            : product
        )
      );

      setEditingProduct(null);

      alert("Product updated successfully.");
    } catch (error) {
      console.error("Update product error:", error);
      alert(error.message);
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return <p>Loading admin dashboard...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <div>
      <h1>Admin Dashboard</h1>

      <h2>Products</h2>

      <p>Total Products: {products.length}</p>

      {products.length === 0 ? (
        <p>No products available.</p>
      ) : (
        products.map((product) => (
          <div key={product._id}>
            <hr />

            <h3>{product.name}</h3>

            <p>Category: {product.category}</p>

            <p>Price: ₹{product.price}</p>

            <p>Stock: {product.stock}</p>

            <button
              type="button"
              onClick={() => setEditingProduct(product)}
            >
              Edit
            </button>

            <button
              type="button"
              onClick={() => handleDelete(product._id)}
            >
              Delete
            </button>

            {editingProduct?._id === product._id && (
              <form onSubmit={handleUpdate}>
                <h3>Edit Product</h3>

                <div>
                  <label>Product Name</label>
                  <br />

                  <input
                    type="text"
                    value={editingProduct.name}
                    onChange={(event) =>
                      setEditingProduct({
                        ...editingProduct,
                        name: event.target.value,
                      })
                    }
                    required
                  />
                </div>

                <br />

                <div>
                  <label>Description</label>
                  <br />

                  <textarea
                    value={editingProduct.description}
                    onChange={(event) =>
                      setEditingProduct({
                        ...editingProduct,
                        description: event.target.value,
                      })
                    }
                    required
                  />
                </div>

                <br />

                <div>
                  <label>Price</label>
                  <br />

                  <input
                    type="number"
                    min="0"
                    value={editingProduct.price}
                    onChange={(event) =>
                      setEditingProduct({
                        ...editingProduct,
                        price: event.target.value,
                      })
                    }
                    required
                  />
                </div>

                <br />

                <div>
                  <label>Category</label>
                  <br />

                  <input
                    type="text"
                    value={editingProduct.category}
                    onChange={(event) =>
                      setEditingProduct({
                        ...editingProduct,
                        category: event.target.value,
                      })
                    }
                    required
                  />
                </div>

                <br />

                <div>
                  <label>Brand</label>
                  <br />

                  <input
                    type="text"
                    value={editingProduct.brand || ""}
                    onChange={(event) =>
                      setEditingProduct({
                        ...editingProduct,
                        brand: event.target.value,
                      })
                    }
                  />
                </div>

                <br />

                <div>
                  <label>Image URL</label>
                  <br />

                  <input
                    type="text"
                    value={editingProduct.image || ""}
                    onChange={(event) =>
                      setEditingProduct({
                        ...editingProduct,
                        image: event.target.value,
                      })
                    }
                  />
                </div>

                <br />

                <div>
                  <label>Stock</label>
                  <br />

                  <input
                    type="number"
                    min="0"
                    value={editingProduct.stock}
                    onChange={(event) =>
                      setEditingProduct({
                        ...editingProduct,
                        stock: event.target.value,
                      })
                    }
                    required
                  />
                </div>

                <br />

                <button type="submit" disabled={saving}>
                  {saving ? "Saving..." : "Save Changes"}
                </button>

                <button
                  type="button"
                  onClick={() => setEditingProduct(null)}
                  disabled={saving}
                >
                  Cancel
                </button>
              </form>
            )}
          </div>
        ))
      )}
    </div>
  );
}

export default AdminDashboard;