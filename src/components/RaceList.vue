<template>
  <div class="race-list">
    <div class="race-list__filters">
      <VueButton @click="raceStore.setFilter('all')">All</VueButton>
      <VueButton @click="raceStore.setFilter('upcoming')">Upcoming</VueButton>
      <VueButton @click="raceStore.setFilter('previous')">Previous</VueButton>
    </div>
    <div class="race-list__content">
      <RaceListItem
        v-for="(race, index) in raceStore.filteredRaces"
        :key="index"
        :race="race"
        :is-highlighted="index === 0"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { useRaces } from "@/store/races";
import VueButton from "@/elements/VueButton.vue";
import RaceListItem from "./RaceListItem.vue";

const raceStore = useRaces();
raceStore.getRaces();
</script>

<style scoped>
.race-list__filters {
  display: flex;
  margin-top: 8px;
  gap: 8px;
}
.race-list__content {
  display: flex;
  flex-direction: column;
}
</style>
