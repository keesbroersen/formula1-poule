export interface Race {
  id: string;
  circuit: string;
  country: string;
  countryCode: number;
  dates: {
    qualification: { nanoseconds: number, seconds: number}
    race: { nanoseconds: number, seconds: number}
  }
  isSprintRace: Boolean;
  result: Object
}
