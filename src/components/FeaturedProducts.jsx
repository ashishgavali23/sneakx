import { motion } from "framer-motion";
import { useState } from "react";
import { products } from "../data/products";
import ProductCard from "./ProductCard";
import CategoryFilter from "./CategoryFilter";

function FeaturedProducts({ addToCart, wishlistItems, toggleWishlist }) {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const featuredProducts = products.slice(0, 4);

  const filteredProducts =
    selectedCategory === "All"
      ? products
      : products.filter((product) => product.category === selectedCategory);

  return (
    <section className="bg-black text-white py-32 px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-12">
          <div>
            <motion.h2
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="text-5xl font-black"
            >
              Featured Products
            </motion.h2>

            <p className="text-gray-400 mt-4 max-w-xl">
              Handpicked sneakers that combine premium quality, comfort, and
              timeless street style.
            </p>
          </div>

          <button className="mt-6 md:mt-0 border border-white rounded-full px-6 py-3 hover:bg-white hover:text-black transition">
            View All →
          </button>
        </div>

        {/* Category Filter */}
        <CategoryFilter
          selectedCategory={selectedCategory}
          onCategoryChange={setSelectedCategory}
        />

        {/* Products Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {filteredProducts.map((product, index) => (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{
                duration: 0.5,
                delay: index * 0.15,
              }}
            >
              <ProductCard
                product={product}
                addToCart={addToCart}
                wishlistItems={wishlistItems}
                toggleWishlist={toggleWishlist}
              />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default FeaturedProducts;
