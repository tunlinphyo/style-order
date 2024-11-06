import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import SimulatorView from '../views/SimulatorView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
    },
    {
      path: '/',
      component: SimulatorView,
      children: [
        {
          path: '/fabrics',
          name: 'fabrics',
          component: () => import('../views/FabricsView.vue'),
        },
        {
          path: '/courses',
          name: 'courses',
          component: () => import('../views/CoursesView.vue'),
        },
        {
          path: '/designs',
          name: 'designs',
          component: () => import('../views/DesignsView.vue'),
        },
        {
          path: '/buttons',
          name: 'buttons',
          component: () => import('../views/ButtonsView.vue'),
        },
        {
          path: '/linings',
          name: 'linings',
          component: () => import('../views/LiningsView.vue'),
        },
        {
          path: '/options',
          name: 'options',
          component: () => import('../views/OptionsView.vue'),
        },
        {
          path: '/confirm',
          name: 'confirm',
          component: () => import('../views/ConfirmView.vue'),
        },
      ]
    },
  ],
})

export default router
