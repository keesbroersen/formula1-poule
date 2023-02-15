<template>
	<router-link
		v-if="props.user"
		class="poule-list-item container"
		:to="`poule/${props.user.slug}`"
	>
		<p>{{ index + 1 }}</p>
		<span class="position-indicator" />
		<p class="name">{{ props.user.name }}</p>
		<p
			class="positions-gained"
			:class="{
				'positions-gained--negative': props.user.positionsGained < 0,
				'positions-gained--positive': props.user.positionsGained > 0
			}"
		>
			{{ props.user.positionsGained }}
		</p>
		<p class="points-gained">
			{{
				`${props.user.lastPointsGained > 0 ? "+" : ""}  ${
					props.user.lastPointsGained
				}`
			}}
		</p>
		<p>{{ props.user.pointsTotal }}</p>
	</router-link>
</template>

<script setup lang="ts">
import { UserWithPoints } from "@/models/user.model"

const props = defineProps<{
	user: UserWithPoints
	index: number
}>()
</script>

<style lang="scss" scoped>
.poule-list-item {
	display: flex;
	align-items: center;
	color: white;
	border-bottom: 1px solid var(--background-opacity);
	padding: 0 16px;
	height: 50px;
}

.color {
	margin: 0 16px 0 0;
	height: 100%;
	width: 4px;
}
.country {
	margin-left: auto;
	width: 50%;
	color: var(--general-opacity);
}

.poule-list-item {
	display: grid;
	align-items: center;
	justify-items: start;
	grid-template-columns: 26px 18px 1fr 16px 30px 38px;
	height: 50px;
	border-bottom: 1px solid var(--background-opacity);
}

.poule-list-item:first-child {
	border-top: 1px solid var(--background-opacity);
}

.position-indicator {
	height: 36px;
	width: 4px;
	border-radius: 2px;
	background: var(--background-opacity);
}

.poule-list-item:first-child .position-indicator {
	background: rgb(179, 135, 40);
	background: linear-gradient(
		132deg,
		rgba(179, 135, 40, 1) 0%,
		rgba(252, 246, 186, 1) 27%,
		rgba(217, 190, 115, 1) 61%,
		rgba(175, 136, 43, 1) 68%,
		rgba(255, 253, 232, 1) 80%,
		rgba(191, 149, 63, 1) 100%
	);
}

.poule-list-item:nth-child(2) .position-indicator {
	background: rgb(179, 179, 179);
	background: linear-gradient(
		132deg,
		rgba(179, 179, 179, 1) 0%,
		rgba(252, 252, 252, 1) 27%,
		rgba(217, 217, 217, 1) 61%,
		rgba(175, 175, 175, 1) 68%,
		rgba(255, 255, 255, 1) 80%,
		rgba(191, 191, 191, 1) 100%
	);
}

.poule-list-item:nth-child(3) .position-indicator {
	background: rgb(158, 73, 35);
	background: linear-gradient(
		132deg,
		rgba(158, 73, 35, 1) 0%,
		rgba(252, 207, 186, 1) 27%,
		rgba(217, 147, 115, 1) 61%,
		rgba(175, 85, 43, 1) 68%,
		rgba(255, 239, 232, 1) 80%,
		rgba(191, 104, 63, 1) 100%
	);
}

.poule-list-item > *:nth-child(n + 3) {
	justify-self: end;
}

.name {
	width: 100%;
}

.points-gained {
	font-size: 12px;
	color: var(--general-opacity);
}

.positions-gained {
	font-size: 12px;
}

.positions-gained--positive,
.positions-gained--negative {
	position: relative;
}

.positions-gained--positive {
	color: #41c106;
}

.positions-gained--negative {
	color: #c10606;
}

.positions-gained--positive:before,
.positions-gained--negative:before {
	content: "";
	position: absolute;
	top: 6px;
	left: -11px;
	width: 0;
	height: 0;
	border-style: solid;
	border-width: 0 4px 4px 4px;
	border-color: transparent transparent #41c106 transparent;
}

.positions-gained--negative:before {
	border-color: transparent transparent #c10606 transparent;
	transform: rotate(180deg);
}
</style>
