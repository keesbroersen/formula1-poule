<template>
	<div class="driver-select">
		<div class="label">
			<IconStar v-if="props.label === 'driverOfTheDay'" />
			<IconStopwatch v-else-if="props.label === 'fastestLap'" />
			<p v-else>{{ props.label }}</p>
		</div>
		<v-select
			:options="options"
			v-model="selectValue"
			:reduce="(driver: Driver) => driver.id"
			:components="{ Deselect: IconTimes, OpenIndicator: IconChevronDown }"
			:placeholder="placeholder"
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
import { usePredictions } from "@/store/predictions"
import { useTeams } from "@/store/teams"
import { storeToRefs } from "pinia"
import { Driver } from "@/models/driver.model"
import IconStar from "@/assets/IconStar.vue"
import IconStopwatch from "@/assets/IconStopwatch.vue"
import IconTimes from "@/assets/IconTimes.vue"
import IconChevronDown from "@/assets/IconChevronDown.vue"

type Option = {
	label: string
	id: string
	isPicked: boolean
	color: string
}

const predictionStore = usePredictions()
const teamsStore = useTeams()
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

const checkIfIsPicked = (
	pickedForQualification: string | undefined,
	pickedForRace: string | undefined,
	pickedForDriverOfTheDay: boolean,
	pickedForFastestLap: boolean
): boolean => {
	if (props.position === "fastestLap") {
		return pickedForFastestLap
	}

	if (props.position === "driverOfTheDay") {
		return pickedForDriverOfTheDay
	}

	if (
		(props.type === "qualification" && !pickedForQualification) ||
		(pickedForQualification && !pickedForQualification.includes("pos")) ||
		(props.type === "race" && !pickedForRace) ||
		(pickedForRace && !pickedForRace.includes("pos"))
	) {
		return false
	}
	return true
}

const placeholder = computed(() => {
	switch (props.label) {
		case "fastestLap":
			return "Kies coureur voor snelste ronde"
		case "driverOfTheDay":
			return "Kies driver of the day"
		default:
			return "Kies coureur"
	}
})

const options = computed(() =>
	getPredictionDrivers.value.map(
		({
			name,
			id,
			teamId,
			pickedForQualification,
			pickedForRace,
			pickedForDriverOfTheDay,
			pickedForFastestLap
		}): Option => {
			return {
				label: name,
				id,
				color: teamsStore.getTeamById(teamId)?.color || "transparant",
				isPicked: checkIfIsPicked(
					pickedForQualification,
					pickedForRace,
					pickedForDriverOfTheDay,
					pickedForFastestLap
				)
			}
		}
	)
)
</script>

<style lang="scss">
.v-select {
	--vs-controls-color: #fff;
	--vs-border-color: #fff;
	--vs-border-width: 0;

	--vs-dropdown-bg: #262626;
	--vs-dropdown-color: #fff;
	--vs-dropdown-option-color: #fff;

	--vs-selected-bg: #fff;
	--vs-selected-color: #eeeeee;

	--vs-search-input-color: #eeeeee;

	--vs-dropdown-option--active-bg: #262626;
	--vs-dropdown-option--active-color: #eeeeee;

	height: 100%;
	width: 100%;
}

.vs {
	&__dropdown-toggle,
	&__selected-options,
	&__selected,
	&__dropdown-option {
		margin: 0;
		padding: 0;
		height: 100%;
	}

	&__selected,
	&__dropdown-option {
		padding: 4px 0;
		border: none;
	}

	&__search {
		text-indent: 12px;

		&::placeholder {
			color: var(--general-opacity);
		}
	}

	&__dropdown-menu {
		padding: 0;
		left: -40px;
		width: calc(100% + 40px);
	}

	&__dropdown-option {
		border-bottom: 1px solid var(--background-opacity);
		height: 50px;
	}

	&__actions {
		padding-right: 16px;
		opacity: 0.4;
	}

	&__clear {
		margin-right: 12px;
	}
}

.driver-select {
	display: flex;
	align-items: center;
	border-bottom: 1px solid var(--background-opacity);
	height: 50px;
	width: 100%;

	.team-indicator,
	.vs__selected-options {
		position: relative;
		display: flex;
		margin-right: 15px;
		height: 100%;

		&:before {
			content: "";
			display: block;
			position: absolute;
			border-radius: 2px;
			height: 40px;
			width: 4px;
			top: 4px;
			left: 0;
		}

		&:after {
			content: "";
			display: block;
			position: absolute;
			border-radius: 2px;
			z-index: 1px;
			top: 4px;
			left: 0;
			height: 40px;
			width: 4px;
			background: linear-gradient(
				310deg,
				rgba(255, 255, 255, 0),
				rgba(255, 255, 255, 0.4)
			);
		}
	}

	.team-indicator {
		border-radius: 2px;
		width: 4px;

		&:before,
		&:after {
			top: 0;
		}
	}

	.label {
		display: flex;
		align-items: center;
		justify-content: center;
		flex: 40px;
		color: var(--general-opacity);

		svg {
			opacity: 0.4;
		}
	}
}

.option {
	display: flex;
	align-items: center;
	padding: 0 16px 0 40px;
	height: 100%;

	&.is-picked {
		opacity: 0.35;
	}
}
</style>
