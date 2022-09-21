import { defineStore } from "pinia";
import { getFirestore, collection, getDocs, addDoc } from "firebase/firestore";
import firebaseApp from "@/services/firebase";
import { Race } from "@/models/race.model"

const db = getFirestore(firebaseApp);
const raceCollection = collection(db, "races");

export const useRaces = defineStore("races", {
  state: () => {
    return {
      races: [] as Race[],
      filter: "all"
    }
  },
  getters: {
    upcomingRaces(state): Race[] {
      const nowInSeconds = new Date().getTime() / 1000;
      return state.races.filter(
        (race) => race.dates.race.seconds > nowInSeconds
      );
    },
    previousRaces(state): Race[] {
      const nowInSeconds = new Date().getTime() / 1000;
      return state.races.filter(
        (race) => race.dates.race.seconds <= nowInSeconds
      );
    },
    filteredRaces(): Race[] {
      if (this.filter === "upcoming") {
        return this.upcomingRaces;
      } else if (this.filter === "previous") {
        return this.previousRaces;
      }
      return this.races;
    },
  },
  actions: {
    async getRaces() {
      this.races = [];
      const docs = await getDocs(raceCollection);
      docs.forEach((doc) => {
        const data = doc.data();
        this.races.push(data as Race);
      });
    },
    async addRace(race: Race){
      try {
        await addDoc(raceCollection, race);
      } catch (error) {
        alert(error);
      } 
    },
    setFilter(filter: string) {
      this.filter = filter;
    },
  },
});
