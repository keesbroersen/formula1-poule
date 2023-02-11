<template>
	<div class="result-list">
		<div class="result-list__header">
			<p>Resultaat</p>
			<p>Jouw voorspelling</p>
		</div>
		<slot></slot>
	</div>
</template>

<style scoped lang="scss">
.result-list {
	&__header {
		display: flex;
		border-bottom: 1px solid var(--background-opacity);
		padding: 0px 100px 6px 58px;
		width: 100%;
		color: var(--general-opacity);
		font-size: 12px;

		p {
			flex: 1;
		}
	}
}
</style>
