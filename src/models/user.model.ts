export interface UserPoints {
	[key: string]: {
		qualification: number
		race: number | null
		total: number
	}
}

export class User {
	readonly id?: string
	name: string = ""
	slug: string = ""
	points: UserPoints = {}
	pointsTotal: number = 0
	previousPointsTotal: number = 0
	role: "admin" | "user" = "user"
	driverChampion: string = ""
	constructorsChampion: string = ""
}

export interface UserWithPoints extends User {
	lastPointsGained: number
	positionsGained: number
	pointsTotal: number
}
