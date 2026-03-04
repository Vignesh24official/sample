import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBFcYYgeTpzH3k2Oekcp2OHN4g46HS8eB4",
  authDomain: "isha-super.firebaseapp.com",
  projectId: "isha-super",
  storageBucket: "isha-super.firebasestorage.app",
  messagingSenderId: "938871258299",
  appId: "1:938871258299:web:54f1e7d9a5e6a0da947d9e",
  measurementId: "G-5LZPWSBTVN"
};
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();

export { auth, provider };