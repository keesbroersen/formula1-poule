<template>
  <div class="page--regular container" v-if="currentTeam">
    <h2>{{ currentTeam.name }}</h2>
    <form @submit.prevent="submit" class="form">
      <InputField type="text">
        <input type="text" v-model="currentTeam.name" placeholder=" " />
        <span>Name</span>
      </InputField>
      <InputField type="text">
        <input type="text" v-model="currentTeam.country" placeholder=" " />
        <span>Country</span>
      </InputField>
      <InputField type="color">
        <input type="color" v-model="currentTeam.color" placeholder=" " />
        <span>Color</span>
      </InputField>

      <VueButton type="primary"
        >Team {{ currentTeam.id ? "aanpassen" : "toevoegen" }}</VueButton
      >
    </form>
    <StickyBlock>
      <VueButton @click="removeTeam" v-if="currentTeam.id"
        >Verwijder team</VueButton
      >
    </StickyBlock>
  </div>
</template>

<script setup lang="ts">
import { useTeams } from "@/store/teams";
import VueButton from "@/elements/VueButton.vue";
import StickyBlock from "@/elements/StickyBlock.vue";
import InputField from "@/elements/InputField.vue";
import { storeToRefs } from "pinia";

const store = useTeams();
const { currentTeam } = storeToRefs(store);

const submit = () => {
  if (currentTeam.value.id) {
    return store.updateTeam();
  }
  return store.addTeam();
};

const removeTeam = () => {
  if (!currentTeam.value.id) return;
  store.removeTeam();
};
</script>
