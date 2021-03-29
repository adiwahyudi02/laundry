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
    getLength: (state) => {
        return state.items.length
    },
    getLengthAndPercent: (state) => {

        let jumlah_bed_cover = state.items.filter(item => item.jenis == 'Bed Cover');
        let jumlah_boneka = state.items.filter(item => item.jenis == 'Boneka');
        let jumlah_jas = state.items.filter(item => item.jenis == 'Jas');
        let jumlah_kiloan = state.items.filter(item => item.jenis == 'Kiloan');
        let jumlah_sepatu = state.items.filter(item => item.jenis == 'Sepatu');
        let jumlah_tas = state.items.filter(item => item.jenis == 'Tas');
        let jumlah_topi = state.items.filter(item => item.jenis == 'Topi');

        return {
            'bed_cover': {
                'jumlah': jumlah_bed_cover.length,
                'persentase': Math.round((jumlah_bed_cover.length / state.items.length * 100) * 10) / 10
            },
            'boneka': {
                'jumlah': jumlah_boneka.length,
                'persentase': Math.round((jumlah_boneka.length / state.items.length * 100) * 10) / 10
            },
            'jas': {
                'jumlah': jumlah_jas.length,
                'persentase': Math.round((jumlah_jas.length / state.items.length * 100) * 10) / 10
            },
            'kiloan': {
                'jumlah': jumlah_kiloan.length,
                'persentase': Math.round((jumlah_kiloan.length / state.items.length * 100) * 10) / 10
            },
            'sepatu': {
                'jumlah': jumlah_sepatu.length,
                'persentase': Math.round((jumlah_sepatu.length / state.items.length * 100) * 10) / 10
            },
            'tas': {
                'jumlah': jumlah_tas.length,
                'persentase': Math.round((jumlah_tas.length / state.items.length * 100) * 10) / 10
            },
            'topi': {
                'jumlah': jumlah_topi.length,
                'persentase': Math.round((jumlah_topi.length / state.items.length * 100) * 10) / 10
            },
        }
    },
    getItemsGrupByJenis : (state) => {
        let bed_cover = state.items.filter(item => item.jenis == 'Bed Cover');
        let boneka = state.items.filter(item => item.jenis == 'Boneka');
        let jas = state.items.filter(item => item.jenis == 'Jas');
        let kiloan = state.items.filter(item => item.jenis == 'Kiloan');
        let sepatu = state.items.filter(item => item.jenis == 'Sepatu');
        let tas = state.items.filter(item => item.jenis == 'Tas');
        let topi = state.items.filter(item => item.jenis == 'Topi');

        var result = [
            {
                'jenis': 'Bed Cover',
                'data': bed_cover
            },
            {
                'jenis': 'Boneka',
                'data': boneka
            },
            {
                'jenis': 'Jas',
                'data': jas
            },
            {
                'jenis': 'Kiloan',
                'data': kiloan
            },
            {
                'jenis': 'Sepatu',
                'data': sepatu
            },
            {
                'jenis': 'Tas',
                'data': tas
            },
            {
                'jenis': 'Topi',
                'data': topi
            }
        ]

        return result;
    }
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
        const item = await axios.get('/api/paket/' + id, config);
        await commit('SET_ALL', item.data.data)
        await commit('SET_ISLOADING', false, { root: true })
    },
    async REFRESH_GET_ALL({ commit }, id){
        const item = await axios.get('/api/paket/' + id, config);
        await commit('SET_ALL', item.data.data)
    },
    async CREATE({ commit, dispatch }, data){
        await commit('SET_ISLOADING_ACTION', true, { root: true })
        await axios.post('api/paket', {
            'outlet_id': data.outlet_id,
            'jenis': data.jenis,
            'nama_paket': data.nama_paket,
            'harga': data.harga,
            'lama_pengerjaan': data.lama_pengerjaan
        }, config)
        await dispatch('REFRESH_GET_ALL', data.outlet_id)
        await commit('SET_ISLOADING_ACTION', false, { root: true })
    },
    async SOFTDELETE_ONE({ dispatch, commit }, data){
        await commit('SET_ISLOADING_ACTION', true, { root: true })
        await axios.delete('api/paket/' + data.id, config)
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
        await axios.put('api/paket/' + data.id, {
            'outlet_id': data.outlet_id,
            'jenis': data.jenis,
            'nama_paket': data.nama_paket,
            'harga': data.harga,
            'lama_pengerjaan': data.lama_pengerjaan
        }, config)
        await commit('SET_INFO_BY_ID', data)
        await dispatch('REFRESH_GET_ALL', data.outlet_id)
        await commit('SET_ISLOADING_ACTION', false, { root: true })
    },
    async SOFTDELETE_MULTI({ dispatch, commit }, selected){
        await commit('SET_ISLOADING_ACTION', true, { root: true })
        await axios.post('api/multi-softdelete-paket', {
            selected
        }, config)
        await dispatch('REFRESH_GET_ALL')
        await commit('SET_ISLOADING_ACTION', false, { root: true })
    },
    async GET_ALL_TRASH({ commit }){
        await commit('SET_ISLOADING', true, { root: true })
        const item = await axios.get('/api/trashed-paket', config)
        await commit('SET_ALL_TRASH', item.data.trashed)
        await commit('SET_ISLOADING', false, { root: true })
    },
    async REFRESH_GET_ALL_TRASH({ commit }){
        const item = await axios.get('/api/trashed-paket', config)
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
        await axios.get('/api/restore-paket/' + id, config)
        await dispatch('REFRESH_GET_ALL_TRASH')
        await commit('SET_ISLOADING_ACTION', false, { root: true })
    },
    async FORCEDELETE_ONE({ dispatch, commit }, id){
        await commit('SET_ISLOADING_ACTION', true, { root: true })
        await axios.get('/api/force-delete-paket/' + id, config)
        await dispatch('REFRESH_GET_ALL_TRASH')
        await commit('SET_ISLOADING_ACTION', false, { root: true })
    },
    async RESTORE_MULTI({ dispatch, commit }, selected){
        await commit('SET_ISLOADING_ACTION', true, { root: true })
        await axios.post('api/multi-restore-paket', {
        selected
        }, config)
        await dispatch('REFRESH_GET_ALL_TRASH')
        await commit('SET_ISLOADING_ACTION', false, { root: true })
    },
    async FORCEDELETE_MULTI({ dispatch, commit }, selected){
        await commit('SET_ISLOADING_ACTION', true, { root: true })
        await axios.post('api/multi-force-delete-paket', {
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