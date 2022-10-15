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
import { Team } from "@/models/team.model";
import router from "@/services/router";

const db = getFirestore(firebaseApp);
const db_col = collection(db, "teams");

export const useTeams = defineStore("teams", {
  state: () => {
    return {
      teams: [] as Team[],
      currentTeam: {} as Team,
      filter: "upcoming",
      teamsLoading: true,
    };
  },
  getters: {
    getAll(): Team[] {
      return this.teams;
    },
    getBySlug: (state) => {
      return (slug: String) => state.teams?.find((team) => team.slug === slug);
    },
    getById: (state) => {
      return (id: String) => state.teams?.find((team) => team.id === id);
    },
    getSlug: (state): string | null => {
      if (!state.currentTeam?.name) return null;
      return state.currentTeam.name
        .toLowerCase()
        .trim()
        .replace(/[^\w\s-]/g, "")
        .replace(/[\s_-]+/g, "-")
        .replace(/^-+|-+$/g, "");
    },
  },
  actions: {
    async getTeams() {
      this.teams = [];
      const docs = await getDocs(db_col);
      docs.forEach((doc) => {
        const data = doc.data();
        data.id = doc.id;
        if (this.teams.find((team) => team.id === doc.id)) return;
        this.teams.push(data as Team);
      });
      this.teamsLoading = false;
    },
    async add() {
      await addDoc(db_col, { ...this.currentTeam, slug: this.getSlug })
        .then(() => router.push({ path: "/admin/teams" }))
        .catch((error) => {
          throw error;
        });
    },
    async update() {
      return updateDoc(doc(db_col, this.currentTeam.id), {
        ...this.currentTeam,
        slug: this.getSlug,
      })
        .then(() => router.push({ path: "/admin/teams" }))
        .catch((error) => {
          throw error;
        });
    },
    async remove() {
      await deleteDoc(doc(db_col, this.currentTeam.id))
        .then(() => router.push({ path: "/admin/teams" }))
        .catch((error) => {
          throw error;
        });
    },
    async setCurrent(slug: string) {
      // Wait until races are loaded
      while (this.teamsLoading) {
        await new Promise((resolve) => requestAnimationFrame(resolve));
      }
      this.currentTeam = this.getBySlug(slug) as Team;
    },
    clearCurrent() {
      this.currentTeam = {} as Team;
    },
  },
});
