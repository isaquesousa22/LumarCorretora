import { initializeApp } from "https://www.gstatic.com/firebasejs/12.15.0/firebase-app.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/12.15.0/firebase-auth.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/12.15.0/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "AIzaSyA1BBtcbmtsiGIgp9oB4bWQRKckoJCvX5M",
  authDomain: "lumarcorretora-3c484.firebaseapp.com",
  projectId: "lumarcorretora-3c484",
  storageBucket: "lumarcorretora-3c484.firebasestorage.app",
  messagingSenderId: "1010200737135",
  appId: "1:1010200737135:web:05b2a1e5442797f9d9a49a"
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);