import { Timestamp } from "firebase/firestore";

export interface RaceDates {
  qualification: Timestamp;
  race: Timestamp;
}

export interface Race {
  id?: string;
  circuit: string;
  country: string;
  countryCode: string;
  dates: RaceDates;
  isSprintRace: boolean;
  slug: string;
  result?: Object;
}
