import {motion} from "framer-motion";

function NewsLetter(){
    return(
        <section className="bg-black px-8 md:px-16 py-24">
                <motion.div 
                    initial={{opacity:0, y:80}}
                    whileInView={{opacity: 1, y: 0}}
                    transition={{duration: 0.8}}
                    viewport={{once: true}}
                    className="relative overflow-hidden rounded-[40px] bg-white/5 backdrop-blur-xl border border-white/10 md:p-16 text-center"
                >
                {/* Backdrop glow */}
                <div className="absolute -top-20 left-1/2 -translate-x-1/2 w-96 h-96 bg-white/10 blur-[140px] rounded-full"></div>

                <p className="uppercase tracking-[6px] text-gray-400">
                    Join The Community
                </p>

                <p className="text-gray-400 mt-6 max-w-2xl mx-auto text-lg">
                    Get exclusive offers, limited drops and premium sneaker updates
                    delivered directly to your inbox.
                </p>

                <div className="flex flex-col md:flex-row gap-4 justify-center mt-10">
                    <input 
                        type="email" 
                        placeholder="Enter Your email"
                        className="bg-white/10 border border-white/10 px-6 py-4 rounded-full text-white outline-none w-full md:w-[400px]"
                   />
                    <button className="bg-white text-black px-8 py-4 rounded-full font-bold hover:scale-105 transition">
                        Subscribe
                    </button>
                </div>
                </motion.div>
        </section>
    )

}
export default NewsLetter;