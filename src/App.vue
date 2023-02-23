<template>
	<div
		class="content"
		:class="{ 'navigation-is-open': generalStore.navigationOpen }"
	>
		<MainNavigation />
		<Suspense>
			<router-view />
		</Suspense>
	</div>
	<SidebarNavigation />
</template>

<script setup lang="ts">
import MainNavigation from "./components/MainNavigation.vue"
import SidebarNavigation from "./components/SidebarNavigation.vue"
import { useGeneral } from "@/store/general"
const generalStore = useGeneral()
</script>

<style lang="scss">
@import url("https://fonts.googleapis.com/css2?family=Roboto:wght@400;700;900&display=swap");

:root {
	--background-red: #cf4a4a;
	--background-black: hsl(0, 33%, 1%);
	--background-opacity: rgba(255, 255, 255, 0.15);
	--general-opacity: rgba(255, 255, 255, 0.4);
	--font: "Roboto", -apple-system, BlinkMacSystemFont, "Helvetica", sans-serif;
	--red-gradient: linear-gradient(
		160deg,
		var(--background-red) 0,
		var(--background-black) 80vh
	);
	--black-gradient: linear-gradient(
		180deg,
		rgba(2, 1, 1, 0.6) 0%,
		rgba(2, 1, 1, 0) 60px,
		rgba(38, 38, 38, 0) 25vw,
		rgba(38, 38, 38, 1) 48vw,
		rgba(0, 0, 0, 1) 50vh
	);
	--navigation-transition: all 0.2s ease-out;
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

.content {
	transition: var(--navigation-transition);

	&.navigation-is-open {
		transform: translateX(-100%);
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
		background: var(--red-gradient);
	}

	&--race {
		display: flex;
		flex-direction: column;
		padding: 0;
		// background: var(--black-gradient);
	}

	&--result {
		padding: 100px 0 0;
	}

	&--with-fixed-button {
		padding-bottom: 74px;
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
	appearance: none;
	border: none;
	box-shadow: none;
}

input[type="color"] {
	-webkit-appearance: none;
	appearance: none;
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
	appearance: none;
	border-radius: 5px;
	cursor: pointer;
	font-family: var(--font);
	font-size: 18px;

	&:hover {
		opacity: 0.9;
	}

	&:active {
		transform: translateY(1px);
	}

	&:disabled {
		cursor: initial;
		opacity: 1;
		transform: none;
		color: rgba(255, 255, 255, 0.5);
	}

	&--primary,
	&--sticky &--form {
		background: #fff;
		color: #000;

		&:disabled {
			color: rgba(0, 0, 0, 0.3);
		}
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

	&--clean {
		padding: 0;
		background: none;
	}

	svg {
		margin-right: 8px;
	}
}

.form {
	display: flex;
	flex-direction: column;
	gap: 8px;
	width: 100%;
}

.list {
	display: flex;
	flex-direction: column;
	border-top: 1px solid var(--background-opacity);
}

.list-item {
	display: flex;
	align-items: center;
	border-bottom: 1px solid var(--background-opacity);
	padding: 0 16px;
	height: 50px;
}
</style>
