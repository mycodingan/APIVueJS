import { createRouter, createWebHistory } from 'vue-router';
import HomeView from '../views/HomeView.vue';
import Login from '../auth/Login.vue';
import Register from  "../auth/Register.vue";
import Siswa from "../siswa/Index.vue";
import SiswaEdit from "../siswa/edit.vue";
import CreateSiswa from "../siswa/create.vue";
import UserCreate from "../User/creaate.vue";
import UserData from "../User/Index.vue";
import UserEdit from "../User/Edit.vue";
import Forgot from "../auth/forgot.vue";
import Forgotpw from "../auth/forgot.pw.vue";
import kalkulatorVue from '@/tools/kalkulator.vue';
import TodoVue from '@/tools/todo.vue';
import ServerVue from "../server/index.vue";



const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/about',
      name: 'about',
      component: () => import('../views/AboutView.vue')
    },
    // Login register
    {
      path: "/login",
      name: "login",
      component: Login
    },
    {
      path: "/register",
      name: "register",
      component: Register
    },
    {
      path:"/forgot",
      name: "forgot",
      component: Forgot 
    },
    {
      path:"/forgotpw",
      name: "forgotpw",
      component: Forgotpw
    },
    // Siswa CRUD
    { 
      path: "/siswa",
      name: "siswa",
      component: Siswa,
      meta: {
        requiresAuth: true
      }
    },
    {
      path: "/siswa/create",
      name: "createSiswa",
      component: CreateSiswa,
      meta: {
        requiresAuth: true
      }
    },
    {
      path: "/siswa/:id/edit",
      name: "siswaEdit",
      component: SiswaEdit,
      meta: {
        requiresAuth: true
      }
    },
    // User CRUD
    {
      path: "/user",
      name: "user",
      component: UserData,
      meta: {
        requiresAuth: true
      }
    },
    {
      path: "/user/create",
      name: "userCreate",
      component: UserCreate,
      meta: {
        requiresAuth: true
      }
    },
    {
      path: "/user/:id/edit",
      name: "userEdit",
      component: UserEdit,
      meta: {
        requiresAuth: true
      }
    },
    /* server */
    {
      path: "/server",
      name: "server",
      component: ServerVue,
      meta: {
        requiresAuth: true
      }
    },
    // tool
    {
      path: "/kalkulator",
      name: "kalkulatorVue",
      component: kalkulatorVue
    },
    {
      path: "/todo",
      name: "TodoVue",
      component: TodoVue
    }
  ]
});

router.beforeEach((to, from, push) => {
  const isLoggedIn = localStorage.getItem('accessToken');
  const requiresAuth = to.matched.some(record => record.meta.requiresAuth);
  const userRole = localStorage.getItem('userRole');

  if (requiresAuth && !isLoggedIn) {
    push('/login');
  } else if (requiresAuth && isLoggedIn) {
    if (to.meta.role === 'admin' && userRole !== 'admin') {
      push('/user');
    } else if (to.meta.role === 'user' && userRole !== 'user') {
      push('/');
    } else {
      push();
    }
  } else {
    push();
  }
});

export default router;
