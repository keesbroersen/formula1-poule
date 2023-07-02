<template>
	<router-link
		class="race container"
		:class="{ 'race-highlighted': isHighlighted }"
		:to="link"
		v-if="points"
	>
		<CountryFlag :countryCode="race.countryCode" />
		<div class="race__header">
			<p class="title">
				{{ race.country }}<small>{{ race.circuit }}</small>
			</p>
			<p class="date" v-if="!raceHasPassed || $route.path.includes('admin')">
				{{ raceDateFormatted }}
			</p>
			<IconPoints v-else :points="points.total" />
		</div>

		<div class="race__footer" v-if="isHighlighted">
			<IconPoints v-if="points.total" :points="points.total" />
			<IconPoints
				v-else-if="points.qualification"
				:points="points.qualification"
			/>
			<IconCheck
				v-if="qualificationFilled && !points.qualification"
				:check="true"
				content="Q"
			/>
			<IconCheck v-else-if="!points.qualification" :check="false" content="Q" />
			<IconCheck v-if="raceFilled && !points.race" :check="true" content="R" />
			<IconCheck v-else-if="!points.race" :check="false" content="R" />
			<p class="next-session" v-html="nextSessionText"></p>
		</div>
	</router-link>
</template>

<script setup lang="ts">
import { computed } from "vue"
import { Race, RaceDates } from "@/models/race.model"
import CountryFlag from "@/elements/CountryFlag.vue"
import moment from "moment"
import { useRoute } from "vue-router"
import IconPoints from "@/elements/IconPoints.vue"
import IconCheck from "@/elements/IconCheck.vue"
import { usePredictions } from "@/store/predictions"
import { useUsers } from "@/store/users"
import { storeToRefs } from "pinia"

const usersStore = useUsers()
const { currentPouleUser } = storeToRefs(usersStore)
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
	if (route.name === "poule_user") {
		return `${route.path}/${props.race.slug}`
	}
	return `races/${props.race.slug}`
})

const date = computed(() =>
	props.race?.dates?.[nextSession.value as keyof RaceDates]?.toDate()
)

const raceHasPassed = computed(
	() => props.race?.dates?.race?.toDate() < new Date()
)

const raceDateFormatted = computed(() => {
	return props.race?.dates?.race.toDate().toLocaleString("nl-NL", {
		hour: "numeric",
		minute: "numeric",
		month: "short",
		day: "numeric"
	})
})

const points = computed(() => {
	if (!props.race.id || !currentPouleUser.value?.points[props.race.id])
		return { qualification: 0, race: null, total: 0 }
	return currentPouleUser.value?.points[props.race.id]
})

const predictionStore = usePredictions()
const thisPrediction = computed(() =>
	predictionStore.predictions.find(
		(prediction) => prediction.raceId === props.race.id
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

const dateUntilNow = computed(() => {
	return moment(date.value).fromNow()
})

const nextSession = computed(() => {
	const futureSessions = Object.keys(props.race.dates).filter(
		(key) => props.race.dates[key as keyof RaceDates].toDate() > new Date()
	)
	if (!futureSessions.length) return
	return futureSessions.reduce((a, b) => {
		const aDiff =
			props.race.dates[a as keyof RaceDates].toMillis() - new Date().getTime()
		const bDiff =
			props.race.dates[b as keyof RaceDates].toMillis() - new Date().getTime()
		return aDiff < bDiff ? a : b
	})
})

const nextSessionText = computed(() => {
	if (points.value.race) {
		return "Race <span>beëindigd</span>"
	}

	if (!nextSession.value && !points.value.race) {
		return "Race <span>onderweg</span>"
	}

	const qualificationSessionType = props.race.isSprintRace
		? "sprintrace"
		: "kwalificatie"

	return `${
		nextSession.value === "qualification" ? qualificationSessionType : "race"
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
