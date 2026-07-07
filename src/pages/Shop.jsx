import { useState } from "react";
import { products } from "../data/products";
import ProductCard from "../components/ProductCard";
import CategoryFilter from "../components/CategoryFilter";
import Footer from "../components/Footer";

function Shop({ addToCart, searchTerm, wishlistItems, toggleWishlist }) {
  const [selectedCategory, setSelectedCategory] = useState("All");

  const filteredProducts = products.filter((product) => {
    const matchesCategory =
      selectedCategory === "All" || product.category === selectedCategory;

    const matchesSearch =
      product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.brand.toLowerCase().includes(searchTerm.toLowerCase());

    return matchesCategory && matchesSearch;
  });

  return (
    <div className="bg-black text-white min-h-screen">
      <section className="px-6 md:px-10 py-16 max-w-7xl mx-auto">
        <div className="mb-12 text-center">
          <h1 className="text-4xl md:text-6xl font-black uppercase">
            Shop All Products
          </h1>
          <p className="text-gray-400 mt-4 text-lg">
            Sneakers, oversized tees, and hoodies — all in one place.
          </p>
        </div>

        <CategoryFilter
          selectedCategory={selectedCategory}
          onCategoryChange={setSelectedCategory}
        />

        {filteredProducts.length === 0 ? (
          <div className="text-center py-20">
            <h2 className="text-2xl font-bold">No products found</h2>
            <p className="text-gray-400 mt-3">
              Try another search or category.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredProducts.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                addToCart={addToCart}
                wishlistItems={wishlistItems}
                toggleWishlist={toggleWishlist}
              />
            ))}
          </div>
        )}
      </section>

      <Footer />
    </div>
  );
}

export default Shop;
