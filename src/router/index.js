import { createRouter, createWebHistory } from 'vue-router'
import HomePage from '@/pages/HomePage.vue'
import ResultsPage from '@/pages/ResultsPage.vue'

const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: '/', name: 'home', component: HomePage },
    { path: '/results', name: 'results', component: ResultsPage }
  ],
  scrollBehavior() { return { top: 0 } }
})

export default router
