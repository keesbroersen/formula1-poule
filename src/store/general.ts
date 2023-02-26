import { defineStore } from "pinia"
import { ref } from "vue"

import { useDrivers } from "./drivers"
import { useTeams } from "./teams"
import { useUsers } from "./users"
import { usePredictions } from "./predictions"
import { useResults } from "./results"

export const useGeneral = defineStore("general", () => {
	const navigationOpen = ref(false)

	const clearAllResults = () => {
		console.log("clear all results")
		useDrivers().clearAllDriverScores()
		useTeams().clearAllTeamScores()
		useUsers().clearAllUserScores()
		// usePredictions().clearAll() // Delete in Firebase
		// useResults().clearAll() // Delete in Firebase
	}

	return {
		navigationOpen,
		clearAllResults
	}
})
