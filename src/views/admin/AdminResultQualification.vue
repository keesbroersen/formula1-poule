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
</template>

<script setup lang="ts">
import { useResults } from "@/store/results"
import { storeToRefs } from "pinia"
import DriverSelect from "@/elements/DriverSelect.vue"

const resultStore = useResults()
const { currentResult } = storeToRefs(resultStore)
</script>
