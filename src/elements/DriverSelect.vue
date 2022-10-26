<template>
	<div class="driver-select">
		{{ props.label }}
		<v-select
			:options="options"
			v-model="selectValue"
			:reduce="(driver: Driver) => driver.id"
		>
			<template v-slot:option="option">
				<div class="option" :class="{ 'is-picked': option.isPicked }">
					{{ option.label }}
				</div>
			</template>
		</v-select>
	</div>
</template>

<script setup lang="ts">
import { computed } from "vue"
import vSelect from "vue-select"
import "vue-select/dist/vue-select.css"
import { usePredictions } from "@/store/predictions"
import { storeToRefs } from "pinia"
import { Driver } from "@/models/driver.model"

const predictionStore = usePredictions()
const { getPredictionDrivers } = storeToRefs(predictionStore)

const props = defineProps({
	position: {
		required: true,
		type: String
	},
	type: {
		required: true,
		type: String
	},
	label: {
		required: true,
		type: String
	},
	modelValue: String
})

const emit = defineEmits<{
	(event: "update:modelValue", value: string | undefined): void
}>()

const selectValue = computed({
	get: () => {
		return props.modelValue
	},
	set: (value) => {
		emit("update:modelValue", value)
	}
})

type Option = {
	label: string
	id: string
	isPicked: boolean
}

const options = computed(() =>
	getPredictionDrivers.value.map(
		({ name, id, pickedForQualification, pickedForRace }): Option => {
			return {
				label: name,
				id,
				isPicked: !!pickedForQualification || !!pickedForRace
			}
		}
	)
)
</script>

<style lang="scss" scoped>
div {
	--vs-controls-color: #664cc3;
	--vs-border-color: #664cc3;

	--vs-dropdown-bg: #282c34;
	--vs-dropdown-color: #cc99cd;
	--vs-dropdown-option-color: #cc99cd;

	--vs-selected-bg: #664cc3;
	--vs-selected-color: #eeeeee;

	--vs-search-input-color: #eeeeee;

	--vs-dropdown-option--active-bg: #664cc3;
	--vs-dropdown-option--active-color: #eeeeee;
}

.driver-select {
	display: flex;
	align-items: center;
	width: 100%;
}

.v-select {
	width: 100%;
}

.option {
	&.is-picked {
		opacity: 0.5;
	}
}
</style>
