import { defineStore } from "pinia"
import {
	getFirestore,
	collection,
	getDocs,
	addDoc,
	deleteDoc,
	updateDoc,
	doc
} from "firebase/firestore"
import firebaseApp from "@/services/firebase"
import {
	Prediction,
	PredictionClass,
	QualificationPrediction,
	RacePrediction
} from "@/models/prediction.model"
import { useRaces } from "./races"
import router from "@/services/router"
import { useDrivers } from "./drivers"
import { ref, computed, reactive, watch, Ref } from "vue"
const db = getFirestore(firebaseApp)
const db_col = collection(db, "predictions")

export const usePredictions = defineStore("predictions", () => {
	// State
	const predictions: Prediction[] = reactive([])
	const currentPrediction: Prediction = reactive(new PredictionClass())
	const driversIdsPicked: string[] = reactive([])
	const predictionsLoading = ref(true)

	// Getters
	const getCurrentPrediction = computed(() => {
		const raceStore = useRaces()
		return predictions.find(
			(prediction: Prediction) => prediction.raceId === raceStore.currentRace.id
		)
	})

	const getPredictionDrivers = computed(() => {
		const driverStore = useDrivers()
		return driverStore.getAllDrivers.map((driver) => {
			return {
				id: driver.id,
				name: driver.name,
				teamId: driver.teamId,
				pickedForQualification: Object.keys(
					currentPrediction.qualification
				).find(
					(key) =>
						currentPrediction.qualification[
							key as keyof QualificationPrediction
						] === driver.id
				),
				pickedForRace: Object.keys(currentPrediction.race).find(
					(key) =>
						currentPrediction.race[key as keyof RacePrediction] === driver.id
				)
			}
		})
	})

	// Actions
	const getPredictions = async () => {
		Object.assign(predictions, [])
		const docs = await getDocs(db_col)
		docs.forEach((doc) => {
			const data = doc.data()
			data.id = doc.id
			if (predictions.find((prediction) => prediction.id === doc.id)) return
			predictions.push(data as Prediction)
		})
		predictionsLoading.value = false
	}
	const addPrediction = async () => {
		await addDoc(db_col, { ...currentPrediction })
			.then(() => router.push({ path: "/races" }))
			.catch((error) => {
				throw error
			})
	}
	const updatePrediction = async () => {
		return updateDoc(doc(db_col, currentPrediction.id), {
			...currentPrediction
		})
			.then(() => router.push({ path: "/races" }))
			.catch((error) => {
				throw error
			})
	}
	const removePrediction = async () => {
		await deleteDoc(doc(db_col, currentPrediction.id))
			.then(() => router.push({ path: "/races" }))
			.catch((error) => {
				throw error
			})
	}
	const setCurrentPrediction = async () => {
		// Wait until races are loaded
		while (predictionsLoading) {
			await new Promise((resolve) => requestAnimationFrame(resolve))
		}

		if (!predictions.length) {
			Object.assign(currentPrediction, new PredictionClass())
			const raceStore = useRaces()
			if (raceStore.currentRace.id) {
				currentPrediction.raceId = raceStore.currentRace.id
			}
			return
		}
		Object.assign(currentPrediction, getCurrentPrediction)
	}
	const clearcurrentPrediction = () => {
		Object.assign(currentPrediction, new PredictionClass())
	}
	const addDriverToPicked = (id: string) => {
		driversIdsPicked.push(id)
	}

	// Watchers
	// Watch qualification prediction. If an already chosen driver is picked, remove the older one
	watch(
		() => ({
			...currentPrediction.qualification
		}),
		(newValue, oldValue) => {
			const changedKey = Object.keys(newValue).find(
				(key) =>
					newValue[key as keyof QualificationPrediction] !==
					oldValue[key as keyof QualificationPrediction]
			) as keyof QualificationPrediction

			const doubleEntry = Object.keys(oldValue).find(
				(item) =>
					newValue[changedKey] ===
					oldValue[item as keyof QualificationPrediction]
			)

			// If driver is already predicted, remove from old position
			if (doubleEntry) {
				currentPrediction.qualification[
					doubleEntry as keyof QualificationPrediction
				] = ""
			}
		}
	)

	// Watch race prediction. If an already chosen driver is picked, remove the older one
	watch(
		() => ({
			...currentPrediction.race
		}),
		(newValue, oldValue) => {
			const changedKey = Object.keys(newValue).find(
				(key) =>
					newValue[key as keyof RacePrediction] !==
					oldValue[key as keyof RacePrediction]
			) as keyof RacePrediction

			const doubleEntry = Object.keys(oldValue).find(
				(item) =>
					newValue[changedKey] === oldValue[item as keyof RacePrediction]
			)

			// If driver is already predicted, remove from old position
			if (doubleEntry) {
				currentPrediction.race[doubleEntry as keyof RacePrediction] = ""
			}
		}
	)

	return {
		getPredictions,
		setCurrentPrediction,
		currentPrediction,
		getPredictionDrivers
	}
})

// const subscribeToStore = async () => {
// 	// Wait until races are loaded
// 	while (!getActivePinia()) {
// 		await new Promise((resolve) => requestAnimationFrame(resolve))
// 	}

// 	usePredictions().$subscribe((mutation, state) => {
// 		console.log({ mutation: mutation.events })
// 	})
// }

// subscribeToStore()
