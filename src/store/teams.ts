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
import { Team } from "@/models/team.model"
import router from "@/services/router"
import { useCollection } from "vuefire"
import { ref, Ref, computed, ComputedRef } from "vue"

const db = getFirestore(firebaseApp)
const db_col = collection(db, "teams")

export const useTeams = defineStore("teams", () => {
	const { data: teams, promise } = useCollection<Team>(db_col)
	const currentTeam: Ref<Team> = ref(new Team())

	const getTeamBySlug = (slug: string): Team | undefined => {
		return teams.value.find((team) => team.slug === slug)
	}

	const getTeamById = (id: string) =>
		teams.value?.find((team) => team.id === id)

	const getSlug: ComputedRef<string | null> = computed(() => {
		if (!currentTeam.value?.name) return null
		return currentTeam.value.name
			.toLowerCase()
			.trim()
			.replace(/[^\w\s-]/g, "")
			.replace(/[\s_-]+/g, "-")
			.replace(/^-+|-+$/g, "")
	})

	const addTeam = async () => {
		await addDoc(db_col, { ...currentTeam.value, slug: getSlug.value })
			.then(() => router.push({ path: "/admin/teams" }))
			.catch((error) => {
				throw error
			})
	}

	const updateTeam = async () => {
		return updateDoc(doc(db_col, currentTeam.value.id), {
			...currentTeam.value,
			slug: getSlug.value
		})
			.then(() => router.push({ path: "/admin/teams" }))
			.catch((error) => {
				throw error
			})
	}

	const updateTeamScore = async (teamId: string, points: Array<number>) => {
		return updateDoc(doc(db_col, teamId), {
			points
		})
			.then()
			.catch((error) => {
				throw error
			})
	}

	const clearAllTeamScores = async () => {
		for (const team of teams.value) {
			updateDoc(doc(db_col, team.id), {
				points: []
			})
		}
	}

	const removeTeam = async () => {
		await deleteDoc(doc(db_col, currentTeam.value.id))
			.then(() => router.push({ path: "/admin/teams" }))
			.catch((error) => {
				throw error
			})
	}

	const setCurrentTeam = async (slug: string) => {
		await promise.value
		currentTeam.value = getTeamBySlug(slug) || new Team()
	}

	const clearCurrentTeam = () => {
		currentTeam.value = {} as Team
	}

	return {
		teams,
		currentTeam,
		addTeam,
		updateTeam,
		updateTeamScore,
		removeTeam,
		setCurrentTeam,
		clearCurrentTeam,
		getTeamById,
		clearAllTeamScores
	}
})
