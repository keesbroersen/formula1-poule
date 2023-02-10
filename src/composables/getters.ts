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
