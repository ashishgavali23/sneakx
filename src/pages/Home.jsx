import Hero from "../components/Hero";
import Products from "../components/Products";
import Featured from "../components/Featured";
import Limited from "../components/LimitedEdition";
import NewsLetter from "../components/NewsLetter";
import Footer from "../components/Footer";

function Home({
  addToCart,
  searchTerm,
  wishlistItems,
  toggleWishlist,
}) {
  return (
    <>
      <Hero />

      <Featured />

      <Products
        addToCart={addToCart}
        searchTerm={searchTerm}
        wishlistItems={wishlistItems}
        toggleWishlist={toggleWishlist}
      />

      <Limited />

      <NewsLetter />

      <Footer />
    </>
  );
}

export default Home;