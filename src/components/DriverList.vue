<template>
  <div class="driver-list">
    <div class="driver-list__content">
      <DriverListItem
        v-for="driver in store.getAllDrivers"
        :key="driver.id"
        :driver="driver"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { useDrivers } from "@/store/drivers";
import DriverListItem from "./DriverListItem.vue";

const store = useDrivers();
store.getDrivers();
</script>

<style scoped lang="scss">
.driver-list {
  display: flex;
  flex-direction: column;
  border-top: 1px solid var(--background-opacity);
  padding-bottom: 32px;
  width: 100%;

  &__content {
    display: flex;
    flex-direction: column;
  }
}
</style>
