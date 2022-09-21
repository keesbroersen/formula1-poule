export interface Race {
  id?: string
  circuit: string
  country: string
  countryCode: string
  dates: {
    qualification: { nanoseconds: number, seconds: number}
    race: { nanoseconds: number, seconds: number}
  }
  isSprintRace: Boolean
  slug: string
  result?: Object
}
