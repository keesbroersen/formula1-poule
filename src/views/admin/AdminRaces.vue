<template>
  <div class="page--regular">
    <RaceList />
    <StickyBlock>
      <router-link to="/admin/races/new" class="button button--primary"
        >New Race</router-link
      >
    </StickyBlock>
  </div>
</template>

<script setup lang="ts">
import RaceList from "@/components/RaceList.vue";
import StickyBlock from "@/elements/StickyBlock.vue";
</script>
