import { createRouter, createWebHashHistory, RouteRecordRaw } from 'vue-router';

import Loading from '@/components/transition/index.vue';

import { h, render } from 'vue';
const loding = h(Loading);
render(loding, document.body);

const routes: Array<RouteRecordRaw> = [
    {
        path: '/index',
        name: 'Index',
        component: () => import('@/home/index.vue'),
    },
    {
        path: '/calendar',
        name: 'Calendar',
        component: () => import('@/components/calendar/index.vue'),
    },
    {
        path: '/clock',
        name: 'Clock',
        component: () => import('@/components/clock/index.vue'),
    },
];

const router = createRouter({
    history: createWebHashHistory(),
    routes,
});

router.beforeEach((to, from, next) => {
    loding.component?.exposed?.startLoading();
    next();
});

router.afterEach(() => {
    // loding.component?.exposed?.stopLoading()
});

export default router;
