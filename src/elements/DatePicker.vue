<template>
	<InputField type="date">
		<input
			type="datetime-local"
			id="date-picker"
			v-model="selectedDateTime"
			@input="emitChange"
		/>
		<span>{{ label }}</span>
	</InputField>
</template>

<script setup lang="ts">
import { Ref, ref, watch } from "vue"
import InputField from "./InputField.vue"
import { Timestamp } from "@firebase/firestore"
import moment from "moment"

const props = defineProps({
	modelValue: {
		type: Timestamp,
		required: false,
		default: Timestamp.now()
	},
	label: {
		type: String,
		required: true
	}
})

const emit = defineEmits<{
	(event: "update:modelValue", value: Timestamp): void
}>()

const selectedDateTime: Ref<string> = ref(
	moment(props.modelValue.toDate()).format("YYYY-MM-DDTHH:mm")
)

const emitChange = () => {
	if (!selectedDateTime.value) return
	emit(
		"update:modelValue",
		Timestamp.fromDate(new Date(selectedDateTime.value))
	)
}

watch(
	() => props.modelValue,
	(newValue) => {
		selectedDateTime.value = moment(newValue.toDate()).format(
			"YYYY-MM-DDTHH:mm"
		)
	}
)
</script>
