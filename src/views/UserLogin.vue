<template>
	<div class="page--regular container">
		<h2>Login to Your Account</h2>
		<form class="form" @submit.prevent="login">
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
				<span>Password</span>
			</InputField>

			<p v-if="errMsg">{{ errMsg }}</p>

			<p>
				Nog geen account?
				<router-link :to="{ name: 'user_register' }">Registreer</router-link>
			</p>

			<StickyBlock>
				<VueButton :type="isLoggingIn ? 'loading' : 'primary'">Login</VueButton>
			</StickyBlock>
		</form>
	</div>
</template>

<script setup lang="ts">
import { ref } from "vue"
import { useRouter } from "vue-router"
import { useUsers } from "@/store/users"
import StickyBlock from "@/elements/StickyBlock.vue"
import VueButton from "@/elements/VueButton.vue"
import InputField from "@/elements/InputField.vue"

const userStore = useUsers()
const email = ref("")
const password = ref("")
const router = useRouter()
const errMsg = ref()
const isLoggingIn = ref(false)

const login = async () => {
	try {
		isLoggingIn.value = true
		await userStore.loginUser(email.value, password.value)
		router.push("/")
	} catch (error) {
		errMsg.value = error
	}
	isLoggingIn.value = false
}
</script>
