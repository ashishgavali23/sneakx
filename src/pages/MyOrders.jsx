import { useEffect, useState } from "react";
import { auth, db } from "../firebase/firebase";
import { collection, getDocs, orderBy, query } from "firebase/firestore";
import Footer from "../components/Footer";

function MyOrders() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  const formatPrice = (price) => {
    const numericPrice =
      typeof price === "string"
        ? Number(price.replace(/,/g, ""))
        : Number(price || 0);

    return numericPrice.toLocaleString("en-IN");
  };

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const user = auth.currentUser;

        if (!user) {
          setOrders([]);
          setLoading(false);
          return;
        }

        const ordersRef = collection(db, "users", user.uid, "orders");
        const q = query(ordersRef, orderBy("createdAt", "desc"));
        const snapshot = await getDocs(q);

        const ordersData = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));

        setOrders(ordersData);
      } catch (error) {
        console.error("Error fetching orders:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  return (
    <div className="min-h-screen bg-black text-white flex flex-col">
      <main className="flex-1 px-6 md:px-10 py-16">
        <div className="max-w-7xl mx-auto">
          <div className="mb-10">
            <h1 className="text-4xl md:text-5xl font-black">My Orders</h1>
            <p className="text-gray-400 mt-3">
              Track your previous purchases and order details.
            </p>
          </div>

          {loading ? (
            <div className="text-gray-400 text-lg">Loading orders...</div>
          ) : orders.length === 0 ? (
            <div className="bg-white/5 border border-white/10 rounded-3xl p-10 text-center">
              <h2 className="text-2xl font-bold">No Orders Found</h2>
              <p className="text-gray-400 mt-3">
                You haven’t placed any orders yet.
              </p>
            </div>
          ) : (
            <div className="space-y-8">
              {orders.map((order) => (
                <div
                  key={order.id}
                  className="bg-white/5 border border-white/10 rounded-3xl p-6 md:p-8 shadow-xl"
                >
                  {/* Order Header */}
                  <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                    <div>
                      <h2 className="text-2xl font-bold">Order #{order.id.slice(0, 8)}</h2>
                      <p className="text-gray-400 mt-2">
                        {order.createdAt?.seconds
                          ? new Date(order.createdAt.seconds * 1000).toLocaleString("en-IN")
                          : "Processing..."}
                      </p>
                    </div>

                    <div className="flex items-center gap-4">
                      <span className="bg-green-500/20 text-green-400 border border-green-500/20 px-4 py-2 rounded-full text-sm font-semibold">
                        {order.status || "Placed"}
                      </span>
                    </div>
                  </div>

                  {/* Customer / Payment Info */}
                  {(order.customer || order.paymentMethod) && (
                    <div className="grid md:grid-cols-2 gap-6 mt-8">
                      {order.customer && (
                        <div className="bg-black/30 border border-white/10 rounded-2xl p-5">
                          <h3 className="text-lg font-bold mb-3">
                            Customer Details
                          </h3>
                          <div className="space-y-2 text-gray-300">
                            <p>
                              <span className="text-white font-medium">Name:</span>{" "}
                              {order.customer.fullName}
                            </p>
                            <p>
                              <span className="text-white font-medium">Email:</span>{" "}
                              {order.customer.email}
                            </p>
                            <p>
                              <span className="text-white font-medium">Address:</span>{" "}
                              {order.customer.address}
                            </p>
                          </div>
                        </div>
                      )}

                      {order.paymentMethod && (
                        <div className="bg-black/30 border border-white/10 rounded-2xl p-5">
                          <h3 className="text-lg font-bold mb-3">Payment</h3>
                          <p className="text-gray-300">
                            <span className="text-white font-medium">Method:</span>{" "}
                            {order.paymentMethod}
                          </p>
                        </div>
                      )}
                    </div>
                  )}

                  {/* Order Items */}
                  <div className="mt-8">
                    <h3 className="text-xl font-bold mb-5">Items</h3>

                    <div className="space-y-4">
                      {order.items?.map((item, index) => {
                        const itemPrice =
                          typeof item.price === "string"
                            ? Number(item.price.replace(/,/g, ""))
                            : Number(item.price || 0);

                        return (
                          <div
                            key={item.cartKey || `${item.id}-${index}`}
                            className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 border border-white/10 bg-black/20 rounded-2xl p-4"
                          >
                            <div className="flex items-center gap-4">
                              <img
                                src={item.images?.[0]}
                                alt={item.name}
                                className="w-20 h-20 md:w-24 md:h-24 object-contain bg-white rounded-xl p-2"
                              />

                              <div>
                                <h4 className="text-lg font-bold">{item.name}</h4>

                                <div className="text-sm text-gray-400 mt-1 space-y-1">
                                  <p>Quantity: {item.quantity}</p>

                                  {item.selectedSize && (
                                    <p>Size: {item.selectedSize}</p>
                                  )}

                                  {item.selectedColor && (
                                    <p>Color: {item.selectedColor}</p>
                                  )}

                                  <p>Price: ₹ {formatPrice(item.price)}</p>
                                </div>
                              </div>
                            </div>

                            <div className="text-left sm:text-right">
                              <p className="text-gray-400 text-sm">Subtotal</p>
                              <p className="text-xl font-bold">
                                ₹ {(itemPrice * item.quantity).toLocaleString("en-IN")}
                              </p>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>

                  {/* Total */}
                  <div className="border-t border-white/10 mt-8 pt-6 flex items-center justify-between">
                    <p className="text-gray-400 text-lg">Order Total</p>
                    <p className="text-2xl md:text-3xl font-bold">
                      ₹ {Number(order.total || 0).toLocaleString("en-IN")}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
}

export default MyOrders;