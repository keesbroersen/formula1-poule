<template>
  <MainNavigation />
  <Suspense>
    <router-view />
  </Suspense>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import MainNavigation from "./components/MainNavigation.vue";

export default defineComponent({
  name: "App",
  components: {
    MainNavigation,
  },
});
</script>

<style lang="scss">
@import url("https://fonts.googleapis.com/css2?family=Roboto:wght@400;700;900&display=swap");

* {
  margin: 0;
  padding: 0;
}

:root {
  --background-red: #cf4a4a;
  --background-black: hsl(0, 33%, 1%);
  --background-opacity: rgba(255, 255, 255, 0.15);
  --general-opacity: rgba(255, 255, 255, 0.4);
  --font: "Roboto", -apple-system, BlinkMacSystemFont, "Helvetica", sans-serif;
}

* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body {
  margin: 0;
  font-family: var(--font);
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: white;
  background: #000;
}

a {
  color: white;
  text-decoration: none;

  span {
    color: var(--general-opacity);
  }
}

[class*="page--"] {
  position: relative;
  padding-top: 60px; /* space for navigation */
  min-height: 100vh;
}

.page {
  &--regular {
    padding-top: 100px;
    background: linear-gradient(
      160deg,
      var(--background-red) 0,
      var(--background-black) 80vh
    );
  }

  &--with-fixed-button {
    padding-bottom: 74px;
  }

  &--race {
    padding: 0;
    background: linear-gradient(
      180deg,
      rgba(2, 1, 1, 0.6) 0%,
      rgba(2, 1, 1, 0) 60px,
      rgba(38, 38, 38, 0) 25vw,
      rgba(38, 38, 38, 1) 48vw,
      rgba(0, 0, 0, 1) 50vh
    );
  }

  &--result {
    padding: 100px 0 0;
  }
}

.container {
  margin-right: auto;
  margin-left: auto;
  padding-left: 12px;
  padding-right: 12px;
  width: 100%;
}

@media screen and (min-width: 768px) {
  .container {
    padding-left: 16px;
    padding-right: 16px;
  }
}

.form {
  display: flex;
  flex-direction: column;
  gap: 8px;
  width: 100%;
}

button {
  -webkit-appearance: none;
  border: none;
  box-shadow: none;
}

input[type="color"] {
  -webkit-appearance: none;
  border: none;
}

input[type="color"]::-webkit-color-swatch-wrapper {
  padding: 0;
}

input[type="color"]::-webkit-color-swatch {
  border: none;
}

.button {
  display: flex;
  align-items: center;
  justify-content: center;
  border: none;
  min-height: 50px;
  width: 100%;
  background: var(--background-opacity);
  color: #fff;
  line-height: 1;
  -webkit-appearance: none;
  -moz-appearance: none;
  border-radius: 5px;
  cursor: pointer;
  font-family: var(--font);
  font-size: 18px;

  &--primary,
  &--sticky &--form {
    background: #fff;
    color: #000;
  }

  &--sticky {
    position: fixed;
    left: 12px;
    bottom: 12px;
    width: calc(100vw - 24px);
  }

  &--form {
    margin: 12px;
    width: calc(100vw - 24px);
  }
}

.button svg {
  margin-right: 8px;
}

.button:hover {
  opacity: 0.9;
}

.button:active {
  transform: translateY(1px);
}

.form {
  display: flex;
  flex-direction: column;
  gap: 8px;
  width: 100%;
}
</style>
