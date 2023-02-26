import { defineStore } from "pinia"
import {
	getFirestore,
	collection,
	addDoc,
	deleteDoc,
	updateDoc,
	doc
} from "firebase/firestore"
import firebaseApp from "@/services/firebase"
import { Driver } from "@/models/driver.model"
import router from "@/services/router"
import { useCollection } from "vuefire"
import { computed, ComputedRef, ref, Ref } from "vue"

const db = getFirestore(firebaseApp)
const db_col = collection(db, "drivers")

export const useDrivers = defineStore("drivers", () => {
	const { data: drivers, promise } = useCollection<Driver>(db_col)
	const currentDriver: Ref<Driver> = ref(new Driver())

	const getDriverBySlug = (slug: string): Driver | undefined => {
		return drivers.value.find((driver) => driver.slug === slug)
	}

	const getDriverById = (id: string) =>
		drivers.value?.find((driver) => driver.id === id)

	const getSlug: ComputedRef<string | null> = computed(() => {
		if (!currentDriver.value?.name) return null
		return currentDriver.value.name
			.toLowerCase()
			.trim()
			.replace(/[^\w\s-]/g, "")
			.replace(/[\s_-]+/g, "-")
			.replace(/^-+|-+$/g, "")
	})

	const addDriver = async () => {
		await addDoc(db_col, { ...currentDriver.value, slug: getSlug.value })
			.then(() => router.push({ path: "/admin/drivers" }))
			.catch((error) => {
				throw error
			})
	}

	const updateDriver = async () => {
		return updateDoc(doc(db_col, currentDriver.value.id), {
			...currentDriver.value,
			slug: getSlug.value
		})
			.then(() => router.push({ path: "/admin/drivers" }))
			.catch((error) => {
				throw error
			})
	}

	const updateDriverScore = async (driverId: string, points: Array<number>) => {
		return updateDoc(doc(db_col, driverId), {
			points
		})
			.then(() => router.push({ path: "/admin/drivers" }))
			.catch((error) => {
				throw error
			})
	}

	const clearAllDriverScores = async () => {
		for (const driver of drivers.value) {
			updateDoc(doc(db_col, driver.id), {
				points: []
			})
		}
	}

	const removeDriver = async () => {
		await deleteDoc(doc(db_col, currentDriver.value.id))
			.then(() => router.push({ path: "/admin/drivers" }))
			.catch((error) => {
				throw error
			})
	}

	const setCurrentDriver = async (slug: string) => {
		await promise.value
		currentDriver.value = getDriverBySlug(slug) || new Driver()
	}

	const clearCurrentDriver = () => {
		currentDriver.value = {} as Driver
	}

	return {
		drivers,
		currentDriver,
		addDriver,
		updateDriver,
		removeDriver,
		setCurrentDriver,
		clearCurrentDriver,
		getDriverById,
		updateDriverScore,
		clearAllDriverScores
	}
})
