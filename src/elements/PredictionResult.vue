<template>
	<div class="prediction-result">
		<div class="label">{{ props.label }}</div>
		<div class="team-color" :style="{ 'background-color': teamColor }"></div>
		<span class="result">{{ driverResult ? driverResult.name : "---" }}</span>
		<span class="prediction">{{
			driverPredicted ? driverPredicted.name : "---"
		}}</span>
		<div v-if="predicted" class="points" :class="{ 'points-none': points < 1 }">
			{{ points }}
			<small>pt</small>
		</div>
		<div v-else class="points"></div>
	</div>
</template>

<script setup>
import { useDrivers } from "@/store/drivers"
import { useResults } from "@/store/results"
import { useTeams } from "@/store/teams"
import { storeToRefs } from "pinia"
import { computed, ref } from "vue"
const driverStore = useDrivers()
const resultsStore = useResults()
const teamsStore = useTeams()
const { currentResult } = storeToRefs(resultsStore)

const props = defineProps({
	position: {
		required: true,
		type: String
	},
	label: {
		required: true,
		type: String
	},
	predicted: {
		required: false,
		type: String,
		default: ""
	},
	type: {
		required: true,
		type: String
	}
})

const driverPredicted = computed(() =>
	driverStore.getDriverById(props.predicted)
)

const driverResult = computed(() =>
	driverStore.getDriverById(currentResult.value[props.type][props.position])
)

const teamColor = computed(
	() => teamsStore.getTeamById(driverResult.value?.teamId)?.color
)

const points = computed(() => {
	if (driverPredicted.value?.id === driverResult.value?.id) {
		return props.type === "race" &&
			props.position !== "fastestLap" &&
			props.position !== "driverOfTheDay"
			? 3
			: 1
	}
	if (
		props.type === "qualification" ||
		props.position === "fastestLap" ||
		props.position === "driverOfTheDay"
	)
		return 0

	if (
		driverPredicted.value?.id ===
			currentResult.value.race[`pos${parseInt(props.label) + 1}`] ||
		driverPredicted.value?.id ===
			currentResult.value.race[`pos${parseInt(props.label) - 1}`]
	) {
		return 1
	}

	return 0
})
</script>

<style lang="scss" scoped>
.prediction-result {
	display: flex;
	align-items: center;
	color: white;
	border-bottom: 1px solid var(--background-opacity);
	height: 50px;
}

.result {
	flex: 3;
}

.prediction {
	color: var(--general-opacity);
	font-size: 12px;
	flex: 3;
}

.points {
	flex: 1;
	small {
		font-size: 10px;
		margin-left: 3px;
	}
}

.points-none {
	color: var(--general-opacity);
}

.team-color {
	position: relative;
	background-color: var(--background-opacity);
	border-radius: 2px;
	margin-right: 15px;
	height: 40px;
	width: 4px;

	&:before {
		background: linear-gradient(
			310deg,
			rgba(255, 255, 255, 0),
			rgba(255, 255, 255, 0.4)
		);
		content: "";
		border-radius: 2px;
		height: 100%;
		width: 100%;
		position: absolute;
		z-index: 1;
		top: 0;
		left: 0;
	}
}

.label {
	width: 40px;
	text-align: center;
	opacity: 0.4;
}
</style>
