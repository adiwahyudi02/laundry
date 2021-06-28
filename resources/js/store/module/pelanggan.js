import axios from 'axios'

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
    // getPelanggan: (state) => {
    //     var result = state.items.filter(item => {
    //         return item.role != 'owner'
    //     });
    //     return result
    // }
    getLength: (state) => {
        return state.items.length
    },
    getLengthAndPercent: (state) => {

        const date = new Date();
        const thisMonth = date.getFullYear() + '-' + ('0' + (date.getMonth()+1)).slice(-2) + '-' + '01';
        const jumlah_bulan_ini = state.items.filter(item => {
            return item.created_at >= thisMonth
        });

        const thisWeek = date.getFullYear() + '-' + ('0' + (date.getMonth()+1)).slice(-2) + '-' + ('0' + ((date.getDate() - date.getDay()))).slice(-2);
        const jumlah_minggu_ini = state.items.filter(item => {
            return item.created_at >= thisWeek
        });

        const thisDay = date.getFullYear() + '-' + ('0' + (date.getMonth()+1)).slice(-2) + '-' + ('0' + (date.getDate())).slice(-2);
        const jumlah_hari_ini = state.items.filter(item => {
            let split = item.created_at.split('T')
            return split[0] == thisDay
        });

        return {
            'bulan_ini': {
                'jumlah': jumlah_bulan_ini.length,
                'persentase': Math.round((jumlah_bulan_ini.length / state.items.length * 100) * 10) / 10
            },
            'minggu_ini': {
                'jumlah': jumlah_minggu_ini.length,
                'persentase': Math.round((jumlah_minggu_ini.length / state.items.length * 100) * 10) / 10
            },
            'hari_ini': {
                'jumlah': jumlah_hari_ini.length,
                'persentase': Math.round((jumlah_hari_ini.length / state.items.length * 100) * 10) / 10
            }
        }
        
    },
    getLengthPertumbuhanPelannganTahunIni: (state) => {
        const date = new Date();
        var result = []

        for (let index = 1; index <= 12; index++) {
            var pelanggaan = 0
            state.items.filter(i => {
                let item_bulan = i.created_at.substring(5, 7)
                if(item_bulan == ("0" + (index)).slice(-2)) {
                    pelanggaan++
                }
            })
            if( index <= date.getMonth() + 1) {
                result.push(pelanggaan)
            }
        }
        return result
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
        const item = await axios.get('/api/member/' + id);
        await commit('SET_ALL', item.data.data)
        await commit('SET_ISLOADING', false, { root: true })
    },
    async REFRESH_GET_ALL({ commit }, id){
        const item = await axios.get('/api/member/' + id);
        await commit('SET_ALL', item.data.data)
    },
    async CREATE({ commit, dispatch }, data){
        await commit('SET_ISLOADING_ACTION', true, { root: true })
        await axios.post('api/member', {
            'nama': data.nama,
            'alamat': data.alamat,
            'jenis_kelamin': data.jenis_kelamin,
            'tlp': data.tlp
        })
        await dispatch('REFRESH_GET_ALL', data.outlet_id)
        await commit('SET_ISLOADING_ACTION', false, { root: true })
    },
    async SOFTDELETE_ONE({ dispatch, commit }, data){
        await commit('SET_ISLOADING_ACTION', true, { root: true })
        await axios.delete('api/member/' + data.id)
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
        await axios.put('api/member/' + data.id, {
            'nama': data.nama,
            'alamat': data.alamat,
            'jenis_kelamin': data.jenis_kelamin,
            'tlp': data.tlp
        })
        await commit('SET_INFO_BY_ID', data)
        await dispatch('REFRESH_GET_ALL', data.outlet_id)
        await commit('SET_ISLOADING_ACTION', false, { root: true })
    },
    async SOFTDELETE_MULTI({ dispatch, commit }, selected){
        await commit('SET_ISLOADING_ACTION', true, { root: true })
        await axios.post('api/multi-softdelete-member', {
            selected
        })
        await dispatch('REFRESH_GET_ALL')
        await commit('SET_ISLOADING_ACTION', false, { root: true })
    },
    async GET_ALL_TRASH({ commit }){
        await commit('SET_ISLOADING', true, { root: true })
        const item = await axios.get('/api/trashed-member')
        await commit('SET_ALL_TRASH', item.data.trashed)
        await commit('SET_ISLOADING', false, { root: true })
    },
    async REFRESH_GET_ALL_TRASH({ commit }){
        const item = await axios.get('/api/trashed-member')
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
        await axios.get('/api/restore-member/' + id)
        await dispatch('REFRESH_GET_ALL_TRASH')
        await commit('SET_ISLOADING_ACTION', false, { root: true })
    },
    async FORCEDELETE_ONE({ dispatch, commit }, id){
        await commit('SET_ISLOADING_ACTION', true, { root: true })
        await axios.get('/api/force-delete-member/' + id)
        await dispatch('REFRESH_GET_ALL_TRASH')
        await commit('SET_ISLOADING_ACTION', false, { root: true })
    },
    async RESTORE_MULTI({ dispatch, commit }, selected){
        await commit('SET_ISLOADING_ACTION', true, { root: true })
        await axios.post('api/multi-restore-member', {
        selected
        })
        await dispatch('REFRESH_GET_ALL_TRASH')
        await commit('SET_ISLOADING_ACTION', false, { root: true })
    },
    async FORCEDELETE_MULTI({ dispatch, commit }, selected){
        await commit('SET_ISLOADING_ACTION', true, { root: true })
        await axios.post('api/multi-force-delete-member', {
            selected
        })
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