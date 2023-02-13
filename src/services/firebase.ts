import { initializeApp } from "firebase/app"
import { getAuth, onAuthStateChanged } from "firebase/auth"
import { getFirestore, collection } from "firebase/firestore"
// import { getAnalytics } from "firebase/analytics";
// ... other firebase imports

export const firebaseApp = initializeApp({
	apiKey: process.env.VUE_APP_FIREBASE_API_KEY,
	authDomain: process.env.VUE_APP_FIREBASE_AUTH_DOMAIN,
	projectId: process.env.VUE_APP_FIREBASE_PROJECT_ID,
	storageBucket: process.env.VUE_APP_FIREBASE_STORAGE_BUCKET,
	messagingSenderId: process.env.VUE_APP_FIREBASE_MESSAGING_SENDER_ID,
	appId: process.env.VUE_APP_FIREBASE_APP_ID,
	measurementId: process.env.VUE_APP_FIREBASE_MEASUREMENT_ID
})

// const analytics = getAnalytics(firebaseApp);

// used for the firestore refs
const db = getFirestore(firebaseApp)

// here we can export reusable database references
export const driversRef = collection(db, "drivers")
export const predictionsRef = collection(db, "predictions")
export const racesRef = collection(db, "races")
export const teamsRef = collection(db, "teams")

export const getUser = () => {
	return new Promise((resolve, reject) => {
		const auth = getAuth()
		const unsubscribe = onAuthStateChanged(
			auth,
			(userFirebase) => {
				unsubscribe()
				resolve(userFirebase)
			},
			reject
		)
	})
}

export default firebaseApp
