<template>
	<component :is="isBeforeFirstRace ? SeasonPrediction : RaceList" />
	<component :is="isBeforeFirstRace ? RaceList : SeasonPrediction" />
</template>

<script setup lang="ts">
import { useRaces } from "@/store/races"
import { computed } from "vue"
import RaceList from "@/components/RaceList.vue"
import SeasonPrediction from "@/components/SeasonPrediction.vue"

const raceStore = useRaces()
// const isBeforeFirstRace = computed(
// 	() => raceStore.racesSorted[0]?.dates?.qualification?.toDate() < new Date()
// )

const isBeforeFirstRace = false
</script>
