import { createApp } from "vue"
import { createPinia } from "pinia"
import router from "./services/router"
import "./services/firebase"
import { VueFire, VueFireAuth } from "vuefire"
import { firebaseApp } from "./services/firebase"
import App from "./App.vue"
import { useTeams } from "@/store/teams"
import { useDrivers } from "@/store/drivers"
import { useRaces } from "@/store/races"
import { usePredictions } from "./store/predictions"

const pinia = createPinia()
const app = createApp(App)

app.use(pinia)
app.use(router)
app.use(VueFire, {
	// imported above but could also just be created here
	firebaseApp,
	modules: [
		// we will see other modules later on
		VueFireAuth()
	]
})
app.mount("#app")

// Initialize stores
useTeams().getTeams()
useDrivers().getDrivers()
useRaces().getRaces()
usePredictions().getPredictions()
