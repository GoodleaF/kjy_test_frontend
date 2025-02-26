import { createRouter, createWebHistory } from 'vue-router'
import MainPage from '../pages/MainPage.vue'
import DetailPage from '../pages/DetailPage.vue'

const routes = [
    {
        path: '/',
        component: MainPage
    }, {
        path: '/page',
        component: DetailPage,
        children: [{ path: ':id', component: DetailPage }]
    }
];

const router = createRouter({
    history: createWebHistory(),
    routes,
});

export default router;