<template>
	<div class="page--regular">
		<h2>{{ currentRace?.circuit }}</h2>
		<form @submit.prevent="submit" class="form">
			<DriverSelect
				label="1"
				position="pos1"
				type="qualification"
				v-model="currentPrediction.qualification.pos1"
			/>
			<DriverSelect
				label="2"
				position="pos2"
				type="qualification"
				v-model="currentPrediction.qualification.pos2"
			/>
			<DriverSelect
				label="3"
				position="pos3"
				type="qualification"
				v-model="currentPrediction.qualification.pos3"
			/>
		</form>
	</div>
</template>

<script setup lang="ts">
import { useRaces } from "@/store/races"
import { usePredictions } from "@/store/predictions"
import { storeToRefs } from "pinia"
import DriverSelect from "@/elements/DriverSelect.vue"

const raceStore = useRaces()
const predictionStore = usePredictions()
const { currentRace } = storeToRefs(raceStore)
const { currentPrediction } = storeToRefs(predictionStore)

const submit = () => {
	console.log("submit")
}
</script>

<style scoped>
form {
	display: flex;
	flex-direction: column;
}
</style>
