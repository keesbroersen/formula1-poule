import { createApp } from "vue"
import { createPinia } from "pinia"
import router from "./services/router"
import "./services/firebase"
import {
	VueFire,
	VueFireAuth,
	globalFirestoreOptions,
	firestoreDefaultConverter
} from "vuefire"
import { firebaseApp } from "./services/firebase"
import App from "./App.vue"

const app = createApp(App)
const pinia = createPinia()

app.use(router)
app.use(VueFire, {
	firebaseApp,
	modules: [VueFireAuth()],
	globalFirestoreOptions
})
app.use(pinia)
app.mount("#app")

// Add ID to every firestore request
// globalFirestoreOptions.converter = {
// 	toFirestore: firestoreDefaultConverter.toFirestore,
// 	fromFirestore: (snapshot, options) => {
// 		const data = firestoreDefaultConverter.fromFirestore(snapshot, options)
// 		if (!data) return null
// 		return { ...data, id: snapshot.id }
// 	}
// }
