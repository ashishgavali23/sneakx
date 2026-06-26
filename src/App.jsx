import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useEffect, useState } from "react";

import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import ProductDetails from "./pages/ProductDetails";
import Wishlist from "./pages/Wishlist";
import Checkout from "./pages/Checkout";
import { Link } from "react-router-dom";
import OrderSuccess from "./pages/OrderSuccess";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Register from "./pages/Register";
import Login from "./pages/Login";
import { doc, setDoc } from "firebase/firestore";
import { db } from "./firebase/firebase";
import { auth } from "./firebase/firebase";
import { getDoc } from "firebase/firestore";
import { onAuthStateChanged } from "firebase/auth";
import ProtectedRoute from "./components/ProtectedRoute";
import MyOrders from "./pages/MyOrders";

function App() {
  const [cartItems, setCartItems] = useState(() => {
    const savedCart = localStorage.getItem("cartItems");
    return savedCart ? JSON.parse(savedCart) : [];
  });

  const [wishlistItems, setWishlistItems] = useState(() => {
    const savedWishlist = localStorage.getItem("wishlistItems");
    return savedWishlist ? JSON.parse(savedWishlist) : [];
  });

  const saveWishlistToFirestore = async (wishlist) => {
    const user = auth.currentUser;

    if (!user) return;

    await setDoc(
      doc(db, "users", user.uid),
      {
        wishlist,
      },
      { merge: true },
    );
  };

  const loadWishlist = async () => {
    const user = auth.currentUser;

    if (!user) return;

    const docRef = doc(db, "users", user.uid);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      console.log("Wishlist loaded:", docSnap.data());

      setWishlistItems(docSnap.data().wishlist || []);
    }
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        loadWishlist();
        loadCart();
      }
    });

    return () => unsubscribe();
  }, []);

  const toggleWishlist = (product) => {
    setWishlistItems((prev) => {
      const exists = prev.find((item) => item.id === product.id);

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

  const saveCartToFirestore = async (cart) => {
    const user = auth.currentUser;

    if (!user) return;

    await setDoc(
      doc(db, "users", user.uid),

      {
        cart,
      },
      { merge: true },
    );
  };

  const loadCart = async () => {
    const user = auth.currentUser;

    if (!user) return;

    const docRef = doc(db, "users", user.uid);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      setCartItems(docSnap.data().cart || []);
    }
  };

  const [cartOpen, setCartOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    localStorage.setItem("cartItems", JSON.stringify(cartItems));
  }, [cartItems]);

  useEffect(() => {
    localStorage.setItem("wishlistItems", JSON.stringify(wishlistItems));
  }, [wishlistItems]);

  const addToCart = (product) => {
    let updatedCart;

    const exists = cartItems.find((item) => item.id === product.id);

    if (exists) {
      updatedCart = cartItems.map((item) =>
        item.id === product.id
          ? {
              ...item,
              quantity: item.quantity + 1,
            }
          : item,
      );
    } else {
      updatedCart = [
        ...cartItems,
        {
          ...product,
          quantity: 1,
        },
      ];
    }

    setCartItems(updatedCart);

    saveCartToFirestore(updatedCart);

    toast.success(`${product.name} added to cart!`);
    setCartOpen(true);
  };

  const increaseQuantity = (id) => {
    const updatedCart = cartItems.map((item) =>
      item.id === id
        ? {
            ...item,
            quantity: item.quantity + 1,
          }
        : item,
    );

    setCartItems(updatedCart);
    saveCartToFirestore(updatedCart);
  };

  const decreaseQuantity = (id) => {
    const updatedCart = cartItems
      .map((item) =>
        item.id === id
          ? {
              ...item,
              quantity: item.quantity - 1,
            }
          : item,
      )
      .filter((item) => item.quantity > 0);

    setCartItems(updatedCart);
    saveCartToFirestore(updatedCart);
  };

  const removeFromCart = (indexToRemove) => {
    const updatedCart = cartItems.filter((_, index) => index !== indexToRemove);

    setCartItems(updatedCart);
    saveCartToFirestore(updatedCart);
  };

  const totalPrice = cartItems.reduce(
    (total, item) =>
      total + Number(item.price.replace(/,/g, "")) * item.quantity,
    0,
  );

  return (
    <BrowserRouter>
      <div className="bg-black min-h-screen">
        <ToastContainer position="top-right" autoClose={2000} theme="dark" />

        <Navbar
          cartCount={cartItems.length}
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
                <Checkout cartItems={cartItems} setCartItems={setCartItems} />
              </ProtectedRoute>
            }
          />

          <Route path="/success" element={<OrderSuccess />} />

          <Route path="/register" element={<Register />} />

          <Route path="/login" element={<Login />} />

          <Route path="/orders" element={<MyOrders />} />
        </Routes>

        {cartOpen && (
          <>
            {/* Overlay */}
            <div
              onClick={() => setCartOpen(false)}
              className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40"
            />

            {/* Cart Sidebar */}
            <div className="fixed top-0 right-0 w-[350px] h-screen bg-zinc-900 text-white p-8 z-50 shadow-2xl overflow-y-auto">
              <div className="flex items-center justify-between mb-10">
                <h1 className="text-3xl font-bold">Cart</h1>

                <button onClick={() => setCartOpen(false)} className="text-2xl">
                  ✕
                </button>
              </div>

              <div className="space-y-5">
                {cartItems.length === 0 ? (
                  <div className="text-center mt-20">
                    <h2 className="text-2xl font-bold">Your cart is empty</h2>

                    <p className="text-gray-400 mt-3">
                      Add some sneakers to continue shopping.
                    </p>
                  </div>
                ) : (
                  cartItems.map((item, index) => (
                    <div
                      key={item.id}
                      className="flex items-center gap-4 bg-white/5 p-4 rounded-2xl"
                    >
                      <img
                        src={item.images?.[0]}
                        alt={item.name}
                        className="w-24 h-24 object-contain bg-white rounded-xl p-2"
                      />

                      <div className="flex-1">
                        <h2 className="font-bold">{item.name}</h2>

                        <p className="text-gray-400">₹ {item.price}</p>

                        <div className="flex items-center gap-3 mt-2">
                          <button
                            onClick={() => decreaseQuantity(item.id)}
                            className="w-8 h-8 rounded-full bg-white/10 hover:bg-white hover:text-black transition"
                          >
                            -
                          </button>

                          <span className="font-bold">{item.quantity}</span>

                          <button
                            onClick={() => increaseQuantity(item.id)}
                            className="w-8 h-8 rounded-full bg-white/10 hover:bg-white hover:text-black transition"
                          >
                            +
                          </button>
                        </div>

                        <button
                          onClick={() => removeFromCart(index)}
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
