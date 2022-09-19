<template>
  <MainNavigation />
  <Suspense>
    <router-view />
  </Suspense>
</template>

<script>
import MainNavigation from "./components/MainNavigation.vue";
export default {
  name: "App",
  components: { MainNavigation },
};
</script>

<style>
* {
  margin: 0;
  padding: 0;
}

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

[class^="page--"] {
  padding: 20px;
  min-height: 100vh;
}
</style>
