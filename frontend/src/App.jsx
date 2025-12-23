import { useEffect, useState } from "react";
import axios from "axios";
import ProductCard from "./components/ProductCard";

function App() {
  const [products, setProducts] = useState([]);
  const [cart, setCart] = useState([]);
  const [orders, setOrders] = useState([]);
  const [token, setToken] = useState(localStorage.getItem("token"));
  const [orderSuccess, setOrderSuccess] = useState(null);

  // Fetch products (public)
  useEffect(() => {
    axios
      .get("http://localhost:5000/api/products")
      .then((res) => setProducts(res.data))
      .catch(console.error);
  }, []);

  // Fetch orders (protected)
  useEffect(() => {
    if (token) fetchOrders();
  }, [token]);

  const fetchOrders = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/orders", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setOrders(res.data);
    } catch (error) {
      console.error("Auth required");
    }
  };

  // LOGIN (temporary inline login)
  const login = async () => {
    try {
      const res = await axios.post("http://localhost:5000/api/auth/login", {
        email: "rishab@test.com",
        password: "123456",
      });

      localStorage.setItem("token", res.data.token);
      setToken(res.data.token);
    } catch (error) {
      alert("Login failed");
    }
  };

  const logout = () => {
    localStorage.removeItem("token");
    setToken(null);
    setOrders([]);
  };

  const addToCart = (product) => {
    setCart((prev) => {
      const existing = prev.find((i) => i.id === product.id);
      if (existing) {
        return prev.map((i) =>
          i.id === product.id ? { ...i, quantity: i.quantity + 1 } : i
        );
      }
      return [...prev, { ...product, quantity: 1 }];
    });
  };

  const totalAmount = cart.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  const placeOrder = async () => {
    try {
      const payload = {
        items: cart.map((i) => ({
          productId: i.id,
          quantity: i.quantity,
          price: i.price,
        })),
        totalAmount,
      };

      const res = await axios.post(
        "http://localhost:5000/api/orders",
        payload,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setOrderSuccess(res.data.orderId);
      setCart([]);
      fetchOrders();
    } catch (error) {
      alert("Login required to checkout");
    }
  };

  return (
    <div style={{ padding: "20px" }}>
      <h1>🎁 Gift Shop</h1>

      {/* AUTH */}
      {!token ? (
        <button onClick={login}>Login</button>
      ) : (
        <button onClick={logout}>Logout</button>
      )}

      {/* PRODUCTS */}
      <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "center" }}>
        {products.map((product) => (
          <ProductCard
            key={product.id}
            product={product}
            addToCart={addToCart}
          />
        ))}
      </div>

      {/* CART */}
      {token && (
        <>
          <h2>🛒 Cart</h2>
          {cart.map((item) => (
            <div key={item.id}>
              {item.name} × {item.quantity}
            </div>
          ))}

          {cart.length > 0 && (
            <button onClick={placeOrder}>
              Checkout ₹{totalAmount}
            </button>
          )}
        </>
      )}

      {/* SUCCESS */}
      {orderSuccess && (
        <p style={{ color: "green" }}>
          ✅ Order placed successfully! Order ID: {orderSuccess}
        </p>
      )}

      {/* ORDER HISTORY */}
      {token && (
        <>
          <h2>📦 Order History</h2>
          {orders.map((order) => (
            <div key={order.id}>
              Order #{order.id} — ₹{order.total_amount}
            </div>
          ))}
        </>
      )}
    </div>
  );
}

export default App;
