import { defineStore } from "pinia"
import {
	collection,
	addDoc,
	updateDoc,
	doc,
	query,
	where,
	getDocs
} from "firebase/firestore"
import { useCollection } from "vuefire"
import { Result, QualificationResult, RaceResult } from "@/models/result.model"
import router from "@/services/router"
import { useRaces } from "./races"
import { useTeams } from "./teams"
import { useUsers } from "./users"
import { useDrivers } from "./drivers"
import { usePredictions } from "./predictions"
import { ref, computed, watch, Ref } from "vue"
import {
	Prediction,
	QualificationPrediction,
	RacePrediction
} from "@/models/prediction.model"
import { db } from "@/services/firebase"

const db_col = collection(db, "results")

export const useResults = defineStore("results", () => {
	// Consts
	const raceStore = useRaces()

	// State
	const { data: results, promise } = useCollection<Result>(db_col)
	const currentResult: Ref<Result> = ref(new Result())

	// Getters
	const getResultDrivers = computed(() => {
		const driverStore = useDrivers()
		return driverStore.drivers.map((driver) => {
			const pickedForDriverOfTheDay =
				currentResult.value.race.driverOfTheDay === driver.id
			const pickedForFastestLap =
				currentResult.value.race.fastestLap === driver.id
			const pickedForQualification = Object.keys(
				currentResult.value.qualification
			).find(
				(key) =>
					currentResult.value.qualification[
						key as keyof QualificationResult
					] === driver.id
			)
			const pickedForRace = Object.keys(currentResult.value.race).find(
				(key) => {
					if (key === "driverOfTheDay" || key === "fastestLap") return
					return currentResult.value.race[key as keyof RaceResult] === driver.id
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
	const addResult = async () => {
		try {
			//saveScoreToDriversAndteams()
			//saveScoreToUsers()
			if (currentResult.value.id) return updateResult()
			const payload = JSON.parse(JSON.stringify({ ...currentResult.value }))
			delete payload.id
			await addDoc(db_col, payload)
			// router.push({ path: "/" })
		} catch (error) {
			throw error
		}
	}

	const updateResult = async () => {
		try {
			updateDoc(doc(db_col, currentResult.value.id), {
				...currentResult.value
			})
			router.push({ path: "/" })
		} catch (error) {
			throw error
		}
	}

	const setCurrentResult = async () => {
		await promise.value

		const raceIndex = raceStore.racesSorted.findIndex(
			(race) => race.id === raceStore.currentRace.id
		)

		const getResultByRaceId = results.value.find(
			(result: Result) => result.raceId === raceStore.currentRace.id
		)

		if (!getResultByRaceId) {
			currentResult.value = new Result()
			currentResult.value.raceId = raceStore.currentRace.id
			currentResult.value.raceIndex = raceIndex
			return
		}

		currentResult.value = getResultByRaceId
		currentResult.value.raceIndex = raceIndex
	}

	// Watchers
	// Watch qualification result. If an already chosen driver is picked, remove the older one
	watch(
		() => ({
			...currentResult.value.qualification
		}),
		(newValue, oldValue) => {
			const changedKey = Object.keys(newValue).find(
				(key) =>
					newValue[key as keyof QualificationResult] !==
					oldValue[key as keyof QualificationResult]
			) as keyof QualificationResult

			const doubleEntry = Object.keys(oldValue).find(
				(item) =>
					newValue[changedKey] === oldValue[item as keyof QualificationResult]
			)

			// If driver is already predicted, remove from old position
			if (doubleEntry) {
				currentResult.value.qualification[
					doubleEntry as keyof QualificationResult
				] = ""
			}
		}
	)

	// Watch race result. If an already chosen driver is picked, remove the older one
	watch(
		() => ({
			...currentResult.value.race
		}),
		(newValue, oldValue) => {
			// Don't take fastestLap and driverOfTheDay into consideration
			delete newValue.fastestLap
			delete newValue.driverOfTheDay
			delete oldValue.fastestLap
			delete oldValue.driverOfTheDay

			const changedKey = Object.keys(newValue).find(
				(key) =>
					newValue[key as keyof RaceResult] !==
					oldValue[key as keyof RaceResult]
			) as keyof RaceResult

			const doubleEntry = Object.keys(oldValue).find(
				(item) => newValue[changedKey] === oldValue[item as keyof RaceResult]
			)

			// If driver is already predicted, remove from old position
			if (doubleEntry) {
				currentResult.value.race[doubleEntry as keyof RaceResult] = ""
			}
		}
	)

	return {
		currentResult,
		getResultDrivers,
		results,
		addResult,
		updateResult,
		setCurrentResult
	}
})
