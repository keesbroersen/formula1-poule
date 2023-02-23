<template>
	<ResultList v-if="currentPrediction.qualificationScore">
		<PredictionResult
			label="1"
			type="qualification"
			position="pos1"
			:predicted="currentPrediction.qualification.pos1"
		/>
		<PredictionResult
			label="2"
			type="qualification"
			position="pos2"
			:predicted="currentPrediction.qualification.pos2"
		/>
		<PredictionResult
			label="3"
			type="qualification"
			position="pos3"
			:predicted="currentPrediction.qualification.pos3"
		/>
	</ResultList>
	<div v-else class="list">
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
	</div>
</template>

<script setup lang="ts">
import { usePredictions } from "@/store/predictions"
import { storeToRefs } from "pinia"
import DriverSelect from "@/elements/DriverSelect.vue"
import PredictionResult from "@/elements/PredictionResult.vue"
import ResultList from "@/components/ResultList.vue"

const predictionStore = usePredictions()
const { currentPrediction } = storeToRefs(predictionStore)
</script>
