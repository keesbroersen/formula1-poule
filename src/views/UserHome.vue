<template>
	<div class="page--regular">
		<MultiPageNavigation>
			<router-link :to="{ name: 'UserPredictions' }"
				>Voorspellingen</router-link
			>
			<router-link :to="{ name: 'UserPoule' }">Poule</router-link>
		</MultiPageNavigation>
		<router-view />
	</div>
</template>

<script setup lang="ts">
import MultiPageNavigation from "@/components/MultiPageNavigation.vue"
</script>
