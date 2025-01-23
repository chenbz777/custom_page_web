import { createRouter, createWebHistory } from 'vue-router';
import useRouteData from '@/hooks/useRouteData';


const routes = [
  {
    path: '/',
    name: 'home',
    component: () => import('@/views/home.vue')
  },
  {
    path: '/customPage/design',
    name: 'design',
    component: () => import('@/views/customPage/design/index.vue')
  },
  {
    path: '/customPage/preview',
    name: 'preview',
    component: () => import('@/views/customPage/preview/index.vue')
  },
  {
    path: '/demo/design',
    name: 'demoDesign',
    component: () => import('@/views/demo/design.vue')
  },
  {
    path: '/demo/preview',
    name: 'demoPreview',
    component: () => import('@/views/demo/preview.vue')
  },
  {
    path: '/:pathMatch(.*)',
    name: '404',
    component: () => import('@/views/404.vue')
  }
];

const router = createRouter({
  history: createWebHistory(),
  routes
});

const { navigationType } = useRouteData();

const historyList = [];

router.beforeEach(async (to, from) => {

  if (from.fullPath === '/') {
    navigationType.value = 'default';
  } else {
    navigationType.value = historyList.find(path => path === to.fullPath) ? 'back' : 'push';
  }

  historyList.push(from.fullPath);

  if (historyList.find(path => path === to.fullPath)) {
    const index = historyList.findIndex(path => path === to.fullPath);

    historyList.length = index + 1;
  }

  // 通过 return turn;
  // 不通过 return false;
  return true;
});

export default router;
