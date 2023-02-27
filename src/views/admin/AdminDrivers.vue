<template>
	<div class="page--regular page--admin">
		<DriverList />

		<router-link to="/admin/drivers/new" class="button button--primary"
			>Nieuwe coureur</router-link
		>
	</div>
</template>

<script setup lang="ts">
import DriverList from "@/components/DriverList.vue"
</script>

<style scoped>
.button {
	margin: 12px 12px 0;
	width: calc(100% - 24px);
}
</style>
