
import { initializeApp } from "firebase/app";
import {getAuth} from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyBsMXwCylXg2TchRd0oIU-sPQMDqcXfeWg",
  authDomain: "netflix-clone-7aa8d.firebaseapp.com",
  projectId: "netflix-clone-7aa8d",
  storageBucket: "netflix-clone-7aa8d.appspot.com",
  messagingSenderId: "184124028713",
  appId: "1:184124028713:web:f6836469f8f708d5d56938",
  measurementId: "G-R2KTJZTBEF"
};

const app = initializeApp(firebaseConfig);

export const firebaseAuth = getAuth(app);