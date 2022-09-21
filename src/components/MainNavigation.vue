<template>
  <nav class="main-navigation container">
    <span v-if="isLoggedIn">
      <router-link to="/">Home</router-link> |
      <router-link to="/account">Account</router-link> |
      <router-link to="/admin">Admin</router-link> |
      <button @click="logout">Logout</button>
    </span>
    <span v-else>
      <router-link to="/register">Register</router-link> |
      <router-link to="/login">Login</router-link>
    </span>
  </nav>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { getAuth, onAuthStateChanged, signOut } from "firebase/auth";
import { useRouter } from "vue-router";
const router = useRouter();
const isLoggedIn = ref(true);
const auth = getAuth();

onAuthStateChanged(auth, (user) => {
  if (user) {
    return (isLoggedIn.value = true);
  }
  return (isLoggedIn.value = false);
});

const logout = () => {
  signOut(auth);
  router.push("/login");
};
</script>

<style>
.main-navigation {
  position: fixed;
  z-index: 3;
  display: flex;
  align-items: center;
  top: 0;
  left: 0;
  width: 100%;
}
</style>
