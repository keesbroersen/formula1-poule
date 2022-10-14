<template>
  <div class="page--regular container">
    <h2 v-if="team?.name">{{ team.name }}</h2>
    <form @submit.prevent="submit" class="form">
      <InputField type="text">
        <input type="text" v-model="name" placeholder=" " />
        <span>Name</span>
      </InputField>
      <InputField type="text">
        <input type="text" v-model="country" placeholder=" " />
        <span>Country</span>
      </InputField>
      <InputField type="color">
        <input type="color" v-model="color" placeholder=" " />
        <span>Color</span>
      </InputField>

      <VueButton type="primary"
        >Team {{ team ? "aanpassen" : "toevoegen" }}</VueButton
      >
    </form>
    <StickyBlock>
      <VueButton @click="removeTeam" v-if="team">Verwijder team</VueButton>
    </StickyBlock>
  </div>
</template>

<script setup lang="ts">
import { useRoute } from "vue-router";
import { useTeams } from "@/store/teams";
import VueButton from "@/elements/VueButton.vue";
import { computed, ref } from "vue";
import StickyBlock from "@/elements/StickyBlock.vue";
import InputField from "@/elements/InputField.vue";

const route = useRoute();
const teamSlug = route.params.slug as String;
const store = useTeams();
const team = store.getTeamBySlug(teamSlug);

const name = ref(team?.name || "");
const country = ref(team?.country || "");
const color = ref(team?.country || "");

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
    ...team,
    name: name.value,
    country: country.value,
    color: color.value,
    slug: slug.value,
  };

  if (team) {
    return store.updateTeam(payload);
  }
  return store.addTeam(payload);
};

const removeTeam = () => {
  if (!team) return;
  store.removeTeam(team);
};
</script>
