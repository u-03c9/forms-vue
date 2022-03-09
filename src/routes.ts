import { createRouter, createWebHistory, RouterOptions } from "vue-router";
import { isUserAuthenticated } from "./firebase-utils";

const options: RouterOptions = {
  history: createWebHistory(),
  routes: [
    {
      name: "home",
      path: "/",
      component: () => import("./pages/HomePage.vue"),
    },
    {
      name: "login",
      path: "/login",
      component: () => import("./pages/LoginPage.vue"),
      meta: {
        requiresNoAuth: true,
      },
    },
    {
      name: "dashboard",
      path: "/dashboard",
      meta: {
        requiresAuth: true,
      },
      component: () => import("./pages/DashboardPage.vue"),
    },
    {
      name: "not-found",
      path: "/:notFound(.*)",
      component: () => import("./pages/NotFoundPage.vue"),
    },
  ],
};

const router = createRouter(options);

router.beforeEach((to, from, next) => {
  if (to.meta.requiresAuth && !isUserAuthenticated()) {
    router.replace({ name: "login" });
  } else if (to.meta.requiresNoAuth && isUserAuthenticated()) {
    router.replace({ name: "dashboard" });
  } else {
    next();
  }
});

export default router;
