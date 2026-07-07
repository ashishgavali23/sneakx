import { Link, useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { signOut } from "firebase/auth";
import { auth } from "../firebase/firebase";
import { Heart, ShoppingBag, Search, Menu, X } from "lucide-react";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

function Navbar({
  cartCount,
  wishlistCount,
  setCartOpen,
  searchTerm,
  setSearchTerm,
}) {
  const { user } = useAuth();
  const location = useLocation();

  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  const handleLogout = async () => {
    await signOut(auth);
  };

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { name: "Home", path: "/" },
    { name: "Shop", path: "/shop" },
    { name: "Collections", path: "/collections" },
    { name: "Contact", path: "/contact" },
  ];

  return (
    <nav
      className={`w-full sticky top-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-black/80 backdrop-blur-xl border-b border-white/10 shadow-lg"
          : "bg-black border-b border-white/10"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 md:px-10 py-4 flex items-center justify-between gap-6">
        {/* Logo */}
        <Link to="/" className="shrink-0">
          <h1 className="text-2xl md:text-3xl font-black tracking-[6px] text-white">
            SNEAKX
          </h1>
        </Link>

        {/* Desktop Nav Links */}
        <ul className="hidden lg:flex items-center gap-8 uppercase text-sm tracking-[3px]">
          {navLinks.map((link) => {
            const isActive = location.pathname === link.path;

            return (
              <li key={link.name}>
                <Link
                  to={link.path}
                  className={`relative group transition ${
                    isActive ? "text-white" : "text-gray-300 hover:text-white"
                  }`}
                >
                  {link.name}

                  <span
                    className={`absolute left-0 -bottom-1 h-[2px] bg-white transition-all duration-300 ${
                      isActive ? "w-full" : "w-0 group-hover:w-full"
                    }`}
                  ></span>
                </Link>
              </li>
            );
          })}
        </ul>

        {/* Search */}
        <div className="hidden md:flex items-center bg-white/5 border border-white/10 rounded-full px-4 py-2 flex-1 max-w-md">
          <Search size={18} className="text-gray-400" />
          <input
            type="text"
            placeholder="Search products..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="bg-transparent w-full px-3 text-sm text-white outline-none placeholder:text-gray-400"
          />
        </div>

        {/* Right Side */}
        <div className="hidden md:flex items-center gap-5">
          {/* Wishlist */}
          <Link
            to="/wishlist"
            className="relative text-white hover:scale-105 transition"
          >
            <Heart size={22} />
            {wishlistCount > 0 && (
              <span className="absolute -top-2 -right-2 bg-white text-black text-[10px] font-bold rounded-full px-1.5 py-0.5 min-w-[18px] text-center">
                {wishlistCount}
              </span>
            )}
          </Link>

          {/* Cart */}
          <button
            onClick={() => setCartOpen(true)}
            className="relative text-white hover:scale-105 transition"
          >
            <ShoppingBag size={22} />
            {cartCount > 0 && (
              <span className="absolute -top-2 -right-2 bg-white text-black text-[10px] font-bold rounded-full px-1.5 py-0.5 min-w-[18px] text-center">
                {cartCount}
              </span>
            )}
          </button>

          {/* Auth */}
          {user ? (
            <div className="flex items-center gap-3">
              <Link
                to="/orders"
                className="text-sm text-gray-300 hover:text-white transition"
              >
                Orders
              </Link>

              <span className="hidden xl:block text-sm text-gray-400 max-w-[160px] truncate">
                {user.email}
              </span>

              <button
                onClick={handleLogout}
                className="bg-white text-black px-4 py-2 rounded-full text-sm font-semibold hover:scale-105 transition"
              >
                Logout
              </button>
            </div>
          ) : (
            <div className="flex items-center gap-3">
              <Link
                to="/login"
                className="text-sm text-gray-300 hover:text-white transition"
              >
                Login
              </Link>

              <Link
                to="/register"
                className="bg-white text-black px-4 py-2 rounded-full text-sm font-semibold hover:scale-105 transition"
              >
                Register
              </Link>
            </div>
          )}
        </div>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden text-white"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          {menuOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.25 }}
            className="md:hidden bg-black border-t border-white/10 px-6 pb-6"
          >
            <div className="flex flex-col gap-5 pt-5">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  to={link.path}
                  onClick={() => setMenuOpen(false)}
                  className="text-white uppercase tracking-[3px] text-sm"
                >
                  {link.name}
                </Link>
              ))}

              {/* Mobile Search */}
              <div className="flex items-center bg-white/5 border border-white/10 rounded-full px-4 py-2">
                <Search size={18} className="text-gray-400" />
                <input
                  type="text"
                  placeholder="Search products..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="bg-transparent w-full px-3 text-sm text-white outline-none placeholder:text-gray-400"
                />
              </div>

              <div className="flex items-center gap-5">
                <Link
                  to="/wishlist"
                  onClick={() => setMenuOpen(false)}
                  className="text-white flex items-center gap-2"
                >
                  <Heart size={20} />
                  Wishlist ({wishlistCount})
                </Link>

                <button
                  onClick={() => {
                    setCartOpen(true);
                    setMenuOpen(false);
                  }}
                  className="text-white flex items-center gap-2"
                >
                  <ShoppingBag size={20} />
                  Cart ({cartCount})
                </button>
              </div>

              {user ? (
                <div className="flex flex-col gap-3 pt-2">
                  <Link
                    to="/orders"
                    onClick={() => setMenuOpen(false)}
                    className="text-white"
                  >
                    My Orders
                  </Link>

                  <span className="text-sm text-gray-400 break-all">
                    {user.email}
                  </span>

                  <button
                    onClick={handleLogout}
                    className="bg-white text-black px-4 py-2 rounded-full text-sm font-semibold w-fit"
                  >
                    Logout
                  </button>
                </div>
              ) : (
                <div className="flex gap-3 pt-2">
                  <Link
                    to="/login"
                    onClick={() => setMenuOpen(false)}
                    className="text-white"
                  >
                    Login
                  </Link>

                  <Link
                    to="/register"
                    onClick={() => setMenuOpen(false)}
                    className="bg-white text-black px-4 py-2 rounded-full text-sm font-semibold"
                  >
                    Register
                  </Link>
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}

export default Navbar;