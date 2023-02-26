<template>
	<div class="driver-select">
		<div class="label">
			<component :is="getLabelComponent(label)" />
		</div>
		<v-select
			:options="options"
			v-model="selectValue"
			:reduce="(driver: Driver) => driver.id"
			:components="{ Deselect: IconTimes, OpenIndicator: IconChevronDown }"
			placeholder="Kies constructeur"
			:disabled="props.disabled"
		>
			<template #selected-option="{ label, color }">
				<div class="team-indicator" :style="{ backgroundColor: color }"></div>
				{{ label }}
			</template>
			<template v-slot:option="option">
				<div class="option" :class="{ 'is-picked': option.isPicked }">
					<div
						class="team-indicator"
						:style="{ backgroundColor: option.color }"
					></div>
					<div class="option__text">{{ option.label }}</div>
				</div>
			</template>
		</v-select>
	</div>
</template>

<script setup lang="ts">
import { computed } from "vue"
import vSelect from "vue-select"
import "vue-select/dist/vue-select.css"
import { useTeams } from "@/store/teams"
import { Driver } from "@/models/driver.model"
import { getLabelComponent } from "@/composables/getters"
import IconTimes from "@/assets/IconTimes.vue"
import IconChevronDown from "@/assets/IconChevronDown.vue"

type Option = {
	label: string
	id: string
	color: string
}

const teamsStore = useTeams()

const props = defineProps({
	label: {
		required: true,
		type: String
	},
	disabled: {
		required: false,
		type: Boolean,
		default: false
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

const options = computed(() =>
	teamsStore.teams.map((team): Option => {
		return {
			label: team.name,
			id: team.id,
			color: team.color
		}
	})
)
</script>
