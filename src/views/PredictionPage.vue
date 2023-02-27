<template>
	<div v-if="currentRace" class="page--race">
		<PredictionHeader />
		<MultiPageNavigation>
			<router-link :to="`/races/${currentRace.slug}/qualification`">{{
				currentRace.isSprintRace ? "Sprintrace" : "Kwalificatie"
			}}</router-link>
			<router-link :to="`/races/${currentRace.slug}/race`">Race</router-link>
		</MultiPageNavigation>
		<form @submit.prevent="submit" class="form">
			<router-view />
		</form>
	</div>
</template>

<script setup lang="ts">
import { useRaces } from "@/store/races"
import { usePredictions } from "@/store/predictions"
import { storeToRefs } from "pinia"
import PredictionHeader from "@/components/PredictionHeader.vue"
import MultiPageNavigation from "@/components/MultiPageNavigation.vue"

const raceStore = useRaces()
const predictionStore = usePredictions()
const { currentRace } = storeToRefs(raceStore)

const submit = async () => {
	predictionStore.addPrediction()
}
</script>

<style scoped>
.form {
	flex: 1;
}
</style>
