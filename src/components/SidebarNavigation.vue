<template>
	<nav class="sidebar-navigation" :class="{ 'is-open': navigationOpen }">
		<div class="sidebar-navigation__header">
			<router-link to="/"><IconLogo class="logo" /></router-link>
			<button
				@click="navigationOpen = false"
				class="button button--close button--clean"
			>
				<IconTimes />
			</button>
		</div>
		<div v-if="user" class="sidebar-navigation__content list">
			<router-link class="list-item" to="/account">{{ user.name }}</router-link>
			<router-link class="list-item" to="/standings">Kampioenschap</router-link>
			<router-link class="list-item" to="/admin" v-if="user.role === 'admin'"
				>Admin</router-link
			>
			<a href="#" class="list-item" @click.prevent="usersStore.logoutUser">
				Logout
			</a>
		</div>
		<div v-else class="sidebar-navigation__content list">
			<router-link class="list-item" to="/register">Register</router-link>
			<router-link class="list-item" to="/login">Login</router-link>
		</div>
	</nav>
</template>

<script setup lang="ts">
import { storeToRefs } from "pinia"
import { useGeneral } from "@/store/general"
import { useUsers } from "@/store/users"
import IconLogo from "@/assets/IconLogo.vue"
import IconTimes from "@/assets/IconTimes.vue"
const generalStore = useGeneral()
const usersStore = useUsers()
const { navigationOpen } = storeToRefs(generalStore)
const { user } = storeToRefs(usersStore)
</script>

<style lang="scss" scoped>
.sidebar-navigation {
	position: fixed;
	z-index: 3;
	top: 0;
	left: 0;
	display: flex;
	flex-direction: column;
	height: 100vh;
	width: 100%;
	color: white;
	background: linear-gradient(
		180deg,
		rgba(2, 1, 1, 1) 0%,
		rgba(38, 38, 38, 1) 100%
	);
	transform: translate(100%);
	transition: var(--navigation-transition);

	&__header {
		display: flex;
		align-items: center;
		justify-content: space-between;
		padding: 0 16px;
		min-height: 60px;

		a {
			display: flex;
		}

		.button {
			margin-right: -12px;
		}
	}

	&__content {
		margin: 24px 0 0;
		height: 100%;
	}

	&.is-open {
		transform: translate(0%);
	}
}

.logo {
	height: 22px;
	width: auto;
}

.button--close {
	height: 42px;
	width: 42px;

	svg {
		margin: 0;
		width: 18px;
		height: 18px;
	}
}
</style>
