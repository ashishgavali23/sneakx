import { motion } from "framer-motion";
import { ShoppingBag, Shirt, Footprints } from "lucide-react";

function CategoryFilter({ selectedCategory, onCategoryChange }) {
  const categories = [
    {
      name: "All",
      icon: <ShoppingBag size={18} />,
    },
    {
      name: "Sneakers",
      icon: <Footprints size={18} />,
    },
    {
      name: "Oversized T-Shirts",
      icon: <Shirt size={18} />,
    },
    {
      name: "Hoodies",
      icon: <Shirt size={18} />,
    },
  ];

  return (
    <div className="flex flex-wrap justify-center gap-5 mb-14">
      {categories.map((category) => (
        <motion.button
          key={category.name}
          whileHover={{
            scale: 1.08,
            y: -2,
          }}
          whileTap={{
            scale: 0.95,
          }}
          onClick={() => onCategoryChange(category.name)}
          className={`flex items-center gap-2 px-7 py-3 rounded-full border transition-all duration-300
          ${
            selectedCategory === category.name
              ? "bg-white text-black border-white shadow-lg"
              : "bg-white/5 border-white/20 text-white hover:bg-white hover:text-black"
          }`}
        >
          {category.icon}

          <span className="font-medium">
            {category.name}
          </span>
        </motion.button>
      ))}
    </div>
  );
}

export default CategoryFilter;