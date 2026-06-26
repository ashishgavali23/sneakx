import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import PageWrapper from "../components/PageWrapper";

function OrderSuccess() {
  return (
    <PageWrapper>
      <section className="min-h-screen bg-black flex items-center justify-center px-8">
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6 }}
          className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-[40px] p-12 text-center max-w-2xl w-full"
        >
          <div className="text-7xl mb-6">✅</div>

          <h1 className="text-white text-5xl font-black">Order Placed!</h1>

          <p className="text-gray-400 mt-6 text-lg leading-8">
            Thank you for shopping with Sneaks. Your premium sneakers will be
            shipped soon.
          </p>

          <Link to="/">
            <button className="mt-10 bg-white text-black px-10 py-4 rounded-full font-bold hover:scale-105 hover:bg-gray-300 transition duration-300">
              Continue Shopping
            </button>
          </Link>
        </motion.div>
      </section>
    </PageWrapper>
  );
}
export default OrderSuccess;
