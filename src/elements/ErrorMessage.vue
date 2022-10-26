<template>
	<div v-if="error" class="error-message">
		{{ error.message }}
		<div class="error-message__close" @click="close">
			<IconTimes />
		</div>
	</div>
</template>

<script setup>
import { ref, watch } from "vue"
import IconTimes from "../assets/IconTimes.vue"

const props = defineProps({
	error: Object
})
const error = ref()

watch(
	() => props.error,
	(value) => {
		error.value = value
	}
)

const close = () => {
	error.value = false
}
</script>

<style lang="scss">
.error-message {
	display: flex;
	justify-content: space-between;
	padding: 12px;
	border-radius: 3px;
	color: #fff;
	background: #5e1e1e;

	&__close {
		padding: 8px;
		cursor: pointer;
	}
}
</style>
