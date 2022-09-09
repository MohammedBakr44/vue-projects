import { createRouter, createWebHistory } from "vue-router";
import DcHeroes from "./pages/DcHeroes.vue";
import Calendar from "./pages/Calendar.vue";
import Home from "./pages/Home.vue";
import Markdown from "./pages/Markdown.vue";
import Slider from "./pages/Slider.vue";
import Calculator from "./pages/Calculator.vue";
import ResuableModal from "./pages/ReuseableModal.vue";
import Chat from "./pages/Chat.vue";
import UserCrud from "./pages/UserCrud.vue";
import Tensorflow from "./pages/Tensorflow.vue";
import { loginState } from "./store/index.js";
const routes = [
  { path: "/", component: Home },
  { path: "/dc-heroes", component: DcHeroes },
  { path: "/calendar", component: Calendar },
  { path: "/markdown", component: Markdown },
  { path: "/slider", component: Slider },
  { path: "/calculator", component: Calculator },
  { path: "/modal", component: ResuableModal },
  {
    path: "/chat",
    component: Chat,
    meta: { middleware: "auth" },
  },
  { path: "/crud", component: UserCrud },
  { path: "/tensorflow", component: Tensorflow },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

router.beforeEach((to, _, next) => {
  const store = loginState();
  const { setLoginOpen } = store;
  if (to.meta.middleware) {
    const middleware = import(`./middleware/${to.meta.middleware}`);
    if (middleware) {
      middleware.then((module) =>
        module.default(next, store.isLoggedIn, setLoginOpen)
      );
    } else {
      next();
    }
  } else {
    next();
  }
});

export default router;
