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
import { Driver } from "@/models/driver.model";
import router from "@/services/router";

const db = getFirestore(firebaseApp);
const db_col = collection(db, "drivers");

export const useDrivers = defineStore("drivers", {
  state: () => {
    return {
      drivers: [] as Driver[],
      currentDriver: {} as Driver,
      driversLoading: true,
    };
  },
  getters: {
    getAllDrivers(): Driver[] {
      return this.drivers;
    },
    getDriverBySlug: (state) => {
      return (slug: String) =>
        state.drivers.find((driver) => driver.slug === slug);
    },
    getSlug: (state): string | null => {
      if (!state.currentDriver?.name) return null;
      return state.currentDriver.name
        .toLowerCase()
        .trim()
        .replace(/[^\w\s-]/g, "")
        .replace(/[\s_-]+/g, "-")
        .replace(/^-+|-+$/g, "");
    },
  },
  actions: {
    async getDrivers() {
      this.drivers = [];
      const docs = await getDocs(db_col);
      docs.forEach((doc) => {
        const data = doc.data();
        data.id = doc.id;
        if (this.drivers.find((driver) => driver.id === doc.id)) return;
        this.drivers.push(data as Driver);
      });
      this.driversLoading = false;
    },
    async addDriver() {
      await addDoc(db_col, { ...this.currentDriver, slug: this.getSlug })
        .then(() => router.push({ path: "/admin/drivers" }))
        .catch((error) => {
          throw error;
        });
    },
    async updateDriver() {
      return updateDoc(doc(db_col, this.currentDriver.id), {
        ...this.currentDriver,
        slug: this.getSlug,
      })
        .then(() => router.push({ path: "/admin/drivers" }))
        .catch((error) => {
          throw error;
        });
    },
    async removeDriver() {
      await deleteDoc(doc(db_col, this.currentDriver.id))
        .then(() => router.push({ path: "/admin/drivers" }))
        .catch((error) => {
          throw error;
        });
    },
    async setCurrentDriver(slug: string) {
      // Wait until drivers are loaded
      while (this.driversLoading) {
        await new Promise((resolve) => requestAnimationFrame(resolve));
      }
      this.currentDriver = this.getDriverBySlug(slug) as Driver;
    },
    clearCurrentDriver() {
      this.currentDriver = {} as Driver;
    },
  },
});
