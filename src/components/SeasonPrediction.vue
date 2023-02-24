<template>
	<form @submit.prevent="submit" class="season-prediction">
		<h3>
			Seizoenswinnaars <small>nog {{ timeUntilStartOfSeason }}</small>
		</h3>
		<div class="list">
			<DriverSelect
				label="trophy"
				position="0"
				type="qualification"
				v-model="driverPrediction"
			/>
			<TeamSelect label="tools" v-model="teamPrediction" />
		</div>
		<VueButton>Voorspel seizoenswinnaars</VueButton>
	</form>
</template>

<script setup lang="ts">
import DriverSelect from "@/elements/DriverSelect.vue"
import TeamSelect from "@/elements/TeamSelect.vue"
import VueButton from "@/elements/VueButton.vue"
import { useRaces } from "@/store/races"
import { usePredictions } from "@/store/predictions"
import { ref, computed } from "vue"
import moment from "moment"
const predictionStore = usePredictions()
const raceStore = useRaces()
moment.locale("nl")

const driverPrediction = ref()
const teamPrediction = ref()

const submit = async () => {
	predictionStore.addSeasonPrediction(
		driverPrediction.value,
		teamPrediction.value
	)
}

const timeUntilStartOfSeason = computed(() => {
	const firstRaceDate = raceStore.racesSorted[0]?.dates?.qualification?.toDate()
	return moment(firstRaceDate).fromNow(true)
})
</script>

<style scoped lang="scss">
.season-prediction {
	display: flex;
	flex-direction: column;
	margin: 0 0 24px;
	padding: 24px 0;
	background: rgba(0, 0, 0, 0.15);
}

h3 {
	margin: 0 12px 12px;
	font-size: 18px;

	small {
		font-weight: normal;
		font-size: 14px;
		color: var(--general-opacity);
	}
}

.button {
	margin: 12px 12px 0;
	width: calc(100% - 24px);
}
</style>
