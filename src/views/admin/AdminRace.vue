<template>
	<div class="page--regular container" v-if="currentRace">
		<h2>{{ currentRace.circuit }}</h2>
		<form @submit.prevent="submit" class="form">
			<InputField type="text">
				<input type="text" v-model="currentRace.circuit" placeholder=" " />
				<span>Circuit</span>
			</InputField>
			<InputField type="text">
				<input type="text" v-model="currentRace.country" placeholder=" " />
				<span>Land</span>
			</InputField>
			<InputField type="text">
				<input type="text" v-model="currentRace.countryCode" placeholder=" " />
				<span>Landcode</span>
			</InputField>
			<DatePicker
				v-model="currentRace.dates.qualification"
				label="Kwalificatie"
			/>
			<DatePicker v-model="currentRace.dates.race" label="Race" />
			<InputField type="checkbox">
				<input
					type="checkbox"
					v-model="currentRace.isSprintRace"
					placeholder=" "
				/>
				<span>Is sprintrace</span>
			</InputField>

			<ErrorMessage :error="error" />

			<VueButton :type="isSubmitting ? 'loading' : 'primary'"
				>Race {{ currentRace.id ? "aanpassen" : "toevoegen" }}</VueButton
			>
		</form>
		<StickyBlock>
			<VueButton
				@click="removeRace"
				v-if="currentRace"
				:type="isRemoving ? 'loading' : 'secondary'"
				>Race verwijderen</VueButton
			>
		</StickyBlock>
	</div>
</template>

<script setup lang="ts">
import { storeToRefs } from "pinia"
import { useRaces } from "@/store/races"
import VueButton from "@/elements/VueButton.vue"
import { ref } from "vue"
import StickyBlock from "@/elements/StickyBlock.vue"
import InputField from "@/elements/InputField.vue"
import { RaceDates } from "@/models/race.model"
import ErrorMessage from "../../elements/ErrorMessage.vue"
import DatePicker from "@/elements/DatePicker.vue"

const raceStore = useRaces()
const { currentRace } = storeToRefs(raceStore)
const isSubmitting = ref(false)
const isRemoving = ref(false)
const error = ref()

if (!currentRace.value.dates) currentRace.value.dates = {} as RaceDates

const submit = async () => {
	isSubmitting.value = true
	error.value = null

	try {
		if (currentRace.value.id) {
			return await raceStore.updateRace()
		}
		return await raceStore.addRace()
	} catch (err) {
		isSubmitting.value = false
		error.value = err
	}
}

const removeRace = () => {
	if (!currentRace) return
	isRemoving.value = true
	error.value = null

	try {
		raceStore.removeRace()
	} catch (err) {
		isRemoving.value = false
		error.value = err
	}
}
</script>
