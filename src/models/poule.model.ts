import { User } from "./user.model"

export class Poule {
	readonly id?: string
	name: string = ""
	owner: string = ""
	registration_code: number = 0
	users: User[] = []
}
