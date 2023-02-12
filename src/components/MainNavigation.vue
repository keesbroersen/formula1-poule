<template>
	<nav
		class="main-navigation container"
		:class="{ 'navigation-is-open': navigationOpen }"
	>
		<router-link to="/"><IconLogo class="logo" /></router-link>
		<button
			@click="navigationOpen = navigationOpen ? false : true"
			class="button button--hamburger button--clean"
		>
			<IconHamburger />
		</button>
	</nav>
</template>

<script setup lang="ts">
import IconLogo from "@/assets/IconLogo.vue"
import IconHamburger from "@/assets/IconHamburger.vue"
import { storeToRefs } from "pinia"
import { useGeneral } from "@/store/general"
const generalStore = useGeneral()
const { navigationOpen } = storeToRefs(generalStore)
</script>

<style lang="scss" scoped>
.main-navigation {
	position: absolute;
	z-index: 3;
	top: 0;
	left: 0;
	width: 100%;
	padding: 0 16px;
	min-height: 60px;
	display: flex;
	align-items: center;
	justify-content: space-between;
	color: white;
	transition: var(--navigation-transition);

	&.navigation-is-open {
		transform: translateX(-100%);
	}
}

.logo {
	height: 22px;
	width: auto;
}

.button--hamburger {
	margin-right: -12px;
	width: 42px;

	svg {
		margin: 0;
		height: 100%;
		width: 26px;
	}
}
</style>
