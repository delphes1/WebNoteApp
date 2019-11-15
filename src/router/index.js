import Vue from 'vue';
import VueRouter from 'vue-router';
import Home from '../views/Home.vue';
import store from '@/store/index.js';

Vue.use(VueRouter);
const routes = [
    {
        path: '/',
        name: 'home',
        component: Home
    },
    {
        path: '/about',
        name: 'about',
        component: () => import('../views/About.vue'),
        meta: {
            authRequired: true
        }
    },
    {
        path: '/sign-in',
        name: 'signin',
        component: () => import('../views/Signin.vue')
    },
    {
        path: '/join',
        name: 'join',
        component: () => import('../views/Join.vue')
    },
    {
        path: '/note',
        name: 'note',
        component: () => import('../views/Note.vue'),
        meta: {
          authRequired: true
        }
    },
    {
        path: '/sign-in-r',
        name: 'signin-r',
        component: () => import('../views/Signin_error.vue')
    },
    {
        path: '/join-r',
        name: 'join-r',
        component: () => import('../views/Join_error.vue')
    }
];

const router = new VueRouter({
    mode: 'history',
    base: process.env.BASE_URL,
    routes
});

router.beforeEach((to, from, next) => {
    if (to.matched.some(record => record.meta.authRequired)) {
        if (!store.state.isAuthenticated) {
            next({
                path: '/sign-in'
            });
        } else {
            next();
        }
    } else {
        next();
    }
});

export default router;
