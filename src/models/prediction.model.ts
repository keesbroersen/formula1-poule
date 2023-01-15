export interface QualificationPrediction {
	pos1: string | undefined
	pos2: string | undefined
	pos3: string | undefined
}

export interface RacePrediction {
	pos1: string | undefined
	pos2: string | undefined
	pos3: string | undefined
	pos4: string | undefined
	pos5: string | undefined
	pos6: string | undefined
	pos7: string | undefined
	pos8: string | undefined
	pos9: string | undefined
	pos10: string | undefined
	driverOfTheDay: string | undefined
	fastestLap: string | undefined
}

export interface Prediction {
	id?: string
	raceId: string
	userId: string
	qualification: QualificationPrediction
	race: RacePrediction
}

export class PredictionClass implements Prediction {
	id: string
	raceId: string
	userId: string
	qualification: QualificationPrediction
	race: RacePrediction

	constructor(
		{ id, raceId, userId, qualification, race } = {
			id: "",
			raceId: "",
			userId: "",
			qualification: { pos1: "", pos2: "", pos3: "" },
			race: {
				pos1: "",
				pos2: "",
				pos3: "",
				pos4: "",
				pos5: "",
				pos6: "",
				pos7: "",
				pos8: "",
				pos9: "",
				pos10: "",
				driverOfTheDay: "",
				fastestLap: ""
			}
		}
	) {
		this.id = id
		this.userId = userId
		this.raceId = raceId
		this.qualification = qualification
		this.race = race
	}
}
