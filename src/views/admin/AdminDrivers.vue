<template>
  <div class="page--regular page--admin">
    <DriverList />
    <StickyBlock>
      <router-link to="/admin/drivers/new" class="button button--primary"
        >Nieuwe coureur</router-link
      >
    </StickyBlock>
  </div>
</template>

<script setup lang="ts">
import DriverList from "@/components/DriverList.vue";
import StickyBlock from "@/elements/StickyBlock.vue";
</script>
