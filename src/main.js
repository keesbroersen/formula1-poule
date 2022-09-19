import { createApp } from "vue";
import { createPinia } from "pinia";
import router from "./services/router";
import "./services/firebase";
import App from "./App.vue";

const pinia = createPinia();
const app = createApp(App);

app.use(pinia);
app.use(router);
app.mount("#app");
