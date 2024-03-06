import { initializeApp } from "firebase/app";

const firebaseConfig = {
  apiKey:"AIzaSyCvtRY2F7G2zSAgPB2oDrLzJO1_4o2ZMPE",
  authDomain: "mern-real-estate-9ac08.firebaseapp.com",
  projectId: "mern-real-estate-9ac08",
  storageBucket: "mern-real-estate-9ac08.appspot.com",
  messagingSenderId: "996173136076",
  appId: "1:996173136076:web:6e8a48ed588413f9f5c269"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export { app };
