<template>
	<div class="page--regular container">
		<h2>Nieuwe poule registreren</h2>
		<form v-if="!registrationDone" @submit.prevent="registerPoule" class="form">
			<InputField type="text">
				<input
					type="text"
					v-model="name"
					name="pouleName"
					placeholder=" "
					required
				/>
				<span>Poulenaam</span>
			</InputField>

			<p v-if="errMsg">{{ errMsg }}</p>

			<StickyBlock>
				<VueButton
					:type="isRegisteringPoule ? 'loading' : 'primary'"
					:disabled="!name"
					>Registreer poule</VueButton
				>
			</StickyBlock>
		</form>

		<div v-else class="invite-friends">
			Nodig je vrienden uit om mee te spelen!
			<a :href="whatsAppLink" class="button">Deel poule via Whatsapp</a>
			of deel de volgende link: {{ pouleLink }}
		</div>
	</div>
</template>

<script setup lang="ts">
import InputField from "@/elements/InputField.vue"
import StickyBlock from "@/elements/StickyBlock.vue"
import VueButton from "@/elements/VueButton.vue"
import { usePoules } from "@/store/poules"
import { storeToRefs } from "pinia"
import { ref, computed } from "vue"
import { pouleLink } from "@/composables/functions"

const pouleStore = usePoules()
const { currentPoule } = storeToRefs(pouleStore)

const isRegisteringPoule = ref(false)
const name = ref("")
const errMsg = ref("")
const registrationDone = ref(false)

const whatsAppLink = computed(
	() =>
		`https://api.whatsapp.com/send?text=Doe mee in onze poule: ${currentPoule.value.name}! Klik op ${pouleLink.value}`
)

const registerPoule = () => {
	isRegisteringPoule.value = true
	pouleStore
		.addPoule(name.value)
		.then(() => {
			registrationDone.value = true
		})
		.catch((err) => (errMsg.value = err))
		.finally(() => {
			isRegisteringPoule.value = false
		})
}
</script>
