import { useState } from "react";
import ProductCard from "./ProductCard";
import ProductModal from "./ProductModal";
import { products } from "../data/products";

function Products({ addToCart, searchTerm, wishlistItems, toggleWishlist }) {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [selectedProduct, setSelectedProduct] = useState(null);

  const filteredProducts = products.filter((product) => {
    const matchesCategory =
      selectedCategory === "All" || product.category === selectedCategory;

    const matchesSearch =
      product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.brand?.toLowerCase().includes(searchTerm.toLowerCase());

    return matchesCategory && matchesSearch;
  });

  return (
    <section className="bg-black px-8 md:px-16 py-24 min-h-screen">
      {/* Heading */}
      <div className="flex items-center justify-between mb-16">
        <h1 className="text-white text-4xl md:text-6xl font-black uppercase">
          Shop Collection
        </h1>

        <button className="hidden md:block border border-white px-6 py-3 text-white hover:bg-white hover:text-black transition">
          View All
        </button>
      </div>

      {/* Categories */}
      <div className="flex flex-wrap gap-4 mb-12">
        {["All", "Sneakers", "Oversized T-Shirts", "Hoodies"].map(
          (category) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-6 py-2 rounded-full font-semibold transition ${
                selectedCategory === category
                  ? "bg-white text-black"
                  : "border border-white text-white hover:bg-white hover:text-black"
              }`}
            >
              {category}
            </button>
          ),
        )}
      </div>

      {/* Product Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
        {filteredProducts.length > 0 ? (
          filteredProducts.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              addToCart={addToCart}
              setSelectedProduct={setSelectedProduct}
              wishlistItems={wishlistItems}
              toggleWishlist={toggleWishlist}
            />
          ))
        ) : (
          <p className="text-gray-400 text-lg col-span-full text-center">
            No products found.
          </p>
        )}
      </div>

      {/* Product Modal */}
      <ProductModal
        selectedProduct={selectedProduct}
        setSelectedProduct={setSelectedProduct}
        addToCart={addToCart}
      />
    </section>
  );
}

export default Products;