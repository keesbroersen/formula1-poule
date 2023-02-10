import { defineStore } from "pinia"
import { collection, addDoc, updateDoc, doc } from "firebase/firestore"
import { useFirestore, useCollection } from "vuefire"
import { Result, QualificationResult, RaceResult } from "@/models/result.model"
import router from "@/services/router"
import { useRaces } from "./races"
import { useTeams } from "./teams"
import { useDrivers } from "./drivers"
import { ref, computed, watch, Ref } from "vue"

const db = useFirestore()
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
		// Save result
		// Add score to drivers
		// Add score to teams
		// Add score to users (3 for correct, 1 for one position off)

		try {
			saveScoreToDriversAndteams()
			if (currentResult.value.id) return updateResult()
			const payload = { ...currentResult.value }
			await addDoc(db_col, payload)
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

	const saveScoreToDriversAndteams = () => {
		const racePoints = computed(() => {
			switch (currentResult.value.scoreMultiplier) {
				case "raced75orMore":
					return [25, 18, 15, 12, 10, 8, 6, 4, 2, 1, 0]
				case "raced50till75":
					return [19, 14, 12, 10, 8, 6, 4, 3, 2, 1, 0]
				case "raced25till50":
					return [13, 10, 8, 6, 5, 4, 3, 2, 1, 0, 0]
				case "raced2lapstill25":
					return [6, 4, 3, 2, 1, 0, 0, 0, 0, 0, 0]
				default:
					return [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
			}
		})

		const sprintRacePoints = [8, 7, 6, 5, 4, 3, 2, 1, 0, 0, 0]

		const teamPoints = new Map()

		const driverStore = useDrivers()
		const teamsStore = useTeams()
		driverStore.drivers.forEach((driver) => {
			const race = currentResult.value.race as any
			const results = Object.keys(currentResult.value.race).filter(
				(key) => race[key] === driver.id
			)

			let points = 0
			results.sort().reverse() // So pos* goes before Fastest lap

			results.forEach((result) => {
				if (result.includes("pos")) {
					const pos = parseInt(result.replace("pos", ""))
					points += racePoints.value[pos - 1]
				}
				if (result.includes("fastest") && points > 0) {
					points += 1
				}
			})

			if (raceStore.currentRace.isSprintRace) {
				const qualification = currentResult.value.qualification as any
				const results = Object.keys(currentResult.value.qualification).filter(
					(key) => qualification[key] === driver.id
				)

				results.forEach((result) => {
					const pos = parseInt(result.replace("pos", ""))
					points += sprintRacePoints[pos - 1]
				})
			}

			const driverScores = driver.points
			driverScores[currentResult.value.raceIndex] = points
			driverStore.updateDriverScore(driver.id, driverScores)

			if (teamPoints.get(driver.teamId)) {
				teamPoints.set(driver.teamId, teamPoints.get(driver.teamId) + points)
			} else {
				teamPoints.set(driver.teamId, points)
			}
		})

		for (const [key, value] of teamPoints) {
			const teamScores = teamsStore.getTeamById(key)?.points || []
			teamScores[currentResult.value.raceIndex] = value
			teamsStore.updateTeamScore(key, teamScores)
		}
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
