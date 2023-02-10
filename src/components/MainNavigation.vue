<template>
	<nav class="main-navigation container">
		<span v-if="user">
			<router-link to="/">Home</router-link> |
			<router-link to="/account">{{ user.name }}</router-link>
			|
			<router-link to="/standings">Tussenstand</router-link>
			|
			<router-link to="/admin" v-if="user.role === 'admin'">Admin</router-link>
			|
			<button @click="userStore.logoutUser">Logout</button>
		</span>
		<span v-else>
			<router-link to="/register">Register</router-link> |
			<router-link to="/login">Login</router-link>
		</span>
	</nav>
</template>

<script setup lang="ts">
import { storeToRefs } from "pinia"
import { useUsers } from "@/store/users"
const userStore = useUsers()
const { user } = storeToRefs(userStore)
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
