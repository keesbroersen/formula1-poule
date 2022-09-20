<template>
  <div class="race-list">
    <button @click="raceStore.setFilter('all')">All</button>
    <button @click="raceStore.setFilter('upcoming')">Upcoming</button>
    <button @click="raceStore.setFilter('previous')">Previous</button>
    <div
      class="race"
      v-for="(race, index) in raceStore.filteredRaces"
      :key="index"
    >
      {{ race.circuit }} - {{ race.country }}
    </div>
  </div>
</template>

<script setup lang="ts">
import { useRaces } from "@/store/races";
const raceStore = useRaces();
raceStore.getRaces();
</script>
