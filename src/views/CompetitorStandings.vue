<template>
	<div class="page--regular">
		<h2>Coureurs</h2>
		<!--<div class="page-navigation">
			<router-link :to="`/standings/coureurs`">Coureurs</router-link>
			<router-link :to="`/standings/teams`">Teams</router-link>
		</div>-->
		<div v-for="driver in driversSortedByPoints" :key="driver.id">
			{{ driver.name }} - {{ getPoints(driver.points) }}
		</div>

		<h2 style="margin-top: 40px">Teams</h2>
		<div v-for="team in teamsSortedByPoints" :key="team.id">
			{{ team.name }} - {{ getPoints(team.points) }}
		</div>
	</div>
</template>

<script setup lang="ts">
import { useDrivers } from "@/store/drivers"
import { useTeams } from "@/store/teams"
import { computed } from "vue"
import { getPoints } from "@/composables/getters"

const driversStore = useDrivers()
const driversSortedByPoints = computed(() => {
	const list = driversStore.drivers
	return list.sort((a, b) => getPoints(b.points) - getPoints(a.points))
})

const teamsStore = useTeams()
const teamsSortedByPoints = computed(() => {
	const list = teamsStore.teams
	return list.sort((a, b) => getPoints(b.points) - getPoints(a.points))
})
</script>
