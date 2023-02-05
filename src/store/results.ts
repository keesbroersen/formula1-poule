import { defineStore } from "pinia"
import { collection, addDoc, updateDoc, doc } from "firebase/firestore"
import { useFirestore, useCollection } from "vuefire"
import { Result, QualificationResult, RaceResult } from "@/models/result.model"
import { useRaces } from "./races"
import router from "@/services/router"
import { useDrivers } from "./drivers"
import { ref, computed, watch, Ref } from "vue"

const db = useFirestore()
const db_col = collection(db, "results")

export const useResults = defineStore("results", () => {
	// Consts
	const raceStore = useRaces()

	// State
	const { data: results, promise } = useCollection<Result>(db_col)
	const currentResult: Ref<Result> = ref({
		raceId: raceStore.currentRace.id,
		qualification: new QualificationResult(),
		race: new RaceResult()
	})

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
		// Save result
		// Add score to drivers
		// Add score to teams
		// Add score to users (3 for correct, 1 for one position off)
		// One for driver of the day / fastest lap
		// Take multiplier into account (usualy 1, but can be 0.25, 0.5 or 0.75 for an interupted race)

		try {
			if (currentResult.value.id) return updateResult()
			await addDoc(db_col, { ...currentResult.value })
			router.push({ path: "/" })
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
		const getResultByRaceId = results.value.find(
			(result: Result) => result.raceId === raceStore.currentRace.id
		)
		if (!getResultByRaceId) {
			Object.assign(currentResult.value, new Result())
			delete currentResult.value.id
			currentResult.value.raceId = raceStore.currentRace.id
			return
		}
		Object.assign(currentResult.value, getResultByRaceId)
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
