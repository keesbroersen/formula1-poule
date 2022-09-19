<template>
  <div class="page--home">
    <RaceList />
  </div>
</template>

<script>
import RaceList from "@/components/RaceList.vue";
export default {
  name: "UserHome",
  props: {
    msg: String,
  },
  components: { RaceList },
};
</script>
