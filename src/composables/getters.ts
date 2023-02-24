import { Component, h } from "vue"
import IconStar from "@/assets/IconStar.vue"
import IconStopwatch from "@/assets/IconStopwatch.vue"
import IconTrophy from "@/assets/IconTrophy.vue"
import IconTools from "@/assets/IconTools.vue"

export const convertToSlug = (string: string) => {
	return string
		.toLowerCase()
		.trim()
		.replace(/[^\w\s-]/g, "")
		.replace(/[\s_-]+/g, "-")
		.replace(/^-+|-+$/g, "")
}

export const getPoints = (points: Array<number>): number => {
	if (!points || points.length < 1) return 0
	return points.reduce((a, b) => a + b)
}

export const getLabelComponent = (label: string): Component => {
	switch (label) {
		case "driverOfTheDay":
			return IconStar
		case "fastestLap":
			return IconStopwatch
		case "trophy":
			return IconTrophy
		case "tools":
			return IconTools
		default:
			return h("p", label)
	}
}
