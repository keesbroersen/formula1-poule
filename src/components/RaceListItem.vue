<template>
	<router-link
		class="race container"
		:class="{ 'race-highlighted': isHighlighted }"
		:to="link"
	>
		<CountryFlag :countryCode="race.countryCode" />
		<div class="race__header">
			<p class="title">
				{{ race.country }}<small>{{ race.circuit }}</small>
			</p>
			<p class="date" v-if="!totalScore || $route.path.includes('admin')">
				{{ dateTimeFormatted }}
			</p>
			<IconPoints v-else :points="totalScore" />
		</div>

		<div class="race__footer" v-if="isHighlighted">
			<IconPoints v-if="totalScore" :points="totalScore" />
			<IconPoints
				v-else-if="thisPrediction?.qualificationScore"
				:points="thisPrediction?.qualificationScore"
			/>
			<IconCheck
				v-if="qualificationFilled && !thisPrediction?.qualificationScore"
				:check="true"
				content="Q"
			/>
			<IconCheck
				v-else-if="!thisPrediction?.qualificationScore"
				:check="false"
				content="Q"
			/>
			<IconCheck v-if="raceFilled && !totalScore" :check="true" content="R" />
			<IconCheck v-else-if="!totalScore" :check="false" content="R" />
			<p class="next-session" v-html="nextSession"></p>
		</div>
	</router-link>
</template>

<script setup lang="ts">
import { ref, computed } from "vue"
import { Race, RaceDates } from "@/models/race.model"
import { usePredictions } from "@/store/predictions"
import CountryFlag from "@/elements/CountryFlag.vue"
import moment from "moment"
import { useRoute } from "vue-router"
import IconPoints from "@/elements/IconPoints.vue"
import IconCheck from "@/elements/IconCheck.vue"
const route = useRoute()
moment.locale("nl")

const props = defineProps<{
	race: Race
	isHighlighted: Boolean
}>()

const link = computed(() => {
	if (route.path === "/admin/results") {
		return `/admin/results/${props.race.slug}`
	}
	if (route.name === "PouleUser") {
		return `${route.path}/${props.race.slug}`
	}
	return `races/${props.race.slug}`
})

const race = ref(props.race)
const dateType = ref("race")
const date = computed(() =>
	race.value?.dates?.[dateType.value as keyof RaceDates]?.toDate()
)
const dateTimeFormatted = computed(() => {
	return date.value.toLocaleString("nl-NL", {
		hour: "numeric",
		minute: "numeric",
		month: "short",
		day: "numeric"
	})
})

const predictionStore = usePredictions()
const thisPrediction = computed(() =>
	predictionStore.predictions.find(
		(prediction) => prediction.raceId === race.value.id
	)
)
const qualificationFilled = computed(() => {
	if (!thisPrediction.value) return false
	return Object.entries(thisPrediction.value.qualification).every(
		(item) => item[1]
	)
})
const raceFilled = computed(() => {
	if (!thisPrediction.value) return false
	return Object.entries(thisPrediction.value.race).every((item) => item[1])
})

const totalScore = computed(() => {
	if (!thisPrediction.value?.raceScore) return
	const qualiScore = thisPrediction.value?.qualificationScore || 0
	return qualiScore + thisPrediction.value?.raceScore
})

const dateUntilNow = computed(() => {
	return moment(date.value).fromNow()
})

const nextSession = computed(() => {
	const closestToNow = Object.keys(race.value.dates)
		.filter(function (a) {
			const sum =
				Number(race.value.dates[a as keyof RaceDates].toDate()) -
				Number(new Date())
			return sum > 0
		})
		.shift()

	if (totalScore.value) {
		return "Race <span>beëindigd</span>"
	}

	if (!closestToNow && !totalScore.value) {
		return "Race <span>onderweg</span>"
	}

	const qualificationSessionType = race.value.isSprintRace
		? "sprintrace"
		: "kwalificatie"

	return `${
		closestToNow === "qualification" ? qualificationSessionType : "race"
	} <span>${dateUntilNow.value}</span>`
})
</script>

<style lang="scss" scoped>
.race {
	display: flex;
	align-items: center;
	padding-top: 16px;
	padding-bottom: 16px;
	border-bottom: 1px solid var(--background-opacity);

	&__header,
	&__footer {
		display: flex;
		align-items: center;
		width: 100%;
	}

	&__header {
		.icon-points {
			margin-left: auto;
		}
	}

	&__footer {
		grid-column: 2 / 3;
		grid-row: 2 / 3;
		padding-left: 16px;
	}

	&__footer svg + svg {
		margin-left: 8px;
	}
}

.race div:first-child {
	grid-row: 1 / 3;
}

.race-highlighted {
	display: grid;
	grid-template-rows: 1fr 1fr;
	grid-template-columns: 42px 1fr;
	min-height: 100px;
}

.title {
	margin-left: 12px;

	small {
		margin-left: 8px;
		font-size: 13px;
		color: var(--general-opacity);

		@media screen and (max-width: 768px) {
			display: flex;
			margin: 4px 0 0;
			width: 100%;
		}
	}
}

.date,
.next-session {
	margin-left: auto;
	text-align: right;
}

.date,
p span {
	color: var(--general-opacity);
}

.date {
	min-width: 110px;
}

.points {
	margin-left: auto;
}
</style>
