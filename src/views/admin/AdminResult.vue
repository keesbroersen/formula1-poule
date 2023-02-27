<template>
	<div v-if="currentRace" class="page--regular">
		<h2>{{ currentRace?.circuit }}</h2>
		<MultiPageNavigation>
			<router-link :to="`/admin/results/${currentRace.slug}/qualification`"
				>Kwalificatie</router-link
			>
			<router-link :to="`/admin/results/${currentRace.slug}/race`"
				>Race</router-link
			>
		</MultiPageNavigation>
		<form @submit.prevent="submit" class="form">
			<div class="list">
				<router-view />

				<select v-model="resultStore.currentResult.scoreMultiplier">
					<option value="raced75orMore">75% laps of meer</option>
					<option value="raced50till75">50% laps tot 75%</option>
					<option value="raced25till50">25% laps tot 50%</option>
					<option value="raced2lapstill25">2 laps 25%</option>
					<option value="lessThan2laps">tot 2 laps</option>
				</select>

				<div class="list__footer">
					<VueButton :type="isSubmitting ? 'loading' : 'primary'"
						>Sla resultaat op</VueButton
					>
				</div>
			</div>
		</form>
	</div>
</template>

<script setup lang="ts">
import { useRaces } from "@/store/races"
import { useResults } from "@/store/results"
import { storeToRefs } from "pinia"
import VueButton from "@/elements/VueButton.vue"
import { ref } from "vue"
import MultiPageNavigation from "@/components/MultiPageNavigation.vue"

const raceStore = useRaces()
const resultStore = useResults()
const { currentRace } = storeToRefs(raceStore)
const isSubmitting = ref(false)

const submit = async () => {
	resultStore.addResult()
}
</script>

<style lang="scss" scoped>
h2 {
	margin-left: 16px;
}

select {
	margin: 16px 12px 0;
	padding: 0 12px;
	height: 42px;
	width: calc(100% - 24px);
	border-radius: 5px;
	background: none;
	border: 1px solid var(--background-opacity);
	color: #fff;
}
</style>
