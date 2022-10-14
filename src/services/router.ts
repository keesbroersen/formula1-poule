import { createRouter, createWebHistory } from "vue-router";
import { getUser } from "./firebase";
import { useRaces } from "@/store/races";

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: "/",
      component: () => import("../views/UserHome.vue"),
      meta: {
        requiresAuth: true,
      },
    },
    {
      path: "/poule",
      component: () => import("../views/UserPoule.vue"),
      meta: {
        requiresAuth: true,
      },
    },
    {
      path: "/account",
      component: () => import("../views/UserAccount.vue"),
      meta: {
        requiresAuth: true,
      },
    },
    {
      path: "/register",
      component: () => import("../views/UserRegister.vue"),
    },
    {
      path: "/login",
      component: () => import("../views/UserLogin.vue"),
    },
    {
      path: "/admin",
      component: () => import("../views/admin/AdminHome.vue"),
      meta: {
        requiresAuth: true,
        requiresAdmin: true,
      },
    },
    {
      path: "/admin/races",
      component: () => import("../views/admin/AdminRaces.vue"),
      meta: {
        requiresAuth: true,
        requiresAdmin: true,
      },
    },
    {
      path: "/admin/races/new",
      component: () => import("../views/admin/AdminRace.vue"),
      meta: {
        requiresAuth: true,
        requiresAdmin: true,
      },
      beforeEnter(to) {
        const raceStore = useRaces();
        raceStore.clearCurrentRace();
      },
    },
    {
      path: "/admin/races/:slug",
      component: () => import("../views/admin/AdminRace.vue"),
      meta: {
        requiresAuth: true,
        requiresAdmin: true,
      },
      beforeEnter(to) {
        const raceStore = useRaces();
        raceStore.setCurrentRace(to.params.slug as string);
      },
    },
    {
      path: "/admin/teams",
      component: () => import("../views/admin/AdminTeams.vue"),
      meta: {
        requiresAuth: true,
        requiresAdmin: true,
      },
    },
    {
      path: "/admin/teams/new",
      component: () => import("../views/admin/AdminTeam.vue"),
      meta: {
        requiresAuth: true,
        requiresAdmin: true,
      },
    },
    {
      path: "/admin/drivers/:slug",
      component: () => import("../views/admin/AdminDriver.vue"),
      meta: {
        requiresAuth: true,
        requiresAdmin: true,
      },
    },
    {
      path: "/admin/drivers",
      component: () => import("../views/admin/AdminDrivers.vue"),
      meta: {
        requiresAuth: true,
        requiresAdmin: true,
      },
    },
    {
      path: "/admin/drivers/new",
      component: () => import("../views/admin/AdminDriver.vue"),
      meta: {
        requiresAuth: true,
        requiresAdmin: true,
      },
    },
    {
      path: "/admin/teams/:slug",
      component: () => import("../views/admin/AdminTeam.vue"),
      meta: {
        requiresAuth: true,
        requiresAdmin: true,
      },
    },
    {
      path: "/races/:slug",
      component: () => import("../views/RaceDetail.vue"),
      meta: {
        requiresAuth: true,
      },
    },
  ],
});

router.beforeEach(async (to, from, next) => {
  const user = await getUser();
  if (to.meta.requiresAuth && !user) next({ path: "/login" });
  else next();
});

export default router;
