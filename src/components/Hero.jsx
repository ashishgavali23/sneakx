import jordanMain from "../assets/shoes/jordan-main.png";
function Hero() {
  return (
    <section className="w-full min-h-[90vh] bg-black text-white flex flex-col md:flex-row items-center justify-between px-8 md:px-16 overflow-hidden">
        
      {/* Left Content */}
      <div className="max-w-2xl z-10">

        <p className="uppercase tracking-[5px] text-gray-400 mb-4">
          New Collection 2026
        </p>

        <h1 className="text-5xl md:text-8xl font-black uppercase leading-none">
          Elevate Your Sneaker Game
        </h1>

        <p className="text-gray-400 mt-6 text-lg max-w-lg">
          Discover premium sneakers inspired by modern streetwear and performance culture.
        </p>

        <div className="flex gap-5 mt-10">

          <button className="bg-white text-black px-8 py-3 uppercase text-sm font-semibold hover:bg-gray-300 transition">
            Shop Now
          </button>

          <button className="border border-white px-8 py-3 uppercase text-sm font-semibold hover:bg-white hover:text-black transition">
            Explore
          </button>

        </div>

      </div>

      {/* Right Image */}
      <div className="relative mt-16 md:mt-0 flex items-center justify-center">

        {/* Glow Effect */}
        <div className="absolute w-[300px] h-[300px] md:w-[450px] md:h-[450px] bg-white/10 blur-3xl rounded-full"></div>

        {/* Shoe Image */}
        <img
          src={jordanMain}
          alt="Jordan Sneaker"
          className="relative w-[300px] md:w-[600px] rotate-[-20deg] hover:rotate-[-10deg] transition duration-500"
        />

      </div>

    </section>
  )
}

export default Hero