<template>
	<div class="list">
		<div v-for="team in teamsSortedByPoints" :key="team.id" class="list-item">
			{{ team.name }} - {{ getPoints(team.points) }}
		</div>
	</div>
</template>

<script setup lang="ts">
import { useTeams } from "@/store/teams"
import { computed } from "vue"
import { getPoints } from "@/composables/getters"

const teamsStore = useTeams()
const teamsSortedByPoints = computed(() => {
	const list = teamsStore.teams
	return list.sort((a, b) => getPoints(b.points) - getPoints(a.points))
})
</script>
