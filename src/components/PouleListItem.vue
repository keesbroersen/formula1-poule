<template>
	<router-link
		v-if="user"
		class="poule-list-item container"
		:to="`users/${user.id}`"
	>
		{{ user.name }} - {{ user.score }}
	</router-link>
</template>

<script setup lang="ts">
import { computed } from "vue"
import { useUsers } from "@/store/users"

const usersStore = useUsers()

const props = defineProps<{
	userId: string
}>()

const user = computed(() => {
	return usersStore.users.find((user) => user.id === props.userId)
})
</script>

<style lang="scss" scoped>
.poule-list-item {
	display: flex;
	align-items: center;
	color: white;
	border-bottom: 1px solid var(--background-opacity);
	padding: 0 16px;
	height: 50px;
}

.color {
	margin: 0 16px 0 0;
	height: 100%;
	width: 4px;
}
.country {
	margin-left: auto;
	width: 50%;
	color: var(--general-opacity);
}
</style>
