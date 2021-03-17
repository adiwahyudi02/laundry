import axios from 'axios'
import auth from '../../Auth'

const config = {
    headers: {Authorization: "Bearer " + auth.getToken()}
} 

const state = () => ({
    items: [],
    info: '',
    multi_info: '',
    trash: {
        items: [],
    }
})

const getters = {
    getItemById: (state) => (id) => {
        var result = state.items.find(item => {
            return item.id == id
        })
        return result
    },
    getPegawai: (state) => {
        var result = state.items.filter(item => {
            return item.role != 'owner'
        });
        return result
    },
    getLength: (state) => {
        var result = state.items.filter(item => {
            return item.role != 'owner'
        });
        return result.length
    },
    getLengthAndPercent: (state) => {

        let items = state.items.filter(item => {
            return item.role != 'owner'
        });

        let jumlah_kasir = state.items.filter(item => {
            return item.role == 'kasir'
        });
        let jumlah_admin = state.items.filter(item => {
            return item.role == 'admin'
        });

        return {
            'kasir': {
                'jumlah': jumlah_kasir.length,
                'persentase': Math.round((jumlah_kasir.length / items.length * 100) * 10) / 10
            },
            'admin': {
                'jumlah': jumlah_admin.length,
                'persentase': Math.round((jumlah_admin.length / items.length * 100) * 10) / 10
            },
        }
    },
}

const mutations = {
    SET_ALL(state, data){
        state.items = data
    },
    SET_INFO_BY_ID(state, data){
        state.info = data
    },
    SET_MULTI_INFO(state, data){
        state.multi_info = data
    },
    SET_ALL_TRASH(state, data){
        state.trash.items = data
    }
}

const actions = {
    async GET_ALL({ commit }, id){
        await commit('SET_ISLOADING', true, { root: true })
        const item = await axios.get('/api/user/' + id, config);
        await commit('SET_ALL', item.data.data)
        await commit('SET_ISLOADING', false, { root: true })
    },
    async REFRESH_GET_ALL({ commit }, id){
        const item = await axios.get('/api/user/' + id, config);
        await commit('SET_ALL', item.data.data)
    },
    async CREATE({ commit, dispatch }, data){
        await commit('SET_ISLOADING_ACTION', true, { root: true })
        await axios.post('api/user', {
            'nama': data.nama,
            'username': data.username,
            'password': data.password,
            'outlet_id': data.outlet_id,
            'role': data.role
        }, config)
        await dispatch('REFRESH_GET_ALL', data.outlet_id)
        await commit('SET_ISLOADING_ACTION', false, { root: true })
    },
    async SOFTDELETE_ONE({ dispatch, commit }, data){
        await commit('SET_ISLOADING_ACTION', true, { root: true })
        await axios.delete('api/user/' + data.id, config)
        await dispatch('REFRESH_GET_ALL', data.outlet_id)
        await commit('SET_ISLOADING_ACTION', false, { root: true })
    },
    async GET_INFO_BY_ID({ state, commit }, id){
        await commit('SET_ISLOADING_ACTION', true, { root: true })
        commit('SET_INFO_BY_ID', await state.items.find(item => {
            return item.id === id
        }))
        await commit('SET_ISLOADING_ACTION', false, { root: true })
    },
    async UPDATE({ dispatch, commit }, data){
        await commit('SET_ISLOADING_ACTION', true, { root: true })
        await axios.put('api/user/' + data.id, {
            'nama': data.nama,
            'username': data.username,
            'outlet_id': data.outlet_id,
            'role': data.role
        }, config)
        await commit('SET_INFO_BY_ID', data)
        await dispatch('REFRESH_GET_ALL', data.outlet_id)
        await commit('SET_ISLOADING_ACTION', false, { root: true })
    },
    async SOFTDELETE_MULTI({ dispatch, commit }, selected){
        await commit('SET_ISLOADING_ACTION', true, { root: true })
        await axios.post('api/multi-softdelete-user', {
            selected
        }, config)
        await dispatch('REFRESH_GET_ALL')
        await commit('SET_ISLOADING_ACTION', false, { root: true })
    },
    async GET_ALL_TRASH({ commit }){
        await commit('SET_ISLOADING', true, { root: true })
        const item = await axios.get('/api/trashed-user', config)
        await commit('SET_ALL_TRASH', item.data.trashed)
        await commit('SET_ISLOADING', false, { root: true })
    },
    async REFRESH_GET_ALL_TRASH({ commit }){
        const item = await axios.get('/api/trashed-user', config)
        await commit('SET_ALL_TRASH', item.data.trashed)
    },
    async GET_INFO_TRASH_BY_ID({ state, commit }, id){
        await commit('SET_ISLOADING_ACTION', true, { root: true })
        commit('SET_INFO_BY_ID', await state.trash.items.find(item => {
            return item.id === id
        }))
        await commit('SET_ISLOADING_ACTION', false, { root: true })
    },
    async RESTORE_ONE({ dispatch, commit }, id){
        await commit('SET_ISLOADING_ACTION', true, { root: true })
        await axios.get('/api/restore-user/' + id, config)
        await dispatch('REFRESH_GET_ALL_TRASH')
        await commit('SET_ISLOADING_ACTION', false, { root: true })
    },
    async FORCEDELETE_ONE({ dispatch, commit }, id){
        await commit('SET_ISLOADING_ACTION', true, { root: true })
        await axios.get('/api/force-delete-user/' + id, config)
        await dispatch('REFRESH_GET_ALL_TRASH')
        await commit('SET_ISLOADING_ACTION', false, { root: true })
    },
    async RESTORE_MULTI({ dispatch, commit }, selected){
        await commit('SET_ISLOADING_ACTION', true, { root: true })
        await axios.post('api/multi-restore-user', {
        selected
        }, config)
        await dispatch('REFRESH_GET_ALL_TRASH')
        await commit('SET_ISLOADING_ACTION', false, { root: true })
    },
    async FORCEDELETE_MULTI({ dispatch, commit }, selected){
        await commit('SET_ISLOADING_ACTION', true, { root: true })
        await axios.post('api/multi-force-delete-user', {
            selected
        }, config)
        await dispatch('REFRESH_GET_ALL_TRASH')
        await commit('SET_ISLOADING_ACTION', false, { root: true })
    }
}

export default {
    namespaced: true,
    state,
    actions,
    mutations,
    getters
}