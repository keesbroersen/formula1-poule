<template>
	<ListHeader v-if="selectOptions.length">
		<SelectButton :options="selectOptions" @change="onChange" />
	</ListHeader>
	<div v-if="poules.length" class="poule-list">
		<div class="poule-list__content">
			<div v-for="user in currentPoule?.users" :key="user">{{ user }}</div>
		</div>
		<div>
			Mensen uitnodigen via: <a :href="pouleLink">{{ pouleLink }}</a>
		</div>
		<RouterLink to="/poule/register">Maak een nieuw poule</RouterLink>
	</div>
	<div v-else class="no-poule container">
		<p>
			Je bent nog geen lid van een poule! Maak een nieuwe poule aan, of vraag om
			de registratielink van een bestaande poule.
		</p>
		<RouterLink to="/poule/register" class="button button--primary"
			>Maak een nieuw poule</RouterLink
		>
	</div>
</template>

<script setup lang="ts">
import { usePoules } from "@/store/poules"
import { storeToRefs } from "pinia"
import { computed } from "vue"
import ListHeader from "./ListHeader.vue"
import SelectButton from "@/elements/SelectButton.vue"
import { pouleLink } from "@/composables/functions"

const pouleStore = usePoules()
const { currentPoule, poules } = storeToRefs(pouleStore)

const selectOptions = computed(() =>
	poules.value.map((poule) => {
		return {
			label: poule.name,
			value: poule.id || ""
		}
	})
)

const onChange = (value: string) => {
	pouleStore.setCurrentPoule(value)
}
</script>

<style scoped lang="scss">
.race-list {
	display: flex;
	flex-direction: column;
	border-top: 1px solid var(--background-opacity);
	padding-bottom: 32px;
	width: 100%;

	&__filters {
		display: flex;
		margin-top: 8px;
		gap: 8px;
	}
	&__content {
		display: flex;
		flex-direction: column;
	}
}
</style>
