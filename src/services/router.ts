import { createRouter, createWebHistory } from "vue-router"
import { getCurrentUser } from "vuefire"
import { useRaces } from "@/store/races"
import { useDrivers } from "@/store/drivers"
import { useTeams } from "@/store/teams"
import { useUsers } from "@/store/users"

const router = createRouter({
	history: createWebHistory(),
	routes: [
		{
			path: "/",
			component: () => import("../views/UserHome.vue"),
			meta: {
				requiresAuth: true
			}
		},
		{
			path: "/poule/:slug",
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
			path: "/poule",
			component: () => import("../views/UserPoule.vue"),
			meta: {
				requiresAuth: true
			}
		},
		{
			path: "/poule/register",
			component: () => import("../views/PouleRegister.vue"),
			meta: {
				requiresAuth: true
			}
		},
		{
			path: "/poule/:id",
			component: () => import("../views/PouleAddUser.vue"),
			meta: {
				requiresAuth: true
			}
		},
		{
			path: "/account",
			component: () => import("../views/UserAccount.vue"),
			meta: {
				requiresAuth: true
			}
		},
		{
			path: "/register",
			component: () => import("../views/UserRegister.vue")
		},
		{
			path: "/login",
			component: () => import("../views/UserLogin.vue")
		},
		{
			path: "/admin",
			component: () => import("../views/admin/AdminHome.vue"),
			meta: {
				requiresAuth: true,
				requiresAdmin: true
			}
		},
		{
			path: "/admin/races",
			component: () => import("../views/admin/AdminRaces.vue"),
			meta: {
				requiresAuth: true,
				requiresAdmin: true
			}
		},
		{
			path: "/admin/races/new",
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
			path: "/admin/teams",
			component: () => import("../views/admin/AdminTeams.vue"),
			meta: {
				requiresAuth: true,
				requiresAdmin: true
			}
		},
		{
			path: "/admin/teams/new",
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
			component: () => import("../views/admin/AdminDrivers.vue"),
			meta: {
				requiresAuth: true,
				requiresAdmin: true
			}
		},
		{
			path: "/races/:slug",
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
					component: () => import("../views/PredictionQualification.vue")
				},
				{
					path: "race",
					component: () => import("../views/PredictionRace.vue")
				}
			]
		}
	]
})

router.beforeEach(async (to) => {
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
