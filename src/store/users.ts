import { defineStore } from "pinia"
import {
	collection,
	getDoc,
	setDoc,
	deleteDoc,
	doc,
	query,
	where,
	getDocs
} from "firebase/firestore"
import { useFirestore, useCurrentUser, useDocument } from "vuefire"
import { User } from "@/models/user.model"
import router from "@/services/router"
import {
	getAuth,
	createUserWithEmailAndPassword,
	signInWithEmailAndPassword
} from "firebase/auth"
import { convertToSlug } from "@/composables/getters"

const db = useFirestore()
const db_col = collection(db, "users")

export const useUsers = defineStore("users", {
	state: () => {
		return {
			users: [] as User[],
			filter: "upcoming",
			currentUser: {} as User,
			usersLoading: true
		}
	},
	actions: {
		async getUser(id?: string) {
			const user = useCurrentUser()
			const userId = user.value?.uid || id
			if (!userId) {
				return console.warn("no user (id)")
			}

			this.users = []
			const userDoc = await getDoc(doc(db, "users", userId))
			const userData = {
				...userDoc.data(),
				id: userDoc.id
			}
			this.users.push(userData as User)
			this.usersLoading = false
			this.setCurrentUser(userDoc.id)
		},
		async getUsers(users: Array<string>) {
			if (!users.length) {
				return console.warn("no user id's")
			}

			this.users = []
			const q = query(db_col, where("__name__", "in", users))
			const docs = await getDocs(q)
			docs.forEach((doc) => {
				const data = doc.data()
				const userData = {
					...data,
					id: doc.id
				}
				if (!this.users.find((user) => user.id === userData.id)) {
					this.users.push(userData as User)
				}
			})

			this.usersLoading = false
		},
		async registerUser(name: string, email: string, password: string) {
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
			console.log({ slugDocs, slug })

			await setDoc(doc(db, "users", uid), {
				name,
				slug,
				score: 0,
				previousScore: 0,
				role: "user",
				driverChampion: "",
				constructorsChampion: ""
			})
			this.getUser(uid)
		},
		async loginUser(email: string, password: string) {
			const auth = getAuth()
			try {
				const userCredential = await signInWithEmailAndPassword(
					auth,
					email,
					password
				)
				const uid = userCredential.user.uid
				this.getUser(uid)
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
		},
		async removeUser() {
			await deleteDoc(doc(db_col, this.currentUser.id))
				.then(() => router.push({ path: "/" }))
				.catch((error) => {
					throw error
				})
		},
		async setCurrentUser(id: string) {
			// Wait until users are loaded
			while (this.usersLoading) {
				await new Promise((resolve) => requestAnimationFrame(resolve))
			}
			this.currentUser = this.users.find((user) => user.id === id) as User
		}
	}
})
