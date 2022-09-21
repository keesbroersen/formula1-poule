<template>
  <div class="page--regular">
    <h2>{{ race?.circuit }}</h2>
    <form @submit.prevent="submit">
      <label>
        <input type="text" v-model="circuit" />
        <span>Circuit</span>
      </label>
      <label>
        <input type="text" v-model="country" />
        <span>Country</span>
      </label>
      <label>
        <input type="text" v-model="countryCode" />
        <span>Country code</span>
      </label>
      <label>
        <input type="date" v-model="dates.qualification" />
        <span>Qualification</span>
      </label>
      <label>
        <input type="date" v-model="dates.race" />
        <span>Race</span>
      </label>
      <label>
        <input type="checkbox" :v-model="isSprintRace" />
        <span>Is spint race</span>
      </label>
      <VueButton>Edit race</VueButton>
    </form>
    <VueButton @click="removeRace">Delete race</VueButton>
  </div>
</template>

<script setup lang="ts">
import { useRoute } from "vue-router";
import { useRaces } from "@/store/races";
import VueButton from "@/components/VueButton.vue";
import { computed, ref, reactive } from "vue";

const route = useRoute();
const raceSlug = route.params.slug as String;
const raceStore = useRaces();
const race = raceStore.getRaceBySlug(raceSlug);

const circuit = ref(race?.circuit || "");
const country = ref(race?.country || "");
const countryCode = ref(race?.countryCode || "");
const dates = reactive({
  qualification: { nanoseconds: 0, seconds: 0 },
  race: { nanoseconds: 0, seconds: 0 },
});
const isSprintRace = ref(race?.isSprintRace || false);

const slug = computed(() => {
  return circuit.value
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, "")
    .replace(/[\s_-]+/g, "-")
    .replace(/^-+|-+$/g, "");
});

const submit = () => {
  raceStore.updateRace({
    ...race,
    circuit: circuit.value,
    country: country.value,
    countryCode: countryCode.value,
    dates,
    isSprintRace: isSprintRace.value,
    slug: slug.value,
  });
};

const removeRace = () => {
  if (!race) return;
  raceStore.removeRace(race);
};
</script>

<style scoped>
form {
  display: flex;
  flex-direction: column;
}
</style>
