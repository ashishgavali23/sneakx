import { motion } from "framer-motion" ;
import jordan from "../assets/shoes/jordan-Retro.png";
import nike from "../assets/shoes/nike-Air-Max.png";
import newBalance from "../assets/shoes/new-Balance.png";

function Featured() {
    const featuredProducts = [
        {
            title : "Air Collection",
            subtitle : "Premium Comfort ",
            image : jordan,
        },
        {
            title : "Street Edition",
            subtitle : "Luxury Design",
            image : nike,
        },
        {
            title : "Sport Series",
            subtitle : "Maximum Performance",
            image : newBalance,
        }
    ];

    return (
        <section className = "bg-black py-24 px-8 md:px-16"> 
                <h1 className = "text-white text-5xl md:text-6xl font-black uppercase">
                        Featured Sneakers
                </h1>

                <div className = "grid md:grid-cols-3 gap-8">
                    {featuredProducts.map((item,index)=> (
                        <motion.div
                        key={index}
                        whileHover = {{y: -10, scale: 1.03}}
                        className= "relative overflow-hidden rounded-3xl bg-white/5 backdrop-blur-xl border border-white/10 p-8"
                        >
                        <div className = "absolute w-56 h-56 bg-white/10 blur-[100px] rounded-full"></div>
                            <img
                                src={item.image}
                                alt={item.title}
                                className = "relative h-64 mx-auto rotate-[-20deg]"
                            />
                            <h2 className = "text-white text-3xl font-bold mt-8">
                                {item.title}
                            </h2>
                            <p className = "text-gray-400 mt-2">
                                {item.subtitle}
                            </p>
                        </motion.div>
                    ))}
                </div>
        </section>
    )
}
export default Featured;