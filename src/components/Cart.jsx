function Cart({cartItems, setCartItems, isOpen, setIsOpen}){
    const total = cartItems.reduce((sum,total)=> sum + item.price * item.quantity,0)
};
const increaseQuantity = (id) => {
    setCartItems (cartItems.map((item) => item.id === id ? {...item, quantity: item.quantity + 1} : item));
};

const decreaseQuantity = (id) => {
    setCartItems (cartItems.map((item) => item.id === id ? {...item, quantity: item.quantity - 1} : item));
};

return (
    <div className={`fixed top-0 right-0 w-full md:w-96 h-full bg-zinc-900/90 backdrop-blur-lg border border-white/10 rounded-l-3xl p-6 transition-transform ${isOpen ? 'translate-x-0' : 'translate-x-full'}`}>
        <h2 className="text-white text-2xl font-bold mb-6">
            Cart
        </h2>

        {cartItems.map((item) => (
            <div key={item.id} className="flex items-center justify-between mb-4">
                <div>
                    <h3 className="text-white text-lg font-semibold">
                        {item.name}
                    </h3>
                    <p className="text-gray-400">
                        ₹ {item.price} x {item.quantity}
                    </p>
                </div>
                <div className="flex items-center gap-2">
                    <button
                        onClick={() => decreaseQuantity(item.id)}
                        className="bg-white/10 text-white hover:bg-white/20 border border-white/10 rounded-full w-8 h-8 flex items-center justify-center"
                    >
                        -
                    </button>
                    <span className="text-white font-bold">{item.quantity}</span>
                    <button
                        onClick={() => increaseQuantity(item.id)}
                        className="bg-white/10 text-white hover:bg-white/20 border border-white/10 rounded-full w-8 h-8 flex items-center justify-center"
                    >
                        +
                    </button>
                </div>
            </div>
        ))}
    </div>
)

export default Cart;