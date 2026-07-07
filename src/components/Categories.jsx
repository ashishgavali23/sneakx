import { motion } from "framer-motion";

import running from "../assets/categories/running.jpg";
import basketball from "../assets/categories/basketball.jpg";
import lifestyle from "../assets/categories/lifestyle.jpg";
import training from "../assets/categories/training.jpg";

const categories = [
  {
    title: "Running",
    image: running,
  },
  {
    title: "Basketball",
    image: basketball,
  },
  {
    title: "Lifestyle",
    image: lifestyle,
  },
  {
    title: "Training",
    image: training,
  },
];

function Categories() {
  return (
    <section className="bg-black py-24">
      <div className="max-w-7xl mx-auto px-8">
        <motion.h2
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-5xl font-black text-white text-center mb-12"
        >
          Shop By Category
        </motion.h2>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {categories.map((category) => (
            <motion.div
              key={category.title}
              whileHover={{ scale: 1.08 }}
              transition={{ duration: 0.3 }}
              className="relative overflow-hidden rounded-3xl cursor-pointer group"
            >
              <img
                src={category.image}
                alt={category.title}
                className="w-full h-[430px] object-cover group-hover:scale-110 transition duration-500"
              />

              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent" />

              <div className="absolute bottom-8 left-6 text-white">
                <h3 className="text-3xl font-black">{category.title}</h3>

                <button className="mt-4 border border-white px-5 py-2 rounded-full hover:bg-white hover:text-black transition">
                  Explore →
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Categories;
