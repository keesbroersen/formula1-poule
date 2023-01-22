<template>
	<div class="page--regular container">
		<h2>Aansluiten bij poule</h2>
		<form v-if="!userAdded" @submit.prevent="registerPoule" class="form">
			<InputField type="number">
				<input
					type="number"
					v-model="number"
					name="pouleNumber"
					placeholder=" "
					required
				/>
				<span>Registratiecode</span>
			</InputField>

			<p v-if="errMsg">{{ errMsg }}</p>

			<StickyBlock>
				<VueButton
					:type="isAddingUserToPoule ? 'loading' : 'primary'"
					:disabled="!number"
					>Aansluiten bij poule</VueButton
				>
			</StickyBlock>
		</form>

		<div v-else class="succes">
			<p>
				Yes! Je bent een hooggeëerd lid van
				<strong>{{ currentPoule.name }}</strong
				>. Ga naar <RouterLink to="/">home</RouterLink>, doe je voorspellingen
				en laat zien dat jij het grootste Formule 1 brein bent!
			</p>
		</div>
	</div>
</template>

<script setup lang="ts">
import InputField from "@/elements/InputField.vue"
import StickyBlock from "@/elements/StickyBlock.vue"
import VueButton from "@/elements/VueButton.vue"
import { usePoules } from "@/store/poules"
import { storeToRefs } from "pinia"
import { onMounted, ref } from "vue"
import { useRoute } from "vue-router"

const route = useRoute()
const pouleStore = usePoules()
const { currentPoule } = storeToRefs(pouleStore)

const isAddingUserToPoule = ref(false)
const number = ref(0)
const errMsg = ref("")
const userAdded = ref(false)

onMounted(() => {
	if (route.query.code) number.value = parseInt(route.query.code)
})

const registerPoule = () => {
	isAddingUserToPoule.value = true
	pouleStore
		.addUserToPoule(route.params.id)
		.then(() => {
			userAdded.value = true
		})
		.catch((err) => (errMsg.value = err))
		.finally(() => {
			isAddingUserToPoule.value = false
		})
}
</script>

<style scoped>
input::-webkit-outer-spin-button,
input::-webkit-inner-spin-button {
	-webkit-appearance: none;
	margin: 0;
}

/* Firefox */
input[type="number"] {
	-moz-appearance: textfield;
}
</style>
