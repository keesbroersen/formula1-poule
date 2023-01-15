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
			<StickyBlock>
				<VueButton :type="isSubmitting ? 'loading' : 'primary'"
					>Voorspel kwalificatie</VueButton
				>
			</StickyBlock>
		</form>
	</div>
</template>

<script setup lang="ts">
import { useRaces } from "@/store/races"
import { usePredictions } from "@/store/predictions"
import { storeToRefs } from "pinia"
import DriverSelect from "@/elements/DriverSelect.vue"
import StickyBlock from "@/elements/StickyBlock.vue"
import VueButton from "@/elements/VueButton.vue"
import { ref } from "vue"

const raceStore = useRaces()
const predictionStore = usePredictions()
const { currentRace } = storeToRefs(raceStore)
const { currentPrediction } = storeToRefs(predictionStore)
const isSubmitting = ref(false)

const submit = async () => {
	predictionStore.addPrediction()
}
</script>
