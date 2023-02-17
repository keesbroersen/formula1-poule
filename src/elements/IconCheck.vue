<template>
	<svg
		xmlns="http://www.w3.org/2000/svg"
		viewBox="0 0 45 25"
		height="25"
		class="check-icon"
		:class="props.check ? 'check-icon--with-icon' : ''"
	>
		<mask :id="maskId">
			<rect x="0" y="0" width="45" height="25" fill="white" />
			<text
				class="text"
				textAnchor="end"
				x="7"
				y="18"
				:mask="`url(#${maskId})`"
			>
				{{ props.content || "-" }}
			</text>

			<path
				v-if="props.check"
				fill="black"
				fillRule="nonzero"
				transform="translate(22,6)"
				d="m5.665 11.392 9.37-9.37a.375.375 0 0 0 0-.53L14.15.608a.375.375 0 0 0-.53 0L5.4 8.828 2.38 5.808a.375.375 0 0 0-.53 0l-.884.884a.375.375 0 0 0 0 .53l4.169 4.17a.375.375 0 0 0 .53 0Z"
			/>

			<path
				v-else
				fill="black"
				fillRule="nonzero"
				transform="translate(25,8)"
				d="M1.634 9.854 5 6.487l3.366 3.367a.5.5 0 0 0 .706 0l.782-.782a.5.5 0 0 0 0-.706L6.487 5l3.367-3.366a.5.5 0 0 0 0-.706L9.072.146a.5.5 0 0 0-.706 0L5 3.513 1.634.146a.5.5 0 0 0-.706 0L.146.928a.5.5 0 0 0 0 .706L3.513 5 .146 8.366a.5.5 0 0 0 0 .706l.782.782a.5.5 0 0 0 .706 0Z"
			/>
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
	content: {
		type: String,
		required: false,
		default: ""
	},
	check: {
		type: Boolean,
		required: false,
		default: false
	}
})

const maskId = computed(() => `maskPoints${props.content}`)
</script>

<style lang="scss" scoped>
.text {
	font-size: 16px;
}

.inactive {
	opacity: 0.5;
}
</style>
