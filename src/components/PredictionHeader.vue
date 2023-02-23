<template>
	<div class="prediction-header">
		<img :src="imageSrc" :alt="currentRace.country" class="image" />
		<div class="content container">
			<h1 class="title">{{ currentRace.country }}</h1>
			<p class="dates">
				<small>Qualification</small> {{ qualificationDate }}<br />
				<small>Race</small> {{ raceDate }}
			</p>
			<IconPoints class="points" :points="points" />
		</div>
	</div>
</template>

<script setup>
import { usePredictions } from "@/store/predictions"
import { useRaces } from "@/store/races"
import { storeToRefs } from "pinia"
import { computed } from "vue"
import moment from "moment"
import IconPoints from "@/elements/IconPoints.vue"
const predictionStore = usePredictions()
const racesStore = useRaces()
const { currentPrediction } = storeToRefs(predictionStore)
const { currentRace } = storeToRefs(racesStore)
moment.locale("nl")

const points = computed(
	() =>
		currentPrediction.value.qualificationScore +
		currentPrediction.value.raceScore
)

const imageSrc = computed(
	() => `https://loremflickr.com/750/366/${currentRace.value.circuit},f1?lock=1`
)

const qualificationDate = computed(() => {
	const qualificationDate = currentRace.value.dates.qualification.toDate()
	const qualification = `${qualificationDate.toLocaleString("nl-NL", {
		day: "numeric",
		month: "long"
	})} - 
  ${qualificationDate.toLocaleString("nl-NL", {
		hour: "numeric",
		minute: "numeric"
	})}`
	return qualification
})

const raceDate = computed(() => {
	const raceDate = currentRace.value.dates.race.toDate()
	const race = `${raceDate.toLocaleString("nl-NL", {
		day: "numeric",
		month: "long"
	})} - 
  ${raceDate.toLocaleString("nl-NL", {
		hour: "numeric",
		minute: "numeric"
	})}`

	return race
})
</script>

<style lang="scss" scoped>
.prediction-header {
	position: relative;
	display: flex;
	align-items: flex-end;
	margin-bottom: 16px;
	padding: 0 0 8px;
	aspect-ratio: 16/9;
	max-height: 350px;
	width: 100%;

	&:before {
		content: "";
		position: absolute;
		bottom: 0;
		left: 0;
		height: 100%;
		width: 100%;
		background: linear-gradient(
			180deg,
			rgba(0, 0, 0, 0.8) 0%,
			rgba(0, 0, 0, 0) 90px,
			rgba(0, 0, 0, 0) 60%,
			rgb(0, 0, 0) 93%,
			rgb(0, 0, 0) 100%
		);
	}
}

.content {
	display: grid;
	grid-auto-columns: 1fr 45px;
	grid-auto-rows: auto auto;
	align-items: center;
	opacity: 0.9;
}

.image {
	position: absolute;
	top: 0;
	left: 0;
	width: 100%;
	height: 100%;
	z-index: -1;
	object-fit: cover;
}

.title {
	grid-column: 1 / 2;
	grid-row: 1 / 2;
	font-size: 32px;
	font-weight: 900;
	text-transform: uppercase;
	line-height: 1;
}

.points {
	grid-column: 2 / 3;
	grid-row: 1 / 2;
}

.dates {
	grid-column: 1 / 2;
	grid-row: 2 / 3;

	small {
		color: var(--general-opacity);
	}
}
</style>
