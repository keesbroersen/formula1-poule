export class User {
	id?: string
	name: string = ""
	slug: string = ""
	score: number = 0
	previousScore: number = 0
	role: "admin" | "user" = "user"
	driverChampion: string = ""
	constructorsChampion: string = ""
}
