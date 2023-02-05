<template>
	<label class="input-field" :class="`input-field--${props.type}`">
		<slot />
	</label>
</template>

<script setup lang="ts">
const props = defineProps({
	type: {
		type: String,
		required: true
	}
})
</script>

<style lang="scss">
.input-field {
	position: relative;
	overflow: hidden;
	display: flex;
	border-radius: 3px;

	input:disabled {
		opacity: 0.5;
	}

	&:not(.input-field--text) input {
		cursor: pointer;
	}

	&:not(.input-field--checkbox) input {
		-webkit-appearance: none;
		appearance: none;
		border: none;
		min-height: 50px;
		width: 100%;
		padding: 14px 12px 0;
		outline: none;
		background: var(--background-opacity);
		color: white;
		font-family: var(--font);
		font-size: 16px;

		&::-webkit-calendar-picker-indicator {
			filter: invert(1);
		}

		&:focus + span,
		&:not(:placeholder-shown) + span {
			position: absolute;
			top: 14px;
			font-size: 11px;
		}
	}

	&:not(.input-field--checkbox) span {
		position: absolute;
		top: 50%;
		left: 12px;
		transform: translateY(-50%);
		color: var(--general-opacity);
		transition: all 0.2s;
	}

	&--color:before {
		content: "";
		position: absolute;
		top: 0;
		left: 0;
		height: 100%;
		width: 100%;
		background: linear-gradient(
			126deg,
			rgba(0, 0, 0, 0.5),
			rgba(255, 255, 255, 0),
			rgba(255, 255, 255, 0.15)
		);
	}

	&--color input[type="color"] {
		padding: 0;
	}

	&--hidden {
		display: none;
	}

	&--checkbox {
		cursor: pointer;

		span {
			position: relative;
			display: flex;
			align-items: center;
			height: 32px;
			width: 32px;
			border-radius: 3px;
			background: var(--background-opacity);
			color: white;
			text-indent: 40px;
			white-space: nowrap;

			&:before {
				content: url('data:image/svg+xml, <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><path fill="%23fff" d="M438.6 105.4C451.1 117.9 451.1 138.1 438.6 150.6L182.6 406.6C170.1 419.1 149.9 419.1 137.4 406.6L9.372 278.6C-3.124 266.1-3.124 245.9 9.372 233.4C21.87 220.9 42.13 220.9 54.63 233.4L159.1 338.7L393.4 105.4C405.9 92.88 426.1 92.88 438.6 105.4H438.6z"/></svg>');
				position: absolute;
				top: 4px;
				left: -34px;
				height: 22px;
				width: 22px;
				opacity: 0.04;
			}
		}

		input {
			display: none;
		}

		input:checked + span:before {
			opacity: 1;
		}
	}
}
</style>
