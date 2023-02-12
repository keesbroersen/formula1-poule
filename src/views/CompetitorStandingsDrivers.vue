<template>
	<div class="list">
		<div
			v-for="driver in driversSortedByPoints"
			:key="driver.id"
			class="list-item"
		>
			{{ driver.name }} - {{ getPoints(driver.points) }}
		</div>
	</div>
</template>

<script setup lang="ts">
import { useDrivers } from "@/store/drivers"
import { computed } from "vue"
import { getPoints } from "@/composables/getters"

const driversStore = useDrivers()
const driversSortedByPoints = computed(() => {
	const list = driversStore.drivers
	return list.sort((a, b) => getPoints(b.points) - getPoints(a.points))
})
</script>
