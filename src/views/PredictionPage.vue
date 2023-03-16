<template>
	<div v-if="currentRace" class="page--race">
		<PredictionHeader />
		<MultiPageNavigation>
			<router-link :to="qualificationLink"
				>{{ currentRace.isSprintRace ? "Sprintrace" : "Kwalificatie" }}
				<small class="points" v-if="qualificationPoints">{{
					qualificationPoints
				}}</small></router-link
			>
			<router-link :to="raceLink"
				>Race
				<small class="points" v-if="racePoints">{{
					racePoints
				}}</small></router-link
			>
		</MultiPageNavigation>
		<form @submit.prevent="submit" class="form">
			<router-view />
		</form>
	</div>
</template>

<script setup lang="ts">
import { useRaces } from "@/store/races"
import { useUsers } from "@/store/users"
import { usePredictions } from "@/store/predictions"
import { storeToRefs } from "pinia"
import PredictionHeader from "@/components/PredictionHeader.vue"
import MultiPageNavigation from "@/components/MultiPageNavigation.vue"
import { useRoute } from "vue-router"
import { computed } from "vue"

const route = useRoute()
const raceStore = useRaces()
const usersStore = useUsers()
const predictionStore = usePredictions()
const { currentRace } = storeToRefs(raceStore)
const { currentPouleUser } = storeToRefs(usersStore)

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

const points = computed(() =>
	currentRace.value.id
		? currentPouleUser.value.points[currentRace.value.id]
		: null
)

const qualificationPoints = computed(() => points.value?.qualification)
const racePoints = computed(() => points.value?.race)

const submit = async () => {
	predictionStore.addPrediction()
}
</script>

<style scoped>
.form {
	flex: 1;
}

.points {
	border: 1px solid currentColor;
	color: currentColor;
	border-radius: 4px;
	margin-left: 8px;
	font-size: 10px;
	padding: 1px 3px;
	min-width: 20px;
}
</style>
