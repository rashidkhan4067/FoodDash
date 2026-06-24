// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyDIT2jR6cpbRXtbKk1YLhv6dzoEdQSNzxQ",
    authDomain: "food-delivery-app-6c745.firebaseapp.com",
    projectId: "food-delivery-app-6c745",
    storageBucket: "food-delivery-app-6c745.firebasestorage.app",
    messagingSenderId: "780221526859",
    appId: "1:780221526859:web:7c206e1700bebea4612ece",
    measurementId: "G-CF83F4RFN1"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth(app);
const googleProvider = new GoogleAuthProvider();

export { auth, googleProvider };
