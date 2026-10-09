import { useEffect, useState } from "react";

import { getProducts } from "./services/api";
import ProductCard from "./components/ProductCard";

import { Routes, Route, Link } from "react-router-dom";

import Cart from "./pages/Cart";
import { useCart } from "./context/CartContext";

import ProductDetails from "./pages/ProductDetails";

import Login from "./pages/Login";
import Register from "./pages/Register";

import { useAuth } from "./context/AuthContext";

import ProtectedRoute from "./components/ProtectedRoute";
import Checkout from "./pages/Checkout";
import MyOrders from "./pages/MyOrders";

import AdminDashboard from "./pages/AdminDashboard";
import AdminRoute from "./components/AdminRoute";
import AdminOrders from "./pages/AdminOrders";


function Storefront() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [sortOption, setSortOption] = useState("default");
  const [maxPrice, setMaxPrice] = useState("all");

  const { cartItems } = useCart();

  const {
    isLoggedIn,
    isAdmin,
    logout,
  } = useAuth();

  const cartCount = cartItems.reduce(
    (total, item) => total + item.quantity,
    0
  );

  useEffect(() => {
    const loadProducts = async () => {
      try {
        const data = await getProducts();

        setProducts(data.products);
      } catch (error) {
        console.error(error);

        setError("Failed to load products.");
      } finally {
        setLoading(false);
      }
    };

    loadProducts();
  }, []);

  const categories = [
    {
      name: "Mobiles",
      icon: "📱",
    },
    {
      name: "Laptops",
      icon: "💻",
    },
    {
      name: "Audio",
      icon: "🎧",
    },
    {
      name: "Smart Watches",
      icon: "⌚",
    },
    {
      name: "Gaming",
      icon: "🎮",
    },
    {
      name: "Cameras",
      icon: "📷",
    },
    {
      name: "Tablets",
      icon: "📲",
    },
    {
      name: "Bags",
      icon: "🎒",
    },
  ];

  const filteredProducts = products
    .filter((product) => {
      const matchesSearch = product.name
        .toLowerCase()
        .includes(searchTerm.toLowerCase());

      const matchesCategory =
        selectedCategory === "All" ||
        product.category === selectedCategory;

      const matchesPrice =
        maxPrice === "all" ||
        product.price <= Number(maxPrice);

      return (
        matchesSearch &&
        matchesCategory &&
        matchesPrice
      );
    })
    .sort((a, b) => {
      if (sortOption === "price-low") {
        return a.price - b.price;
      }

      if (sortOption === "price-high") {
        return b.price - a.price;
      }

      if (sortOption === "rating") {
        return b.rating - a.rating;
      }

      return 0;
    });

  const handleCategoryClick = (category) => {
    setSelectedCategory(category);

    document
      .getElementById("products")
      ?.scrollIntoView({
        behavior: "smooth",
      });
  };

  return (
    <div className="storefront">

      {/* =========================
          NAVBAR
      ========================== */}

      <header className="main-header">

        <div className="navbar">

          <Link
            to="/"
            className="brand"
          >
            <span className="brand-icon">
              ◈
            </span>

            <span>
              Shop<span>Ease</span>
            </span>
          </Link>


          <div className="nav-search">

            <span className="search-icon">
              ⌕
            </span>

            <input
              type="text"
              placeholder="Search for products..."
              value={searchTerm}
              onChange={(event) =>
                setSearchTerm(event.target.value)
              }
            />

          </div>


          <nav className="nav-actions">

            {isLoggedIn ? (
              <>
                {isAdmin && (
                  <Link
                    to="/admin"
                    className="nav-link admin-link"
                  >
                    Admin
                  </Link>
                )}

                <Link
                  to="/my-orders"
                  className="nav-link"
                >
                  Orders
                </Link>

                <button
                  type="button"
                  className="nav-login-button"
                  onClick={logout}
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link
                  to="/login"
                  className="nav-link"
                >
                  Login
                </Link>

                <Link
                  to="/register"
                  className="nav-register-button"
                >
                  Sign Up
                </Link>
              </>
            )}

            <Link
              to="/cart"
              className="cart-button"
            >
              🛒

              <span>
                Cart
              </span>

              {cartCount > 0 && (
                <strong className="cart-badge">
                  {cartCount}
                </strong>
              )}
            </Link>

          </nav>

        </div>


        {/* Category navigation */}

        <div className="category-navbar">

          <div className="category-navbar-inner">

            <button
              type="button"
              className={
                selectedCategory === "All"
                  ? "category-nav active"
                  : "category-nav"
              }
              onClick={() =>
                handleCategoryClick("All")
              }
            >
              All Products
            </button>


            {categories.slice(0, 6).map(
              (category) => (
                <button
                  key={category.name}
                  type="button"
                  className={
                    selectedCategory ===
                    category.name
                      ? "category-nav active"
                      : "category-nav"
                  }
                  onClick={() =>
                    handleCategoryClick(
                      category.name
                    )
                  }
                >
                  {category.icon}{" "}
                  {category.name}
                </button>
              )
            )}

          </div>

        </div>

      </header>


      {/* =========================
          HERO SECTION
      ========================== */}

      <section className="hero-section">

        <div className="hero-content">

          <p className="hero-label">
            NEXT-GEN SHOPPING
          </p>

          <h1>
            Shop Smart.
            <br />
            <span>Live Digital.</span>
          </h1>

          <p className="hero-description">
            Discover the latest technology,
            smart devices and everyday
            essentials — all in one place.
          </p>

          <div className="hero-buttons">

            <button
              type="button"
              className="hero-primary-button"
              onClick={() =>
                document
                  .getElementById("products")
                  ?.scrollIntoView({
                    behavior: "smooth",
                  })
              }
            >
              Explore Products →
            </button>

            <button
              type="button"
              className="hero-secondary-button"
              onClick={() =>
                handleCategoryClick("Mobiles")
              }
            >
              Explore Mobiles
            </button>

          </div>

        </div>


        <div className="hero-visual">

          <div className="hero-glow"></div>

          {products.length > 0 && (
            <img
              src={products[0].image}
              alt={products[0].name}
              className="hero-product-image"
            />
          )}

          <div className="hero-floating-card">

            <span>
              ✦
            </span>

            <div>
              <strong>
                50+
              </strong>

              <small>
                Products Available
              </small>
            </div>

          </div>

        </div>

      </section>


      {/* =========================
          CATEGORY SECTION
      ========================== */}

      <section className="categories-section">

        <div className="section-heading">

          <div>
            <p className="section-label">
              EXPLORE
            </p>

            <h2>
              Shop by Category
            </h2>
          </div>

          <button
            type="button"
            onClick={() =>
              handleCategoryClick("All")
            }
          >
            View All →
          </button>

        </div>


        <div className="category-grid">

          {categories.map(
            (category) => (
              <button
                key={category.name}
                type="button"
                className="category-card"
                onClick={() =>
                  handleCategoryClick(
                    category.name
                  )
                }
              >

                <span className="category-icon">
                  {category.icon}
                </span>

                <span className="category-name">
                  {category.name}
                </span>

                <span className="category-arrow">
                  →
                </span>

              </button>
            )
          )}

        </div>

      </section>


      {/* =========================
          PRODUCTS SECTION
      ========================== */}

      <section
        id="products"
        className="products-section"
      >

        <div className="section-heading">

          <div>

            <p className="section-label">
              SHOP NOW
            </p>

            <h2>
              {selectedCategory === "All"
                ? "Featured Products"
                : selectedCategory}
            </h2>

          </div>

          <span className="product-count">
            {filteredProducts.length} products
          </span>

        </div>


        {/* Filters */}

        <div className="filter-panel">

          <div className="filter-search">

            <span>
              ⌕
            </span>

            <input
              type="text"
              placeholder="Search products..."
              value={searchTerm}
              onChange={(event) =>
                setSearchTerm(
                  event.target.value
                )
              }
            />

          </div>


          <select
            value={selectedCategory}
            onChange={(event) =>
              setSelectedCategory(
                event.target.value
              )
            }
          >

            <option value="All">
              All Categories
            </option>

            <option value="Mobiles">
              Mobiles
            </option>

            <option value="Laptops">
              Laptops
            </option>

            <option value="Computer Accessories">
              Computer Accessories
            </option>

            <option value="Audio">
              Audio
            </option>

            <option value="Smart Watches">
              Smart Watches
            </option>

            <option value="Bags">
              Bags
            </option>

            <option value="Home & Lifestyle">
              Home & Lifestyle
            </option>

            <option value="Gaming">
              Gaming
            </option>

            <option value="Cameras">
              Cameras
            </option>

            <option value="Tablets">
              Tablets
            </option>

          </select>


          <select
            value={sortOption}
            onChange={(event) =>
              setSortOption(
                event.target.value
              )
            }
          >

            <option value="default">
              Sort By
            </option>

            <option value="price-low">
              Price: Low to High
            </option>

            <option value="price-high">
              Price: High to Low
            </option>

            <option value="rating">
              Rating
            </option>

          </select>


          <select
            value={maxPrice}
            onChange={(event) =>
              setMaxPrice(
                event.target.value
              )
            }
          >

            <option value="all">
              All Prices
            </option>

            <option value="1000">
              Under ₹1,000
            </option>

            <option value="5000">
              Under ₹5,000
            </option>

            <option value="10000">
              Under ₹10,000
            </option>

            <option value="25000">
              Under ₹25,000
            </option>

          </select>

        </div>


        {loading && (
          <div className="loading-state">
            <div className="loading-spinner"></div>

            <p>
              Loading products...
            </p>
          </div>
        )}


        {error && (
          <div className="error-state">
            <p>
              {error}
            </p>
          </div>
        )}


        {!loading && !error && (
          <>

            {filteredProducts.length === 0 ? (

              <div className="empty-products">

                <span>
                  🔍
                </span>

                <h3>
                  No products found
                </h3>

                <p>
                  Try changing your search
                  or filters.
                </p>

                <button
                  type="button"
                  onClick={() => {
                    setSearchTerm("");
                    setSelectedCategory("All");
                    setSortOption("default");
                    setMaxPrice("all");
                  }}
                >
                  Clear Filters
                </button>

              </div>

            ) : (

              <div className="product-grid">

                {filteredProducts.map(
                  (product) => (
                    <ProductCard
                      key={product._id}
                      product={product}
                    />
                  )
                )}

              </div>

            )}

          </>
        )}

      </section>


      {/* =========================
          FEATURES
      ========================== */}

      <section className="features-section">

        <div className="feature-item">

          <span>
            🚚
          </span>

          <div>
            <strong>
              Fast Delivery
            </strong>

            <p>
              Quick and reliable delivery
            </p>
          </div>

        </div>


        <div className="feature-item">

          <span>
            🔒
          </span>

          <div>
            <strong>
              Secure Shopping
            </strong>

            <p>
              Your data is protected
            </p>
          </div>

        </div>


        <div className="feature-item">

          <span>
            ↩
          </span>

          <div>
            <strong>
              Easy Returns
            </strong>

            <p>
              Hassle-free return experience
            </p>
          </div>

        </div>


        <div className="feature-item">

          <span>
            💬
          </span>

          <div>
            <strong>
              Customer Support
            </strong>

            <p>
              We're here when you need us
            </p>
          </div>

        </div>

      </section>


      {/* =========================
          FOOTER
      ========================== */}

      <footer className="footer">

        <div className="footer-brand">

          <Link
            to="/"
            className="brand"
          >
            <span className="brand-icon">
              ◈
            </span>

            <span>
              Shop<span>Ease</span>
            </span>
          </Link>

          <p>
            Your modern destination for
            technology and everyday essentials.
          </p>

        </div>


        <div className="footer-links">

          <div>
            <h4>
              Shop
            </h4>

            <button
              type="button"
              onClick={() =>
                handleCategoryClick("Mobiles")
              }
            >
              Mobiles
            </button>

            <button
              type="button"
              onClick={() =>
                handleCategoryClick("Laptops")
              }
            >
              Laptops
            </button>

            <button
              type="button"
              onClick={() =>
                handleCategoryClick("Audio")
              }
            >
              Audio
            </button>
          </div>


          <div>
            <h4>
              Account
            </h4>

            {!isLoggedIn && (
              <>
                <Link to="/login">
                  Login
                </Link>

                <Link to="/register">
                  Register
                </Link>
              </>
            )}

            {isLoggedIn && (
              <Link to="/my-orders">
                My Orders
              </Link>
            )}

            <Link to="/cart">
              Cart
            </Link>
          </div>

        </div>

      </footer>


      <div className="footer-bottom">
        © 2026 ShopEase. Built with MERN Stack.
      </div>

    </div>
  );
}


function App() {
  return (
    <Routes>

      <Route
        path="/"
        element={<Storefront />}
      />

      <Route
        path="/cart"
        element={<Cart />}
      />

      <Route
        path="/product/:id"
        element={<ProductDetails />}
      />

      <Route
        path="/login"
        element={<Login />}
      />

      <Route
        path="/register"
        element={<Register />}
      />

      <Route
        path="/checkout"
        element={
          <ProtectedRoute>
            <Checkout />
          </ProtectedRoute>
        }
      />

      <Route
        path="/my-orders"
        element={
          <ProtectedRoute>
            <MyOrders />
          </ProtectedRoute>
        }
      />

      <Route
        path="/admin"
        element={
          <AdminRoute>
            <AdminDashboard />
          </AdminRoute>
        }
      />

      <Route
        path="/admin/orders"
        element={
          <AdminRoute>
            <AdminOrders />
          </AdminRoute>
        }
      />

    </Routes>
  );
}

export default App;