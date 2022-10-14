import { defineStore } from "pinia";
import { getFirestore, collection, getDocs, addDoc, deleteDoc, updateDoc, doc } from "firebase/firestore";
import firebaseApp from "@/services/firebase";
import { Team } from "@/models/team.model"

const db = getFirestore(firebaseApp);
const db_col = collection(db, "teams");

export const useTeams = defineStore("teams", {
  state: () => {
    return {
      teams: [] as Team[],
      filter: "upcoming"
    }
  },
  getters: {
    allTeams(): Team[] {
      return this.teams;
    },
    getTeamBySlug: (state) => {
      return (slug: String) => state.teams?.find(team => team.slug === slug)
    },
    getTeamById: (state) => {
      return (id: String) => state.teams?.find(team => team.id === id)
    }
  },
  actions: {
    async getTeams() {
      this.teams = [];
      const docs = await getDocs(db_col);
      docs.forEach((doc) => {
        const data = doc.data();
        data.id = doc.id;
        this.teams.push(data as Team);
      });
    },
    async addTeam(team: Team){
      try {
        await addDoc(db_col, team);
      } catch (error) {
        alert(error);
      } 
    },
    async updateTeam(team: Team){
      try {
        await updateDoc(doc(db_col, team.id), {...team}).then(result => console.log({result}));
      } catch (error) {
        alert(error);
      } 
    },
    async removeTeam(team: Team){
      try {
        await deleteDoc(doc(db_col, team.id))
      } catch (error) {
        alert(error);
      } 
    },
    setFilter(filter: string) {
      this.filter = filter;
    },
  },
});
