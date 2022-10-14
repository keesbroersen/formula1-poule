<template>
  <div class="page--regular page--admin">
    <TeamList />
    <StickyBlock>
      <router-link to="/admin/teams/new" class="button button--primary"
        >Nieuw team</router-link
      >
    </StickyBlock>
  </div>
</template>

<script setup lang="ts">
import TeamList from "@/components/TeamList.vue";
import StickyBlock from "@/elements/StickyBlock.vue";
</script>
