<template>
  <div class="race-list">
    <VueButton @click="raceStore.setFilter('all')">All</VueButton>
    <VueButton @click="raceStore.setFilter('upcoming')">Upcoming</VueButton>
    <VueButton @click="raceStore.setFilter('previous')">Previous</VueButton>
    <router-link
      class="race"
      v-for="(race, index) in raceStore.filteredRaces"
      :key="index"
      :to="`/${path}/${race.slug}`"
    >
      {{ race.circuit }} - {{ race.country }}
    </router-link>
  </div>
</template>

<script setup lang="ts">
import { computed, defineProps } from "vue";
import { useRaces } from "@/store/races";
import VueButton from "./VueButton.vue";

const props = defineProps({
  adminPage: Boolean,
});

const path = computed(() => (props.adminPage ? "admin/races" : "races"));

const raceStore = useRaces();
raceStore.getRaces();
</script>
