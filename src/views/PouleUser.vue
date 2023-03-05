<template>
	<div class="page--regular container">
		<h2 v-if="currentPouleUser">
			{{ currentPouleUser.name }}
			<small>{{ getPoints(currentPouleUser.score) }} pt</small>
		</h2>
		<RaceList />
	</div>
</template>

<script setup lang="ts">
import RaceList from "@/components/RaceList.vue"
import { getPoints } from "@/composables/getters"
import { useUsers } from "@/store/users"
import { storeToRefs } from "pinia"
const { currentPouleUser } = storeToRefs(useUsers())
</script>
