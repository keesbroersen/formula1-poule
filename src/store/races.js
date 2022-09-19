import { defineStore } from "pinia";

export const useRaces = defineStore("races", {
  state: () => ({
    /** @type {{ text: string, id: number, isFinished: boolean }[]} */
    races: [],
    /** @type {'all' | 'upcoming' | 'previous'} */
    filter: "all",
  }),
  getters: {
    upcomingRaces(state) {
      return state.races.filter((todo) => todo.isFinished);
    },
    previousRaces(state) {
      return state.races.filter((todo) => !todo.isFinished);
    },
    filteredRaces(state) {
      if (this.filter === "upcoming") {
        // call other getters with autocompletion ✨
        return this.upcomingRaces;
      } else if (this.filter === "previous") {
        return this.previousRaces;
      }
      return this.races;
    },
  },
  actions: {
    getRaces() {},
  },
});
