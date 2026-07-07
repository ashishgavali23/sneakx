import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { auth, db } from "../firebase/firebase";
import {
  collection,
  addDoc,
  serverTimestamp,
  doc,
  setDoc,
} from "firebase/firestore";

function Checkout({ cartItems, setCartItems }) {
  const navigate = useNavigate();

  const [paymentMethod, setPaymentMethod] = useState("UPI");
  const [isPlacingOrder, setIsPlacingOrder] = useState(false);

  const [customer, setCustomer] = useState({
    fullName: "",
    email: "",
    address: "",
  });

  useEffect(() => {
    if (auth.currentUser?.email) {
      setCustomer((prev) => ({
        ...prev,
        email: auth.currentUser.email,
      }));
    }
  }, []);

  const total = cartItems.reduce(
    (sum, item) => sum + Number(item.price) * item.quantity,
    0,
  );

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCustomer((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleOrder = async () => {
    try {
      const user = auth.currentUser;

      if (!user) {
        alert("Please login first");
        return;
      }

      if (
        !customer.fullName.trim() ||
        !customer.email.trim() ||
        !customer.address.trim()
      ) {
        alert("Please fill all customer details");
        return;
      }

      if (cartItems.length === 0) {
        alert("Your cart is empty");
        return;
      }

      setIsPlacingOrder(true);

      const orderData = {
        items: cartItems,
        total,
        paymentMethod,
        customer: {
          fullName: customer.fullName.trim(),
          email: customer.email.trim(),
          address: customer.address.trim(),
        },
        status: "Placed",
        createdAt: serverTimestamp(),
      };

      await addDoc(collection(db, "users", user.uid, "orders"), orderData);

      await setDoc(doc(db, "users", user.uid), { cart: [] }, { merge: true });

      localStorage.removeItem("cartItems");
      setCartItems([]);

      navigate("/success");
    } catch (error) {
      console.error("Order error:", error);
      alert(error.message);
    } finally {
      setIsPlacingOrder(false);
    }
  };

  return (
    <div className="min-h-screen bg-black text-white px-6 md:px-10 py-16">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-4xl md:text-5xl font-black mb-10">Checkout</h1>

        {cartItems.length === 0 ? (
          <div className="bg-white/5 border border-white/10 rounded-3xl p-10 text-center">
            <h2 className="text-2xl font-bold mb-3">Your cart is empty</h2>
            <p className="text-gray-400">
              Add some products before proceeding to checkout.
            </p>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 gap-10">
            {/* Customer Details */}
            <div className="bg-white/5 p-8 rounded-3xl border border-white/10">
              <h2 className="text-2xl font-bold mb-6">Customer Details</h2>

              <input
                type="text"
                name="fullName"
                value={customer.fullName}
                onChange={handleChange}
                placeholder="Full Name"
                className="w-full p-4 bg-black border border-white/20 rounded-xl mb-4 outline-none"
              />

              <input
                type="email"
                name="email"
                value={customer.email}
                onChange={handleChange}
                placeholder="Email"
                className="w-full p-4 bg-black border border-white/20 rounded-xl mb-4 outline-none"
              />

              <textarea
                name="address"
                value={customer.address}
                onChange={handleChange}
                placeholder="Address"
                rows="4"
                className="w-full p-4 bg-black border border-white/20 rounded-xl mb-4 outline-none resize-none"
              />

              <h2 className="text-xl font-bold mt-8 mb-4">Payment Method</h2>

              <div className="space-y-3">
                {["UPI", "Card", "Cash on Delivery"].map((method) => (
                  <button
                    key={method}
                    type="button"
                    onClick={() => setPaymentMethod(method)}
                    className={`w-full p-4 rounded-xl border transition ${
                      paymentMethod === method
                        ? "bg-white text-black border-white"
                        : "bg-white/10 border-white/10 text-white hover:bg-white/20"
                    }`}
                  >
                    {method}
                  </button>
                ))}
              </div>
            </div>

            {/* Order Summary */}
            <div className="bg-white/5 p-8 rounded-3xl border border-white/10">
              <h2 className="text-2xl font-bold mb-6">Order Summary</h2>

              <div className="space-y-4">
                {cartItems.map((item) => (
                  <div
                    key={item.cartKey || item.id}
                    className="flex items-center justify-between border-b border-white/10 pb-4"
                  >
                    <div>
                      <p className="font-semibold">{item.name}</p>

                      <p className="text-sm text-gray-400">
                        Qty: {item.quantity}
                        {item.selectedSize && ` | Size: ${item.selectedSize}`}
                        {item.selectedColor &&
                          ` | Color: ${item.selectedColor}`}
                      </p>
                    </div>

                    <span className="font-semibold">
                      ₹{" "}
                      {(Number(item.price) * item.quantity).toLocaleString(
                        "en-IN",
                      )}
                    </span>
                  </div>
                ))}
              </div>

              <div className="border-t border-white/10 mt-6 pt-6 flex justify-between text-2xl font-bold">
                <span>Total</span>
                <span>₹ {total.toLocaleString("en-IN")}</span>
              </div>

              <button
                onClick={handleOrder}
                disabled={isPlacingOrder}
                className={`mt-8 w-full py-4 rounded-2xl font-bold transition ${
                  isPlacingOrder
                    ? "bg-gray-700 text-gray-400 cursor-not-allowed"
                    : "bg-white text-black hover:scale-[1.02]"
                }`}
              >
                {isPlacingOrder ? "Placing Order..." : "Place Order"}
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Checkout;
