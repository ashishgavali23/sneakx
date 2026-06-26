import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyC6XzY6v3__Ot6voRVYPNud6a8Zvnyehj8",
  authDomain: "sneaks-store-8509a.firebaseapp.com",
  projectId: "sneaks-store-8509a",
  storageBucket: "sneaks-store-8509a.firebasestorage.app",
  messagingSenderId: "985481024791",
  appId: "1:985481024791:web:fac9900729ad150d509352",
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);