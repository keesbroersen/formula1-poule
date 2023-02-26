import { defineStore } from "pinia"
import {
	collection,
	addDoc,
	updateDoc,
	doc,
	query,
	where
} from "firebase/firestore"
import { useFirestore, useCurrentUser, useCollection } from "vuefire"
import {
	Prediction,
	QualificationPrediction,
	RacePrediction
} from "@/models/prediction.model"
import { useRaces } from "./races"
import router from "@/services/router"
import { useDrivers } from "./drivers"
import { ref, computed, watch, Ref } from "vue"
import { getPoints } from "@/composables/getters"

const db = useFirestore()
const db_col = collection(db, "predictions")

export const usePredictions = defineStore("predictions", () => {
	// Consts
	const user = useCurrentUser()
	const raceStore = useRaces()
	const userUid = user.value?.uid || ""
	const q = query(db_col, where("userId", "==", userUid))

	// State
	const { data: predictions, promise } = useCollection<Prediction>(q)
	const currentPrediction: Ref<Prediction> = ref(new Prediction())

	// Getters
	const getPredictionDrivers = computed(() => {
		const driverStore = useDrivers()
		const drivers = [...driverStore.drivers].sort(
			(a, b) => getPoints(b.points) - getPoints(a.points)
		)
		return drivers.map((driver) => {
			const pickedForDriverOfTheDay =
				currentPrediction.value.race.driverOfTheDay === driver.id
			const pickedForFastestLap =
				currentPrediction.value.race.fastestLap === driver.id
			const pickedForQualification = Object.keys(
				currentPrediction.value.qualification
			).find(
				(key) =>
					currentPrediction.value.qualification[
						key as keyof QualificationPrediction
					] === driver.id
			)
			const pickedForRace = Object.keys(currentPrediction.value.race).find(
				(key) => {
					if (key === "driverOfTheDay" || key === "fastestLap") return
					return (
						currentPrediction.value.race[key as keyof RacePrediction] ===
						driver.id
					)
				}
			)

			return {
				id: driver.id,
				name: driver.name,
				teamId: driver.teamId,
				pickedForQualification,
				pickedForRace,
				pickedForDriverOfTheDay,
				pickedForFastestLap
			}
		})
	})

	// Setters
	const addPrediction = async () => {
		try {
			if (currentPrediction.value.id) return updatePrediction()
			const payload = JSON.parse(JSON.stringify({ ...currentPrediction.value }))
			delete payload.id
			await addDoc(db_col, payload)
			router.push({ path: "/" })
		} catch (error) {
			console.log(error)
			throw error
		}
	}

	const updatePrediction = async () => {
		try {
			updateDoc(doc(db_col, currentPrediction.value.id), {
				...currentPrediction.value
			})
			router.push({ path: "/" })
		} catch (error) {
			throw error
		}
	}

	const updatePredictionScore = async (
		predictionId: string,
		qualificationScore: number,
		raceScore: number
	) => {
		return updateDoc(doc(db_col, predictionId), {
			qualificationScore,
			raceScore
		})
			.then(() => router.push({ path: "/admin/drivers" }))
			.catch((error) => {
				throw error
			})
	}

	const setCurrentPrediction = async () => {
		await promise.value
		const getPredictionByRaceId = predictions.value.find(
			(prediction: Prediction) => prediction.raceId === raceStore.currentRace.id
		)
		if (!getPredictionByRaceId) {
			currentPrediction.value = new Prediction()
			currentPrediction.value.userId = user.value?.uid
			currentPrediction.value.raceId = raceStore.currentRace.id
			return
		}
		currentPrediction.value = getPredictionByRaceId
	}

	// Watchers
	// Watch qualification prediction. If an already chosen driver is picked, remove the older one
	watch(
		() => ({
			...currentPrediction.value.qualification
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
				currentPrediction.value.qualification[
					doubleEntry as keyof QualificationPrediction
				] = ""
			}
		}
	)

	// Watch race prediction. If an already chosen driver is picked, remove the older one
	watch(
		() => ({
			...currentPrediction.value.race
		}),
		(newValue, oldValue) => {
			// Don't take fastestLap and driverOfTheDay into consideration
			delete newValue.fastestLap
			delete newValue.driverOfTheDay
			delete oldValue.fastestLap
			delete oldValue.driverOfTheDay

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
				currentPrediction.value.race[doubleEntry as keyof RacePrediction] = ""
			}
		}
	)

	return {
		currentPrediction,
		getPredictionDrivers,
		predictions,
		addPrediction,
		updatePrediction,
		setCurrentPrediction,
		updatePredictionScore
	}
})
