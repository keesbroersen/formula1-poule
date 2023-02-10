<template>
	<ListHeader>
		<SelectButton :options="selectOptions" @change="onChange" />
	</ListHeader>
	<div class="race-list">
		<div class="race-list__content">
			<RaceListItem
				v-for="(race, index) in raceStore.filteredRaces"
				:key="race.id"
				:race="race"
				:is-highlighted="index === 0 && raceStore.filter === 'upcoming'"
			/>
		</div>
	</div>
</template>

<script setup lang="ts">
import RaceListItem from "./RaceListItem.vue"
import SelectButton from "@/elements/SelectButton.vue"
import { ref } from "vue"
import ListHeader from "./ListHeader.vue"
import { useRaces } from "@/store/races"
const raceStore = useRaces()

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

const onChange = (value: any) => {
	raceStore.filter = value
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
