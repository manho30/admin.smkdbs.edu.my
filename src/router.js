/**
 * @Description : Router Configuration
 * @Author      : manho <manho30@outlook.my>
 * @Date        : 30/12/2022 18:13
 * @File        : router.js
 * @IDE         : WebStorm
 */

import {
    createRouter,
    createWebHistory
} from 'vue-router'

import index from "@/routes/index";
import login from "@/routes/login";
import logout from "@/routes/logout";

const routes = [
    {
        path: '/',
        redirect: 'index',
    },
    {
        path: '/index',
        component: index
    },
    {
        path: '/login',
        component: login
    },
    {
        path: '/logout',
        component: logout
    }

]

const router = createRouter({
    history: createWebHistory(),
    routes
})

export default router