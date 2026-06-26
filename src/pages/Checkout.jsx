import { useState } from "react";
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

  const total = cartItems.reduce(
    (sum, item) => sum + Number(item.price.replace(/,/g, "")) * item.quantity,
    0,
  );

  const handleOrder = async () => {
    try {
      const user = auth.currentUser;
      if (!user) {
        alert("Please login first");
        return;
      }

      await addDoc(collection(db, "users", user.uid, "orders"), {
        items: cartItems,
        total: total,
        status: "Placed",
        createdAt: serverTimestamp(),
      });

      await setDoc(
        doc(db, "users", user.uid),
        {
          cart: [],
        },
        { merge: true },
      );
      localStorage.removeItem("cartItems");
      setCartItems([]);

      navigate("/success");
    } catch (error) {
      console.error(error);
      alert("Something went wrong while placing your order");
    }
  };

  return (
    <div className="min-h-screen bg-black text-white px-8 py-20">
      <h1 className="text-5xl font-black mb-10">Checkout</h1>

      <div className="grid md:grid-cols-2 gap-10">
        {/* Customer Details */}
        <div className="bg-white/5 p-8 rounded-3xl border border-white/10">
          <h2 className="text-2xl font-bold mb-6">Customer Details</h2>

          <input
            placeholder="Full Name"
            className="w-full p-4 bg-black border border-white/20 rounded-xl mb-4"
          />

          <input
            placeholder="Email"
            className="w-full p-4 bg-black border border-white/20 rounded-xl mb-4"
          />

          <input
            placeholder="Address"
            className="w-full p-4 bg-black border border-white/20 rounded-xl mb-4"
          />

          <h2 className="text-xl font-bold mt-8 mb-4">Payment Method</h2>

          <div className="space-y-3">
            {["UPI", "Card", "Cash on Delivery"].map((method) => (
              <button
                key={method}
                onClick={() => setPaymentMethod(method)}
                className={`w-full p-4 rounded-xl ${
                  paymentMethod === method
                    ? "bg-white text-black"
                    : "bg-white/10"
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

          {cartItems.map((item) => (
            <div key={item.id} className="flex justify-between mb-4">
              <span>
                {item.name} × {item.quantity}
              </span>

              <span>
                ₹
                {(
                  Number(item.price.replace(/,/g, "")) * item.quantity
                ).toLocaleString("en-IN")}
              </span>
            </div>
          ))}

          <div className="border-t border-white/10 mt-6 pt-6 flex justify-between text-2xl font-bold">
            <span>Total</span>

            <span>₹ {total.toLocaleString("en-IN")}</span>
          </div>

          <button
            onClick={handleOrder}
            className="mt-10 w-full bg-white text-black py-4 rounded-2xl font-bold hover:scale-105 transition"
          >
            Place Order
          </button>
        </div>
      </div>
    </div>
  );
}

export default Checkout;
