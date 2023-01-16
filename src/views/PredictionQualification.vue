<template>
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
</template>

<script setup lang="ts">
import { usePredictions } from "@/store/predictions"
import { storeToRefs } from "pinia"
import DriverSelect from "@/elements/DriverSelect.vue"

const predictionStore = usePredictions()
const { currentPrediction } = storeToRefs(predictionStore)
</script>
