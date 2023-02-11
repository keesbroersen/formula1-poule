<template>
	<router-link
		class="race container"
		:class="{ 'race-highlighted': isHighlighted }"
		:to="link"
	>
		<CountryFlag :countryCode="race.countryCode" />
		<div class="race__header">
			<p class="title">{{ race.circuit }} - {{ race.country }}</p>
			<p class="date">{{ dateTimeFormatted }}</p>
		</div>

		<div class="race__footer" v-if="isHighlighted">
			<p v-if="qualificationFilled">Quali ✓</p>
			<p v-if="raceFilled">race ✓</p>
			<p class="points">score</p>
			<p class="next-session">{{ dateUntilNow }}</p>
		</div>
	</router-link>
</template>

<script setup lang="ts">
import { ref, computed } from "vue"
import { Race } from "@/models/race.model"
import { usePredictions } from "@/store/predictions"
import CountryFlag from "@/elements/CountryFlag.vue"
import moment from "moment"
import { useRoute } from "vue-router"
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
	return `races/${props.race.slug}`
})

const race = ref(props.race)
const date = ref(race.value?.dates?.race.toDate())
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

const dateUntilNow = computed(() => {
	return moment(date.value).fromNow()
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
}

.date,
.next-session {
	margin-left: auto;
}

.date,
p span {
	color: var(--general-opacity);
}

.points {
	margin-left: auto;
}
</style>
