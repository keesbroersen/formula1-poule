import { DocumentReference } from "firebase/firestore"

export class Poule {
	readonly id?: string
	name: string = ""
	owner: string = ""
	registration_code: number = 0
	users: DocumentReference[] = []
}
