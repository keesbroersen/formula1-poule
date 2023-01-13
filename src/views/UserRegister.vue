<template>
	<div class="page--regular container">
		<h2>Create an Account</h2>
		<p><input type="text" placeholder="Name" name="name" v-model="name" /></p>
		<p>
			<input type="email" placeholder="Email" name="email" v-model="email" />
		</p>
		<p>
			<input
				type="password"
				placeholder="Password"
				name="password"
				v-model="password"
			/>
		</p>
		<p><button @click="register">Submit</button></p>
	</div>
</template>

<script setup lang="ts">
import { ref } from "vue"
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth"
import { useRouter } from "vue-router"
const email = ref("")
const password = ref("")
const name = ref("")
const router = useRouter()

const register = () => {
	const auth = getAuth()
	createUserWithEmailAndPassword(auth, email.value, password.value)
		.then(() => {
			router.push("/")
		})
		.catch((error) => {
			console.warn(error.code)
			alert(error.message)
		})
}
</script>
