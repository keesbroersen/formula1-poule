export class QualificationResult {
	pos1: string | undefined = undefined
	pos2: string | undefined = undefined
	pos3: string | undefined = undefined
}

export class RaceResult {
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
	pos11: string | undefined = undefined
	driverOfTheDay: string | undefined = undefined
	fastestLap: string | undefined = undefined
}

export class Result {
	id?: string
	raceId: string | undefined = ""
	qualification: QualificationResult = {
		pos1: "",
		pos2: "",
		pos3: ""
	}
	race: RaceResult = {
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
		pos11: "",
		driverOfTheDay: "",
		fastestLap: ""
	}
}
