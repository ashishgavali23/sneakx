import { motion } from "framer-motion";
import { div } from "framer-motion/client";

function Loader() {
    return(
        <div className="h-screen bg-black flex items-center justify-center">

                <motion.div
                    animate={{rotate: 360}}
                    transition={{repeat: Infinity,
                        duration: 1,
                        ease: "linear",
                    }}
                    className="w-20 h-20 border-4 border-white border-t-transparent rounded-full"
                />
        </div>
    )
}

export default Loader;