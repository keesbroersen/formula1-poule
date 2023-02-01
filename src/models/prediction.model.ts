export class QualificationPrediction {
	pos1: string | undefined = undefined
	pos2: string | undefined = undefined
	pos3: string | undefined = undefined
}

export class RacePrediction {
	pos1: string | undefined = undefined
	pos2: string | undefined = undefined
	pos3: string | undefined = undefined
	pos4: string | undefined = undefined
	pos5: string | undefined = undefined
	pos6: string | undefined = undefined
	pos7: string | undefined = undefined
	pos8: string | undefined = undefined
	pos9: string | undefined = undefined
	pos10: string | undefined = undefined
	driverOfTheDay: string | undefined = undefined
	fastestLap: string | undefined = undefined
}

export class Prediction {
	id?: string
	raceId: string | undefined = ""
	userId: string | undefined = ""
	qualification: QualificationPrediction = {
		pos1: "",
		pos2: "",
		pos3: ""
	}
	race: RacePrediction = {
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

// export class PredictionClass implements Prediction {
// 	id: string
// 	raceId: string
// 	userId: string
// 	qualification: QualificationPrediction
// 	race: RacePrediction

// 	constructor(
// 		{ id, raceId, userId, qualification, race } = {
// 			id: "",
// 			raceId: "",
// 			userId: "",
// 			qualification: { pos1: "", pos2: "", pos3: "" },
// 			race: {
// 				pos1: "",
// 				pos2: "",
// 				pos3: "",
// 				pos4: "",
// 				pos5: "",
// 				pos6: "",
// 				pos7: "",
// 				pos8: "",
// 				pos9: "",
// 				pos10: "",
// 				driverOfTheDay: "",
// 				fastestLap: ""
// 			}
// 		}
// 	) {
// 		this.id = id
// 		this.userId = userId
// 		this.raceId = raceId
// 		this.qualification = qualification
// 		this.race = race
// 	}
// }
