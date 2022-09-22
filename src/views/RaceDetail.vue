<template>
  <div class="page--regular">
    <h2>{{ race?.circuit }}</h2>
  </div>
</template>

<script setup lang="ts">
import { useRoute } from "vue-router";
import { useRaces } from "@/store/races";

const route = useRoute();
const raceSlug = route.params.slug as String;
const raceStore = useRaces();
const race = raceStore.getRaceBySlug(raceSlug);
</script>

<style scoped>
form {
  display: flex;
  flex-direction: column;
}
</style>
