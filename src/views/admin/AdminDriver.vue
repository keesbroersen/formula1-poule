<template>
  <div v-if="currentDriver" class="page--regular container">
    <h2>{{ currentDriver.name }}</h2>
    <form @submit.prevent="submit" class="form">
      <InputField type="text">
        <input type="text" v-model="currentDriver.name" placeholder=" " />
        <span>Name</span>
      </InputField>
      <InputField type="text">
        <input type="text" v-model="currentDriver.country" placeholder=" " />
        <span>Country</span>
      </InputField>
      <SelectButton
        :options="selectOptions"
        @change="onChange"
        :selected="currentDriver.teamId"
      />

      <ErrorMessage :error="error" />

      <VueButton :type="isSubmitting ? 'loading' : 'primary'"
        >Coureur {{ currentDriver.id ? "aanpassen" : "toevoegen" }}</VueButton
      >
    </form>
    <StickyBlock>
      <VueButton @click="removeDriver" v-if="currentDriver.id"
        >Verwijder coureur</VueButton
      >
    </StickyBlock>
  </div>
</template>

<script setup lang="ts">
import { useDrivers } from "@/store/drivers";
import VueButton from "@/elements/VueButton.vue";
import { ref, watch } from "vue";
import StickyBlock from "@/elements/StickyBlock.vue";
import InputField from "@/elements/InputField.vue";
import { useTeams } from "@/store/teams";
import SelectButton from "@/elements/SelectButton.vue";
import { Team } from "@/models/team.model";
import { storeToRefs } from "pinia";
import ErrorMessage from "@/elements/ErrorMessage.vue";

const driverStore = useDrivers();
const { currentDriver } = storeToRefs(driverStore);
const teamsStore = useTeams();
const isSubmitting = ref(false);
const isRemoving = ref(false);
const error = ref();
const { teams } = teamsStore;

const getSelectOptions = () => {
  return teams.map((team: Team) => {
    return {
      value: team.id,
      label: team.name,
    };
  });
};

const selectOptions = ref(getSelectOptions());

watch(
  () => teams.length,
  () => {
    selectOptions.value = getSelectOptions();
  }
);

const submit = async () => {
  isSubmitting.value = true;
  error.value = null;

  try {
    if (currentDriver.value.id) {
      return await driverStore.updateDriver();
    }
    return await driverStore.addDriver();
  } catch (err) {
    isSubmitting.value = false;
    error.value = err;
  }
};

const removeDriver = () => {
  if (!currentDriver) return;
  isRemoving.value = true;
  error.value = null;

  try {
    driverStore.removeDriver();
  } catch (err) {
    isRemoving.value = false;
    error.value = err;
  }
};

const onChange = (value: string) => {
  currentDriver.value.teamId = value;
};
</script>
