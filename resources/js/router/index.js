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
import Ongkir from '../views/ongkir/Ongkir'
import Promo from '../views/promo/Promo'
import MarkerLocation from '../components/maps/MarkerLocation'
import Direction from '../components/maps/Direction'
import Login from '../views/Login'

//kurir
import Kurir from '../views/kurir/Kurir'
import DirectionKurir from '../components/kurir/DirectionKurir'



import NotFound from '../pages/404'

function requireAuth (role, hasParams, to, from, next){
    if (!auth.loggedIn()) {
        next({
            path: '/login',
            query: { redirect: to.fullPath }
        })
    } else {
        const user = JSON.parse(localStorage.getItem('auth'));
        if(role.indexOf(user.data.role) < 0){
            next({
                path: '/404'
            })
        }
        else if(user.data.role == 'owner'){
            next()
        }
        else if(hasParams){
            if(user.data.outlet_id != to.params.id){
                next({
                    path: '/404'
                })
            }
        }
        next()
    }
}

const routes = [
    {
        path: '/',
        component: App,
        name: 'app',
        beforeEnter: (to, from, next) => requireAuth(['admin'], false, to, from, next)
    },
    {
        path: '/user-location',
        component: MarkerLocation,
        name: 'user-location'
    },
    {
        path: '/direction',
        component: Direction,
        name: 'direction'
    },
    {
        path: '/outlet',
        component: Outlet,
        name: 'outlet',
        beforeEnter: (to, from, next) => requireAuth(['owner'], false, to, from, next)
    },
    {
        path: '/dashboard/:id',
        component: Dashboard,
        name: 'dashboard',
        beforeEnter: (to, from, next) => requireAuth(['owner', 'admin'], true, to, from, next)
    },
    {
        path: '/kelola',
        component: Kelola,
        name: 'kelola',
        beforeEnter: (to, from, next) => requireAuth(['owner', 'admin'], true, to, from, next),
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

            },
            {
                path: 'ongkir/:id',
                name: 'ongkir',
                component: Ongkir

            },
            {
                path: 'promo/:id',
                name: 'promo',
                component: Promo

            }
        ]
    },
    {
        path: '/pesanan/:id',
        component: Pesanan,
        name: 'pesanan',
        beforeEnter: (to, from, next) => requireAuth(['owner', 'admin', 'kasir'], true, to, from, next)
    },
    {
        path: '/kasir',
        component: Outlet, //sementara
        name: 'kasir',
        beforeEnter: (to, from, next) => requireAuth(['kasir'], false, to, from, next)
    },
    //kurir
    {
        path: '/kurir/:id',
        component: Kurir,
        name: 'kurir',
        beforeEnter: (to, from, next) => requireAuth(['kurir'], false, to, from, next)
    },
    {
        path: '/direction-kurir/:id',
        component: DirectionKurir,
        name: 'direction-kurir',
        beforeEnter: (to, from, next) => requireAuth(['kurir'], false, to, from, next)
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