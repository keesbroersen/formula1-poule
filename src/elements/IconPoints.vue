<template>
	<svg
		xmlns="http://www.w3.org/2000/svg"
		viewBox="0 0 45 25"
		height="25"
		class="icon-points"
	>
		<mask :id="maskId">
			<rect x="0" y="0" width="45" height="25" fill="white" />
			<text
				class="text"
				textAnchor="end"
				x="6"
				y="18"
				:mask="`url(#${maskId})`"
			>
				{{ props.points || "-" }}
			</text>
			<text
				class="points"
				textAnchor="start"
				x="26"
				y="18"
				:mask="`url(#${maskId})`"
			>
				pt
			</text>
		</mask>
		<rect
			x="0"
			width="45"
			height="25"
			rx="5"
			:mask="`url(#${maskId})`"
			fill="white"
		/>
	</svg>
</template>

<script setup lang="ts">
import { computed } from "vue"

const props = defineProps({
	points: {
		type: Number,
		required: false,
		default: 0
	}
})

const maskId = computed(() => `maskPoints${props.points}`)
</script>

<style lang="scss" scoped>
.text {
	font-size: 16px;
	font-weight: bold;
}

.points {
	font-size: 11px;
}
</style>
