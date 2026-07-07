// Sneakers
import jordan from "../assets/shoes/jordan-Retro.png";
import nike from "../assets/shoes/nike-Air-Max.png";
import newBalance from "../assets/shoes/new-Balance.png";
import puma from "../assets/shoes/puma-street.png";

// T-Shirts
import oversizedBlack from "../assets/tshirts/oversized black.png";
import oversizedWhite from "../assets/tshirts/oversized white.png";
import vintageBeige from "../assets/tshirts/vintage beige.png";
import urbanGreen from "../assets/tshirts/urban green.png";

// Hoodies
import blackHoodie from "../assets/hoodies/black hoodie.png";
import brownHoodie from "../assets/hoodies/brown hoodie.png";
import creamHoodie from "../assets/hoodies/cream hoodie.png";
import greyHoodie from "../assets/hoodies/grey hoodie.png";

export const products = [
  // ---------------- Sneakers ----------------
  {
    id: 1,
    name: "Jordan Retro",
    brand: "Nike",
    category: "Sneakers",
    price: 12999,
    badge: "Best Seller",
    stock: 12,
    sizes: [7, 8, 9, 10],
    colors: ["Black", "White"],
    rating: 4.9,
    reviews: 128,
    description:
      "Premium basketball-inspired sneaker built for comfort, performance, and everyday streetwear style.",
    images: [jordan, nike, newBalance],
  },
  {
    id: 2,
    name: "Nike Air Max",
    brand: "Nike",
    category: "Sneakers",
    price: 10499,
    badge: "Trending",
    stock: 10,
    sizes: [7, 8, 9, 10],
    colors: ["White", "Blue"],
    rating: 4.8,
    reviews: 96,
    description:
      "Iconic Air Max silhouette with lightweight cushioning and modern streetwear aesthetics.",
    images: [nike, jordan],
  },
  {
    id: 3,
    name: "New Balance",
    brand: "New Balance",
    category: "Sneakers",
    price: 11999,
    badge: "Exclusive",
    stock: 8,
    sizes: [7, 8, 9, 10],
    colors: ["Grey", "White"],
    rating: 4.7,
    reviews: 84,
    description:
      "Classic sneaker with premium comfort, clean styling, and versatile everyday wear appeal.",
    images: [newBalance, nike, puma],
  },
  {
    id: 4,
    name: "Puma Street",
    brand: "Puma",
    category: "Sneakers",
    price: 8999,
    badge: "Limited",
    stock: 5,
    sizes: [8, 9, 10],
    colors: ["Black"],
    rating: 4.6,
    reviews: 72,
    description:
      "Modern sports-inspired sneaker with lightweight construction and sleek street-ready design.",
    images: [puma, newBalance],
  },

  // ---------------- Oversized T-Shirts ----------------
  {
    id: 5,
    name: "Oversized Black Tee",
    brand: "SneakX",
    category: "Oversized T-Shirts",
    price: 1499,
    badge: "New",
    stock: 18,
    sizes: ["S", "M", "L", "XL"],
    colors: ["Black"],
    rating: 4.8,
    reviews: 54,
    description:
      "Relaxed oversized t-shirt crafted for premium comfort and minimal streetwear styling.",
    images: [oversizedBlack],
  },
  {
    id: 6,
    name: "Oversized White Tee",
    brand: "SneakX",
    category: "Oversized T-Shirts",
    price: 1499,
    badge: "Trending",
    stock: 16,
    sizes: ["S", "M", "L", "XL"],
    colors: ["White"],
    rating: 4.7,
    reviews: 48,
    description:
      "Clean oversized tee with a modern relaxed fit, perfect for everyday layering and casual looks.",
    images: [oversizedWhite],
  },
  {
    id: 7,
    name: "Vintage Beige Tee",
    brand: "SneakX",
    category: "Oversized T-Shirts",
    price: 1599,
    badge: "Premium",
    stock: 12,
    sizes: ["S", "M", "L", "XL"],
    colors: ["Beige"],
    rating: 4.8,
    reviews: 39,
    description:
      "Vintage-inspired oversized tee with a soft neutral tone and elevated everyday aesthetic.",
    images: [vintageBeige],
  },
  {
    id: 8,
    name: "Urban Green Tee",
    brand: "SneakX",
    category: "Oversized T-Shirts",
    price: 1599,
    badge: "Hot",
    stock: 9,
    sizes: ["S", "M", "L", "XL"],
    colors: ["Green"],
    rating: 4.6,
    reviews: 33,
    description:
      "Statement oversized t-shirt designed with a bold urban vibe and relaxed premium fit.",
    images: [urbanGreen],
  },

  // ---------------- Hoodies ----------------
  {
    id: 9,
    name: "Black Hoodie",
    brand: "SneakX",
    category: "Hoodies",
    price: 2499,
    badge: "Best Seller",
    stock: 14,
    sizes: ["S", "M", "L", "XL"],
    colors: ["Black"],
    rating: 4.9,
    reviews: 77,
    description:
      "Premium heavyweight hoodie with a clean oversized silhouette and ultra-soft inner feel.",
    images: [blackHoodie],
  },
  {
    id: 10,
    name: "Brown Hoodie",
    brand: "SneakX",
    category: "Hoodies",
    price: 2599,
    badge: "New",
    stock: 11,
    sizes: ["S", "M", "L", "XL"],
    colors: ["Brown"],
    rating: 4.7,
    reviews: 41,
    description:
      "Warm-toned hoodie built for comfort, layering, and modern streetwear styling.",
    images: [brownHoodie],
  },
  {
    id: 11,
    name: "Cream Hoodie",
    brand: "SneakX",
    category: "Hoodies",
    price: 2599,
    badge: "Premium",
    stock: 7,
    sizes: ["S", "M", "L", "XL"],
    colors: ["Cream"],
    rating: 4.8,
    reviews: 36,
    description:
      "Minimal premium hoodie with a soft cream finish and relaxed silhouette for elevated casual wear.",
    images: [creamHoodie],
  },
  {
    id: 12,
    name: "Grey Hoodie",
    brand: "SneakX",
    category: "Hoodies",
    price: 2499,
    badge: "Trending",
    stock: 13,
    sizes: ["S", "M", "L", "XL"],
    colors: ["Grey"],
    rating: 4.7,
    reviews: 44,
    description:
      "Classic grey hoodie with a timeless streetwear fit and all-day comfort.",
    images: [greyHoodie],
  },
];

export default products;