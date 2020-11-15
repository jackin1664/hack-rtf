import Vue from 'vue'
import VueRouter from 'vue-router'

import home from '../views/home/'
import stake from '../views/stake/'

//
// import jfi from '../views/jfi/'

Vue.use(VueRouter)

const routes = [
    {
        path: "/",
        component: home,
    },
    {
        path: "/stake/:id",
        component: stake,
    },

    // {
    //     path: "/jfi",
    //     component: jfi,
    // },

    // {
    //   path: "/testpage",
    //   component: testpage,
    // },

    // {
    //   path: '/about',
    //   name: 'About',
    //   // route level code-splitting
    //   // this generates a separate chunk (about.[hash].js) for this route
    //   // which is lazy-loaded when the route is visited.
    //   component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
    // }
];

const router = new VueRouter({
    mode: 'history',
    base: process.env.BASE_URL,
    routes
})

export default router
