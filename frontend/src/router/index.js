import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import UserView from '../views/UserView.vue'
import ScheduleMeetView from '../views/ScheduleMeetView.vue'
import CalendarView from '../views/CalendarView.vue'
import LoginView from '../views/LoginView.vue'


const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path:'/',
      name: 'login',
      component: LoginView
    },
    {
      path: '/home',
      name: 'home',
      component: HomeView,
      children: [
        { path: 'user', component: UserView },
        { path: 'calendar', component: CalendarView },
        { path: 'scheduleMeet', component: ScheduleMeetView }
      ]
    },
    // {
    //   path: '/user',
    //   name: 'user',
    //   component: UserView
    //   // route level code-splitting
    //   // this generates a separate chunk (About.[hash].js) for this route
    //   // which is lazy-loaded when the route is visited.
    //   //component: () => import('../views/AboutView.vue')
    // },
  ]
})

export default router
