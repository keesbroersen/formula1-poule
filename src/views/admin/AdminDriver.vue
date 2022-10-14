<template>
  <div class="page--regular container">
    <h2>{{ driver?.name }}</h2>
    <form @submit.prevent="submit" class="form">
      <InputField type="text">
        <input type="text" v-model="name" placeholder=" " />
        <span>Name</span>
      </InputField>
      <InputField type="text">
        <input type="text" v-model="country" placeholder=" " />
        <span>Country</span>
      </InputField>
      <!--<InputField type="text">
        <input type="text" v-model="teamId" placeholder=" " />
        <span>Team</span>
      </InputField>-->
      <SelectButton :options="selectOptions" @change="onChange" />

      <VueButton type="primary"
        >Coureur {{ driver ? "aanpassen" : "toevoegen" }}</VueButton
      >
    </form>
    <StickyBlock>
      <VueButton @click="removeDriver" v-if="driver"
        >Verwijder coureur</VueButton
      >
    </StickyBlock>
  </div>
</template>

<script setup lang="ts">
import { useRoute } from "vue-router";
import { useDrivers } from "@/store/drivers";
import VueButton from "@/elements/VueButton.vue";
import { computed, ref } from "vue";
import StickyBlock from "@/elements/StickyBlock.vue";
import InputField from "@/elements/InputField.vue";
import { useTeams } from "@/store/teams";
import SelectButton from "@/elements/SelectButton.vue";
import { Team } from "@/models/team.model";

const route = useRoute();
const driverSlug = route.params.slug as String;
const driverStore = useDrivers();
const teamsStore = useTeams();
const driver = driverStore.getDriverBySlug(driverSlug);
const teams = teamsStore.allTeams;

const selectOptions = teams.map((team: Team) => {
  return {
    value: team.id,
    label: team.name,
  };
});

const name = ref(driver?.name || "");
const country = ref(driver?.country || "");
const teamId = ref(driver?.teamId || selectOptions[0].value);

const slug = computed(() => {
  return name.value
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, "")
    .replace(/[\s_-]+/g, "-")
    .replace(/^-+|-+$/g, "");
});

const submit = () => {
  const payload = {
    ...driver,
    name: name.value,
    country: country.value,
    teamId: teamId.value,
    slug: slug.value,
  };

  console.log({ payload });

  if (driver) {
    return driverStore.updateDriver(payload);
  }
  return driverStore.addDriver(payload);
};

const removeDriver = () => {
  if (!driver) return;
  driverStore.removeDriver(driver);
};

const onChange = (value: string) => {
  teamId.value = value;
};
</script>
