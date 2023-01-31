import { DocumentReference } from "firebase/firestore"
import { User } from "./user.model"

export class Poule {
	id?: string
	name: string = ""
	owner: string = ""
	registration_code: number = 0
	users: DocumentReference[] = []
}
