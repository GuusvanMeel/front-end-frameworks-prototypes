import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import Marathons from '../views/Marathons.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
    },
    {
      path: '/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/AboutView.vue'),
    },
    {
      path: '/marathons',
      name: 'marathons',
      component: Marathons,
    },
    {
  path: '/marathon/:id',
  name: 'marathon-detail',
  component: () => import('../views/MarathonDetail.vue')
},
{path: '/trainingPlan/:id',
  name: 'Training-Plan',
  component: () => import('../views/TrainingPlan.vue')
},
{path: '/trainingPlan/:id/add-session',
  name: 'add-training-plan',
  component: () => import('../views/AddTrainingPlan.vue')
},
  ],
})

export default router
