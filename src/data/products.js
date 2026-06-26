import jordan from "../assets/shoes/jordan-Retro.png";
import nike from "../assets/shoes/nike-Air-Max.png";
import newBalance from "../assets/shoes/new-Balance.png";
import puma from "../assets/shoes/puma-street.png";

export const products = [
  {
    id: 1,
    name: "Jordan Retro",
    price: "12,999",
    images: [jordan, nike, newBalance],
    category: "Running",
    rating: 4.9,
    reviews: 128,
    description: "Premium running sneaker built for comfort and speed.",
  },
  {
    id: 2,
    name: "Nike Air Max",
    price: "10,499",
    images: [nike, jordan],
    category: "Sneakers",
    rating: 4.9,
    reviews: 128,
    description: "Iconic streetwear sneaker with superior cushioning.",
  },
  {
    id: 3,
    name: "New Balance",
    price: "11,999",
    images: [newBalance, nike, puma],
    category: "Sports",
    rating: 4.9,
    reviews: 128,
    description: "Classic everyday sneaker with modern comfort.",
  },
  {
    id: 4,
    name: "Puma Street",
    price: "8,999",
    images: [puma, newBalance],
    category: "Sports",
    rating: 4.9,
    reviews: 128,
    description: "Modern sports sneaker with lightweight design.",
  },
];

export default products;
