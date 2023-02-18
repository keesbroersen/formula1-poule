export class Driver {
	readonly id?: string
	name: string = ""
	country: string = ""
	slug: string = ""
	teamId: string = ""
	points: Array<number> = []
}

export interface DriverWithPoints extends Driver {
	lastPointsGained: number
	positionsGained: number
	pointsTotal: number
}
