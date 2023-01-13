<template>
	<ListHeader>
		<SelectButton :options="selectOptions" @change="onChange" />
	</ListHeader>
	<div class="race-list">
		<div class="race-list__content">
			<RaceListItem
				v-for="(race, index) in filteredRaces"
				:key="race.id"
				:race="race"
				:is-highlighted="index === 0 && optionValue === 'upcoming'"
			/>
		</div>
	</div>
</template>

<script setup lang="ts">
import { useFirestore, useCollection } from "vuefire"
import { collection } from "firebase/firestore"
import moment from "moment"

import RaceListItem from "./RaceListItem.vue"
import SelectButton from "@/elements/SelectButton.vue"
import { ref, computed } from "vue"
import ListHeader from "./ListHeader.vue"
import { Race } from "@/models/race.model"

const db = useFirestore()
const races = useCollection(collection(db, "races"))

const selectOptions = [
	{
		label: "Aankomende races",
		value: "upcoming"
	},
	{
		label: "Afgelopen races",
		value: "completed"
	},
	{
		label: "Alle races",
		value: "all"
	}
]

const optionValue = ref("upcoming")

const filteredRaces = computed(() => {
	if (optionValue.value === "upcoming") {
		return races.value.filter((race) =>
			moment(race.dates.race.toDate()).isSameOrAfter(new Date(), "day")
		) as Race[]
	} else if (optionValue.value === "completed") {
		return races.value.filter((race) =>
			moment(race.dates.race.toDate()).isBefore(new Date(), "day")
		) as Race[]
	}
	return races.value as Race[]
})

const onChange = (value: string) => {
	optionValue.value = value
}
</script>

<style scoped lang="scss">
.race-list {
	display: flex;
	flex-direction: column;
	border-top: 1px solid var(--background-opacity);
	padding-bottom: 32px;
	width: 100%;

	&__filters {
		display: flex;
		margin-top: 8px;
		gap: 8px;
	}
	&__content {
		display: flex;
		flex-direction: column;
	}
}
</style>
