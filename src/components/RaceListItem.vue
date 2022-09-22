<template>
  <router-link class="race" :to="`races/${race.slug}`">
    {{ race.circuit }} - {{ race.country }} - {{ dateTimeFormatted }}
  </router-link>
</template>

<script setup lang="ts">
import { defineProps, ref, computed } from "vue";
import { Race } from "@/models/race.model";

const props = defineProps<{
  race: Race;
}>();

// const padTo2Digits = (num: Number) => {
//   return num.toString().padStart(2, "0");
// };

const race = ref(props.race);
const date = ref(race.value?.dates?.race.toDate());
const dateTimeFormatted = computed(() => {
  return date.value.toLocaleString("nl-NL", {
    month: "long",
    day: "numeric",
    hour: "numeric",
    minute: "numeric",
  });
});
</script>
