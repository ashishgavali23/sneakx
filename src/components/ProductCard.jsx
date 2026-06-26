import { motion } from "framer-motion";
import { Heart } from "lucide-react";
import { useNavigate } from "react-router-dom";

function ProductCard({
  product,
  addToCart,
  wishlistItems,
  toggleWishlist,
}) {
  const navigate = useNavigate();

  const isWishlisted = wishlistItems?.some(
    (item) => item.id === product.id
  );

  return (
    <motion.div
      onClick={() => navigate(`/product/${product.id}`)}
      whileHover={{ scale: 1.05 }}
      transition={{ duration: 0.3 }}
      className="group bg-white/5 backdrop-blur-lg border border-white/10 rounded-3xl p-6 hover:border-white/30 cursor-pointer overflow-hidden"
    >
      {/* Wishlist Button */}
      <button
        onClick={(e) => {
          e.stopPropagation();
          toggleWishlist(product);
        }}
        className="absolute top-3 right-3 z-10"
      >
        <Heart
          fill={isWishlisted ? "white" : "none"}
          size={24}
          className="text-white"
        />
      </button>

      <div className="flex items-center justify-center relative">
        <motion.img
          src={product.images?.[0]}
          alt={product.name}
          className="w-full h-[220px] object-contain"
        />
      </div>

      <div className="mt-6">
        <h2 className="text-white text-2xl font-bold">
          {product.name}
        </h2>

        <p className="text-gray-400 mt-2 text-lg">
          ₹ {product.price}
        </p>

        <button
          onClick={(e) => {
            e.stopPropagation();
            addToCart(product);
          }}
          className="mt-6 w-full bg-white text-black py-3 rounded-2xl font-semibold hover:bg-gray-300 transition"
        >
          Add to cart
        </button>
      </div>
    </motion.div>
  );
}

export default ProductCard;