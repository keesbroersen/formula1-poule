import { initializeApp } from "firebase/app"
import { getAuth, onAuthStateChanged, connectAuthEmulator } from "firebase/auth"
import { getFirestore, connectFirestoreEmulator } from "firebase/firestore"
// import { getAnalytics } from "firebase/analytics";

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

export const db = getFirestore(firebaseApp)
export const auth = getAuth()

// if (location.hostname === "localhost") {
// 	connectFirestoreEmulator(db, "localhost", 8000)
// 	connectAuthEmulator(auth, "http://127.0.0.1:9099")
// }

export const getUser = () => {
	return new Promise((resolve, reject) => {
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
