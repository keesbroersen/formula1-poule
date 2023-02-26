<template>
	<ListHeader v-if="selectOptions.length">
		<SelectButton :options="selectOptions" @change="onChange" />
	</ListHeader>
	<div v-if="poules.length" class="poule-list">
		<PouleListItem
			v-for="(user, index) in users"
			:user="user"
			:index="index"
			:key="user.id"
		/>

		<div class="buttons container">
			<VueButton @click="copyInviteLink">{{ copyInviteLinkText }}</VueButton>
			<a
				:href="`whatsapp://send?text=Doe mee in onze poule! Ga naar ${pouleLink}`"
				class="button button--secondary"
				>Uitnodigen via Whatsapp</a
			>
			<RouterLink to="/poule/register" class="button button--secondary"
				>Nieuw poule</RouterLink
			>
		</div>
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
import { computed, ref } from "vue"
import ListHeader from "./ListHeader.vue"
import SelectButton from "@/elements/SelectButton.vue"
import { pouleLink } from "@/composables/functions"
import PouleListItem from "./PouleListItem.vue"
import { getPoints } from "@/composables/getters"
import { UserWithPoints } from "@/models/user.model"
import VueButton from "@/elements/VueButton.vue"

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
	pouleStore.currentPouleId = value
}

const copyInviteLinkText = ref("Uitnodigen via link")
const copyInviteLink = () => {
	navigator.clipboard.writeText(pouleLink.value).then(
		() => {
			copyInviteLinkText.value = "Gekopieerd naar klembord!"
		},
		() => {
			copyInviteLinkText.value = "Er ging iets fout"
		}
	)
	setTimeout(() => {
		copyInviteLinkText.value = "Uitnodigen via link"
	}, 2000)
}

const users = computed(() => {
	const users = currentPoule.value?.users.map((user) => {
		return {
			...user,
			pointsTotal: getPoints(user.score),
			lastPointsGained: user.score[user.score.length - 1] || 0
		} as UserWithPoints
	})

	const previousSort = [...users]
	const currentSort = [...users]

	previousSort.sort((a, b) => {
		const previousScoreA = a.pointsTotal - a.lastPointsGained
		const previousScoreB = b.pointsTotal - b.lastPointsGained
		return previousScoreB - previousScoreA
	})

	currentSort.sort((a, b) => b.pointsTotal - a.pointsTotal)

	const result = currentSort.map((user, index) => {
		return {
			...user,
			positionsGained:
				previousSort.findIndex((u) => u.slug === user.slug) - index
		}
	})

	return result
})
</script>

<style scoped lang="scss">
.poule-list {
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

.buttons {
	margin-top: 16px;
}

.button {
	margin-top: 8px;
}
</style>
