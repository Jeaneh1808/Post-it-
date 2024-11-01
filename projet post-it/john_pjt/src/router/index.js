import { createRouter, createWebHistory } from 'vue-router'
// import HomeView from '../views/HomeView.vue'
import Test from '../views/Test.vue'
import ReadNote from '@/views/ReadNote.vue'


const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'notetest',
      component: Test
    },
    {
      path: '/Read/:id',
      name: 'detail_vue',
      component: ReadNote
    },

  ]
})

export default router
