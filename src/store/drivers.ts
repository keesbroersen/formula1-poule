import { defineStore } from "pinia";
import { getFirestore, collection, getDocs, addDoc, deleteDoc, updateDoc, doc } from "firebase/firestore";
import firebaseApp from "@/services/firebase";
import { Driver } from "@/models/driver.model"
import { useTeams } from "@/store/teams";

const db = getFirestore(firebaseApp);
const db_col = collection(db, "drivers");

export const useDrivers = defineStore("drivers", {
  state: () => {
    return {
      drivers: [] as Driver[],
      filter: "upcoming"
    }
  },
  getters: {
    allDrivers(): Driver[] {
      return this.drivers;
    },
    getDriverBySlug: (state) => {
      return (slug: String) => state.drivers.find(driver => driver.slug === slug)
    }
  },
  actions: {
    async getDrivers() {
      this.drivers = [];
      const docs = await getDocs(db_col);
      const teamsStore = useTeams();
      docs.forEach((doc) => {
        const data = doc.data();
        data.id = doc.id;
        data.team = teamsStore.getTeamById(data.teamId);
        this.drivers.push(data as Driver);
      });
    },
    async addDriver(driver: Driver){
      try {
        const payload = driver;
        delete payload.team; // Don't store team here
        await addDoc(db_col, driver);
      } catch (error) {
        alert(error);
      } 
    },
    async updateDriver(driver: Driver){
      try {
        const payload = driver;
        delete payload.team; // Don't store team here
        await updateDoc(doc(db_col, driver.id), {...driver}).then(result => console.log({result}));
      } catch (error) {
        alert(error);
      } 
    },
    async removeDriver(driver: Driver){
      try {
        await deleteDoc(doc(db_col, driver.id))
      } catch (error) {
        alert(error);
      } 
    },
    setFilter(filter: string) {
      this.filter = filter;
    },
  },
});
