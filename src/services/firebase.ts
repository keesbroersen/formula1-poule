import { initializeApp } from "firebase/app";
import { getAuth, onAuthStateChanged } from "firebase/auth";
// import { getAnalytics } from "firebase/analytics";

const firebaseConfig = {
  apiKey: "AIzaSyDXWU-3b0dz5zQ_-37ROR7jPKtA35ZRYfE",
  authDomain: "formula-1-poule.firebaseapp.com",
  projectId: "formula-1-poule",
  storageBucket: "formula-1-poule.appspot.com",
  messagingSenderId: "100009942199",
  appId: "1:100009942199:web:b7165f6c2b5838502d4132",
  measurementId: "G-6EKP4N5L3F",
};

const firebaseApp = initializeApp(firebaseConfig);
//const analytics = getAnalytics(firebaseApp);

export const getUser = () => {
  return new Promise((resolve, reject) => {
    const auth = getAuth();
    const unsubscribe = onAuthStateChanged(
      auth,
      (userFirebase) => {
        unsubscribe();
        resolve(userFirebase);
      },
      reject
    );
  });
};

export default firebaseApp;
