import { createApp } from "vue";
import App from "./App.vue";
import router from "./services/router";

import { initializeApp } from "firebase/app";

const firebaseConfig = {
  apiKey: "AIzaSyDXWU-3b0dz5zQ_-37ROR7jPKtA35ZRYfE",
  authDomain: "formula-1-poule.firebaseapp.com",
  projectId: "formula-1-poule",
  storageBucket: "formula-1-poule.appspot.com",
  messagingSenderId: "100009942199",
  appId: "1:100009942199:web:b7165f6c2b5838502d4132",
  measurementId: "G-6EKP4N5L3F",
};

initializeApp(firebaseConfig);

createApp(App).use(router).mount("#app");
