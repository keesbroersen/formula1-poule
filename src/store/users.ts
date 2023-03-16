import { defineStore } from "pinia"
import {
	setDoc,
	deleteDoc,
	doc,
	query,
	where,
	getDocs,
	updateDoc,
	collection
} from "firebase/firestore"
import {
	useCurrentUser,
	useDocument,
	updateCurrentUserProfile,
	useCollection
} from "vuefire"
import { User } from "@/models/user.model"
import router from "@/services/router"
import {
	createUserWithEmailAndPassword,
	signInWithEmailAndPassword,
	signOut,
	deleteUser
} from "firebase/auth"
import { convertToSlug } from "@/composables/getters"
import { computed, ref, Ref } from "vue"
import { Driver } from "@/models/driver.model"
import { Team } from "@/models/team.model"
import { auth, db } from "@/services/firebase"

const db_col = collection(db, "users")

export const useUsers = defineStore("users", () => {
	// State
	// Main user
	const currentUserId = computed(() => useCurrentUser().value?.uid || null)
	const userDoc = computed(() =>
		currentUserId.value ? doc(db_col, currentUserId.value) : null
	)
	const { data: user, promise: userLoading } = useDocument<User>(userDoc)

	// Poule user
	const pouleUserSlug: Ref<string> = ref("")
	const pouleUserQuery = computed(() => {
		if (pouleUserSlug.value) {
			return query(db_col, where("slug", "==", pouleUserSlug.value))
		}
		if (currentUserId.value) {
			return query(db_col, where("__name__", "==", currentUserId.value))
		}
		return null
	})
	const { data: pouleUser } = useCollection<User>(pouleUserQuery)
	const currentPouleUser = computed((): User => {
		if (!pouleUser.value[0]) return new User()
		return { ...pouleUser.value[0], id: pouleUser.value[0].id }
	})

	// Actions
	const registerUser = async (
		name: string,
		email: string,
		password: string
	) => {
		const userCredential = await createUserWithEmailAndPassword(
			auth,
			email,
			password
		)
		const uid = userCredential.user.uid

		// Set slug and check for duplicates
		let slug = convertToSlug(name)
		const q = query(db_col, where("userId", "==", slug))
		const slugDocs = await getDocs(q)
		if (slugDocs) {
			slug = `${slug}-${Math.floor(Math.random() * 8999 + 1000)}`
		}

		setDoc(doc(db, "users", uid), {
			name,
			slug,
			score: [],
			role: "user",
			driverChampion: "",
			constructorsChampion: ""
		})
	}

	const loginUser = async (email: string, password: string) => {
		try {
			await signInWithEmailAndPassword(auth, email, password)
			router.push({ name: "user_predictions" })
		} catch (error: any) {
			switch (error.code) {
				case "auth/invalid-email":
					throw "Invalid email"
				case "auth/user-not-found":
					throw "No account with that email was found"
				case "auth/wrong-password":
					throw "Incorrect password"
				default:
					throw "Email or password was incorrect"
			}
		}
	}

	const logoutUser = async () => {
		// Logout from Firebase
		await signOut(auth)

		router.push("/")
	}

	const updateUser = (name: string) => {
		try {
			updateDoc(doc(db_col, user.value?.id), { name })
			updateCurrentUserProfile({ displayName: name })
		} catch (error) {
			console.log(error)
			throw error
		}
	}

	const updateUserWithSeasonPrediction = async (
		driverId: Driver["id"],
		teamId: Team["id"]
	) => {
		try {
			await updateDoc(doc(db_col, user.value?.id), {
				driverChampion: driverId,
				constructorsChampion: teamId
			})
		} catch (error) {
			console.log(error)
			throw error
		}
	}

	const removeUser = async () => {
		if (!auth.currentUser) return console.warn("no user to delete")

		try {
			// Delete Firebase user
			deleteUser(auth.currentUser)

			// Delete user documents
			await deleteDoc(doc(db_col, user.value?.id))
			router.push({ path: "/" })
		} catch (error) {
			throw error
		}
	}

	const getUserById = async (userId: string) => {
		const { data: user, promise } = useDocument<User>(doc(db_col, userId))
		await promise.value
		return user
	}

	const updateUserScore = async (userId: string, score: Array<number>) => {
		return updateDoc(doc(db_col, userId), {
			score
		})
	}

	const clearAllUserScores = async () => {
		const users = await getDocs(db_col)
		users.forEach((userDoc) => {
			const userId = userDoc.id
			updateDoc(doc(db_col, userId), {
				score: []
			})
		})
	}

	return {
		user,
		userLoading,
		currentPouleUser,
		pouleUserSlug,
		loginUser,
		registerUser,
		logoutUser,
		updateUser,
		removeUser,
		updateUserScore,
		getUserById,
		updateUserWithSeasonPrediction,
		clearAllUserScores
	}
})
