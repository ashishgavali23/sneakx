# SneakX – Full Stack E-commerce Web App

SneakX is a modern full-stack e-commerce web application built with **React, Tailwind CSS, Firebase Authentication, and Firestore**.
It provides a complete shopping experience with product browsing, product details, wishlist, cart management, checkout, and order history.

## Features

* **Responsive modern UI** built with React + Tailwind CSS
* **Product listing and product detail pages**
* **Search and category filtering**
* **Wishlist functionality**
* **Cart sidebar with quantity controls**
* **Size / color selection for products**
* **Checkout flow with customer details and payment method selection**
* **Order placement and order history**
* **Firebase Authentication** for login / register
* **Protected routes** for checkout and orders
* **Firestore integration** for storing:

  * wishlist
  * cart
  * orders
* **Persistent cart and wishlist**

  * LocalStorage support
  * Firestore sync for logged-in users
* **Framer Motion animations** for smoother UI interactions

## Tech Stack

* **Frontend:** React.js, React Router DOM
* **Styling:** Tailwind CSS
* **Animations:** Framer Motion
* **Icons:** Lucide React
* **Notifications:** React Toastify
* **Backend / Database:** Firebase Firestore
* **Authentication:** Firebase Auth
* **Deployment:** Vercel

## Pages / Modules

* Home
* Shop
* Product Details
* Wishlist
* Cart Sidebar
* Checkout
* Order Success
* Login / Register
* My Orders

## Project Highlights

* Built a reusable product data structure and connected it across the app
* Implemented cart logic with support for:

  * quantity updates
  * size/color variants
  * duplicate item handling using custom cart keys
* Created protected checkout and order pages for authenticated users
* Stored user-specific cart, wishlist, and order data in Firestore
* Designed a clean dark-themed responsive interface for both desktop and mobile

## Folder Structure

```bash
src/
 ┣ assets/
 ┣ components/
 ┣ context/
 ┣ data/
 ┣ firebase/
 ┣ pages/
 ┣ App.jsx
 ┗ main.jsx
```

## Setup Instructions

### 1. Clone the repository

```bash
git clone https://github.com/ashishgavali23/sneakx.git
cd sneakx
```

### 2. Install dependencies

```bash
npm install
```

### 3. Create a Firebase project

Enable:

* **Authentication**
* **Firestore Database**

### 4. Add Firebase configuration

Create a `.env` file and add your Firebase keys:

```env
VITE_FIREBASE_API_KEY=your_key
VITE_FIREBASE_AUTH_DOMAIN=your_domain
VITE_FIREBASE_PROJECT_ID=your_project_id
VITE_FIREBASE_STORAGE_BUCKET=your_bucket
VITE_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
VITE_FIREBASE_APP_ID=your_app_id
```

### 5. Run the project

```bash
npm run dev
```

## Future Improvements

* Payment gateway integration
* Product reviews system
* Admin dashboard for product/order management
* Coupon / discount system
* Advanced filters and sorting
* Related products / recommendation system

## Screenshots

Add screenshots here after deployment:

* Home Page
* Shop Page
* Product Details Page
* Cart Sidebar
* Checkout Page
* Orders Page

## Live Demo

Add your deployed link here after hosting on Vercel.

## Author

**Ashish Gavali**
