import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { signOut } from "firebase/auth";
import { auth } from "../firebase/firebase";
function Navbar({
  cartCount,
  wishlistCount,
  setCartOpen,
  searchTerm,
  setSearchTerm,
}) {
  const { user } = useAuth();

  const handleLogout = async () => {
    await signOut(auth);
  };

  console.log("Current User:", user);
  return (
    <nav className="w-full flex items-center justify-between px-8 py-5 bg-black text-white border-b border-white/10 sticky top-0 z-50">
      {/* Logo */}
      <h1 className="text-2xl font-black tracking-[6px]">SNEAKX</h1>

      {/* Desktop Links */}
      <ul className="hidden md:flex gap-10 uppercase text-sm tracking-widest">
        <li className="hover:text-gray-400 cursor-pointer transition">Home</li>

        <li className="hover:text-gray-400 cursor-pointer transition">Shop</li>

        <li className="hover:text-gray-400 cursor-pointer transition">About</li>

        <li className="hover:text-gray-400 cursor-pointer transition">
          Collection
        </li>

        <li className="hover:text-gray-400 cursor-pointer transition">
          Contact
        </li>
      </ul>

      <input
        type="text"
        placeholder="Search Sneakers..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="hidden md:block bg-white/10 border border-white/10 rounded-full px-5 py-2 text-sm outline-none focus:border-white"
      />

      {/* Right Side */}
      <div className="flex items-center gap-6">
        <Link to="/wishlist">
          <button className="text-white text-xl">❤️ {wishlistCount}</button>
        </Link>

        <button onClick={() => setCartOpen(true)}>🛒 {cartCount}</button>

        {user ? (
          <div className="flex items-center gap-3">
            <Link to="/orders" className="hover:text-gray-400">
              My Orders
            </Link>

            <span className="text-sm">{user.email}</span>

            <button
              onClick={handleLogout}
              className="bg-red-500 px-3 py-1 rounded"
            >
              Logout
            </button>
          </div>
        ) : (
          <div className="flex gap-3">
            <Link to="/login">Login</Link>
            <Link to="/register">Register</Link>
          </div>
        )}
      </div>
    </nav>
  );
}

export default Navbar;
