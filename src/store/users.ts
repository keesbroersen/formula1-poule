import { defineStore } from "pinia"
import {
	collection,
	setDoc,
	deleteDoc,
	doc,
	query,
	where,
	getDocs,
	updateDoc
} from "firebase/firestore"
import {
	useFirestore,
	useCurrentUser,
	useDocument,
	useCollection,
	updateCurrentUserProfile
} from "vuefire"
import { User } from "@/models/user.model"
import router from "@/services/router"
import {
	getAuth,
	createUserWithEmailAndPassword,
	signInWithEmailAndPassword,
	signOut,
	deleteUser
} from "firebase/auth"
import { convertToSlug } from "@/composables/getters"
import { computed, ref, Ref } from "vue"

const db = useFirestore()
const db_col = collection(db, "users")

export const useUsers = defineStore("users", () => {
	// State
	// Main user
	const userDoc = computed(() =>
		useCurrentUser().value?.uid
			? doc(db_col, useCurrentUser().value?.uid)
			: null
	)
	const { data: user } = useDocument<User>(userDoc)

	// Poule user
	const pouleUserSlug: Ref<string> = ref("")
	const pouleUserQuery = computed(() =>
		pouleUserSlug.value
			? query(db_col, where("slug", "==", pouleUserSlug.value))
			: null
	)
	const { data: pouleUser } = useCollection<User>(pouleUserQuery)

	// Actions
	const registerUser = async (
		name: string,
		email: string,
		password: string
	) => {
		const auth = getAuth()
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
			score: 0,
			previousScore: 0,
			role: "user",
			driverChampion: "",
			constructorsChampion: ""
		})
	}

	const loginUser = (email: string, password: string) => {
		const auth = getAuth()
		try {
			signInWithEmailAndPassword(auth, email, password)
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

	const logoutUser = () => {
		// Logout from Firebase
		const auth = getAuth()
		signOut(auth)

		router.push("/login")
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

	const removeUser = async () => {
		const auth = getAuth()
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

	return {
		user,
		pouleUser,
		pouleUserSlug,
		loginUser,
		registerUser,
		logoutUser,
		updateUser,
		removeUser,
		updateUserScore,
		getUserById
	}
})
