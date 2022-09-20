<template>
  <div class="page--home">
    <RaceList />
  </div>
</template>

<script lang="ts">
import RaceList from "@/components/RaceList.vue";
export default {
  name: "UserHome",
  components: { RaceList },
};
</script>
