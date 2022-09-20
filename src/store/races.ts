import { defineStore } from "pinia";
import { getFirestore, collection, getDocs } from "firebase/firestore";
import firebaseApp from "@/services/firebase";
import { Race } from "@/models/race.model"

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
      const db = getFirestore(firebaseApp);
      const colRef = collection(db, "races");
      const docs = await getDocs(colRef);
      docs.forEach((doc) => {
        const data = doc.data();
        this.races.push(data as Race);
      });
    },
    setFilter(filter: string) {
      this.filter = filter;
    },
  },
});
