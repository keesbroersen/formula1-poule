import { defineStore } from "pinia"
import {
	collection,
	getDocs,
	addDoc,
	updateDoc,
	doc,
	query,
	where
} from "firebase/firestore"
import { useFirestore, useCurrentUser } from "vuefire"
import {
	Prediction,
	PredictionClass,
	QualificationPrediction,
	RacePrediction
} from "@/models/prediction.model"
import { useRaces } from "./races"
import router from "@/services/router"
import { useDrivers } from "./drivers"
import { ref, computed, reactive, watch } from "vue"

const db = useFirestore()
const db_col = collection(db, "predictions")

export const usePredictions = defineStore("predictions", () => {
	// Consts
	const user = useCurrentUser()
	const raceStore = useRaces()

	// State
	const predictions: Prediction[] = reactive([])
	const currentPrediction: Prediction = reactive(new PredictionClass())
	const predictionsLoading = ref(true)

	// Getters
	const getCurrentPrediction = computed(() => {
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

		if (user.value?.uid) {
			const q = query(
				collection(db, "predictions"),
				where("userId", "==", user.value.uid)
			)
			const docs = await getDocs(q)
			docs.forEach((doc) => {
				const data = doc.data()
				data.id = doc.id
				predictions.push(data as Prediction)
			})
		}
		predictionsLoading.value = false
	}

	const addPrediction = async () => {
		if (currentPrediction.id) return updatePrediction()
		await addDoc(db_col, { ...currentPrediction })
			.then(() => router.push({ path: "/" }))
			.catch((error) => {
				throw error
			})
	}

	const updatePrediction = async () => {
		return updateDoc(doc(db_col, currentPrediction.id), {
			...currentPrediction
		})
			.then(() => router.push({ path: "/" }))
			.catch((error) => {
				throw error
			})
	}

	const setCurrentPrediction = async () => {
		// Wait until races are loaded
		while (predictionsLoading.value) {
			await new Promise((resolve) => requestAnimationFrame(resolve))
		}
		if (!getCurrentPrediction.value) {
			Object.assign(currentPrediction, new PredictionClass())
			if (user.value?.uid) currentPrediction.userId = user.value.uid

			if (raceStore.currentRace.id) {
				currentPrediction.raceId = raceStore.currentRace.id
			}
			return
		}
		Object.assign(currentPrediction, getCurrentPrediction.value)
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
		getPredictionDrivers,
		predictions,
		addPrediction,
		updatePrediction
	}
})
