<template>
	<router-link
		class="driver-list-item container"
		:to="`drivers/${driver.slug}`"
	>
		<span class="color" :style="`background-color: ${team?.color}`"></span>
		<span class="driver">{{ driver.name }}</span>
		<small class="points">{{ driver.pointsTotal }} pt</small>
		<small class="country">{{ driver.country }}</small>
		<span class="team">{{ team?.name }}</span>
	</router-link>
</template>

<script setup lang="ts">
import { computed } from "vue"
import { Driver } from "@/models/driver.model"
import { useTeams } from "@/store/teams"
import moment from "moment"
moment.locale("nl")

const teamsStore = useTeams()

const props = defineProps<{
	driver: Driver
}>()

const driver = computed(() => {
	return props.driver
})

const team = computed(() => {
	return teamsStore.getTeamById(driver.value.teamId)
})
</script>

<style lang="scss" scoped>
.driver-list-item {
	display: flex;
	align-items: center;
	gap: 12px;
	color: white;
	border-bottom: 1px solid var(--background-opacity);
	padding: 0 16px;
	height: 50px;
}

.driver,
.points,
.country,
.team {
	flex: 1;
}

.driver {
	color: #fff;
}
.color {
	margin: 4px 0;
	height: calc(100% - 8px);
	width: 4px;
	border-radius: 2px;
}
.country {
	color: var(--general-opacity);
}
</style>
