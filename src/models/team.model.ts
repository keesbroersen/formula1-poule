interface Points {
	[key: string]: number
}

export class Team {
	readonly id?: string
	name: string = ""
	country: string = ""
	color: string = "#000000"
	slug: string = ""
	points: Points = {}
	pointsTotal: number = 0
	previousPointsTotal: number = 0
}

export interface TeamWithPoints extends Team {
	lastPointsGained: number
	positionsGained: number
	pointsTotal: number
}
