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
        <input type="date" v-model="qualificationDateTime.date" />
        <input type="time" v-model="qualificationDateTime.time" />
        <span>Qualification</span>
      </label>
      <label>
        <input type="date" v-model="raceDateTime.date" />
        <input type="time" v-model="raceDateTime.time" />
        <span>Race</span>
      </label>
      <label>
        <input type="checkbox" :v-model="isSprintRace" />
        <span>Is spint race</span>
      </label>
      <VueButton>{{ race ? "Edit" : "Add" }} race</VueButton>
    </form>
    <VueButton @click="removeRace" v-if="race">Delete race</VueButton>
  </div>
</template>

<script setup lang="ts">
import { useRoute } from "vue-router";
import { useRaces } from "@/store/races";
import VueButton from "@/elements/VueButton.vue";
import { computed, ref, reactive } from "vue";
import { Timestamp } from "@firebase/firestore";

const route = useRoute();
const raceSlug = route.params.slug as String;
const raceStore = useRaces();
const race = raceStore.getRaceBySlug(raceSlug);

const circuit = ref(race?.circuit || "");
const country = ref(race?.country || "");
const countryCode = ref(race?.countryCode || "");
const qualificationDate = ref(race?.dates?.qualification.toDate());
const raceDate = ref(race?.dates?.race.toDate());
const isSprintRace = ref(race?.isSprintRace || false);

const padTo2Digits = (num: Number) => {
  return num.toString().padStart(2, "0");
};

const formatDate = (date = new Date()) => {
  return [
    date.getFullYear(),
    padTo2Digits(date.getMonth() + 1),
    padTo2Digits(date.getDate()),
  ].join("-");
};

const formatTime = (date = new Date()) => {
  return [padTo2Digits(date.getHours()), padTo2Digits(date.getMinutes())].join(
    ":"
  );
};

const qualificationDateTime = reactive({
  date: formatDate(qualificationDate.value as Date),
  time: formatTime(qualificationDate.value as Date),
});

const raceDateTime = reactive({
  date: formatDate(raceDate.value as Date),
  time: formatTime(raceDate.value as Date),
});

const qualificationTime = computed(() => {
  const date = new Date(
    `${qualificationDateTime.date}T${qualificationDateTime.time}:00`
  );
  return Timestamp.fromDate(date);
});

const raceTime = computed(() => {
  const date = new Date(`${raceDateTime.date}T${raceDateTime.time}:00`);
  return Timestamp.fromDate(date);
});

const slug = computed(() => {
  return circuit.value
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, "")
    .replace(/[\s_-]+/g, "-")
    .replace(/^-+|-+$/g, "");
});

const submit = () => {
  const payload = {
    ...race,
    circuit: circuit.value,
    country: country.value,
    countryCode: countryCode.value,
    dates: {
      qualification: qualificationTime.value,
      race: raceTime.value,
    },
    isSprintRace: isSprintRace.value,
    slug: slug.value,
  };
  console.log({ payload });
  if (race) {
    return raceStore.updateRace(payload);
  }
  return raceStore.addRace(payload);
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
