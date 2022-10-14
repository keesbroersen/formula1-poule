//import { DocumentReference } from "firebase/firestore"
import { Team } from "./team.model"

export interface Driver {
  id?: string
  name: string
	country: string
  slug: string
  teamId: string
  team?: Team
}
