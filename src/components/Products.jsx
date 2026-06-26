import { useState } from "react";
import ProductCard from "./ProductCard";
import ProductModal from "./ProductModal";
import jordanRetro from "../assets/shoes/jordan-Retro.png";
import newBalance from "../assets/shoes/new-Balance.png";
import nikeAirMax from "../assets/shoes/nike-Air-Max.png";
import pumaStreet from "../assets/shoes/puma-street.png";
import shoe from "../assets/shoes/shoe.png";


function Products({ addToCart, searchTerm, wishlistItems, toggleWishlist }) {
  const [selectedCategory, setSelectedCategory] = useState("All");

  const [selectedProduct, setSelectedProduct] = useState(null);

  const products = [
  {
    id: 1,
    name: "Nike Air Max",
    price: "10,999",
    images: [nikeAirMax],
    category: "Running",
  },
  {
    id: 2,
    name: "Jordan Retro",
    price: "15,999",
    images: [jordanRetro],
    category: "Sneakers",
  },
  {
    id: 3,
    name: "Puma Street",
    price: "8,999",
    images: [pumaStreet],
    category: "Sports",
  },
  {
    id: 4,
    name: "New Balance",
    price: "11,999",
    images: [newBalance],
    category: "Running",
  },
  {
    id: 5,
    name: "Classic Sneaker",
    price: "9,999",
    images: [shoe],
    category: "Sneakers",
  },
];

  const filteredProducts = products.filter((product) => {
    const matchesSearch = product.name
      .toLowerCase()
      .includes(searchTerm.toLowerCase());
    const matchesCategory =
      selectedCategory === "All" || product.category === selectedCategory;

    return matchesSearch && matchesCategory;
  });

  return (
    <section className="bg-black px-8 md:px-16 py-24">
      {/* Heading */}
      <div className="flex items-center justify-between mb-16">
        <h1 className="text-white text-4xl md:text-6xl font-black uppercase">
          Trending Sneakers
        </h1>

        <button className="hidden md:block border border-white px-6 py-3 text-white hover:bg-white hover:text-black transition">
          View All
        </button>
      </div>

      {/* Categories */}
      <div className="flex flex-wrap gap-4 mb-12">
        {["All", "Running", "Sneakers", "Sports"].map((category) => (
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
        ))}
      </div>

      {/* Product Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
        {filteredProducts.map((product) => (
          <ProductCard
            key={product.id}
            product={product}
            addToCart={addToCart}
            setSelectedProduct={setSelectedProduct}
            wishlistItems={wishlistItems}
            toggleWishlist={toggleWishlist}
          />
        ))}
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
