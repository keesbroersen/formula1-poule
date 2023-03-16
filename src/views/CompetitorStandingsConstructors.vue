<template>
	<div class="list">
		<PouleListItem
			v-for="(team, index) in teams"
			:user="team"
			:index="index"
			:key="team.id"
		/>
	</div>
</template>

<script setup lang="ts">
import { useTeams } from "@/store/teams"
import { computed } from "vue"
import { TeamWithPoints } from "@/models/team.model"
import PouleListItem from "@/components/PouleListItem.vue"

const teamsStore = useTeams()

const teams = computed(() => {
	const teams = teamsStore.teams.map((team) => {
		return {
			...team,
			pointsTotal: team.pointsTotal,
			lastPointsGained: team.previousPointsTotal
		} as TeamWithPoints
	})

	const previousSort = [...teams]
	const currentSort = [...teams]

	previousSort.sort((a, b) => {
		const previousScoreA = a.pointsTotal - a.lastPointsGained
		const previousScoreB = b.pointsTotal - b.lastPointsGained
		return previousScoreB - previousScoreA
	})

	currentSort.sort((a, b) => b.pointsTotal - a.pointsTotal)

	const result = currentSort.map((team, index) => {
		return {
			...team,
			positionsGained:
				previousSort.findIndex((u) => u.slug === team.slug) - index
		}
	})

	return result
})
</script>
