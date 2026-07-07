import { useParams, Link, useNavigate } from "react-router-dom";
import { products } from "../data/products";
import PageWrapper from "../components/PageWrapper";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Truck, ShieldCheck, RotateCcw, Star } from "lucide-react";

function ProductDetails({ addToCart }) {
  const { id } = useParams();
  const navigate = useNavigate();

  const product = products.find((item) => item.id === Number(id));

  const [selectedSize, setSelectedSize] = useState(null);
  const [selectedColor, setSelectedColor] = useState(null);
  const [selectedImage, setSelectedImage] = useState("");
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    if (product) {
      setSelectedImage(product.images?.[0] || "");
      setSelectedSize(product.sizes?.length ? product.sizes[0] : null);
      setSelectedColor(product.colors?.length ? product.colors[0] : null);
      setQuantity(1);
    }
  }, [product]);

  if (!product) {
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center text-2xl font-bold">
        Product not found
      </div>
    );
  }

  const relatedProducts = products
    .filter(
      (item) => item.id !== product.id && item.category === product.category,
    )
    .slice(0, 3);

  const validateSelection = () => {
    if (product.sizes?.length > 0 && !selectedSize) {
      alert("Please select a size");
      return false;
    }

    if (product.colors?.length > 0 && !selectedColor) {
      alert("Please select a color");
      return false;
    }

    if (product.stock === 0) {
      alert("This product is out of stock");
      return false;
    }

    return true;
  };

  const productToAdd = {
    ...product,
    selectedSize,
    selectedColor,
    quantity,
  };

  const handleAddToCart = () => {
    if (!validateSelection()) return;
    addToCart(productToAdd);
  };

  const handleBuyNow = () => {
    if (!validateSelection()) return;
    addToCart(productToAdd);
    navigate("/checkout");
  };

  return (
    <PageWrapper>
      <div className="min-h-screen bg-black text-white px-6 md:px-10 py-16">
        {/* Main Product Section */}
        <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-16 items-start">
          {/* Left: Product Gallery */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="space-y-6"
          >
            <div className="relative bg-white/5 border border-white/10 rounded-3xl p-6 md:p-10 backdrop-blur-xl overflow-hidden">
              <div className="absolute inset-0 bg-white/5 blur-3xl rounded-full"></div>

              <img
                src={selectedImage}
                alt={product.name}
                className="relative w-full h-[350px] md:h-[520px] object-contain transition duration-300"
              />
            </div>

            {/* Thumbnails */}
            <div className="flex flex-wrap gap-4">
              {product.images?.map((img, index) => (
                <button
                  key={index}
                  onClick={() => setSelectedImage(img)}
                  className={`rounded-2xl p-2 border transition ${
                    selectedImage === img
                      ? "border-white bg-white/10"
                      : "border-white/10 bg-white/5 hover:border-white/40"
                  }`}
                >
                  <img
                    src={img}
                    alt={`${product.name}-${index}`}
                    className="w-20 h-20 object-contain"
                  />
                </button>
              ))}
            </div>
          </motion.div>

          {/* Right: Product Info */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="bg-white/5 border border-white/10 rounded-3xl p-8 md:p-10 backdrop-blur-xl"
          >
            {/* Category / Brand / Badge */}
            <div className="flex flex-wrap items-center gap-3 mb-4">
              <span className="text-sm uppercase tracking-[3px] text-gray-400">
                {product.category}
              </span>

              {product.brand && (
                <span className="px-3 py-1 rounded-full bg-white/10 text-sm text-white border border-white/10">
                  {product.brand}
                </span>
              )}

              {product.badge && (
                <span className="px-3 py-1 rounded-full bg-white text-black text-sm font-semibold">
                  {product.badge}
                </span>
              )}
            </div>

            {/* Title */}
            <h1 className="text-4xl md:text-6xl font-black leading-tight">
              {product.name}
            </h1>

            {/* Price */}
            <p className="text-3xl md:text-4xl font-bold mt-6">
              ₹ {Number(product.price).toLocaleString("en-IN")}
            </p>

            {/* Rating */}
            <div className="flex items-center gap-3 mt-5">
              <div className="flex items-center gap-1 text-yellow-400">
                <Star size={18} fill="currentColor" />
                <Star size={18} fill="currentColor" />
                <Star size={18} fill="currentColor" />
                <Star size={18} fill="currentColor" />
                <Star size={18} fill="currentColor" />
              </div>

              <span className="text-white font-semibold">{product.rating}</span>
              <span className="text-gray-400">({product.reviews} reviews)</span>
            </div>

            {/* Stock */}
            <div className="mt-5">
              {product.stock > 10 ? (
                <span className="inline-block px-4 py-2 rounded-full bg-green-500/15 text-green-400 text-sm font-medium border border-green-500/20">
                  In Stock ({product.stock} available)
                </span>
              ) : product.stock > 0 ? (
                <span className="inline-block px-4 py-2 rounded-full bg-yellow-500/15 text-yellow-300 text-sm font-medium border border-yellow-500/20">
                  Only {product.stock} left
                </span>
              ) : (
                <span className="inline-block px-4 py-2 rounded-full bg-red-500/15 text-red-400 text-sm font-medium border border-red-500/20">
                  Sold Out
                </span>
              )}
            </div>

            {/* Description */}
            <p className="text-gray-400 mt-8 leading-8 text-lg">
              {product.description}
            </p>

            {/* Colors */}
            {product.colors?.length > 0 && (
              <div className="mt-10">
                <h2 className="text-lg font-bold mb-4">Select Color</h2>

                <div className="flex flex-wrap gap-3">
                  {product.colors.map((color) => (
                    <button
                      key={color}
                      onClick={() => setSelectedColor(color)}
                      className={`px-5 py-3 rounded-full border transition text-sm font-medium ${
                        selectedColor === color
                          ? "bg-white text-black border-white"
                          : "border-white/20 text-white hover:bg-white hover:text-black"
                      }`}
                    >
                      {color}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Sizes */}
            {product.sizes?.length > 0 && (
              <div className="mt-10">
                <h2 className="text-lg font-bold mb-4">Select Size</h2>

                <div className="flex flex-wrap gap-3">
                  {product.sizes.map((size) => (
                    <button
                      key={size}
                      onClick={() => setSelectedSize(size)}
                      className={`min-w-[52px] h-[52px] px-4 rounded-full border transition font-semibold ${
                        selectedSize === size
                          ? "bg-white text-black border-white"
                          : "border-white/20 text-white hover:bg-white hover:text-black"
                      }`}
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Quantity */}
            <div className="mt-10">
              <h2 className="text-lg font-bold mb-4">Quantity</h2>

              <div className="flex items-center gap-4">
                <button
                  onClick={() => setQuantity((prev) => Math.max(1, prev - 1))}
                  disabled={product.stock === 0}
                  className="w-12 h-12 rounded-full border border-white/20 text-white hover:bg-white hover:text-black transition disabled:opacity-40 disabled:cursor-not-allowed"
                >
                  -
                </button>

                <span className="text-xl font-bold w-10 text-center">
                  {quantity}
                </span>

                <button
                  onClick={() =>
                    setQuantity((prev) => Math.min(product.stock, prev + 1))
                  }
                  disabled={product.stock === 0 || quantity >= product.stock}
                  className="w-12 h-12 rounded-full border border-white/20 text-white hover:bg-white hover:text-black transition disabled:opacity-40 disabled:cursor-not-allowed"
                >
                  +
                </button>
              </div>
            </div>

            {/* Add To Cart / Buy Now */}
            <div className="mt-10 flex flex-col sm:flex-row gap-4">
              <button
                onClick={handleAddToCart}
                disabled={product.stock === 0}
                className={`px-10 py-4 rounded-full font-bold transition ${
                  product.stock === 0
                    ? "bg-gray-700 text-gray-400 cursor-not-allowed"
                    : "bg-white text-black hover:scale-105"
                }`}
              >
                {product.stock === 0 ? "Out of Stock" : "Add To Cart"}
              </button>

              <button
                onClick={handleBuyNow}
                disabled={product.stock === 0}
                className={`px-10 py-4 rounded-full font-bold border transition ${
                  product.stock === 0
                    ? "border-gray-700 text-gray-500 cursor-not-allowed"
                    : "border-white/20 text-white hover:bg-white hover:text-black"
                }`}
              >
                Buy Now
              </button>
            </div>

            {/* Delivery / Service Info */}
            <div className="mt-12 grid gap-4">
              <div className="flex items-start gap-4 border border-white/10 rounded-2xl p-4 bg-white/5">
                <Truck className="mt-1" size={22} />
                <div>
                  <h3 className="font-semibold">Free Delivery</h3>
                  <p className="text-sm text-gray-400 mt-1">
                    Free shipping on all prepaid orders above ₹1999.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4 border border-white/10 rounded-2xl p-4 bg-white/5">
                <RotateCcw className="mt-1" size={22} />
                <div>
                  <h3 className="font-semibold">Easy Returns</h3>
                  <p className="text-sm text-gray-400 mt-1">
                    7-day return & exchange available for eligible products.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4 border border-white/10 rounded-2xl p-4 bg-white/5">
                <ShieldCheck className="mt-1" size={22} />
                <div>
                  <h3 className="font-semibold">Secure Payments</h3>
                  <p className="text-sm text-gray-400 mt-1">
                    100% secure checkout powered by trusted payment gateways.
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Related Products */}
        <div className="max-w-7xl mx-auto mt-24">
          <div className="flex items-end justify-between mb-10">
            <div>
              <h2 className="text-4xl md:text-5xl font-black">
                You May Also Like
              </h2>
              <p className="text-gray-400 mt-3">
                Similar picks from the same category.
              </p>
            </div>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {relatedProducts.length > 0 ? (
              relatedProducts.map((item) => (
                <Link key={item.id} to={`/product/${item.id}`}>
                  <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-6 hover:border-white/30 hover:scale-[1.02] transition">
                    <img
                      src={item.images?.[0]}
                      alt={item.name}
                      className="h-56 mx-auto object-contain"
                    />

                    <div className="mt-6">
                      <p className="text-gray-400 text-sm uppercase tracking-[2px]">
                        {item.category}
                      </p>

                      <h3 className="text-white text-2xl font-bold mt-2">
                        {item.name}
                      </h3>

                      <p className="text-gray-400 mt-3">
                        ₹ {Number(item.price).toLocaleString("en-IN")}
                      </p>
                    </div>
                  </div>
                </Link>
              ))
            ) : (
              <p className="text-gray-400">No related products found.</p>
            )}
          </div>
        </div>
      </div>
    </PageWrapper>
  );
}

export default ProductDetails;