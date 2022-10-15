import { defineStore } from "pinia";
import {
  getFirestore,
  collection,
  getDocs,
  addDoc,
  deleteDoc,
  updateDoc,
  doc,
} from "firebase/firestore";
import firebaseApp from "@/services/firebase";
import { Race } from "@/models/race.model";
import moment from "moment";
import router from "@/services/router";

const db = getFirestore(firebaseApp);
const db_col = collection(db, "races");

export const useRaces = defineStore("races", {
  state: () => {
    return {
      races: [] as Race[],
      filter: "upcoming",
      currentRace: {} as Race,
      racesLoading: true,
    };
  },
  getters: {
    upcomingRaces(state): Race[] {
      return state.races.filter((race) =>
        moment(race.dates.race.toDate()).isSameOrAfter(new Date(), "day")
      );
    },
    completedRaces(state): Race[] {
      return state.races.filter((race) =>
        moment(race.dates.race.toDate()).isBefore(new Date(), "day")
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
      return (slug: String) => state.races.find((race) => race.slug === slug);
    },
    getSlug: (state): string | null => {
      if (!state.currentRace?.circuit) return null;
      return state.currentRace.circuit
        .toLowerCase()
        .trim()
        .replace(/[^\w\s-]/g, "")
        .replace(/[\s_-]+/g, "-")
        .replace(/^-+|-+$/g, "");
    },
  },
  actions: {
    async getRaces() {
      this.races = [];
      const docs = await getDocs(db_col);
      docs.forEach((doc) => {
        const data = doc.data();
        data.id = doc.id;
        if (this.races.find((race) => race.id === doc.id)) return;
        this.races.push(data as Race);
      });
      this.racesLoading = false;
    },
    async addRace() {
      await addDoc(db_col, { ...this.currentRace, slug: this.getSlug })
        .then(() => router.push({ path: "/admin/races" }))
        .catch((error) => {
          throw error;
        });
    },
    async updateRace() {
      return updateDoc(doc(db_col, this.currentRace.id), {
        ...this.currentRace,
        slug: this.getSlug,
      })
        .then(() => router.push({ path: "/admin/races" }))
        .catch((error) => {
          throw error;
        });
    },
    async removeRace() {
      await deleteDoc(doc(db_col, this.currentRace.id))
        .then(() => router.push({ path: "/admin/races" }))
        .catch((error) => {
          throw error;
        });
    },
    setFilter(filter: string) {
      this.filter = filter;
    },
    async setCurrentRace(slug: string) {
      // Wait until races are loaded
      while (this.racesLoading) {
        await new Promise((resolve) => requestAnimationFrame(resolve));
      }
      this.currentRace = this.getRaceBySlug(slug) as Race;
    },
    clearCurrentRace() {
      this.currentRace = {} as Race;
    },
  },
});
