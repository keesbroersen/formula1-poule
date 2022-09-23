import { defineStore } from "pinia";
import { getFirestore, collection, getDocs, addDoc, deleteDoc, updateDoc, doc } from "firebase/firestore";
import firebaseApp from "@/services/firebase";
import { Race } from "@/models/race.model"
import moment from "moment";

const db = getFirestore(firebaseApp);
const raceCollection = collection(db, "races");

export const useRaces = defineStore("races", {
  state: () => {
    return {
      races: [] as Race[],
      filter: "upcoming"
    }
  },
  getters: {
    upcomingRaces(state): Race[] {
      return state.races.filter(
        (race) => moment(race.dates.race.toDate()).isSameOrAfter(new Date(), 'day')
      );
    },
    completedRaces(state): Race[] {
      return state.races.filter(
        (race) => moment(race.dates.race.toDate()).isBefore(new Date(), 'day')
      );
    },
    filteredRaces(): Race[] {
      if (this.filter === "upcoming") {
        return this.upcomingRaces;
      } else if (this.filter === "completed") {
        return this.completedRaces;
      }
      return this.races;
    },
    getRaceBySlug: (state) => {
      return (slug: String) => state.races.find(race => race.slug === slug)
    }
  },
  actions: {
    async getRaces() {
      this.races = [];
      const docs = await getDocs(raceCollection);
      docs.forEach((doc) => {
        const data = doc.data();
        data.id = doc.id;
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
    async updateRace(race: Race){
      try {
        await updateDoc(doc(raceCollection, race.id), {...race}).then(result => console.log({result}));
      } catch (error) {
        alert(error);
      } 
    },
    async removeRace(race: Race){
      try {
        await deleteDoc(doc(raceCollection, race.id))
      } catch (error) {
        alert(error);
      } 
    },
    setFilter(filter: string) {
      this.filter = filter;
    },
  },
});
