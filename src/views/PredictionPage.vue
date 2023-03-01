<template>
	<div v-if="currentRace" class="page--race">
		<PredictionHeader />
		<MultiPageNavigation>
			<router-link :to="qualificationLink">{{
				currentRace.isSprintRace ? "Sprintrace" : "Kwalificatie"
			}}</router-link>
			<router-link :to="raceLink">Race</router-link>
		</MultiPageNavigation>
		<form @submit.prevent="submit" class="form">
			<router-view />
		</form>
	</div>
</template>

<script setup lang="ts">
import { useRaces } from "@/store/races"
import { usePredictions } from "@/store/predictions"
import { storeToRefs } from "pinia"
import PredictionHeader from "@/components/PredictionHeader.vue"
import MultiPageNavigation from "@/components/MultiPageNavigation.vue"
import { useRoute } from "vue-router"
import { computed } from "vue"

const route = useRoute()
const raceStore = useRaces()
const predictionStore = usePredictions()
const { currentRace } = storeToRefs(raceStore)

const qualificationLink = computed(() =>
	route.path.includes("poule")
		? `/poule/${route.params.slug}/${route.params.raceSlug}/qualification`
		: `/races/${currentRace.value.slug}/qualification`
)

const raceLink = computed(() =>
	route.path.includes("poule")
		? `/poule/${route.params.slug}/${route.params.raceSlug}/race`
		: `/races/${currentRace.value.slug}/race`
)

const submit = async () => {
	predictionStore.addPrediction()
}
</script>

<style scoped>
.form {
	flex: 1;
}
</style>
