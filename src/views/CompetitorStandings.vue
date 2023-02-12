<template>
	<div class="page--regular">
		<MultiPageNavigation>
			<router-link :to="`/standings/drivers`">Coureurs</router-link>
			<router-link :to="`/standings/teams`">Teams</router-link>
		</MultiPageNavigation>
		<router-view />
	</div>
</template>

<script setup lang="ts">
import MultiPageNavigation from "@/components/MultiPageNavigation.vue"
</script>
