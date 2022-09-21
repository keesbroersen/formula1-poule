<template>
  <div class="race-list">
    <VueButton @click="raceStore.setFilter('all')">All</VueButton>
    <VueButton @click="raceStore.setFilter('upcoming')">Upcoming</VueButton>
    <VueButton @click="raceStore.setFilter('previous')">Previous</VueButton>
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
import VueButton from "./VueButton.vue";
const raceStore = useRaces();
raceStore.getRaces();
</script>
