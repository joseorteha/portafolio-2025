import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore, collection } from "firebase/firestore"; // Agrega estas importaciones

const firebaseConfig = {
  apiKey: "AIzaSyDwWeKYKTDnXaUQOyrm_GY6TE-F7bxaWhw",
  authDomain: "portafolio-web-3135d.firebaseapp.com",
  databaseURL: "https://portafolio-web-3135d-default-rtdb.firebaseio.com",
  projectId: "portafolio-web-3135d",
  storageBucket: "portafolio-web-3135d.firebasestorage.app",
  messagingSenderId: "827593637787",
  appId: "1:827593637787:web:b4192db828c2b050cdab3e",
  measurementId: "G-B0KK6Z8X2Y"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

// Initialize Firestore
const db = getFirestore(app);

// Export db and collection for use in other files
export { db, collection };