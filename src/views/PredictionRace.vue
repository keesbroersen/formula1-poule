<template>
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
</template>

<script setup lang="ts">
import { usePredictions } from "@/store/predictions"
import { storeToRefs } from "pinia"
import DriverSelect from "@/elements/DriverSelect.vue"

const predictionStore = usePredictions()
const { currentPrediction } = storeToRefs(predictionStore)
</script>
