import { createRouter, createWebHistory } from "vue-router"
import { getCurrentUser } from "vuefire"
import { useGeneral } from "@/store/general"
import { useRaces } from "@/store/races"
import { useDrivers } from "@/store/drivers"
import { useTeams } from "@/store/teams"
import { useUsers } from "@/store/users"

const router = createRouter({
	history: createWebHistory(),
	routes: [
		{
			path: "/",
			name: "UserHome",
			component: () => import("../views/UserHome.vue"),
			meta: {
				requiresAuth: true
			},
			children: [
				{
					path: "predictions",
					alias: "",
					name: "UserPredictions",
					component: () => import("../views/UserPredictions.vue")
				},
				{
					path: "poule",
					name: "UserPoule",
					component: () => import("../views/UserPoule.vue")
				}
			]
		},
		{
			path: "/poule/:slug",
			name: "PouleUser",
			component: () => import("../views/PouleUser.vue"),
			meta: {
				requiresAuth: true,
				requiresAdmin: true
			},
			beforeEnter(to) {
				const usersStore = useUsers()
				usersStore.pouleUserSlug = to.params.slug as string
			}
		},
		{
			path: "/poule/:slug/:raceSlug",
			name: "PouleUserPrediction",
			component: () => import("../views/PredictionPage.vue"),
			meta: {
				requiresAuth: true
			},
			beforeEnter(to) {
				const usersStore = useUsers()
				usersStore.pouleUserSlug = to.params.slug as string
				const raceStore = useRaces()
				raceStore.setCurrentRace(to.params.raceSlug as string)
			},
			children: [
				{
					path: "qualification",
					alias: "",
					name: "PouleUserQualification",
					component: () => import("../views/PredictionQualification.vue")
				},
				{
					path: "race",
					name: "PouleUserRace",
					component: () => import("../views/PredictionRace.vue")
				}
			]
		},
		{
			path: "/poule/register",
			name: "PouleRegister",
			component: () => import("../views/PouleRegister.vue"),
			meta: {
				requiresAuth: true
			}
		},
		{
			path: "/poule/share/:id",
			name: "PouleAddUser",
			component: () => import("../views/PouleAddUser.vue"),
			meta: {
				requiresAuth: true
			}
		},
		{
			path: "/account",
			name: "UserAccount",
			component: () => import("../views/UserAccount.vue"),
			meta: {
				requiresAuth: true
			}
		},
		{
			path: "/register",
			name: "UserRegister",
			component: () => import("../views/UserRegister.vue")
		},
		{
			path: "/login",
			name: "UserLogin",
			component: () => import("../views/UserLogin.vue")
		},
		{
			path: "/admin",
			name: "AdminHome",
			component: () => import("../views/admin/AdminHome.vue"),
			meta: {
				requiresAuth: true,
				requiresAdmin: true
			}
		},
		{
			path: "/admin/races",
			name: "AdminRaces",
			component: () => import("../views/admin/AdminRaces.vue"),
			meta: {
				requiresAuth: true,
				requiresAdmin: true
			}
		},
		{
			path: "/admin/races/new",
			name: "AdminRaceNew",
			component: () => import("../views/admin/AdminRace.vue"),
			meta: {
				requiresAuth: true,
				requiresAdmin: true
			},
			beforeEnter() {
				const raceStore = useRaces()
				raceStore.clearCurrentRace()
			}
		},
		{
			path: "/admin/races/:slug",
			name: "AdminRace",
			component: () => import("../views/admin/AdminRace.vue"),
			meta: {
				requiresAuth: true,
				requiresAdmin: true
			},
			beforeEnter(to) {
				const raceStore = useRaces()
				raceStore.setCurrentRace(to.params.slug as string)
			}
		},
		{
			path: "/admin/results",
			name: "AdminResults",
			component: () => import("../views/admin/AdminResults.vue"),
			meta: {
				requiresAuth: true,
				requiresAdmin: true
			}
		},
		{
			path: "/admin/results/:slug",
			name: "AdminResult",
			component: () => import("../views/admin/AdminResult.vue"),
			meta: {
				requiresAuth: true
			},
			beforeEnter(to) {
				const raceStore = useRaces()
				raceStore.setCurrentRace(to.params.slug as string)
			},
			children: [
				{
					path: "qualification",
					alias: "",
					name: "AdminResultQualification",
					component: () => import("../views/admin/AdminResultQualification.vue")
				},
				{
					path: "race",
					name: "AdminResultRace",
					component: () => import("../views/admin/AdminResultRace.vue")
				}
			]
		},
		{
			path: "/admin/teams",
			name: "AdminTeams",
			component: () => import("../views/admin/AdminTeams.vue"),
			meta: {
				requiresAuth: true,
				requiresAdmin: true
			}
		},
		{
			path: "/admin/teams/new",
			name: "AdminTeamNew",
			component: () => import("../views/admin/AdminTeam.vue"),
			meta: {
				requiresAuth: true,
				requiresAdmin: true
			},
			beforeEnter() {
				const teamsStore = useTeams()
				teamsStore.clearCurrentTeam()
			}
		},
		{
			path: "/admin/teams/:slug",
			name: "AdminTeam",
			component: () => import("../views/admin/AdminTeam.vue"),
			meta: {
				requiresAuth: true,
				requiresAdmin: true
			},
			beforeEnter(to) {
				const teamsStore = useTeams()
				teamsStore.setCurrentTeam(to.params.slug as string)
			}
		},
		{
			path: "/admin/drivers/new",
			name: "AdminDriver",
			component: () => import("../views/admin/AdminDriver.vue"),
			meta: {
				requiresAuth: true,
				requiresAdmin: true
			},
			beforeEnter() {
				const driverStore = useDrivers()
				driverStore.clearCurrentDriver()
			}
		},
		{
			path: "/admin/drivers/:slug",
			name: "AdminDriver",
			component: () => import("../views/admin/AdminDriver.vue"),
			meta: {
				requiresAuth: true,
				requiresAdmin: true
			},
			beforeEnter(to) {
				const driverStore = useDrivers()
				driverStore.setCurrentDriver(to.params.slug as string)
			}
		},
		{
			path: "/admin/drivers",
			name: "AdminDrivers",
			component: () => import("../views/admin/AdminDrivers.vue"),
			meta: {
				requiresAuth: true,
				requiresAdmin: true
			}
		},
		{
			path: "/races/:slug",
			name: "PredictionPage",
			component: () => import("../views/PredictionPage.vue"),
			meta: {
				requiresAuth: true
			},
			beforeEnter(to) {
				const raceStore = useRaces()
				raceStore.setCurrentRace(to.params.slug as string)
			},
			children: [
				{
					path: "qualification",
					alias: "",
					name: "PredictionQualification",
					component: () => import("../views/PredictionQualification.vue")
				},
				{
					path: "race",
					name: "PredictionRace",
					component: () => import("../views/PredictionRace.vue")
				}
			]
		},
		{
			path: "/standings/",
			name: "CompetitorStandings",
			component: () => import("../views/CompetitorStandings.vue"),
			meta: {
				requiresAuth: true
			},
			children: [
				{
					path: "drivers",
					alias: "",
					name: "CompetitorStandingsDrivers",
					component: () => import("../views/CompetitorStandingsDrivers.vue")
				},
				{
					path: "teams",
					name: "CompetitorStandingsConstructors",
					component: () =>
						import("../views/CompetitorStandingsConstructors.vue")
				}
			]
		}
	]
})

router.beforeEach(async (to) => {
	const generalStore = useGeneral()
	generalStore.navigationOpen = false

	if (to.meta.requiresAuth) {
		const currentUser = await getCurrentUser()
		if (!currentUser) {
			return {
				path: "/login",
				query: {
					redirectTo: to.fullPath
				}
			}
		}
	}
})

export default router
