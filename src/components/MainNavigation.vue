<template>
  <nav>
    <router-link to="/">Home</router-link> |
    <router-link to="/account">Account</router-link> |
    <span v-if="isLoggedIn">
      <button @click="logout">Logout</button>
    </span>
    <span v-else>
      <router-link to="/register">Register</router-link> |
      <router-link to="/login">Login</router-link>
    </span>
  </nav>
</template>

<script setup>
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
