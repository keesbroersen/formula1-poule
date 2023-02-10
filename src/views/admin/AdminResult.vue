<template>
	<div v-if="currentRace" class="page--regular">
		<h2>{{ currentRace?.circuit }}</h2>
		<div class="page-navigation">
			<router-link :to="`/admin/results/${currentRace.slug}/qualification`"
				>Kwalificatie</router-link
			>
			<router-link :to="`/admin/results/${currentRace.slug}/race`"
				>Race</router-link
			>
		</div>
		<form @submit.prevent="submit" class="form">
			<router-view />

			<select v-model="resultStore.currentResult.scoreMultiplier">
				<option value="raced75orMore">75% laps of meer</option>
				<option value="raced50till75">50% laps tot 75%</option>
				<option value="raced25till50">25% laps tot 50%</option>
				<option value="raced2lapstill25">2 laps 25%</option>
				<option value="lessThan2laps">tot 2 laps</option>
			</select>

			<StickyBlock>
				<VueButton :type="isSubmitting ? 'loading' : 'primary'"
					>Sla resultaat op</VueButton
				>
			</StickyBlock>
		</form>
	</div>
</template>

<script setup lang="ts">
import { useRaces } from "@/store/races"
import { useResults } from "@/store/results"
import { storeToRefs } from "pinia"
import StickyBlock from "@/elements/StickyBlock.vue"
import VueButton from "@/elements/VueButton.vue"
import { ref } from "vue"

const raceStore = useRaces()
const resultStore = useResults()
const { currentRace } = storeToRefs(raceStore)
const isSubmitting = ref(false)

const submit = async () => {
	resultStore.addResult()
}
</script>

<style lang="scss">
.page-navigation {
	display: flex;
	gap: 16px;
	margin: 16px 0;
}
</style>
