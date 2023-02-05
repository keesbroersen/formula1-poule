import { computed } from "vue"
import { usePoules } from "@/store/poules"
import { storeToRefs } from "pinia"

const pouleStore = usePoules()
const { currentPoule } = storeToRefs(pouleStore)

export const pouleLink = computed(
	() =>
		`${document.location.origin}/poule/share/${currentPoule.value.id}?code=${currentPoule.value.registration_code}`
)
