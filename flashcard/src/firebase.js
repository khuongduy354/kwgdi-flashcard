import { initializeApp } from "firebase/app";

const firebaseConfig = {
  apiKey: "AIzaSyDPoYA3017g0HwB1m0ZUUAxLKrbInm1fRg",
  authDomain: "kwgdi-flashcard.firebaseapp.com",
  projectId: "kwgdi-flashcard",
  storageBucket: "kwgdi-flashcard.appspot.com",
  messagingSenderId: "203375354904",
  appId: "1:203375354904:web:176867ed0f89bb466f4f6d",
};

const app = initializeApp(firebaseConfig);
export default app;
