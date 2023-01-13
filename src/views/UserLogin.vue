<template>
	<div class="page--regular container">
		<h2>Login to Your Account</h2>
		<form class="form">
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
		</form>
		<StickyBlock>
			<VueButton @click="login" :type="isLoggingIn ? 'loading' : 'primary'"
				>Login</VueButton
			>
		</StickyBlock>
	</div>
</template>

<script setup lang="ts">
import { ref } from "vue"
import { getAuth, signInWithEmailAndPassword } from "firebase/auth"
import { useRouter } from "vue-router"
import StickyBlock from "@/elements/StickyBlock.vue"
import VueButton from "@/elements/VueButton.vue"
import InputField from "@/elements/InputField.vue"
const email = ref("")
const password = ref("")
const router = useRouter()
const errMsg = ref()
const isLoggingIn = ref(false)

const login = () => {
	const auth = getAuth()
	isLoggingIn.value = true
	signInWithEmailAndPassword(auth, email.value, password.value)
		.then(() => {
			router.push("/")
		})
		.catch((error) => {
			switch (error.code) {
				case "auth/invalid-email":
					errMsg.value = "Invalid email"
					break
				case "auth/user-not-found":
					errMsg.value = "No account with that email was found"
					break
				case "auth/wrong-password":
					errMsg.value = "Incorrect password"
					break
				default:
					errMsg.value = "Email or password was incorrect"
					break
			}
		})
		.finally(() => (isLoggingIn.value = false))
}
</script>
