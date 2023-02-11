<template>
	<div v-if="currentRace" class="page--race">
		<PredictionHeader />
		<MultiPageNavigation>
			<router-link :to="`/races/${currentRace.slug}/qualification`"
				>Kwalificatie</router-link
			>
			<router-link :to="`/races/${currentRace.slug}/race`">Race</router-link>
		</MultiPageNavigation>
		<form @submit.prevent="submit" class="form">
			<router-view />

			<StickyBlock
				v-if="
					!predictionStore.currentPrediction.qualificationScore &&
					!predictionStore.currentPrediction.raceScore
				"
			>
				<VueButton :type="isSubmitting ? 'loading' : 'primary'"
					>Voorspel</VueButton
				>
			</StickyBlock>
		</form>
	</div>
</template>

<script setup lang="ts">
import { useRaces } from "@/store/races"
import { usePredictions } from "@/store/predictions"
import { storeToRefs } from "pinia"
import StickyBlock from "@/elements/StickyBlock.vue"
import VueButton from "@/elements/VueButton.vue"
import { ref } from "vue"
import PredictionHeader from "@/components/PredictionHeader.vue"
import MultiPageNavigation from "@/components/MultiPageNavigation.vue"

const raceStore = useRaces()
const predictionStore = usePredictions()
const { currentRace } = storeToRefs(raceStore)
const isSubmitting = ref(false)

const submit = async () => {
	predictionStore.addPrediction()
}
</script>
