import { createApp } from "vue"
import { createPinia } from "pinia"
import router from "./services/router"
import "./services/firebase"
import { VueFire, VueFireAuth } from "vuefire"
import { firebaseApp } from "./services/firebase"
import App from "./App.vue"

const app = createApp(App)
const pinia = createPinia()

app.use(router)
app.use(VueFire, {
	firebaseApp,
	modules: [VueFireAuth()]
})
app.use(pinia)
app.mount("#app")
