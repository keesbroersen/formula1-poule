<template>
  <router-link
    class="driver-list-item container"
    :to="`drivers/${driver.slug}`"
  >
    <span
      class="color"
      :style="`background-color: ${driver.team?.color}`"
    ></span>
    {{ driver.name }}
    <small class="country">{{ driver.country }}</small> {{ driver.team?.name }}
  </router-link>
</template>

<script setup lang="ts">
import { defineProps, computed } from "vue";
import { Driver } from "@/models/driver.model";
import moment from "moment";
moment.locale("nl");

const props = defineProps<{
  driver: Driver;
}>();

const driver = computed(() => {
  return props.driver;
});
</script>

<style lang="scss" scoped>
.driver-list-item {
  display: flex;
  align-items: center;
  color: white;
  border-bottom: 1px solid var(--background-opacity);
  padding: 0 16px;
  height: 50px;
}

.color {
  margin: 0 16px 0 0;
  height: 100%;
  width: 4px;
}
.country {
  margin-left: auto;
  width: 50%;
  color: var(--general-opacity);
}
</style>
