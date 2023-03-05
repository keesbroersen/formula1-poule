<template>
	<ResultList
		v-if="
			currentPrediction.qualificationScore ||
			qualificationHasStarted ||
			isOtherUser
		"
	>
		<PredictionResult
			label="1"
			type="qualification"
			position="pos1"
			:predicted="currentPrediction.qualification.pos1"
			:show-prediction="qualificationHasStarted"
		/>
		<PredictionResult
			label="2"
			type="qualification"
			position="pos2"
			:predicted="currentPrediction.qualification.pos2"
			:show-prediction="qualificationHasStarted"
		/>
		<PredictionResult
			label="3"
			type="qualification"
			position="pos3"
			:predicted="currentPrediction.qualification.pos3"
			:show-prediction="qualificationHasStarted"
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
		<div class="list__footer">
			<VueButton type="primary">Voorspel kwalificatie</VueButton>
		</div>
	</div>
</template>

<script setup lang="ts">
import { usePredictions } from "@/store/predictions"
import { storeToRefs } from "pinia"
import DriverSelect from "@/elements/DriverSelect.vue"
import PredictionResult from "@/elements/PredictionResult.vue"
import ResultList from "@/components/ResultList.vue"
import { computed, onMounted, ref } from "vue"
import { useRaces } from "@/store/races"
import VueButton from "@/elements/VueButton.vue"
import { useRoute } from "vue-router"

const route = useRoute()
const predictionStore = usePredictions()
const { currentPrediction } = storeToRefs(predictionStore)

const raceStore = useRaces()
const date = ref(new Date())
const qualificationHasStarted = computed(
	() => raceStore.currentRace.dates.qualification.toDate() < date.value
)

const isOtherUser = computed(() => route.path.includes("poule"))

onMounted(() => {
	setInterval(() => (date.value = new Date()), 1000)
})
</script>
