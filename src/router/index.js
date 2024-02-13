import { createRouter, createWebHistory } from 'vue-router';
import HomePage from '../components/HomePage.vue';
import SignUpPage from '../components/SignUpPage.vue';
import SignInPage from '../components/SignInPage.vue';
import DashBoard from '../components/DashBoard.vue';

const routes = [
    {
        path: '/',
        name: 'HomePage',
        component: HomePage
    },
    {
        path: '/signup',
        name: 'SignUp',
        component: SignUpPage
    },
    {
        path: '/signIn',
        name: 'SignInPage',
        component: SignInPage
    },
    {
        path: '/dashboard',
        name: 'DashBoard',
        component: DashBoard
    }
];

const router = createRouter({
    history: createWebHistory(),
    routes
});

export default router;