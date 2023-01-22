import { computed } from "vue"
import { usePoules } from "@/store/poules"

const pouleStore = usePoules()
const { currentPoule } = storeToRefs(pouleStore)
import { storeToRefs } from "pinia"

export const pouleLink = computed(
	() =>
		`${document.location.origin}/poule/${currentPoule.value.id}?code=${currentPoule.value.registration_code}`
)
