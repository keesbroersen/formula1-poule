<template>
	<div class="select-button">
		<select class="select" v-model="selected">
			<option
				v-for="option in props.options"
				:key="option.value"
				:value="option.value"
			>
				{{ option.label }}
			</option>
		</select>
	</div>
</template>

<script setup lang="ts">
import { PropType, computed } from "vue"

interface Option {
	value: string
	label: string
}

const emit = defineEmits<{
	(event: "change", value: string): void
}>()

const props = defineProps({
	options: {
		type: Array as PropType<Option[]>,
		required: true
	},
	selected: String
})

const selected = computed({
	get: () => {
		const value = props.selected || props.options?.[0]?.value
		emit("change", value)
		return value
	},
	set: (value) => {
		emit("change", value)
	}
})
</script>

<style>
.select {
	-webkit-appearance: none;
	appearance: none;
	border: none;
	height: 32px;
	max-width: 300px;
	padding: 0 12px;
	border-radius: 3px;
	outline: none;
	background: var(--background-opacity);
	color: white;
	font-family: var(--font);
}
</style>
