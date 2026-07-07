import { motion } from "framer-motion";
import { Heart, Star } from "lucide-react";
import { useNavigate } from "react-router-dom";

function ProductCard({ product, addToCart, wishlistItems, toggleWishlist }) {
  const navigate = useNavigate();

  const isWishlisted = wishlistItems?.some((item) => item.id === product.id);

  const handleAddToCart = (e) => {
    e.stopPropagation();

    if (product.stock === 0) return;

    // If product has size options, send user to details page to choose size
    if (product.sizes?.length > 0) {
      navigate(`/product/${product.id}`);
      return;
    }

    addToCart({
      ...product,
      selectedSize: null,
      selectedColor: product.colors?.[0] || null,
      quantity: 1,
    });
  };

  return (
    <motion.div
      onClick={() => navigate(`/product/${product.id}`)}
      whileHover={{ y: -8 }}
      transition={{ duration: 0.3 }}
      className="group relative bg-white/5 backdrop-blur-lg border border-white/10 rounded-3xl p-6 hover:border-white/30 cursor-pointer overflow-hidden"
    >
      {/* Wishlist */}
      <button
        onClick={(e) => {
          e.stopPropagation();
          toggleWishlist(product);
        }}
        className="absolute top-4 right-4 z-20"
      >
        <Heart
          fill={isWishlisted ? "white" : "none"}
          size={24}
          className="text-white"
        />
      </button>

      {/* Product Badge */}
      {product.badge && (
        <span className="absolute top-4 left-4 bg-red-500 text-white text-xs font-bold px-3 py-1 rounded-full z-20">
          {product.badge}
        </span>
      )}

      {/* Stock Badge */}
      {product.stock <= 5 && product.stock > 0 && (
        <span className="absolute top-14 left-4 bg-yellow-400 text-black text-xs font-bold px-3 py-1 rounded-full z-20">
          Only {product.stock} Left
        </span>
      )}

      {product.stock === 0 && (
        <span className="absolute top-14 left-4 bg-red-600 text-white text-xs font-bold px-3 py-1 rounded-full z-20">
          Sold Out
        </span>
      )}

      {/* Image */}
      <div className="flex justify-center items-center h-[240px]">
        <motion.img
          src={product.images?.[0]}
          alt={product.name}
          whileHover={{ scale: 1.08, rotate: -8 }}
          transition={{ duration: 0.3 }}
          className="w-full h-[220px] object-contain"
        />
      </div>

      {/* Details */}
      <div className="mt-6">
        <h2 className="text-white text-2xl font-bold">{product.name}</h2>

        {/* Rating */}
        <div className="flex items-center gap-2 mt-2">
          <Star size={16} fill="#FACC15" color="#FACC15" />
          <span className="text-gray-300 text-sm">
            {product.rating} ({product.reviews} Reviews)
          </span>
        </div>

        {/* Category */}
        <p className="text-gray-500 text-sm mt-2 uppercase tracking-wide">
          {product.category}
        </p>

        {/* Price */}
        <p className="text-white text-2xl font-bold mt-4">
          ₹ {Number(product.price).toLocaleString("en-IN")}
        </p>

        {/* Stock Status */}
        <p
          className={`mt-2 text-sm font-medium ${
            product.stock > 10
              ? "text-green-400"
              : product.stock > 0
              ? "text-yellow-400"
              : "text-red-500"
          }`}
        >
          {product.stock > 10
            ? `In Stock (${product.stock} available)`
            : product.stock > 0
            ? `Only ${product.stock} left`
            : "Out of Stock"}
        </p>

        {/* Button */}
        <button
          onClick={handleAddToCart}
          disabled={product.stock === 0}
          className={`mt-6 w-full py-3 rounded-2xl font-semibold transition ${
            product.stock === 0
              ? "bg-gray-700 text-gray-400 cursor-not-allowed"
              : "bg-white text-black hover:bg-gray-300"
          }`}
        >
          {product.stock === 0
            ? "Out of Stock"
            : product.sizes?.length > 0
            ? "View Product"
            : "Add to Cart"}
        </button>
      </div>
    </motion.div>
  );
}

export default ProductCard;