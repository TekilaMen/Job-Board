import { createRouter, createWebHistory } from "vue-router";
import Home from "../components/Home.vue";
import Login from "../components/Login.vue";
import Manage from "../components/Manage.vue";
import Mailbox from "../components/Mailbox.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "home",
      component: Home,
    },
    {
      path: "/login",
      name: "login",
      component: Login,
    },
    {
      path: "/manage",
      name: "manage",
      component: Manage,
    },
    {
      path: "/mailbox",
      name: "mailbox",
      component: Mailbox,
    }
  ],
});

export default router;
