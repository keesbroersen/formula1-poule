<template>
	<div class="page--regular container">
		<h2>User</h2>
		{{ pouleUser[0].name }}<br />
		score: {{ pouleUser[0].score }}

		<RaceList />
	</div>
</template>

<script setup lang="ts">
import RaceList from "@/components/RaceList.vue"
import { useUsers } from "@/store/users"
import { storeToRefs } from "pinia"
const { pouleUser } = storeToRefs(useUsers())
</script>
