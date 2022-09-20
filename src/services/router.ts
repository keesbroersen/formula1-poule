import { createRouter, createWebHistory } from "vue-router";
import { getUser } from "./firebase";

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
  ],
});

router.beforeEach(async (to, from, next) => {
  const user = await getUser();
  if (to.meta.requiresAuth && !user) next({ path: "/login" });
  else next();
});

export default router;
