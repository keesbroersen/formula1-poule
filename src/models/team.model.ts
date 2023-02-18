export class Team {
	readonly id?: string
	name: string = ""
	country: string = ""
	color: string = "#000000"
	slug: string = ""
	points: Array<number> = []
}

export interface TeamWithPoints extends Team {
	lastPointsGained: number
	positionsGained: number
	pointsTotal: number
}
