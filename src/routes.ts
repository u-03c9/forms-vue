import { createRouter, createWebHistory, RouterOptions } from "vue-router";
import { useMainStore } from "./store";

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
  const store = useMainStore();
  if (to.meta.requiresAuth && !store.isUserAuthenticated) {
    router.replace({ name: "login" });
  } else if (to.meta.requiresNoAuth && store.isUserAuthenticated) {
    router.replace({ name: "dashboard" });
  } else {
    next();
  }
});

export default router;
