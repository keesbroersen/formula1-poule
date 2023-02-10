<template>
	<router-link
		class="driver-list-item container"
		:to="`drivers/${driver.slug}`"
	>
		<span class="color" :style="`background-color: ${team?.color}`"></span>
		{{ driver.name }}
		<small style="margin-left: 12px">{{ getPoints(driver.points) }}</small>
		<small class="country">{{ driver.country }}</small> {{ team?.name }}
	</router-link>
</template>

<script setup lang="ts">
import { computed } from "vue"
import { Driver } from "@/models/driver.model"
import { useTeams } from "@/store/teams"
import { getPoints } from "@/composables/getters"
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
</style>
