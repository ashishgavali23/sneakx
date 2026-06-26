import { useEffect, useState } from "react";
import { auth, db } from "../firebase/firebase";
import { collection, getDocs, query, orderBy } from "firebase/firestore";

function MyOrders() {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const fetchOrders = async () => {
      const user = auth.currentUser;

      if (!user) return;

      try {
        const q = query(
          collection(db, "users", user.uid, "orders"),
          orderBy("createdAt", "desc"),
        );

        const snapshot = await getDocs(q);

        const ordersData = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));

        setOrders(ordersData);
      } catch (error) {
        console.error("Error fetching orders:", error);
      }
    };

    fetchOrders();
  }, []);

  return (
    <div className="min-h-screen bg-black text-white p-10">
      <h1 className="text-4xl font-bold mb-8">My Orders</h1>

      {orders.length === 0 ? (
        <p className="text-gray-400">No Orders Found.</p>
      ) : (
        orders.map((order) => (
          <div
            key={order.id}
            className="bg-zinc-900 border-white/10 rounded-3xl p-8 mb-8 shadow-xl"
          >
            <div className="flex justify-between items-center">
              <h2 className="text-xl font-bold">Order</h2>

              <span className="bg-green-500 px-4 py-2 rounded-full text-sm font-semibold">
                {order.status}
              </span>
            </div>

            <p className="text-gray-400 mt-2">
              {order.createdAt
                ? new Date(order.createdAt.seconds * 1000).toLocaleString(
                    "en-IN",
                  )
                : "Processing..."}
            </p>
            <div className="flex justify-between items-center mt-4">
              <p className="text-gray-400">Order Total</p>

              <p className="text-2xl font-bold">
                ₹ {order.total.toLocaleString("en-IN")}
              </p>
            </div>
            <div className="mt-6 space-y-4">
              {order.items.map((item) => (
                <div
                  key={item.id}
                  className="flex justify-between items-center border-b border-white/10 pb-3"
                >
                  <div className="flex items-center gap-4">
                    <img
                      src={item.images[0]}
                      alt={item.name}
                      className="w-24 h-24 object-contain bg-white rounded-xl p-2"
                    />
                  </div>
                  <div>
                    <h3 className="font-bold text-lg">{item.name}</h3>
                    <p className="text-gray-400">Quantity: {item.quantity}</p>
                    <p className="text-gray-400">₹{item.price}</p>
                  </div>

                  <p className="font-bold">
                    ₹
                    {(
                      Number(item.price.replace(/,/g, "")) * item.quantity
                    ).toLocaleString("en-IN")}
                  </p>
                </div>
              ))}
            </div>
          </div>
        ))
      )}
    </div>
  );
}

export default MyOrders;
