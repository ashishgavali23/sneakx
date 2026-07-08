import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import { useEffect, useState } from "react";

import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Shop from "./pages/Shop";
import ProductDetails from "./pages/ProductDetails";
import Wishlist from "./pages/Wishlist";
import Checkout from "./pages/Checkout";
import OrderSuccess from "./pages/OrderSuccess";
import Register from "./pages/Register";
import Login from "./pages/Login";
import MyOrders from "./pages/MyOrders";
import ProtectedRoute from "./components/ProtectedRoute";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { doc, setDoc, getDoc } from "firebase/firestore";
import { db, auth } from "./firebase/firebase";
import { onAuthStateChanged } from "firebase/auth";

function App() {
  const [cartItems, setCartItems] = useState(() => {
    const savedCart = localStorage.getItem("cartItems");
    return savedCart ? JSON.parse(savedCart) : [];
  });

  const [wishlistItems, setWishlistItems] = useState(() => {
    const savedWishlist = localStorage.getItem("wishlistItems");
    return savedWishlist ? JSON.parse(savedWishlist) : [];
  });

  const [cartOpen, setCartOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  // ---------------- FIRESTORE HELPERS ----------------
  const saveWishlistToFirestore = async (wishlist) => {
    const user = auth.currentUser;
    if (!user) return;

    try {
      await setDoc(doc(db, "users", user.uid), { wishlist }, { merge: true });
    } catch (error) {
      console.error("Error saving wishlist:", error);
    }
  };

  const saveCartToFirestore = async (cart) => {
    const user = auth.currentUser;
    if (!user) return;

    try {
      await setDoc(doc(db, "users", user.uid), { cart }, { merge: true });
    } catch (error) {
      console.error("Error saving cart:", error);
    }
  };

  const loadWishlist = async () => {
    const user = auth.currentUser;
    if (!user) return;

    try {
      const docSnap = await getDoc(doc(db, "users", user.uid));

      if (docSnap.exists()) {
        setWishlistItems(docSnap.data().wishlist || []);
      }
    } catch (error) {
      console.error("Error loading wishlist:", error);
    }
  };

  const loadCart = async () => {
    const user = auth.currentUser;
    if (!user) return;

    try {
      const docSnap = await getDoc(doc(db, "users", user.uid));

      if (docSnap.exists()) {
        setCartItems(docSnap.data().cart || []);
      }
    } catch (error) {
      console.error("Error loading cart:", error);
    }
  };

  const clearCart = () => {
    setCartItems([]);
    saveCartToFirestore([]);
    localStorage.removeItem("cartItems");
  };

  // ---------------- AUTH STATE ----------------
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        await Promise.all([loadWishlist(), loadCart()]);
      }
    });

    return () => unsubscribe();
  }, []);

  // ---------------- LOCAL STORAGE ----------------
  useEffect(() => {
    localStorage.setItem("cartItems", JSON.stringify(cartItems));
  }, [cartItems]);

  useEffect(() => {
    localStorage.setItem("wishlistItems", JSON.stringify(wishlistItems));
  }, [wishlistItems]);

  // ---------------- SHARED CART UPDATER ----------------
  const updateCartItems = (updatedCart) => {
    setCartItems(updatedCart);
    saveCartToFirestore(updatedCart);
  };

  // ---------------- WISHLIST ----------------
  const toggleWishlist = (product) => {
    setWishlistItems((prev) => {
      const exists = prev.some((item) => item.id === product.id);

      let updatedWishlist;

      if (exists) {
        updatedWishlist = prev.filter((item) => item.id !== product.id);
        toast.info(`${product.name} removed from wishlist!`);
      } else {
        updatedWishlist = [...prev, product];
        toast.success(`${product.name} added to wishlist!`);
      }

      saveWishlistToFirestore(updatedWishlist);
      return updatedWishlist;
    });
  };

  // ---------------- CART ----------------
  const addToCart = (product) => {
    const cartKey = `${product.id}-${product.selectedSize || "nosize"}-${product.selectedColor || "nocolor"}`;

    const existingItem = cartItems.find((item) => item.cartKey === cartKey);

    let updatedCart;

    if (existingItem) {
      updatedCart = cartItems.map((item) =>
        item.cartKey === cartKey
          ? {
              ...item,
              quantity: Math.min(
                item.quantity + (product.quantity || 1),
                item.stock || item.quantity + (product.quantity || 1),
              ),
            }
          : item,
      );
    } else {
      updatedCart = [
        ...cartItems,
        {
          ...product,
          cartKey,
          quantity: product.quantity || 1,
        },
      ];
    }

    updateCartItems(updatedCart);
    toast.success(`${product.name} added to cart!`);
    setCartOpen(true);
  };

  const increaseQuantity = (cartKey) => {
    const updatedCart = cartItems.map((item) =>
      item.cartKey === cartKey
        ? {
            ...item,
            quantity: Math.min(
              item.quantity + 1,
              item.stock || item.quantity + 1,
            ),
          }
        : item,
    );

    updateCartItems(updatedCart);
  };

  const decreaseQuantity = (cartKey) => {
    const updatedCart = cartItems
      .map((item) =>
        item.cartKey === cartKey
          ? { ...item, quantity: item.quantity - 1 }
          : item,
      )
      .filter((item) => item.quantity > 0);

    updateCartItems(updatedCart);
  };

  const removeFromCart = (cartKey) => {
    const updatedCart = cartItems.filter((item) => item.cartKey !== cartKey);
    updateCartItems(updatedCart);
  };

  // ---------------- TOTALS ----------------
  const totalPrice = cartItems.reduce(
    (total, item) => total + Number(item.price) * item.quantity,
    0,
  );

  const totalCartCount = cartItems.reduce(
    (sum, item) => sum + item.quantity,
    0,
  );

  return (
    <BrowserRouter>
      <div className="bg-black min-h-screen text-white">
        <ToastContainer position="top-right" autoClose={2000} theme="dark" />

        <Navbar
          cartCount={totalCartCount}
          wishlistCount={wishlistItems.length}
          setCartOpen={setCartOpen}
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
        />

        <Routes>
          <Route
            path="/"
            element={
              <Home
                addToCart={addToCart}
                searchTerm={searchTerm}
                wishlistItems={wishlistItems}
                toggleWishlist={toggleWishlist}
              />
            }
          />

          <Route
            path="/shop"
            element={
              <Shop
                addToCart={addToCart}
                searchTerm={searchTerm}
                wishlistItems={wishlistItems}
                toggleWishlist={toggleWishlist}
              />
            }
          />

          <Route
            path="/product/:id"
            element={<ProductDetails addToCart={addToCart} />}
          />

          <Route
            path="/wishlist"
            element={
              <Wishlist
                wishlistItems={wishlistItems}
                toggleWishlist={toggleWishlist}
                addToCart={addToCart}
              />
            }
          />

          <Route
            path="/checkout"
            element={
              <ProtectedRoute>
                <Checkout cartItems={cartItems} clearCart={clearCart} />
              </ProtectedRoute>
            }
          />

          <Route path="/success" element={<OrderSuccess />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />

          <Route
            path="/orders"
            element={
              <ProtectedRoute>
                <MyOrders />
              </ProtectedRoute>
            }
          />
        </Routes>

        {/* CART SIDEBAR */}
        {cartOpen && (
          <>
            <div
              onClick={() => setCartOpen(false)}
              className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40"
            />

            <div className="fixed top-0 right-0 w-full sm:w-[380px] h-screen bg-zinc-900 text-white p-6 sm:p-8 z-50 shadow-2xl overflow-y-auto">
              <div className="flex items-center justify-between mb-8">
                <h1 className="text-3xl font-bold">Cart</h1>
                <button
                  onClick={() => setCartOpen(false)}
                  className="text-2xl hover:opacity-80 transition"
                >
                  ✕
                </button>
              </div>

              <div className="space-y-5">
                {cartItems.length === 0 ? (
                  <div className="text-center mt-20">
                    <h2 className="text-2xl font-bold">Your cart is empty</h2>
                    <p className="text-gray-400 mt-3">
                      Add some products to continue shopping.
                    </p>
                  </div>
                ) : (
                  cartItems.map((item) => (
                    <div
                      key={item.cartKey}
                      className="flex items-center gap-4 bg-white/5 p-4 rounded-2xl border border-white/10"
                    >
                      <img
                        src={item.images?.[0]}
                        alt={item.name}
                        className="w-24 h-24 object-contain bg-white rounded-xl p-2"
                      />

                      <div className="flex-1">
                        <h2 className="font-bold">{item.name}</h2>

                        <p className="text-gray-400">
                          ₹ {Number(item.price).toLocaleString("en-IN")}
                        </p>

                        {item.selectedSize && (
                          <p className="text-sm text-gray-400 mt-1">
                            Size:{" "}
                            <span className="text-white">
                              {item.selectedSize}
                            </span>
                          </p>
                        )}

                        {item.selectedColor && (
                          <p className="text-sm text-gray-400">
                            Color:{" "}
                            <span className="text-white">
                              {item.selectedColor}
                            </span>
                          </p>
                        )}

                        <div className="flex items-center gap-3 mt-3">
                          <button
                            onClick={() => decreaseQuantity(item.cartKey)}
                            className="w-8 h-8 rounded-full bg-white/10 hover:bg-white hover:text-black transition"
                          >
                            -
                          </button>

                          <span className="font-bold">{item.quantity}</span>

                          <button
                            onClick={() => increaseQuantity(item.cartKey)}
                            className="w-8 h-8 rounded-full bg-white/10 hover:bg-white hover:text-black transition"
                          >
                            +
                          </button>
                        </div>

                        <button
                          onClick={() => removeFromCart(item.cartKey)}
                          className="mt-2 text-sm text-red-400 hover:text-red-300 transition"
                        >
                          Remove
                        </button>
                      </div>
                    </div>
                  ))
                )}
              </div>

              {cartItems.length > 0 && (
                <div className="mt-10 border-t border-white/10 pt-6">
                  <div className="flex items-center justify-between text-xl font-bold">
                    <span>Total</span>
                    <span>₹ {totalPrice.toLocaleString("en-IN")}</span>
                  </div>

                  <Link to="/checkout" onClick={() => setCartOpen(false)}>
                    <button className="mt-6 w-full bg-white text-black py-4 rounded-2xl font-bold hover:bg-gray-300 transition">
                      Checkout
                    </button>
                  </Link>
                </div>
              )}
            </div>
          </>
        )}
      </div>
    </BrowserRouter>
  );
}

export default App;
