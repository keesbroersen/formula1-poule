<template>
	<div class="page--regular">
		<MultiPageNavigation>
			<router-link :to="{ name: 'user_predictions' }"
				>Voorspellingen</router-link
			>
			<router-link :to="{ name: 'user_poule' }">Poule</router-link>
		</MultiPageNavigation>
		<router-view />
	</div>
</template>

<script setup lang="ts">
import MultiPageNavigation from "@/components/MultiPageNavigation.vue"
</script>
