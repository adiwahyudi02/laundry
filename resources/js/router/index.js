import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)
import auth from '../Auth'

import App from '../views/App'
import Outlet from '../views/Outlet'
import Dashboard from '../views/Dashboard'
import Kelola from '../views/Kelola'
import Pesanan from '../views/Pesanan'
import Pegawai from '../views/pegawai/Pegawai'
import Pelanggan from '../views/pelanggan/Pelanggan'
import Paket from '../views/paket/Paket'
import Login from '../views/Login'

import NotFound from '../pages/404'

function requireAuth (role, to, from, next){
    if (!auth.loggedIn()) {
        next({
            path: '/login',
            query: { redirect: to.fullPath }
        })
    } else {
        const user = JSON.parse(localStorage.getItem('auth'));
        if(user.data.role != role){
            next({
                path: '/404'
            })
        }
        next()
    }
}

const routes = [
    {
        path: '/',
        component: App,
        name: 'app',
        beforeEnter: (to, from, next) => requireAuth('admin', to, from, next)
    },
    {
        path: '/outlet',
        component: Outlet,
        name: 'outlet',
        beforeEnter: (to, from, next) => requireAuth('owner', to, from, next)
    },
    {
        path: '/dashboard/:id',
        component: Dashboard,
        name: 'dashboard',
        beforeEnter: (to, from, next) => requireAuth('owner', to, from, next)
    },
    {
        path: '/kelola',
        component: Kelola,
        name: 'kelola',
        beforeEnter: (to, from, next) => requireAuth('owner', to, from, next),
        children: [
            {
                path: 'pegawai/:id',
                name: 'pegawai',
                component: Pegawai

            },
            {
                path: 'pelanggan/:id',
                name: 'pelanggan',
                component: Pelanggan

            },
            {
                path: 'paket/:id',
                name: 'paket',
                component: Paket

            }
        ]
    },
    {
        path: '/pesanan/:id',
        component: Pesanan,
        name: 'pesanan',
        beforeEnter: (to, from, next) => requireAuth('owner', to, from, next)
    },
    {
        path: '/kasir',
        component: Outlet, //sementara
        name: 'kasir',
        beforeEnter: (to, from, next) => requireAuth('kasir', to, from, next)
    },
    {
        path: '/login',
        component: Login,
        name: 'login'
    },
    { 
        path: '/logout',
        beforeEnter (to, from, next) {
            auth.logout()
            next('/login')
        },
        name: 'logout'
    },
    { 
        path: '*', 
        name: '404',
        component: NotFound 
    },
]

const router = new VueRouter({routes});
  
export default router