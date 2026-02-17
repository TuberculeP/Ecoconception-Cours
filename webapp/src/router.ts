import { createRouter, createWebHistory } from "vue-router";

import LandingView from "./views/LandingView.vue";

import { useAuthStore } from "./stores/authStore";
import apiClient from "./lib/utils/apiClient";
import type { User } from "./lib/utils/types";

const LoginView = () => import("./views/auth/LoginView.vue");
const RegisterView = () => import("./views/auth/RegisterView.vue");
const FeedView = () => import("./views/FeedView.vue");
const ArticleView = () => import("./views/ArticleView.vue");
const ArticlesListView = () => import("./views/admin/ArticlesListView.vue");
const ArticleEditorView = () => import("./views/admin/ArticleEditorView.vue");
const Main = () => import("./views/Main.vue");

async function authGuard(to: any, from: any, next: any) {
  const authStore = useAuthStore();
  const check = await apiClient.get<{ user: User }>("/auth/check");
  if (check.error) {
    next({ name: "app-login", query: { redirect: to.name } });
    return;
  }
  if (check.data && check.data.user) {
    authStore.user = check.data.user;
    next();
  } else {
    next({ name: "app-login", query: { redirect: to.name } });
  }
}

const routes = [
  { path: "/", component: LandingView, name: "landing" },
  { path: "/dashboard", component: Main, name: "dashboard" },
  { path: "/login", component: LoginView, name: "app-login" },
  { path: "/register", component: RegisterView, name: "app-register" },
  // Public articles
  { path: "/feed", component: FeedView, name: "feed" },
  { path: "/article/:slug", component: ArticleView, name: "article" },
  // Admin articles
  {
    path: "/admin/articles",
    component: ArticlesListView,
    name: "admin-articles",
  },
  {
    path: "/admin/articles/new",
    component: ArticleEditorView,
    name: "admin-articles-new",
  },
  {
    path: "/admin/articles/:id/edit",
    component: ArticleEditorView,
    name: "admin-articles-edit",
  },
];

const getGuardedRoutes = () => {
  const guardedPaths = ["/dashboard", "/admin/articles", "/admin/articles/new"];
  return routes.map((route) => {
    if (
      guardedPaths.includes(route.path) ||
      route.path.startsWith("/admin/articles/")
    ) {
      return {
        ...route,
        beforeEnter: authGuard,
      };
    }
    return route;
  });
};

export const router = createRouter({
  history: createWebHistory(),
  routes: getGuardedRoutes(),
});
