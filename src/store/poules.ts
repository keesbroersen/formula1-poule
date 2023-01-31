import { defineStore } from "pinia"
import {
	collection,
	addDoc,
	deleteDoc,
	updateDoc,
	doc,
	query,
	where,
	arrayUnion
} from "firebase/firestore"
import {
	useFirestore,
	useCurrentUser,
	useCollection,
	_RefFirestore
} from "vuefire"
import { Poule } from "@/models/poule.model"
import router from "@/services/router"
import { computed, ref, Ref, ComputedRef } from "vue"

const db = useFirestore()
const db_col = collection(db, "poules")
type Filter = "upcoming" | "completed" | "all"

export const usePoules = defineStore("poules", () => {
	// Get poules
	const currentUser = useCurrentUser()
	const userUid = currentUser.value?.uid || ""
	const userDoc = doc(db, "users", userUid)
	const q = query(db_col, where("users", "array-contains", userDoc))
	const { data: poules } = useCollection<Poule>(q)

	// State
	const filter: Ref<Filter> = ref("upcoming")
	const currentPouleId = ref("")
	const currentPoule: ComputedRef<Poule> = computed(() => {
		if (!poules.value.length) return new Poule()
		if (!currentPouleId.value) return poules.value[0]
		return (
			poules.value.find((poule) => poule.id === currentPouleId.value) ||
			new Poule()
		)
	})

	// Actions
	const addPoule = async (name: string) => {
		const user = useCurrentUser()
		if (!user.value?.uid) {
			return console.warn("no user (id)")
		}

		const payload = {
			name,
			users: [],
			owner: user.value.uid,
			registration_code: Math.floor(Math.random() * 8999 + 1000)
		} as Poule

		payload.users[0] = doc(db, "users", user.value.uid)

		try {
			addDoc(db_col, payload)
		} catch (error) {
			throw error
		}
	}

	const addUserToPoule = (pouleId: string) => {
		const user = useCurrentUser()
		if (!user.value?.uid) {
			return console.warn("no user (id)")
		}

		return updateDoc(doc(db_col, pouleId), {
			users: arrayUnion(doc(db, "users", user.value.uid))
		})
			.then(() => {
				router.push({ path: "/" })
			})
			.catch((error) => {
				throw error
			})
	}

	const removePoule = () => {
		deleteDoc(doc(db_col, currentPoule.value.id))
			.then(() => router.push({ path: "/" }))
			.catch((error) => {
				throw error
			})
	}

	const setFilter = (value: Filter) => {
		filter.value = value
	}

	return {
		poules,
		currentPoule,
		currentPouleId,
		filter,
		addPoule,
		addUserToPoule,
		setFilter
	}
})
