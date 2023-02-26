<template>
	<component
		v-for="(component, index) in components"
		:is="component.component"
		v-bind="component.props"
		:key="index"
	/>
</template>

<script setup lang="ts">
import { useRaces } from "@/store/races"
import { computed } from "vue"
import RaceList from "@/components/RaceList.vue"
import SeasonPrediction from "@/components/SeasonPrediction.vue"

const raceStore = useRaces()
const seasonHasStarted = computed(
	() => raceStore.racesSorted[0]?.dates?.qualification?.toDate() < new Date()
)

const components = computed(() => {
	const list = [
		{
			component: RaceList,
			props: {}
		},
		{
			component: SeasonPrediction,
			props: {
				seasonHasStarted: seasonHasStarted.value
			}
		}
	]
	return seasonHasStarted.value ? list : list.reverse()
})
</script>
