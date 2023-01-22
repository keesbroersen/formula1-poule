export interface User {
	id?: string
	name: string
	score: number
	previousScore: number
	role: "admin" | "user"
	driverChampion: string
	constructorsChampion: string
}
