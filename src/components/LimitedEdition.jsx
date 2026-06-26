import { motion } from "framer-motion";
import AirJordan from "../assets/shoes/Air-jordan.png";

function LimitedEdition() {
  return (
    <section className="bg-black px-8 md:px-16 py-24">
      <motion.div
        initial={{ opacity: 0, y: 60 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
        className="relative overflow-hidden rounded-[40px] bg-white/5 backdrop-blur-xl border border-white/10 p-10 md:p-16"
      >
        {/* Background Glow */}
        <div className="absolute -top-20 -right-20 w-80 h-80 bg-white/10 blur-[120px] rounded-full"></div>

        <div className="grid md:grid-cols-2 items-center gap-10">

          {/* Left Content */}
          <div>
            <p className="inline-block bg-red-500 text-white px-4 py-2 rounded-full text-sm font-bold">
              🔥 Only 25 Pairs Left
            </p>

            <p className="uppercase tracking-[6px] text-gray-400 mt-6">
              Limited Drop
            </p>

            <h1 className="text-white text-5xl md:text-7xl font-black mt-5">
              AIR RETRO
            </h1>

            <p className="text-gray-400 mt-6 text-lg max-w-lg leading-8">
              Premium leather, futuristic comfort and exclusive
              streetwear aesthetics crafted for the next generation.
            </p>

            <button className="mt-8 bg-white text-black px-10 py-4 rounded-full font-bold hover:scale-105 transition">
              Buy Now
            </button>
          </div>

          {/* Right Image */}
          <motion.div
            className="relative flex justify-center"
            animate={{ y: [0, -15, 0] }}
            transition={{
              duration: 3,
              repeat: Infinity,
            }}
          >
            <div className="absolute w-80 h-80 bg-white/10 blur-[100px] rounded-full"></div>

            <img
              src={AirJordan}
              alt="Limited Sneaker"
              className="relative w-72 md:w-[420px] lg:w-[480px] rotate-[-20deg] hover:rotate-[-10deg] hover:scale-105 transition duration-500"
            />
          </motion.div>

        </div>
      </motion.div>
    </section>
  );
}

export default LimitedEdition;