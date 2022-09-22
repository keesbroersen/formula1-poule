import { Timestamp } from "firebase/firestore"

export interface Race {
  id?: string
  circuit: string
  country: string
  countryCode: string
  dates: {
    qualification: Timestamp
    race: Timestamp
  }
  isSprintRace: Boolean
  slug: string
  result?: Object
}
