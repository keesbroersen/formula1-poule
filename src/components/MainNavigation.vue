<template>
	<nav class="main-navigation container">
		<span v-if="user">
			<router-link to="/">Home</router-link> |
			<router-link to="/account">{{ currentUser.name }}</router-link>
			|
			<router-link to="/admin" v-if="currentUser.role === 'admin'"
				>Admin</router-link
			>
			|
			<button @click="logout">Logout</button>
		</span>
		<span v-else>
			<router-link to="/register">Register</router-link> |
			<router-link to="/login">Login</router-link>
		</span>
	</nav>
</template>

<script setup lang="ts">
import { getAuth, signOut } from "firebase/auth"
import { useRouter } from "vue-router"
import { storeToRefs } from "pinia"
import { useCurrentUser } from "vuefire"
import { useUsers } from "@/store/users"
const userStore = useUsers()
const { currentUser } = storeToRefs(userStore)

const router = useRouter()
const auth = getAuth()
const user = useCurrentUser()

const logout = () => {
	signOut(auth)
	router.push("/login")
}
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
