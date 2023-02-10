export class User {
	readonly id?: string
	name: string = ""
	slug: string = ""
	score: Array<number> = []
	previousScore: number = 0
	role: "admin" | "user" = "user"
	driverChampion: string = ""
	constructorsChampion: string = ""
}
