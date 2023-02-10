<template>
	<div class="page--regular page--admin">
		<DriverList />
		<VueButton type="secondary" @click="driversStore.clearAllDriverScores()"
			>Coureursresultaten resetten</VueButton
		>
		<StickyBlock>
			<router-link to="/admin/drivers/new" class="button button--primary"
				>Nieuwe coureur</router-link
			>
		</StickyBlock>
	</div>
</template>

<script setup lang="ts">
import { useDrivers } from "@/store/drivers"
import DriverList from "@/components/DriverList.vue"
import StickyBlock from "@/elements/StickyBlock.vue"
import VueButton from "@/elements/VueButton.vue"

const driversStore = useDrivers()
</script>

<style lang="scss" scoped>
.page--regular {
	padding-bottom: 100px;

	.button {
		margin: 0 12px;
	}
}
</style>
