<template>
	<div class="page--regular container">
		<h2>User account</h2>
		<form class="form" @submit.prevent="updateAccount">
			<InputField type="text">
				<input type="text" v-model="name" name="name" placeholder=" " />
				<span>Name</span>
			</InputField>

			<InputField type="text">
				<input
					type="email"
					:value="email"
					name="email"
					placeholder=" "
					disabled
				/>
				<span>Email</span>
			</InputField>

			<VueButton>Update name</VueButton>
		</form>

		<StickyBlock>
			<VueButton @click="removeUser">Verwijder account</VueButton>
		</StickyBlock>
	</div>
</template>

<script setup lang="ts">
import { useUsers } from "@/store/users"
import { storeToRefs } from "pinia"

import InputField from "@/elements/InputField.vue"
import VueButton from "@/elements/VueButton.vue"
import { computed } from "vue"
import { useCurrentUser } from "vuefire"
import StickyBlock from "@/elements/StickyBlock.vue"

const userStore = useUsers()
const { user } = storeToRefs(userStore)

const name = computed({
	get() {
		return user.value?.name || ""
	},
	set() {}
})

const email = computed(() => useCurrentUser().value?.email || "")

const updateAccount = () => {
	userStore.updateUser(name.value)
}

const removeUser = () => {
	userStore.removeUser()
}
</script>
