<template>
	<router-link
		v-if="props.user"
		class="poule-list-item container"
		:to="`poule/${props.user.slug}`"
	>
		{{ props.user.name }} - {{ props.user.score }}
	</router-link>
</template>

<script setup lang="ts">
import { User } from "@/models/user.model"

const props = defineProps<{
	user: User
}>()
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
