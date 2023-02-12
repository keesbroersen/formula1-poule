import { defineStore } from "pinia"
import { ref, watch } from "vue"

export const useGeneral = defineStore("general", () => {
	const navigationOpen = ref(false)

	return {
		navigationOpen
	}
})
