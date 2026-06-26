import { motion } from "framer-motion";

function ProductModal({
  selectedProduct,
  setSelectedProduct,
  addToCart,
}) {
  if (!selectedProduct) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/70 backdrop-blur-md px-6">

      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        className="relative bg-zinc-900 border border-white/10 rounded-3xl max-w-5xl w-full overflow-hidden"
      >
        {/* Close */}
        <button
          onClick={() => setSelectedProduct(null)}
          className="absolute top-5 right-5 text-white text-3xl z-50"
        >
          ✕
        </button>

        <div className="grid md:grid-cols-2 gap-10 p-10">

          {/* Image */}
          <div className="flex items-center justify-center bg-white/5 rounded-3xl p-10">

            <img
              src={selectedProduct.image}
              alt={selectedProduct.name}
              className="w-full max-w-md rotate-[-20deg]"
            />
          </div>

          {/* Content */}
          <div className="text-white flex flex-col justify-center">

            <p className="uppercase tracking-[4px] text-gray-400 mb-3">
              Premium Sneakers
            </p>

            <h1 className="text-5xl font-black">
              {selectedProduct.name}
            </h1>

            <p className="text-3xl mt-6 font-bold">
              ₹ {selectedProduct.price}
            </p>

            <p className="text-gray-400 mt-6 leading-relaxed">
              Experience futuristic comfort and premium streetwear
              aesthetics with our latest sneaker collection.
            </p>

            {/* Sizes */}
            <div className="flex gap-4 mt-8">

              {[7, 8, 9, 10].map((size) => (
                <button
                  key={size}
                  className="w-14 h-14 rounded-full border border-white/20 hover:bg-white hover:text-black transition"
                >
                  {size}
                </button>
              ))}
            </div>

            {/* Buttons */}
            <div className="flex gap-5 mt-10">

              <button
                onClick={() => addToCart(selectedProduct)}
                className="bg-white text-black px-10 py-4 rounded-full font-bold hover:bg-gray-300 transition"
              >
                Add To Cart
              </button>

              <button className="border border-white/20 px-10 py-4 rounded-full hover:bg-white hover:text-black transition">
                Buy Now
              </button>

            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}

export default ProductModal;