<template>
	<div class="team-list">
		<div class="team-list__content">
			<TeamListItem v-for="team in store.teams" :key="team.id" :team="team" />
		</div>
	</div>
</template>

<script setup lang="ts">
import { useTeams } from "@/store/teams"
import TeamListItem from "./TeamListItem.vue"

const store = useTeams()
</script>

<style scoped lang="scss">
.team-list {
	display: flex;
	flex-direction: column;
	border-top: 1px solid var(--background-opacity);
	padding-bottom: 32px;
	width: 100%;

	&__content {
		display: flex;
		flex-direction: column;
	}
}
</style>
