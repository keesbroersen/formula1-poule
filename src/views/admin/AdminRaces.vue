<template>
  <div class="page--regular">
    <router-link to="/admin/races/new" class="button">New Race</router-link>
    <RaceList adminPage />
  </div>
</template>

<script setup lang="ts">
import RaceList from "@/components/RaceList.vue";
</script>
