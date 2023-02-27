<template>
	<router-link class="team-list-item container" :to="`teams/${team.slug}`">
		<span class="color" :style="`background-color: ${team.color}`"></span>
		{{ team.name }}
		<small class="country">{{ team.country }}</small>
	</router-link>
</template>

<script setup lang="ts">
import { computed } from "vue"
import { Team } from "@/models/team.model"
import moment from "moment"
moment.locale("nl")

const props = defineProps<{
	team: Team
}>()

const team = computed(() => {
	return props.team
})
</script>

<style lang="scss" scoped>
.team-list-item {
	display: flex;
	align-items: center;
	gap: 12px;
	color: white;
	border-bottom: 1px solid var(--background-opacity);
	padding: 0 16px;
	height: 50px;
}

.color {
	margin: 4px 0;
	height: calc(100% - 8px);
	width: 4px;
	border-radius: 2px;
}
.country {
	margin-left: auto;
	width: 50%;
	color: var(--general-opacity);
}
</style>
