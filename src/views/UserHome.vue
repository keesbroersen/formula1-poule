<template>
	<div class="page--regular">
		<MultiPageNavigation>
			<router-link :to="`/`">Voorspellingen</router-link>
			<router-link :to="`/poule`">Poule</router-link>
		</MultiPageNavigation>
		<router-view />
	</div>
</template>

<script setup lang="ts">
import MultiPageNavigation from "@/components/MultiPageNavigation.vue"
</script>
