import { createApp } from "vue";
import App from "./App.vue";
import router from "./services/router";

import "./services/firebase";

createApp(App).use(router).mount("#app");
