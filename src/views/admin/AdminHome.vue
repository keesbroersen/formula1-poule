<template>
	<div class="page--regular page--admin container">
		<router-link to="/admin/races" class="button"
			><svg-icon name="IconCheckeredFlag" /> Races</router-link
		>
		<router-link to="/admin/results" class="button"
			><svg-icon name="IconClipboard" /> Results</router-link
		>
		<router-link to="/admin/drivers" class="button"
			><svg-icon name="IconHelmet" /> Drivers</router-link
		>
		<router-link to="/admin/teams" class="button"
			><svg-icon name="IconTools" /> Teams</router-link
		>
		<router-link to="/admin/champion" class="button"
			><svg-icon name="IconTrophy" /> Champion</router-link
		>

		<VueButton @click="clearAllResults">⚠️ Clear all results</VueButton>
	</div>
</template>

<script setup lang="ts">
import SvgIcon from "@/elements/SvgIcon.vue"
import VueButton from "@/elements/VueButton.vue"
import { useGeneral } from "@/store/general"

const clearAllResults = () => {
	useGeneral().clearAllResults()
}
</script>

<style>
.page--admin {
	display: flex;
	flex-direction: column;
	gap: 8px;
	width: 100%;
}
</style>
