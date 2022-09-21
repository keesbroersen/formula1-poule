<template>
  <div class="page--regular page--admin container">
    <router-link to="/admin/races" class="button">Races</router-link>
    <router-link to="/admin/results" class="button">Results</router-link>
    <router-link to="/admin/drivers" class="button">Drivers</router-link>
    <router-link to="/admin/teams" class="button">Teams</router-link>
    <router-link to="/admin/champion" class="button">Champion</router-link>
  </div>
</template>

<script setup lang="ts"></script>

<style>
.page--admin {
  display: flex;
  flex-direction: column;
}
</style>
