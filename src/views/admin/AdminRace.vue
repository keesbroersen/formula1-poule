<template>
  <div class="page--regular container" v-if="currentRace">
    <h2>{{ currentRace.circuit }}</h2>
    <form @submit.prevent="submit" class="form">
      <InputField type="text">
        <input type="text" v-model="currentRace.circuit" placeholder=" " />
        <span>Circuit</span>
      </InputField>
      <InputField type="text">
        <input type="text" v-model="currentRace.country" placeholder=" " />
        <span>Land</span>
      </InputField>
      <InputField type="text">
        <input type="text" v-model="currentRace.countryCode" placeholder=" " />
        <span>Landcode</span>
      </InputField>
      <InputField type="date">
        <input type="date" v-model="qualificationDate" placeholder=" " />
        <span>Qualificatie datum</span>
      </InputField>
      <InputField type="time">
        <input type="time" v-model="qualificationTime" placeholder=" " />
        <span>Qualificatie tijdstip</span>
      </InputField>
      <InputField type="date">
        <input type="date" v-model="raceDate" placeholder=" " />
        <span>Race datum</span>
      </InputField>
      <InputField type="time">
        <input type="time" v-model="raceTime" placeholder=" " />
        <span>Race tijdstip</span>
      </InputField>
      <InputField type="checkbox">
        <input
          type="checkbox"
          v-model="currentRace.isSprintRace"
          placeholder=" "
        />
        <span>Is sprintrace</span>
      </InputField>

      <ErrorMessage :error="error" />

      <VueButton :type="isSubmitting ? 'loading' : 'primary'"
        >Race {{ currentRace.id ? "aanpassen" : "toevoegen" }}</VueButton
      >
    </form>
    <StickyBlock>
      <VueButton
        @click="removeRace"
        v-if="currentRace"
        :type="isRemoving ? 'loading' : 'secondary'"
        >Race verwijderen</VueButton
      >
    </StickyBlock>
  </div>
</template>

<script setup lang="ts">
import { storeToRefs } from "pinia";
import { useRaces } from "@/store/races";
import VueButton from "@/elements/VueButton.vue";
import { computed, ref } from "vue";
import { Timestamp } from "@firebase/firestore";
import StickyBlock from "@/elements/StickyBlock.vue";
import InputField from "@/elements/InputField.vue";
import { RaceDates } from "@/models/race.model";
import ErrorMessage from "../../elements/ErrorMessage.vue";

const raceStore = useRaces();
const { currentRace } = storeToRefs(raceStore);
const isSubmitting = ref(false);
const isRemoving = ref(false);
const error = ref();

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

if (!currentRace.value.dates) currentRace.value.dates = {} as RaceDates;

const qualificationTime = computed({
  get: () =>
    formatTime(currentRace?.value.dates?.qualification?.toDate() as Date),
  set: (value) => {
    const date = new Date(`${qualificationDate.value}T${value}:00`);
    currentRace.value.dates.qualification = Timestamp.fromDate(date);
  },
});

const qualificationDate = computed({
  get: () =>
    formatDate(currentRace?.value.dates?.qualification?.toDate() as Date),
  set: (value) => {
    const date = new Date(`${value}T${qualificationTime.value}:00`);
    currentRace.value.dates.qualification = Timestamp.fromDate(date);
  },
});

const raceTime = computed({
  get: () => formatTime(currentRace?.value.dates?.race?.toDate() as Date),
  set: (value) => {
    const date = new Date(`${raceDate.value}T${value}:00`);
    currentRace.value.dates.race = Timestamp.fromDate(date);
  },
});

const raceDate = computed({
  get: () => formatDate(currentRace?.value.dates?.race?.toDate() as Date),
  set: (value) => {
    const date = new Date(`${value}T${raceTime.value}:00`);
    currentRace.value.dates.race = Timestamp.fromDate(date);
  },
});

const submit = async () => {
  isSubmitting.value = true;
  error.value = null;

  try {
    if (currentRace.value.id) {
      return await raceStore.updateRace();
    }
    return await raceStore.addRace();
  } catch (err) {
    isSubmitting.value = false;
    error.value = err;
  }
};

const removeRace = () => {
  if (!currentRace) return;
  isRemoving.value = true;
  error.value = null;

  try {
    raceStore.removeRace();
  } catch (err) {
    isRemoving.value = false;
    error.value = err;
  }
};
</script>
