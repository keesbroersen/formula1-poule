<template>
  <div class="page--regular">
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
        <input type="checkbox" v-model="isSprintRace" />
        <span>Is spint race</span>
      </label>
      <VueButton>Add race</VueButton>
    </form>
  </div>
</template>

<script setup lang="ts">
import { useRaces } from "@/store/races";
import { reactive, ref, computed } from "vue";
import VueButton from "@/components/VueButton.vue";

const raceStore = useRaces();

const circuit = ref("");
const country = ref("");
const countryCode = ref("");
const dates = reactive({
  qualification: { nanoseconds: 0, seconds: 0 },
  race: { nanoseconds: 0, seconds: 0 },
});
const isSprintRace = ref(false);

const slug = computed(() => {
  return circuit.value
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, "")
    .replace(/[\s_-]+/g, "-")
    .replace(/^-+|-+$/g, "");
});

const submit = () => {
  raceStore.addRace({
    circuit: circuit.value,
    country: country.value,
    countryCode: countryCode.value,
    dates,
    isSprintRace: isSprintRace.value,
    slug: slug.value,
  });
};
</script>

<style scoped>
form {
  display: flex;
  flex-direction: column;
}
</style>
