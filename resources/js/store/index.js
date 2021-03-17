import Vue from 'vue'
import Vuex from 'vuex'

import outlet from './module/outlet'
import pegawai from './module/pegawai'
import pelanggan from './module/pelanggan'
import paket from './module/paket'
import transaksi from './module/transaksi'

Vue.use(Vuex)

const debug = process.env.NODE_ENV !== 'production'

export default new Vuex.Store({
    state: {
        isLoading: false,
        isLoadingAction: false,
        isLoadingSearch: false,
        isLoadingActionButton: false
    },
    mutations: {
        SET_ISLOADING(state, condition){
            state.isLoading = condition
        },
        SET_ISLOADING_ACTION(state, condition){
            state.isLoadingAction = condition
        },
        SET_ISLOADING_SEARCH(state, condition){
            state.isLoadingSearch = condition
        },
        SET_ISLOADING_ACTION_BUTTON(state, condition){
            state.isLoadingActionButton = condition
        }
    },
    modules: {
        outlet,
        pegawai,
        pelanggan,
        paket,
        transaksi
    },
    strict: debug
})