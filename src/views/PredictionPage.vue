<template>
	<div v-if="currentRace" class="page--regular">
		<h2>{{ currentRace?.circuit }}</h2>
		<div class="page-navigation">
			<router-link :to="`/races/${currentRace.slug}/qualification`"
				>Kwalificatie</router-link
			>
			<router-link :to="`/races/${currentRace.slug}/race`">Race</router-link>
		</div>
		<form @submit.prevent="submit" class="form">
			<router-view />

			<StickyBlock>
				<VueButton :type="isSubmitting ? 'loading' : 'primary'"
					>Voorspel kwalificatie</VueButton
				>
			</StickyBlock>
		</form>
	</div>
</template>

<script setup lang="ts">
import { useRaces } from "@/store/races"
import { usePredictions } from "@/store/predictions"
import { storeToRefs } from "pinia"
import StickyBlock from "@/elements/StickyBlock.vue"
import VueButton from "@/elements/VueButton.vue"
import { ref } from "vue"

const raceStore = useRaces()
const predictionStore = usePredictions()
const { currentRace } = storeToRefs(raceStore)
const isSubmitting = ref(false)

const submit = async () => {
	predictionStore.addPrediction()
}
</script>

<style lang="scss">
.page-navigation {
	display: flex;
	gap: 16px;
	margin: 16px 0;
}
</style>
