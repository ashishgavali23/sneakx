import { Link } from "react-router-dom";

function Cart({ cartItems, updateCartItems, isOpen, setIsOpen }) {
  const total = cartItems.reduce(
    (sum, item) => sum + Number(item.price) * item.quantity,
    0,
  );

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

  const removeItem = (cartKey) => {
    const updatedCart = cartItems.filter((item) => item.cartKey !== cartKey);
    updateCartItems(updatedCart);
  };

  return (
    <div
      className={`fixed top-0 right-0 w-full md:w-[420px] h-full bg-zinc-900/95 backdrop-blur-xl border-l border-white/10 shadow-2xl z-[100] transition-transform duration-300 ${
        isOpen ? "translate-x-0" : "translate-x-full"
      }`}
    >
      <div className="h-full flex flex-col p-6">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-white text-2xl font-bold">Cart</h2>

          <button
            onClick={() => setIsOpen(false)}
            className="text-white text-xl"
          >
            ✕
          </button>
        </div>

        {/* Cart Items */}
        <div className="flex-1 overflow-y-auto space-y-5 pr-1">
          {cartItems.length === 0 ? (
            <p className="text-gray-400 text-center mt-20">
              Your cart is empty
            </p>
          ) : (
            cartItems.map((item) => (
              <div
                key={item.cartKey}
                className="bg-white/5 border border-white/10 rounded-3xl p-4"
              >
                <div className="flex gap-4">
                  <img
                    src={item.images?.[0]}
                    alt={item.name}
                    className="w-24 h-24 object-contain bg-white rounded-2xl p-2"
                  />

                  <div className="flex-1">
                    <h3 className="text-white text-lg font-semibold">
                      {item.name}
                    </h3>

                    <p className="text-gray-400 text-sm mt-1">
                      ₹ {Number(item.price).toLocaleString()}
                    </p>

                    {item.selectedSize && (
                      <p className="text-gray-400 text-sm mt-1">
                        Size:{" "}
                        <span className="text-white">{item.selectedSize}</span>
                      </p>
                    )}

                    {item.selectedColor && (
                      <p className="text-gray-400 text-sm">
                        Color:{" "}
                        <span className="text-white">{item.selectedColor}</span>
                      </p>
                    )}

                    {/* Quantity Controls */}
                    <div className="flex items-center gap-3 mt-4">
                      <button
                        onClick={() => decreaseQuantity(item.cartKey)}
                        className="bg-white/10 text-white hover:bg-white/20 border border-white/10 rounded-full w-8 h-8 flex items-center justify-center"
                      >
                        -
                      </button>

                      <span className="text-white font-bold min-w-[20px] text-center">
                        {item.quantity}
                      </span>

                      <button
                        onClick={() => increaseQuantity(item.cartKey)}
                        className="bg-white/10 text-white hover:bg-white/20 border border-white/10 rounded-full w-8 h-8 flex items-center justify-center"
                      >
                        +
                      </button>

                      <button
                        onClick={() => removeItem(item.cartKey)}
                        className="ml-auto text-red-400 text-sm hover:text-red-300"
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Footer */}
        <div className="border-t border-white/10 pt-6 mt-6">
          <div className="flex items-center justify-between mb-5">
            <span className="text-gray-400 text-lg">Total</span>
            <span className="text-white text-2xl font-bold">
              ₹ {total.toLocaleString()}
            </span>
          </div>

          {cartItems.length > 0 && (
            <Link to="/checkout" onClick={() => setIsOpen(false)}>
              <button className="w-full bg-white text-black py-4 rounded-full font-bold hover:scale-[1.02] transition">
                Proceed to Checkout
              </button>
            </Link>
          )}
        </div>
      </div>
    </div>
  );
}

export default Cart;
