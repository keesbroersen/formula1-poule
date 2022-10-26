<template>
	<div class="flag">
		<img :src="`../flags/${props.countryCode}.svg`" :alt="props.countryCode" />
	</div>
</template>

<script setup>
const props = defineProps({
	countryCode: String
})
</script>

<style>
.flag {
	position: relative;
	overflow: hidden;
	border-radius: 3px;
	width: 42px;
	line-height: 0;
	background: #f2f2f2;
}

.flag:before,
.flag:after {
	content: "";
	position: absolute;
	top: 0;
	left: 0;
	height: 100%;
	width: 100%;
	opacity: 0.1;
	background: linear-gradient(
		90deg,
		rgba(0, 0, 0, 1) 0%,
		rgba(0, 0, 0, 0) 16%,
		rgba(0, 0, 0, 1) 32%,
		rgba(0, 0, 0, 0) 50%,
		rgba(0, 0, 0, 1) 68%,
		rgba(0, 0, 0, 0) 84%,
		rgba(0, 0, 0, 1) 100%
	);
}

.flag:after {
	opacity: 0.15;
	background: linear-gradient(
		90deg,
		rgba(255, 255, 255, 0) 0%,
		rgba(255, 255, 255, 1) 16%,
		rgba(255, 255, 255, 0) 32%,
		rgba(255, 255, 255, 1) 50%,
		rgba(255, 255, 255, 0) 68%,
		rgba(255, 255, 255, 1) 84%,
		rgba(255, 255, 255, 0) 100%
	);
}
</style>
