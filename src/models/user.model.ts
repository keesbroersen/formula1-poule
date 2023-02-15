export class User {
	readonly id?: string
	name: string = ""
	slug: string = ""
	score: Array<number> = []
	role: "admin" | "user" = "user"
	driverChampion: string = ""
	constructorsChampion: string = ""
}

export interface UserWithPoints extends User {
	lastPointsGained: number
	positionsGained: number
	pointsTotal: number
}
