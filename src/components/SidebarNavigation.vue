<template>
	<nav class="sidebar-navigation" :class="{ 'is-open': navigationOpen }">
		<div v-if="user" class="sidebar-navigation__header">
			<router-link to="/"><IconLogo class="logo" /></router-link>
			<button
				@click="navigationOpen = false"
				class="button button--close button--clean"
			>
				<IconTimes />
			</button>
		</div>
		<div v-if="user" class="sidebar-navigation__content">
			<router-link to="/account">{{ user.name }}</router-link>
			<router-link to="/standings">Kampioenschap</router-link>
			<router-link to="/admin" v-if="user.role === 'admin'">Admin</router-link>
			<a href="#" @click.prevent="usersStore.logoutUser"> Logout </a>
		</div>
		<div v-else class="sidebar-navigation__content">
			<router-link to="/register">Register</router-link> |
			<router-link to="/login">Login</router-link>
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
		display: flex;
		flex-direction: column;
		margin: 24px 0 0;
		border-top: 1px solid var(--background-opacity);
		height: 100%;

		a {
			display: flex;
			align-items: center;
			border-bottom: 1px solid var(--background-opacity);
			padding: 0 16px;
			height: 50px;
		}
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
