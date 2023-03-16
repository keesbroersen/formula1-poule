import {
	createRouter,
	createWebHistory,
	RouteLocationNormalized
} from "vue-router"
import { getCurrentUser } from "vuefire"
import { useGeneral } from "@/store/general"
import { useRaces } from "@/store/races"
import { useDrivers } from "@/store/drivers"
import { useTeams } from "@/store/teams"
import { useUsers } from "@/store/users"
import { usePredictions } from "@/store/predictions"
import { useResults } from "@/store/results"

const setCurrentUserPoulePrediction = (to: RouteLocationNormalized) => {
	const usersStore = useUsers()
	usersStore.pouleUserSlug = to.params.slug as string
	const raceStore = useRaces()
	raceStore.setCurrentRace(to.params.raceSlug as string)
	const predictionStore = usePredictions()
	predictionStore.setCurrentPrediction()
	const resultStore = useResults()
	resultStore.setCurrentResult()
}

const router = createRouter({
	history: createWebHistory(),
	routes: [
		{
			path: "/",
			name: "home",
			component: async () => {
				return import("../views/LandingPage.vue")
			}
		},
		{
			path: "/predictions",
			name: "user_predictions",
			component: () => import("../views/UserPredictions.vue"),
			meta: {
				requiresAuth: true
			}
		},
		{
			path: "/poule",
			name: "user_poule",
			component: () => import("../views/UserPoule.vue"),
			meta: {
				requiresAuth: true
			}
		},
		{
			path: "/poule/:slug",
			name: "poule_user",
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
			name: "poule_user_prediction",
			component: () => import("../views/PredictionPage.vue"),
			meta: {
				requiresAuth: true
			},
			children: [
				{
					path: "qualification",
					alias: "",
					name: "poule_user_qualification",
					component: () => import("../views/PredictionQualification.vue"),
					beforeEnter(to) {
						setCurrentUserPoulePrediction(to)
					}
				},
				{
					path: "race",
					name: "poule_user_race",
					component: () => import("../views/PredictionRace.vue"),
					beforeEnter(to) {
						setCurrentUserPoulePrediction(to)
					}
				}
			]
		},
		{
			path: "/poule/register",
			name: "poule_register",
			component: () => import("../views/PouleRegister.vue"),
			meta: {
				requiresAuth: true
			}
		},
		{
			path: "/poule/share/:id",
			name: "poule_add_user",
			component: () => import("../views/PouleAddUser.vue"),
			meta: {
				requiresAuth: true
			}
		},
		{
			path: "/account",
			name: "user_account",
			component: () => import("../views/UserAccount.vue"),
			meta: {
				requiresAuth: true
			}
		},
		{
			path: "/register",
			name: "user_register",
			component: () => import("../views/UserRegister.vue")
		},
		{
			path: "/login",
			name: "user_login",
			component: () => import("../views/UserLogin.vue")
		},
		{
			path: "/admin",
			name: "admin_home",
			component: () => import("../views/admin/AdminHome.vue"),
			meta: {
				requiresAuth: true,
				requiresAdmin: true
			}
		},
		{
			path: "/admin/races",
			name: "admin_races",
			component: () => import("../views/admin/AdminRaces.vue"),
			meta: {
				requiresAuth: true,
				requiresAdmin: true
			}
		},
		{
			path: "/admin/races/new",
			name: "admin_race_new",
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
			name: "admin_race",
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
			name: "admin_results",
			component: () => import("../views/admin/AdminResults.vue"),
			meta: {
				requiresAuth: true,
				requiresAdmin: true
			}
		},
		{
			path: "/admin/results/:slug",
			name: "admin_result",
			component: () => import("../views/admin/AdminResult.vue"),
			meta: {
				requiresAuth: true
			},
			beforeEnter(to) {
				const raceStore = useRaces()
				raceStore.setCurrentRace(to.params.slug as string)
				const resultStore = useResults()
				resultStore.setCurrentResult()
			},
			children: [
				{
					path: "qualification",
					alias: "",
					name: "admin_result_qualification",
					component: () => import("../views/admin/AdminResultQualification.vue")
				},
				{
					path: "race",
					name: "admin_result_race",
					component: () => import("../views/admin/AdminResultRace.vue")
				}
			]
		},
		{
			path: "/admin/teams",
			name: "admin_teams",
			component: () => import("../views/admin/AdminTeams.vue"),
			meta: {
				requiresAuth: true,
				requiresAdmin: true
			}
		},
		{
			path: "/admin/teams/new",
			name: "admin_team_new",
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
			name: "admin_team",
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
			name: "admin_driver_new",
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
			name: "admin_driver",
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
			name: "admin_drivers",
			component: () => import("../views/admin/AdminDrivers.vue"),
			meta: {
				requiresAuth: true,
				requiresAdmin: true
			}
		},
		{
			path: "/admin/champion",
			name: "admin_champion",
			component: () => import("../views/admin/AdminChampion.vue"),
			meta: {
				requiresAuth: true,
				requiresAdmin: true
			}
		},
		{
			path: "/races/:slug",
			name: "prediction_page",
			component: () => import("../views/PredictionPage.vue"),
			meta: {
				requiresAuth: true
			},
			beforeEnter(to) {
				const raceStore = useRaces()
				raceStore.setCurrentRace(to.params.slug as string)
				const predictionStore = usePredictions()
				predictionStore.setCurrentPrediction()
				const resultStore = useResults()
				resultStore.setCurrentResult()
			},
			children: [
				{
					path: "qualification",
					alias: "",
					name: "prediction_qualification",
					component: () => import("../views/PredictionQualification.vue")
				},
				{
					path: "race",
					name: "prediction_race",
					component: () => import("../views/PredictionRace.vue")
				}
			]
		},
		{
			path: "/standings/",
			name: "competitor_standings",
			component: () => import("../views/CompetitorStandings.vue"),
			meta: {
				requiresAuth: true
			},
			children: [
				{
					path: "drivers",
					alias: "",
					name: "competitor_standings_drivers",
					component: () => import("../views/CompetitorStandingsDrivers.vue")
				},
				{
					path: "teams",
					name: "competitor_standings_constructors",
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

	const currentUser = await getCurrentUser()

	// Reset currentPouleUser
	const usersStore = useUsers()
	usersStore.pouleUserSlug = ""

	if (to.meta.requiresAuth) {
		if (!currentUser) {
			return {
				name: "user_login"
			}
		}
	}

	if (to.name === "home" && currentUser) {
		return {
			name: "user_predictions"
		}
	}
})

export default router
