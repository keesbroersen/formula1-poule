<template>
	<div class="page--regular page--admin">
		<TeamList />

		<router-link to="/admin/teams/new" class="button button--primary"
			>Nieuw team</router-link
		>
	</div>
</template>

<script setup lang="ts">
import TeamList from "@/components/TeamList.vue"
</script>

<style lang="scss" scoped>
.button {
	margin: 0 12px;
	width: calc(100% - 24px);
}
</style>
