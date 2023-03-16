<template>
	<ResultList v-if="points?.race || raceHasStarted || isOtherUser">
		<PredictionResult
			label="1"
			type="race"
			position="pos1"
			:predicted="currentPrediction.race.pos1"
			:show-prediction="showPrediction"
		/>
		<PredictionResult
			label="2"
			type="race"
			position="pos2"
			:predicted="currentPrediction.race.pos2"
			:show-prediction="showPrediction"
		/>
		<PredictionResult
			label="3"
			type="race"
			position="pos3"
			:predicted="currentPrediction.race.pos3"
			:show-prediction="showPrediction"
		/>
		<PredictionResult
			label="4"
			type="race"
			position="pos4"
			:predicted="currentPrediction.race.pos4"
			:show-prediction="showPrediction"
		/>
		<PredictionResult
			label="5"
			type="race"
			position="pos5"
			:predicted="currentPrediction.race.pos5"
			:show-prediction="showPrediction"
		/>
		<PredictionResult
			label="6"
			type="race"
			position="pos6"
			:predicted="currentPrediction.race.pos6"
			:show-prediction="showPrediction"
		/>
		<PredictionResult
			label="7"
			type="race"
			position="pos7"
			:predicted="currentPrediction.race.pos7"
			:show-prediction="showPrediction"
		/>
		<PredictionResult
			label="8"
			type="race"
			position="pos8"
			:predicted="currentPrediction.race.pos8"
			:show-prediction="showPrediction"
		/>
		<PredictionResult
			label="9"
			type="race"
			position="pos9"
			:predicted="currentPrediction.race.pos9"
			:show-prediction="showPrediction"
		/>
		<PredictionResult
			label="10"
			type="race"
			position="pos10"
			:predicted="currentPrediction.race.pos10"
			:show-prediction="showPrediction"
		/>
		<PredictionResult label="11" type="race" position="pos11" />
		<PredictionResult
			label="driverOfTheDay"
			type="race"
			position="driverOfTheDay"
			:predicted="currentPrediction.race.driverOfTheDay"
			:show-prediction="showPrediction"
		/>
		<PredictionResult
			label="fastestLap"
			type="race"
			position="fastestLap"
			:predicted="currentPrediction.race.fastestLap"
			:show-prediction="showPrediction"
		/>
	</ResultList>
	<div v-else class="list">
		<DriverSelect
			label="1"
			position="pos1"
			type="race"
			v-model="currentPrediction.race.pos1"
		/>
		<DriverSelect
			label="2"
			position="pos2"
			type="race"
			v-model="currentPrediction.race.pos2"
		/>
		<DriverSelect
			label="3"
			position="pos3"
			type="race"
			v-model="currentPrediction.race.pos3"
		/>
		<DriverSelect
			label="4"
			position="pos4"
			type="race"
			v-model="currentPrediction.race.pos4"
		/>
		<DriverSelect
			label="5"
			position="pos5"
			type="race"
			v-model="currentPrediction.race.pos5"
		/>
		<DriverSelect
			label="6"
			position="pos6"
			type="race"
			v-model="currentPrediction.race.pos6"
		/>
		<DriverSelect
			label="7"
			position="pos7"
			type="race"
			v-model="currentPrediction.race.pos7"
		/>
		<DriverSelect
			label="8"
			position="pos8"
			type="race"
			v-model="currentPrediction.race.pos8"
		/>
		<DriverSelect
			label="9"
			position="pos9"
			type="race"
			v-model="currentPrediction.race.pos9"
		/>
		<DriverSelect
			label="10"
			position="pos10"
			type="race"
			v-model="currentPrediction.race.pos10"
		/>
		<DriverSelect
			label="driverOfTheDay"
			position="driverOfTheDay"
			type="race"
			v-model="currentPrediction.race.driverOfTheDay"
		/>
		<DriverSelect
			label="fastestLap"
			position="fastestLap"
			type="race"
			v-model="currentPrediction.race.fastestLap"
		/>
		<div class="list__footer">
			<VueButton type="primary">Voorspel race</VueButton>
		</div>
	</div>
</template>

<script setup lang="ts">
import { usePredictions } from "@/store/predictions"
import { storeToRefs } from "pinia"
import DriverSelect from "@/elements/DriverSelect.vue"
import PredictionResult from "@/elements/PredictionResult.vue"
import ResultList from "@/components/ResultList.vue"
import { useRaces } from "@/store/races"
import { computed, onMounted, ref } from "vue"
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
const raceHasStarted = computed(
	() => raceStore.currentRace.dates.race.toDate() < date.value
)

const isOtherUser = computed(() => route.path.includes("poule"))

const points = computed(() =>
	currentRace.value.id
		? currentPouleUser.value.points[currentRace.value.id]
		: null
)

const showPrediction = computed(
	() => !!points.value?.race || raceHasStarted.value
)

onMounted(() => {
	setInterval(() => (date.value = new Date()), 1000)
})
</script>
