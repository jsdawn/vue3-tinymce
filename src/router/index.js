import { createRouter, createWebHashHistory } from 'vue-router';

const routes = [
  {
    path: '/',
    component: () => import('../pages/index.vue')
  },
  {
    path: '/example',
    component: () => import('../pages/example.vue')
  },
  {
    path: '/example2',
    component: () => import('../pages/example2.vue')
  }
];

const router = createRouter({
  history: createWebHashHistory(),
  routes
});

export default router;
