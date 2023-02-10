<template>
	<DriverSelect
		label="1"
		position="pos1"
		type="qualification"
		v-model="currentResult.qualification.pos1"
	/>
	<DriverSelect
		label="2"
		position="pos2"
		type="qualification"
		v-model="currentResult.qualification.pos2"
	/>
	<DriverSelect
		label="3"
		position="pos3"
		type="qualification"
		v-model="currentResult.qualification.pos3"
	/>
	<DriverSelect
		v-if="isSprintRace"
		label="4"
		position="pos4"
		type="qualification"
		v-model="currentResult.qualification.pos4"
	/>
	<DriverSelect
		v-if="isSprintRace"
		label="5"
		position="pos5"
		type="qualification"
		v-model="currentResult.qualification.pos5"
	/>
	<DriverSelect
		v-if="isSprintRace"
		label="6"
		position="pos6"
		type="qualification"
		v-model="currentResult.qualification.pos6"
	/>
	<DriverSelect
		v-if="isSprintRace"
		label="7"
		position="pos7"
		type="qualification"
		v-model="currentResult.qualification.pos7"
	/>
	<DriverSelect
		v-if="isSprintRace"
		label="8"
		position="pos8"
		type="qualification"
		v-model="currentResult.qualification.pos8"
	/>
</template>

<script setup lang="ts">
import { useResults } from "@/store/results"
import { useRaces } from "@/store/races"
import { storeToRefs } from "pinia"
import DriverSelect from "@/elements/DriverSelect.vue"
import { computed } from "vue"

const resultStore = useResults()
const raceStore = useRaces()
const { currentResult } = storeToRefs(resultStore)

const isSprintRace = computed(() => raceStore.currentRace.isSprintRace)
</script>
