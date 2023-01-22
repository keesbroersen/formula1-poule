import { defineStore } from "pinia"
import {
	collection,
	getDocs,
	addDoc,
	deleteDoc,
	updateDoc,
	doc,
	query,
	where,
	arrayUnion
} from "firebase/firestore"
import { useFirestore, useCurrentUser } from "vuefire"
import { Poule } from "@/models/poule.model"
import router from "@/services/router"

const db = useFirestore()
const db_col = collection(db, "poules")

export const usePoules = defineStore("poules", {
	state: () => {
		return {
			poules: [] as Poule[],
			filter: "upcoming",
			currentPoule: {} as Poule,
			poulesLoading: true
		}
	},
	actions: {
		async getPoules(currentId: string = "") {
			const user = useCurrentUser()
			if (!user.value?.uid) {
				return console.warn("no user (id)")
			}

			this.poules = []
			const q = query(db_col, where("users", "array-contains", user.value.uid))
			const docs = await getDocs(q)
			docs.forEach((doc) => {
				const data = doc.data()
				data.id = doc.id
				if (this.poules.find((poule) => poule.id === doc.id)) return
				this.poules.push(data as Poule)
			})

			const setId = currentId || this.poules[0].id
			if (setId) {
				this.setCurrentPoule(setId)
			}
			this.poulesLoading = false
		},
		async addPoule(name: string) {
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

			payload.users[0] = user.value.uid

			return await addDoc(db_col, payload)
				.then(({ id }) => {
					this.getPoules(id)
				})
				.catch((error) => {
					throw error
				})
		},
		async addUserToPoule(id: string) {
			const user = useCurrentUser()
			if (!user.value?.uid) {
				return console.warn("no user (id)")
			}

			return updateDoc(doc(db_col, id), {
				users: arrayUnion(user.value.uid)
			})
				.then(() => {
					this.getPoules(id)
					router.push({ path: "/" })
				})
				.catch((error) => {
					throw error
				})
		},
		async removePoule() {
			await deleteDoc(doc(db_col, this.currentPoule.id))
				.then(() => router.push({ path: "/" }))
				.catch((error) => {
					throw error
				})
		},
		setFilter(filter: string) {
			this.filter = filter
		},
		async setCurrentPoule(id: string) {
			// Wait until poules are loaded
			while (this.poulesLoading) {
				await new Promise((resolve) => requestAnimationFrame(resolve))
			}
			this.currentPoule = this.poules.find((poule) => poule.id === id) as Poule
		},
		clearCurrentPoule() {
			this.currentPoule = {} as Poule
		}
	}
})
