import { useParams, Link } from "react-router-dom";
import { products } from "../data/products";
import PageWrapper from "../components/PageWrapper";
import { useState } from "react";

function ProductDetails({ addToCart }) {
  const { id } = useParams();

  const product = products.find((item) => item.id === Number(id));
  const [selectedSize, setSelectedSize] = useState(null);

  const [selectedImage, setSelectedImage] = useState(
    product.images ? product.images[0] : product.image,
  );

  if (!product) {
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center">
        Product not found
      </div>
    );
  }

  return (
    <PageWrapper>
      <div className="min-h-screen bg-black text-white px-8 py-20">
        {/* Product Details */}
        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-16 items-center">
          <div className="bg-white rounded-3xl p-10">
            <img
              src={selectedImage}
              alt={product.name}
              className="w-full transition duration-300"
            />
            <div className="flex justify-center gap-4 mt-6">
              {product.images.map((img, index) => (
                <img
                  key={index}
                  src={img}
                  alt=""
                  onClick={() => setSelectedImage(img)}
                  className={`w-20 h-20 rounded-xl cursor-pointer border-2 object-contain bg-white p-2
                   ${selectedImage === img ? "border-white" : "border-transparent"}`}
                />
              ))}
            </div>
          </div>

          <div>
            <p className="text-gray-400 uppercase">{product.category}</p>

            <h1 className="text-6xl font-black mt-4">{product.name}</h1>

            <p className="text-4xl font-bold mt-6">₹ {product.price}</p>

            {/* Product Rating */}
            <div className="flex items-center gap-3 mt-4">
              <span className="text-yellow-400 text-2xl">⭐⭐⭐⭐⭐</span>

              <span className="text-white text-xl font-bold">
                {product.rating} ({product.reviews} Reviews)
              </span>
            </div>

            <p className="text-gray-400 mt-6 leading-8">
              {product.description}
            </p>

            {/* Sizes */}
            <h2 className="text-xl font-bold mt-8 mb-4">Select Size</h2>

            <div className="flex gap-4">
              {[7, 8, 9, 10].map((size) => (
                <button
                  key={size}
                  onClick={() => setSelectedSize(size)}
                  className={`w-14 h-14 rounded-full border transition
                                ${
                                  selectedSize === size
                                    ? "bg-white text-black border-white"
                                    : "border-white text-white hover:bg-white hover:text-black"
                                }`}
                >
                  {size}
                </button>
              ))}
            </div>

            <button
              onClick={() => {
                if (!selectedSize) {
                  alert("Please select a size!");
                  return;
                }

                addToCart({
                  ...product,
                  size: selectedSize,
                });
              }}
              className="mt-10 bg-white text-black px-10 py-4 rounded-full font-bold hover:scale-105 transition"
            >
              Add To Cart
            </button>
          </div>
        </div>

        {/* Related Products */}
        <div className="max-w-6xl mx-auto mt-24">
          <h2 className="text-4xl font-black mb-10">Related Products</h2>

          <div className="grid md:grid-cols-3 gap-8">
            {products
              .filter((item) => item.id !== product.id)
              .slice(0, 3)
              .map((item) => (
                <Link key={item.id} to={`/product/${item.id}`}>
                  <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-6 hover:border-white/30 hover:scale-105 transition">
                    <img
                      src={item.images[0]}
                      alt={item.name}
                      className="h-56 mx-auto object-contain"
                    />

                    <h3 className="text-white text-2xl font-bold mt-6">
                      {item.name}
                    </h3>

                    <p className="text-gray-400 mt-2">₹ {item.price}</p>
                  </div>
                </Link>
              ))}
          </div>
        </div>
      </div>
    </PageWrapper>
  );
}

export default ProductDetails;
