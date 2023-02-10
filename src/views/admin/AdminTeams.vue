<template>
	<div class="page--regular page--admin">
		<TeamList />
		<VueButton type="secondary" @click="teamsStore.clearAllTeamScores()"
			>Coureursresultaten resetten</VueButton
		>
		<StickyBlock>
			<router-link to="/admin/teams/new" class="button button--primary"
				>Nieuw team</router-link
			>
		</StickyBlock>
	</div>
</template>

<script setup lang="ts">
import TeamList from "@/components/TeamList.vue"
import StickyBlock from "@/elements/StickyBlock.vue"
import VueButton from "@/elements/VueButton.vue"
import { useTeams } from "@/store/teams"

const teamsStore = useTeams()
</script>

<style lang="scss" scoped>
.page--regular {
	padding-bottom: 100px;

	.button {
		margin: 0 12px;
	}
}
</style>
