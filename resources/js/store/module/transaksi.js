import axios from 'axios'
import auth from '../../Auth'
import "vue-smooth-dnd";
import { applyDrag } from '../../utils/helpers'

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
    }
}

const mutations = {
    SET_ALL(state, data){

        let baru =  data.filter(item =>  item.status == 'baru')
        let proses =  data.filter(item =>  item.status == 'proses')
        let selesai =  data.filter(item =>  item.status == 'selesai')
        let diambil =  data.filter(item =>  item.status == 'diambil')
        
        var result = [
            {
                'status': 'baru',
                'data': baru
            },
            {
                'status': 'proses',
                'data': proses
            },
            {
                'status': 'selesai',
                'data': selesai
            },
            {
                'status': 'diambil',
                'data': diambil
            }
        ]

        state.items = result
    },
    SET_INFO_BY_ID(state, data){
        state.info = data
    },
    SET_MULTI_INFO(state, data){
        state.multi_info = data
    },
    SET_ALL_TRASH(state, data){
        state.trash.items = data
    },
    SET_ON_DROP_CARD(state, {columnStatus, dropResult}){

        if (dropResult.removedIndex !== null || dropResult.addedIndex !== null) {
            
            const transaksi = state.items
            const column = transaksi.filter(p => p.status === columnStatus)[0]
            const columnIndex = transaksi.indexOf(column)

            const newColumn = column
            newColumn.data = applyDrag(newColumn.data, dropResult, columnStatus)
            transaksi.splice(columnIndex, 1, newColumn)

            axios.post('/api/move-status-transaksi', { //ddcard
                columnStatus: columnStatus,
                result: dropResult
            }, config)
        }
    },
    SET_STATUS_ON_DROP_CARD(state, {columnStatus, dropResult}){
        console.log('asdf', columnStatus);
        state.items.forEach(jp => {
            jp.data.map(i => {
                if (i.id == dropResult.payload.id && i.status != columnStatus) {
                    console.log('asdf', columnStatus);
                    i.status = columnStatus
                }
            });
        });
    }
}

const actions = {
    async GET_ALL({ commit }, id){
        await commit('SET_ISLOADING', true, { root: true })
        const item = await axios.get('/api/transaksi/' + id, config);
        await commit('SET_ALL', item.data.data)
        await commit('SET_ISLOADING', false, { root: true })
    },
    async REFRESH_GET_ALL({ commit }, id){
        const item = await axios.get('/api/transaksi/' + id, config);
        await commit('SET_ALL', item.data.data)
    },
    async CREATE({ commit, dispatch }, data){
        await commit('SET_ISLOADING_ACTION', true, { root: true })
        await axios.post('api/transaksi', {
            'nama': data.nama,
            'alamat': data.alamat,
            'jenis_kelamin': data.jenis_kelamin,
            'tlp': data.tlp
        }, config)
        await dispatch('REFRESH_GET_ALL', data.outlet_id)
        await commit('SET_ISLOADING_ACTION', false, { root: true })
    },
    async SOFTDELETE_ONE({ dispatch, commit }, data){
        await commit('SET_ISLOADING_ACTION', true, { root: true })
        await axios.delete('api/transaksi/' + data.id, config)
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
        await axios.put('api/transaksi/' + data.id, {
            'nama': data.nama,
            'alamat': data.alamat,
            'jenis_kelamin': data.jenis_kelamin,
            'tlp': data.tlp
        }, config)
        await commit('SET_INFO_BY_ID', data)
        await dispatch('REFRESH_GET_ALL', data.outlet_id)
        await commit('SET_ISLOADING_ACTION', false, { root: true })
    },
    async SOFTDELETE_MULTI({ dispatch, commit }, selected){
        await commit('SET_ISLOADING_ACTION', true, { root: true })
        await axios.post('api/multi-softdelete-transaksi', {
            selected
        }, config)
        await dispatch('REFRESH_GET_ALL')
        await commit('SET_ISLOADING_ACTION', false, { root: true })
    },
    async GET_ALL_TRASH({ commit }){
        await commit('SET_ISLOADING', true, { root: true })
        const item = await axios.get('/api/trashed-transaksi', config)
        await commit('SET_ALL_TRASH', item.data.trashed)
        await commit('SET_ISLOADING', false, { root: true })
    },
    async REFRESH_GET_ALL_TRASH({ commit }){
        const item = await axios.get('/api/trashed-transaksi', config)
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
        await axios.get('/api/restore-transaksi/' + id, config)
        await dispatch('REFRESH_GET_ALL_TRASH')
        await commit('SET_ISLOADING_ACTION', false, { root: true })
    },
    async FORCEDELETE_ONE({ dispatch, commit }, id){
        await commit('SET_ISLOADING_ACTION', true, { root: true })
        await axios.get('/api/force-delete-transaksi/' + id, config)
        await dispatch('REFRESH_GET_ALL_TRASH')
        await commit('SET_ISLOADING_ACTION', false, { root: true })
    },
    async RESTORE_MULTI({ dispatch, commit }, selected){
        await commit('SET_ISLOADING_ACTION', true, { root: true })
        await axios.post('api/multi-restore-transaksi', {
        selected
        }, config)
        await dispatch('REFRESH_GET_ALL_TRASH')
        await commit('SET_ISLOADING_ACTION', false, { root: true })
    },
    async FORCEDELETE_MULTI({ dispatch, commit }, selected){
        await commit('SET_ISLOADING_ACTION', true, { root: true })
        await axios.post('api/multi-force-delete-transaksi', {
            selected
        }, config)
        await dispatch('REFRESH_GET_ALL_TRASH')
        await commit('SET_ISLOADING_ACTION', false, { root: true })
    },
    async ON_CARD_DROP({ state, commit, dispatch }, { columnStatus, dropResult, id}){
        // console.log('dr', dropResult);
        await commit('SET_ON_DROP_CARD', {columnStatus, dropResult})

        // await commit('SET_STATUS_ON_DROP_CARD', {columnStatus, dropResult})
        await dispatch('REFRESH_GET_ALL', id)
        // await dispatch('GET_INFO_JADWAL_KELAS_BY_ID', dropResult.payload.id)
    },
    async GET_INFO_BY_ID({ state, commit }, {id, column}){
        
        await commit('SET_ISLOADING_ACTION', true, { root: true })

        var cc = ''

        state.items.map(jp => {
            jp.data.map(i => {
                if (i.id == id) {
                    cc = i
                }
            });

        });
        
        commit('SET_INFO_BY_ID', cc)

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