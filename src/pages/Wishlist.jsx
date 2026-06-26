import { Link } from "react-router-dom";
import PageWrapper from "../components/PageWrapper";

function Wishlist({ wishlistItems, toggleWishlist, addToCart }) {
  return (
    <PageWrapper>
      <section className="min-h-screen bg-black px-8 md:px-16 py-20">
        <h1 className="text-white text-5xl font-black mb-12">❤️ My Wishlist</h1>

        {wishlistItems.length === 0 ? (
          <div className="text-center mt-20">
            <h2 className="text-3xl text-white font-bold">
              Your wishlist is empty
            </h2>

            <p className="text-gray-400 mt-4">
              Save your favorite sneakers here.
            </p>

            <Link to="/">
              <button className="mt-8 bg-white text-black px-8 py-3 rounded-full font-bold">
                Shop Now
              </button>
            </Link>
          </div>
        ) : (
          <div className="grid md:grid-cols-3 gap-8">
            {wishlistItems.map((item) => (
              <div
                key={item.id}
                className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-6"
              >
                <img
                  src={item.images?.[0]}
                  alt={item.name}
                  className="w-full h-56 object-contain"
                />

                <h2 className="text-white text-2xl font-bold mt-6">
                  {item.name}
                </h2>

                <p className="text-gray-400 mt-2">₹ {item.price}</p>

                <button
                  onClick={() => addToCart(item)}
                  className="mt-6 w-full bg-white text-black py-3 rounded-xl font-bold"
                >
                  Move to Cart
                </button>

                <button
                  onClick={() => toggleWishlist(item)}
                  className="mt-3 w-full border border-red-500 text-red-400 py-3 rounded-xl"
                >
                  Remove
                </button>
              </div>
            ))}
          </div>
        )}
      </section>
    </PageWrapper>
  );
}

export default Wishlist;
