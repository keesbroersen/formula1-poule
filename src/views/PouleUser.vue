<template>
	<div class="page--regular container">
		<h2>
			{{ pouleUser[0].name }}
			<small>{{ getPoints(pouleUser[0].score) }} pt</small>
		</h2>
		<RaceList />
	</div>
</template>

<script setup lang="ts">
import RaceList from "@/components/RaceList.vue"
import { getPoints } from "@/composables/getters"
import { useUsers } from "@/store/users"
import { storeToRefs } from "pinia"
const { pouleUser } = storeToRefs(useUsers())
</script>
