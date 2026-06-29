import { initializeApp } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-app.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-firestore.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-auth.js";

const firebaseConfig = {
  apiKey: "AIzaSyA952WORyBl4ONjcPZLnV_e714biO-S42k",
  authDomain: "student-bae35.firebaseapp.com",
  projectId: "student-bae35",
  storageBucket: "student-bae35.firebasestorage.app",
  messagingSenderId: "820368202197",
  appId: "1:820368202197:web:dbc7fe0a913df91eadc55c",
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);
