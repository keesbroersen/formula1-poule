<template>
	<div class="list">
		<PouleListItem
			v-for="(driver, index) in drivers"
			:user="driver"
			:index="index"
			:key="driver.id"
		/>
	</div>
</template>

<script setup lang="ts">
import { useDrivers } from "@/store/drivers"
import { computed } from "vue"
import PouleListItem from "@/components/PouleListItem.vue"
import { DriverWithPoints } from "@/models/driver.model"

const driversStore = useDrivers()

const drivers = computed(() => {
	const drivers = driversStore.drivers.map((driver) => {
		return {
			...driver,
			pointsTotal: driver.pointsTotal,
			lastPointsGained: driver.previousPointsTotal
		} as DriverWithPoints
	})

	const previousSort = [...drivers]
	const currentSort = [...drivers]

	previousSort.sort((a, b) => {
		const previousScoreA = a.pointsTotal - a.lastPointsGained
		const previousScoreB = b.pointsTotal - b.lastPointsGained
		return previousScoreB - previousScoreA
	})

	currentSort.sort((a, b) => b.pointsTotal - a.pointsTotal)

	const result = currentSort.map((driver, index) => {
		return {
			...driver,
			positionsGained:
				previousSort.findIndex((u) => u.slug === driver.slug) - index
		}
	})

	return result
})
</script>
