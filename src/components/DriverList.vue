<template>
	<div class="list">
		<DriverListItem
			v-for="driver in store.drivers"
			:key="driver.id"
			:driver="driver"
		/>
	</div>
</template>

<script setup lang="ts">
import { useDrivers } from "@/store/drivers"
import DriverListItem from "./DriverListItem.vue"

const store = useDrivers()
</script>
