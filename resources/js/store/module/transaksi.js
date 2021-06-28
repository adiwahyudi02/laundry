import axios from "axios";
import "vue-smooth-dnd";
import { applyDrag } from "../../utils/helpers";
import { result } from "lodash";

const state = () => ({
    items: [],
    info: "",
    multi_info: "",
    trash: {
        items: []
    }
});

const getters = {
    getItemById: state => id => {
        var result = state.items.find(item => {
            return item.id == id;
        });
        return result;
    },
    getLength: state => {
        return state.items.length;
    },
    getLengthTransaksiHariIni: state => {
        const date = new Date();
        const thisDay =
            date.getFullYear() +
            "-" +
            ("0" + (date.getMonth() + 1)).slice(-2) +
            "-" +
            ("0" + date.getDate()).slice(-2);
        const filter = state.items.map(item => {
            const transaksi = item.data.filter(i => {
                let split = i.tgl.split(" ");
                return split[0] == thisDay;
            });
            return transaksi.length;
        });

        return filter;
    },
    getTotalOmsetHariIni: state => {
        const date = new Date();
        const thisDay =
            date.getFullYear() +
            "-" +
            ("0" + (date.getMonth() + 1)).slice(-2) +
            "-" +
            ("0" + date.getDate()).slice(-2);

        var omset = 0;

        const filter = state.items.map(item => {
            const transaksi = item.data.filter(i => {
                let split = i.tgl.split(" ");
                if (split[0] == thisDay) omset += i.total;
            });
        });

        return omset;
    },
    getOmsetPerBulan: state => {
        const date = new Date();
        const month = [
            { key: "01", bulan: "Januari" },
            { key: "02", bulan: "Februari" },
            { key: "03", bulan: "Maret" },
            { key: "04", bulan: "April" },
            { key: "05", bulan: "Mei" },
            { key: "06", bulan: "Juni" },
            { key: "07", bulan: "Juli" },
            { key: "08", bulan: "Agustus" },
            { key: "09", bulan: "September" },
            { key: "10", bulan: "Oktober" },
            { key: "11", bulan: "November" },
            { key: "12", bulan: "Desember" }
        ];

        var result = [];

        for (let index = 0; index < month.length; index++) {
            var omset = 0;
            var transaksi = 0;
            state.items.map(item => {
                item.data.filter(i => {
                    let item_bulan = i.tgl.substring(5, 7);
                    if (item_bulan == month[index].key) {
                        omset += i.total;
                        transaksi++;
                    }
                });
            });
            result.push({
                key: month[index].key,
                bulan: month[index].bulan,
                omset: omset,
                transaksi: transaksi,
                bulan_ini:
                    ("0" + (date.getMonth() + 1)).slice(-2) == month[index].key
            });
        }
        return result;
    },
    getLenghtTransaksiBulanIniPerTanggal: state => {
        const date = new Date();
        var getDaysInMonth = function(month, year) {
            return new Date(year, month, 0).getDate();
        };
        const numberDayOfMonth = getDaysInMonth(
            date.getMonth() + 1,
            date.getFullYear()
        );

        var result = [];
        var result_tanggal = [];

        const thisMonth =
            date.getFullYear() +
            "-" +
            ("0" + (date.getMonth() + 1)).slice(-2) +
            "-" +
            "01";
        const filterDataBulanIni = state.items.map(item => {
            return {
                status: item.status,
                data: item.data.filter(i => {
                    return i.tgl >= thisMonth;
                })
            };
        });

        for (let index = 1; index <= numberDayOfMonth; index++) {
            var transaksi = 0;

            filterDataBulanIni.map(item => {
                item.data.filter(i => {
                    let item_tanggal = i.tgl.substring(8, 10);
                    let tanggal = ("0" + index).slice(-2);

                    if (item_tanggal == tanggal) {
                        transaksi++;
                    }
                });
            });

            if (index <= date.getDate()) {
                result.push(transaksi);
            }
            result_tanggal.push(("0" + index).slice(-2));
        }

        return {
            tanggal: result_tanggal,
            data: result
        };
    },
    getLengthTransaksiUntukKasir: state => {
        const date = new Date();

        var result_kasir = [];
        state.items.map(item => {
            item.data.filter(i => {
                let item_bulan = i.tgl.substring(5, 7);
                if (item_bulan == ("0" + (date.getMonth() + 1)).slice(-2)) {
                    if (result_kasir.indexOf(i.user.nama) === -1)
                        result_kasir.push(i.user.nama);
                }
            });
        });

        var result = [];

        for (let index = 1; index <= result_kasir.length; index++) {
            var transaksi = 0;
            state.items.map(item => {
                item.data.filter(i => {
                    let item_bulan = i.tgl.substring(5, 7);
                    if (item_bulan == ("0" + (date.getMonth() + 1)).slice(-2)) {
                        if (i.user.nama == result_kasir[index - 1]) transaksi++;
                    }
                });
            });
            result.push(transaksi);
        }

        return {
            kasir: result_kasir,
            data: result
        };
    },
    getPenjemputan: state => {
        let data = state.items.find(item => {
            if (item.status == "penjemputan") return item.data;
        });
        return data;
    },
    getPengantaran: state => {
        let data = state.items.find(item => {
            if (item.status == "siap antar") return item.data;
        });
        return data;
    }
};

const mutations = {
    SET_ALL(state, data) {
        let konfirmasi = data.filter(item => item.status == "konfirmasi");
        let penjemputan = data.filter(item => item.status == "penjemputan");
        let antrian = data.filter(item => item.status == "antrian");
        let proses = data.filter(item => item.status == "proses");
        let siap_ambil = data.filter(item => item.status == "siap ambil");
        let siap_antar = data.filter(item => item.status == "siap antar");
        let selesai = data.filter(item => item.status == "selesai");

        var result = [
            {
                status: "konfirmasi",
                data: konfirmasi
            },
            {
                status: "penjemputan",
                data: penjemputan
            },
            {
                status: "antrian",
                data: antrian
            },
            {
                status: "proses",
                data: proses
            },
            {
                status: "siap ambil",
                data: siap_ambil
            },
            {
                status: "siap antar",
                data: siap_antar
            },
            {
                status: "selesai",
                data: selesai
            }
        ];

        state.items = result;
    },
    SET_INFO_BY_ID(state, data) {
        state.info = data;
    },
    SET_MULTI_INFO(state, data) {
        state.multi_info = data;
    },
    SET_ALL_TRASH(state, data) {
        state.trash.items = data;
    },
    SET_ON_DROP_CARD(state, { columnStatus, dropResult }) {
        if (
            dropResult.removedIndex !== null ||
            dropResult.addedIndex !== null
        ) {
            const transaksi = state.items;
            const column = transaksi.filter(p => p.status === columnStatus)[0];
            const columnIndex = transaksi.indexOf(column);

            const newColumn = column;
            newColumn.data = applyDrag(
                newColumn.data,
                dropResult,
                columnStatus
            );
            transaksi.splice(columnIndex, 1, newColumn);

            axios.post("/api/move-status-transaksi", {
                //ddcard
                columnStatus: columnStatus,
                result: dropResult
            });
        }
    },
    SET_STATUS_ON_DROP_CARD(state, { columnStatus, dropResult }) {
        console.log("asdf", columnStatus);
        state.items.forEach(jp => {
            jp.data.map(i => {
                if (i.id == dropResult.payload.id && i.status != columnStatus) {
                    console.log("asdf", columnStatus);
                    i.status = columnStatus;
                }
            });
        });
    }
};

const actions = {
    async GET_ALL({ commit }, id) {
        await commit("SET_ISLOADING", true, { root: true });
        const item = await axios.get("/api/transaksi/" + id);
        await commit("SET_ALL", item.data.data);
        await commit("SET_ISLOADING", false, { root: true });
    },
    async REFRESH_GET_ALL({ commit }, id) {
        const item = await axios.get("/api/transaksi/" + id);
        await commit("SET_ALL", item.data.data);
    },
    async CREATE({ commit, dispatch }, data) {
        await commit("SET_ISLOADING_ACTION", true, { root: true });
        await axios.post("api/transaksi", {
            outlet_id: data.outlet_id,
            detail_pemesanan: data.detail_pemesanan,
            member: data.member,
            diskon: data.diskon,
            pajak: data.pajak,
            biaya_tambahan: data.biaya_tambahan,
            dibayar: data.dibayar,
            total: data.total,
            subtotal: data.subtotal,
            jemput: data.jemput,
            antar: data.antar,
            lng_lat: data.lng_lat,
            jarak: data.jarak,
            ongkir: data.ongkir,
            extra: data.extra.toString()
        });
        await dispatch("REFRESH_GET_ALL", data.outlet_id);
        await commit("SET_ISLOADING_ACTION", false, { root: true });
    },
    async SOFTDELETE_ONE({ dispatch, commit }, data) {
        await commit("SET_ISLOADING_ACTION", true, { root: true });
        await axios.delete("api/transaksi/" + data.id);
        await dispatch("REFRESH_GET_ALL", data.outlet_id);
        await commit("SET_ISLOADING_ACTION", false, { root: true });
    },
    async GET_INFO_BY_ID({ state, commit }, id) {
        await commit("SET_ISLOADING_ACTION", true, { root: true });
        commit(
            "SET_INFO_BY_ID",
            await state.items.find(item => {
                return item.id === id;
            })
        );
        await commit("SET_ISLOADING_ACTION", false, { root: true });
    },
    async UPDATE({ dispatch, commit }, data) {
        await commit("SET_ISLOADING_ACTION", true, { root: true });
        await axios.put("api/transaksi/" + data.id, {
            nama: data.nama,
            alamat: data.alamat,
            jenis_kelamin: data.jenis_kelamin,
            tlp: data.tlp
        });
        await commit("SET_INFO_BY_ID", data);
        await dispatch("REFRESH_GET_ALL", data.outlet_id);
        await commit("SET_ISLOADING_ACTION", false, { root: true });
    },
    async SOFTDELETE_MULTI({ dispatch, commit }, selected) {
        await commit("SET_ISLOADING_ACTION", true, { root: true });
        await axios.post("api/multi-softdelete-transaksi", {
            selected
        });
        await dispatch("REFRESH_GET_ALL");
        await commit("SET_ISLOADING_ACTION", false, { root: true });
    },
    async GET_ALL_TRASH({ commit }) {
        await commit("SET_ISLOADING", true, { root: true });
        const item = await axios.get("/api/trashed-transaksi");
        await commit("SET_ALL_TRASH", item.data.trashed);
        await commit("SET_ISLOADING", false, { root: true });
    },
    async REFRESH_GET_ALL_TRASH({ commit }) {
        const item = await axios.get("/api/trashed-transaksi");
        await commit("SET_ALL_TRASH", item.data.trashed);
    },
    async GET_INFO_TRASH_BY_ID({ state, commit }, id) {
        await commit("SET_ISLOADING_ACTION", true, { root: true });
        commit(
            "SET_INFO_BY_ID",
            await state.trash.items.find(item => {
                return item.id === id;
            })
        );
        await commit("SET_ISLOADING_ACTION", false, { root: true });
    },
    async RESTORE_ONE({ dispatch, commit }, id) {
        await commit("SET_ISLOADING_ACTION", true, { root: true });
        await axios.get("/api/restore-transaksi/" + id);
        await dispatch("REFRESH_GET_ALL_TRASH");
        await commit("SET_ISLOADING_ACTION", false, { root: true });
    },
    async FORCEDELETE_ONE({ dispatch, commit }, id) {
        await commit("SET_ISLOADING_ACTION", true, { root: true });
        await axios.get("/api/force-delete-transaksi/" + id);
        await dispatch("REFRESH_GET_ALL_TRASH");
        await commit("SET_ISLOADING_ACTION", false, { root: true });
    },
    async RESTORE_MULTI({ dispatch, commit }, selected) {
        await commit("SET_ISLOADING_ACTION", true, { root: true });
        await axios.post("api/multi-restore-transaksi", {
            selected
        });
        await dispatch("REFRESH_GET_ALL_TRASH");
        await commit("SET_ISLOADING_ACTION", false, { root: true });
    },
    async FORCEDELETE_MULTI({ dispatch, commit }, selected) {
        await commit("SET_ISLOADING_ACTION", true, { root: true });
        await axios.post("api/multi-force-delete-transaksi", {
            selected
        });
        await dispatch("REFRESH_GET_ALL_TRASH");
        await commit("SET_ISLOADING_ACTION", false, { root: true });
    },
    async ON_CARD_DROP(
        { state, commit, dispatch },
        { columnStatus, dropResult, id }
    ) {
        // console.log('dr', dropResult);
        await commit("SET_ON_DROP_CARD", { columnStatus, dropResult });

        // await commit('SET_STATUS_ON_DROP_CARD', {columnStatus, dropResult})
        await dispatch("REFRESH_GET_ALL", id);
        // await dispatch('GET_INFO_JADWAL_KELAS_BY_ID', dropResult.payload.id)
    },
    async GET_INFO_BY_ID({ state, commit }, { id, column }) {
        await commit("SET_ISLOADING_ACTION", true, { root: true });

        var cc = "";

        state.items.map(jp => {
            jp.data.map(i => {
                if (i.id == id) {
                    cc = i;
                }
            });
        });

        commit("SET_INFO_BY_ID", cc);

        await commit("SET_ISLOADING_ACTION", false, { root: true });
    },
    async UPDATE_BAYAR({ state, dispatch, commit }, { id, outlet_id }) {
        //kecepatan masih belum efektif
        await commit("SET_ISLOADING_ACTION", true, { root: true });
        await axios.get("api/update-bayar-transaksi/" + id);
        await dispatch("REFRESH_GET_ALL", outlet_id);

        var cc = "";
        await state.items.map(jp => {
            jp.data.map(i => {
                if (i.id == id) {
                    cc = i;
                }
            });
        });
        await commit("SET_INFO_BY_ID", cc);

        await commit("SET_ISLOADING_ACTION", false, { root: true });
    },
    async JEMPUT({ dispatch, commit }, data) {
        await commit("SET_ISLOADING_ACTION", true, { root: true });
        await axios.put("api/jemput-transaksi/" + data.id, {
            id: data.id
        });
        // await commit('SET_INFO_BY_ID', data)
        await dispatch("REFRESH_GET_ALL", data.outlet_id);
        await commit("SET_ISLOADING_ACTION", false, { root: true });
    },
    async ANTAR({ dispatch, commit }, data) {
        await commit("SET_ISLOADING_ACTION", true, { root: true });
        await axios.put("api/antar-transaksi/" + data.id, {
            id: data.id
        });
        // await commit('SET_INFO_BY_ID', data)
        await dispatch("REFRESH_GET_ALL", data.outlet_id);
        await commit("SET_ISLOADING_ACTION", false, { root: true });
    },
    async BATAL_JEMPUT({ dispatch, commit }, data) {
        await commit("SET_ISLOADING_ACTION", true, { root: true });
        await axios.put("api/batal-jemput-transaksi/" + data.id, {
            id: data.id
        });
        // await commit('SET_INFO_BY_ID', data)
        await dispatch("REFRESH_GET_ALL", data.outlet_id);
        await commit("SET_ISLOADING_ACTION", false, { root: true });
    },
    async BATAL_ANTAR({ dispatch, commit }, data) {
        await commit("SET_ISLOADING_ACTION", true, { root: true });
        await axios.put("api/batal-antar-transaksi/" + data.id, {
            id: data.id
        });
        // await commit('SET_INFO_BY_ID', data)
        await dispatch("REFRESH_GET_ALL", data.outlet_id);
        await commit("SET_ISLOADING_ACTION", false, { root: true });
    },
    async SELESAI_JEMPUT({ dispatch, commit }, data) {
        await commit("SET_ISLOADING_ACTION", true, { root: true });
        await axios.put("api/selesai-jemput-transaksi/" + data.id, {
            id: data.id
        });
        // await commit('SET_INFO_BY_ID', data)
        await dispatch("REFRESH_GET_ALL", data.outlet_id);
        await commit("SET_ISLOADING_ACTION", false, { root: true });
    },
    async SELESAI_ANTAR({ dispatch, commit }, data) {
        await commit("SET_ISLOADING_ACTION", true, { root: true });
        await axios.put("api/selesai-antar-transaksi/" + data.id, {
            id: data.id
        });
        // await commit('SET_INFO_BY_ID', data)
        await dispatch("REFRESH_GET_ALL", data.outlet_id);
        await commit("SET_ISLOADING_ACTION", false, { root: true });
    },
    async BAYAR({ dispatch, commit }, data) {
        await commit("SET_ISLOADING_ACTION", true, { root: true });
        await axios.put("api/bayar-transaksi/" + data.id, {
            id: data.id
        });
        // await commit('SET_INFO_BY_ID', data)
        await dispatch("REFRESH_GET_ALL", data.outlet_id);
        await commit("SET_ISLOADING_ACTION", false, { root: true });
    },
    async GET_ALL_FROM_ALL_OUTLET({ commit }) {
        await commit("SET_ISLOADING", true, { root: true });

        const item = await axios.get("/api/all-outlet-transaksi/");

        await commit("SET_ALL", item.data.data);
        await commit("SET_ISLOADING", false, { root: true });
    }
};

export default {
    namespaced: true,
    state,
    actions,
    mutations,
    getters
};
