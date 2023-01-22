<template>
	<div class="page--regular container">
		<h2>Create an Account</h2>
		<form class="form" @submit.prevent="registerUser">
			<InputField type="text">
				<input type="text" v-model="name" name="name" placeholder=" " />
				<span>Naam</span>
			</InputField>

			<InputField type="text">
				<input type="email" v-model="email" name="email" placeholder=" " />
				<span>Email</span>
			</InputField>

			<InputField type="text">
				<input
					type="password"
					v-model="password"
					name="password"
					placeholder=" "
				/>
				<span>Wachtwoord</span>
			</InputField>

			<p v-if="errMsg">{{ errMsg }}</p>
			<StickyBlock>
				<VueButton :type="isRegistering ? 'loading' : 'primary'"
					>Registreer</VueButton
				>
			</StickyBlock>
		</form>
	</div>
</template>

<script setup lang="ts">
import { ref } from "vue"
import { useUsers } from "@/store/users"
import { useRouter } from "vue-router"
import InputField from "@/elements/InputField.vue"
import StickyBlock from "@/elements/StickyBlock.vue"
import VueButton from "@/elements/VueButton.vue"

const router = useRouter()
const userStore = useUsers()
const email = ref("")
const password = ref("")
const name = ref("")
const errMsg = ref()
const isRegistering = ref(false)

const registerUser = async () => {
	try {
		isRegistering.value = true
		await userStore.registerUser(name.value, email.value, password.value)
		router.push("/")
	} catch (error) {
		errMsg.value = error
	}
	isRegistering.value = false
}
</script>
