import { defineStore } from "pinia"
import {
	collection,
	addDoc,
	deleteDoc,
	updateDoc,
	doc
} from "firebase/firestore"
import { Race } from "@/models/race.model"
import moment from "moment"
import router from "@/services/router"
import { computed, ComputedRef, Ref, ref } from "vue"
import { useCollection } from "vuefire"
import { db } from "@/services/firebase"

type Filter = "upcoming" | "completed" | "all"

const db_col = collection(db, "races")

export const useRaces = defineStore("races", () => {
	const { data: races, promise } = useCollection<Race>(db_col)
	const filter: Ref<Filter> = ref("upcoming")
	const currentRace: Ref<Race> = ref(new Race())

	const setFilter = (value: Filter) => {
		filter.value = value
	}

	// Getters
	const racesSorted: ComputedRef<Race[]> = computed(() =>
		races.value.sort(
			(a, b) =>
				a.dates.qualification.toMillis() - b.dates.qualification.toMillis()
		)
	)

	const upcomingRaces: ComputedRef<Race[]> = computed(() => {
		return racesSorted.value.filter((race) =>
			moment(race.dates.race.toDate()).isSameOrAfter(new Date(), "day")
		)
	})

	const completedRaces: ComputedRef<Race[]> = computed(() => {
		return racesSorted.value
			.filter((race) =>
				moment(race.dates.race.toDate()).isBefore(new Date(), "day")
			)
			.sort(
				(a, b) =>
					b.dates.qualification.toMillis() - a.dates.qualification.toMillis()
			)
	})

	const filteredRaces: ComputedRef<Race[]> = computed(() => {
		if (filter.value === "upcoming") {
			return upcomingRaces.value
		} else if (filter.value === "completed") {
			return completedRaces.value
		}
		return racesSorted.value
	})

	const getRaceBySlug = (slug: string): Race | undefined => {
		return races.value.find((race) => race.slug === slug)
	}

	const getSlug: ComputedRef<string | null> = computed(() => {
		if (!currentRace.value?.circuit) return null
		return currentRace.value.circuit
			.toLowerCase()
			.trim()
			.replace(/[^\w\s-]/g, "")
			.replace(/[\s_-]+/g, "-")
			.replace(/^-+|-+$/g, "")
	})

	const addRace = async () => {
		await addDoc(db_col, { ...currentRace.value, slug: getSlug.value })
			.then(() => router.push({ path: "/admin/races" }))
			.catch((error) => {
				throw error
			})
	}

	const updateRace = async () => {
		return updateDoc(doc(db_col, currentRace.value.id), {
			...currentRace.value,
			slug: getSlug.value
		})
			.then(() => router.push({ path: "/admin/races" }))
			.catch((error) => {
				throw error
			})
	}

	const removeRace = async () => {
		await deleteDoc(doc(db_col, currentRace.value.id))
			.then(() => router.push({ path: "/admin/races" }))
			.catch((error) => {
				throw error
			})
	}

	const setCurrentRace = async (slug: string) => {
		await promise.value
		currentRace.value = getRaceBySlug(slug) || new Race()
	}

	const clearCurrentRace = () => {
		currentRace.value = {} as Race
	}

	return {
		addRace,
		updateRace,
		removeRace,
		setCurrentRace,
		races,
		currentRace,
		filter,
		setFilter,
		filteredRaces,
		clearCurrentRace,
		racesSorted
	}
})
