export interface User {
	id?: string
	name: string
	slug: string
	score: number
	previousScore: number
	role: "admin" | "user"
	driverChampion: string
	constructorsChampion: string
}
