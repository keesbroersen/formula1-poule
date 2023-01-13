<template>
	<div class="page--regular container">
		<h2>User account</h2>
		<form class="form">
			<InputField type="text">
				<input type="text" v-model="name" name="name" placeholder=" " />
				<span>Name</span>
			</InputField>

			<InputField type="text">
				<input
					type="email"
					:value="user?.email"
					name="email"
					placeholder=" "
					disabled
				/>
				<span>Email</span>
			</InputField>

			<VueButton
				@click="updateAccount"
				:type="isUpdating ? 'loading' : 'primary'"
				>Update name</VueButton
			>
		</form>

		<StickyBlock>
			<VueButton @click="removeUser">Verwijder account</VueButton>
		</StickyBlock>
	</div>
</template>

<script setup lang="ts">
import InputField from "@/elements/InputField.vue"
import VueButton from "@/elements/VueButton.vue"
import { ref } from "vue"
import { useCurrentUser, updateCurrentUserProfile } from "vuefire"
import { getAuth, deleteUser } from "firebase/auth"
import StickyBlock from "@/elements/StickyBlock.vue"

const user = useCurrentUser()
const name = ref(user.value?.providerData[0].displayName)
const isUpdating = ref(false)

const updateAccount = () => {
	const userData = { displayName: name.value }
	isUpdating.value = true
	updateCurrentUserProfile(userData)
		.then((succes) => {
			console.log(succes)
		})
		.catch((error) => {
			console.warn(error.code)
			alert(error.message)
		})
		.finally(() => {
			isUpdating.value = false
		})
}

const removeUser = () => {
	const auth = getAuth()
	const user = auth.currentUser
	if (!user) return
	deleteUser(user)
		.then((succes) => {
			console.log(succes)
		})
		.catch((error) => {
			console.warn(error.code)
			alert(error.message)
		})
		.finally(() => {
			isUpdating.value = false
		})
}
</script>
