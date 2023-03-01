<template>
	<form @submit.prevent="submit" class="season-prediction">
		<h3>
			Seizoenswinnaars <small>{{ timeUntilStartOfSeason }}</small>
		</h3>
		<div class="list">
			<DriverSelect
				label="trophy"
				position="0"
				type="qualification"
				v-model="driverPrediction"
				:disabled="props.seasonHasStarted"
			/>
			<TeamSelect
				label="tools"
				v-model="teamPrediction"
				:disabled="props.seasonHasStarted"
			/>
		</div>
		<VueButton
			v-if="!props.seasonHasStarted"
			:type="loading ? 'loading' : 'primary'"
			>Voorspel seizoenswinnaars</VueButton
		>
	</form>
</template>

<script setup lang="ts">
import DriverSelect from "@/elements/DriverSelect.vue"
import TeamSelect from "@/elements/TeamSelect.vue"
import VueButton from "@/elements/VueButton.vue"
import { useRaces } from "@/store/races"
import { useUsers } from "@/store/users"
import { ref, computed, onMounted } from "vue"
import moment from "moment"
const userStore = useUsers()
const raceStore = useRaces()
moment.locale("nl")

const props = defineProps({
	seasonHasStarted: {
		type: Boolean,
		required: true
	}
})

const driverPrediction = ref()
const teamPrediction = ref()
const loading = ref()

onMounted(async () => {
	await userStore.userLoading
	driverPrediction.value = userStore.user?.driverChampion
	teamPrediction.value = userStore.user?.constructorsChampion
})

const submit = async () => {
	loading.value = true
	try {
		await userStore.updateUserWithSeasonPrediction(
			driverPrediction.value,
			teamPrediction.value
		)
	} catch (error) {
		// @todo: handle error
	} finally {
		loading.value = false
	}
}

const timeUntilStartOfSeason = computed(() => {
	if (props.seasonHasStarted) return ""
	const firstRaceDate = raceStore.racesSorted[0]?.dates?.qualification?.toDate()
	return `nog ${moment(firstRaceDate).fromNow(true)}`
})
</script>

<style scoped lang="scss">
.season-prediction {
	display: flex;
	flex-direction: column;
	margin: 0 0 24px;
	padding: 24px 0;
	background: rgba(0, 0, 0, 0.15);
}

h3 {
	margin: 0 12px 12px;
	font-size: 18px;

	small {
		font-weight: normal;
		font-size: 14px;
		color: var(--general-opacity);
	}
}

.button {
	margin: 12px 12px 0;
	width: calc(100% - 24px);
}
</style>
