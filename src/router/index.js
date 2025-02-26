import { createRouter, createWebHistory } from 'vue-router'
import MainPage from '@/pages/MainPage.vue'
import DetailPage from '@/pages/DetailPage.vue'
import RegisterPage from "../pages/RegisterPage.vue";

const routes = [
    {
        path: '/',
        component: MainPage
    }, 
    {
        path: "/register",
        component: RegisterPage
    }, 
    {
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