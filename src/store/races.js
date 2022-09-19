import { defineStore } from "pinia";
import { getFirestore, collection, getDocs } from "firebase/firestore";
import firebaseApp from "@/services/firebase";

export const useRaces = defineStore("races", {
  state: () => ({
    /** @type {{ text: string, id: number, isFinished: boolean }[]} */
    races: [],
    /** @type {'all' | 'upcoming' | 'previous'} */
    filter: "all",
  }),
  getters: {
    upcomingRaces(state) {
      const nowInSeconds = new Date().getTime() / 1000;
      return state.races.filter(
        (race) => race.dates.race.seconds > nowInSeconds
      );
    },
    previousRaces(state) {
      const nowInSeconds = new Date().getTime() / 1000;
      return state.races.filter(
        (race) => race.dates.race.seconds <= nowInSeconds
      );
    },
    filteredRaces() {
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
        this.races.push(doc.data());
      });
    },
    setFilter(filter) {
      this.filter = filter;
    },
  },
});
