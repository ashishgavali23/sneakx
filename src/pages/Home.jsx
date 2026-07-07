import Hero from "../components/Hero";
import Categories from "../components/Categories";
import Products from "../components/Products";
import Featured from "../components/Featured";
import Limited from "../components/LimitedEdition";
import NewsLetter from "../components/NewsLetter";
import Footer from "../components/Footer";
import FeaturedProducts from "../components/FeaturedProducts";


function Home({
  addToCart,
  searchTerm,
  wishlistItems,
  toggleWishlist,
}) {
  return (
    <>
      <Hero />
      <Categories />

     

      <FeaturedProducts
        addToCart={addToCart}
        searchTerm={searchTerm}
        wishlistItems={wishlistItems}
        toggleWishlist={toggleWishlist}
      />

         <Featured />
         
      <Limited />

      <NewsLetter />

      <Footer />
    </>
  );
}

export default Home;