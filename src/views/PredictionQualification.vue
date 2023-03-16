<template>
	<ResultList
		v-if="points?.qualification || qualificationHasStarted || isOtherUser"
	>
		<PredictionResult
			label="1"
			type="qualification"
			position="pos1"
			:predicted="currentPrediction.qualification.pos1"
			:show-prediction="showPrediction"
		/>
		<PredictionResult
			label="2"
			type="qualification"
			position="pos2"
			:predicted="currentPrediction.qualification.pos2"
			:show-prediction="showPrediction"
		/>
		<PredictionResult
			label="3"
			type="qualification"
			position="pos3"
			:predicted="currentPrediction.qualification.pos3"
			:show-prediction="showPrediction"
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
			<VueButton type="primary"
				>Voorspel
				{{
					raceStore.currentRace.isSprintRace ? "Sprintrace" : "Kwalificatie"
				}}</VueButton
			>
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
import { useUsers } from "@/store/users"

const route = useRoute()
const predictionStore = usePredictions()
const { currentPrediction } = storeToRefs(predictionStore)

const raceStore = useRaces()
const usersStore = useUsers()
const { currentRace } = storeToRefs(raceStore)
const { currentPouleUser } = storeToRefs(usersStore)

const date = ref(new Date())
const qualificationHasStarted = computed(
	() => raceStore.currentRace.dates.qualification.toDate() < date.value
)

const points = computed(() =>
	currentRace.value.id
		? currentPouleUser.value.points[currentRace.value.id]
		: null
)

const isOtherUser = computed(() => route.path.includes("poule"))

const showPrediction = computed(
	() => !!points.value?.race || qualificationHasStarted.value
)

onMounted(() => {
	setInterval(() => (date.value = new Date()), 1000)
})
</script>
