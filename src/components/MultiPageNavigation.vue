<template>
	<div class="multi-page-navigation">
		<slot></slot>
	</div>
</template>

<style lang="scss">
.multi-page-navigation {
	display: flex;
	border-bottom: 2px solid var(--background-opacity);
	margin-bottom: 32px;

	a {
		margin-bottom: -2px;
		flex: 1;
		display: flex;
		align-items: center;
		justify-content: center;
		height: 48px;
		text-transform: uppercase;
		font-weight: bold;
		text-align: center;

		&:not(.router-link-active) {
			color: var(--general-opacity);
		}

		&.router-link-active {
			border-bottom: 2px solid #fff;
		}
	}
}
</style>
