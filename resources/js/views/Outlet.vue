<template>
  <base-layout>
    <div class="d-flex justify-content-start align-items-center">
        <div style="width: 15%">
            <p class="font-weight-bold color-primary" style="margin-left: 100px; font-size: 15pt; font-family: cursive">bersih.</p>
        </div>
        <div style="width: 85%">
            <the-navbar />
        </div>
    </div>
    <div class="d-flex justify-content-center mt-4">
        <div style="width: 90%">
            <div>
                <p class="font-weight-bold mx-2" style="font-size: 12pt; color: grey">Daftar Outlet</p>
            </div>
            <div class="d-flex flex-wrap justify-content-start align-items-center">
                <template v-if="isLoading">
                    <div class="facebook-card d-flex flex-wrap justify-content-start align-items-center">
                        <vue-skeleton-loader
                        :width="300"
                        :height="210"
                        animation="wave"
                        class="mr-4 my-2"
                        />
                        <vue-skeleton-loader
                        :width="300"
                        :height="210"
                        animation="wave"
                        class="mr-4 my-2"
                        />
                    </div>
                </template>
                <template v-else>
                    <div v-for="item in items" :key="item.id">
                        <div class="d-flex justify-content-end pr-5">
                            <b-dropdown size="sm" right variant="none" no-caret class="p-0" style="position: absolute; z-index: 9; margin-top: 30px">
                                <template #button-content>
                                    <i class="fas fa-ellipsis-h" style="color: gray"></i>
                                </template>
                                <b-dropdown-item-button @click="redirectEdit(item.id)">Edit</b-dropdown-item-button>
                                <b-dropdown-item-button @click="showModalDelete(item.id)">Delete</b-dropdown-item-button>
                                <b-modal style="width: 200px" :id="'modal-no-backdrop-' + item.id" hide-backdrop hide-header hide-footer hide-header-close centered content-class="shadow" size="sm">
                                    <div class="d-flex justify-content-center align-items-center">
                                        <div class="d-flex justify-content-center align-items-center rounded-circle mr-2" style="width: 100px; height: 100px; border: 3px solid rgb(102,111,193)">
                                            <i class="fas fa-exclamation" style="font-size: 20pt; color: rgb(102,111,193)"></i>
                                        </div>
                                        <div>
                                            <p class="font-weight-bold" style="font-size: 9pt">Anda yakin ingin menghapus?</p>
                                            <div class="d-flex justify-content-start align-items-center">
                                                <button @click="$bvModal.hide('modal-no-backdrop'+item.id)" class="btn btn-sm btn-warning mx-1" style="width: 60px; font-size: 9pt; color: white">Tidak</button>
                                                <button @click="softDelete(item.id)" class="btn btn-sm btn-info mx-1" style="width: 60px; font-size: 9pt">Ya</button>
                                            </div>
                                        </div>
                                    </div>
                                </b-modal>
                            </b-dropdown>
                        </div>
                        <router-link :to="{ name: 'dashboard', params: { id: item.id }}" class="text-decoration-none">
                            <div class="card-outlet rounded shadow-sm p-4 cursor-pointer mr-4 my-2">
                                <div style="height: 140px">
                                    <div class="d-flex justify-content-between alig-items-center mb-2">
                                        <p class="font-weight-bold color-primary mb-0">{{ item.nama }}</p>
                                    </div>
                                    <small style="color: gray">
                                        {{ item.alamat }}
                                    </small>
                                    <div class="mt-1">
                                        <small style="color: gray">
                                            LngLat: {{ item.lng_lat }}
                                        </small>
                                    </div>
                                </div>
                                <div class="d-flex justify-content-end align-items-center">
                                    <i class="fas fa-phone mr-2" style="color: gray"></i>
                                    <small style="color: gray">{{ item.tlp }}</small>
                                </div>
                            </div>
                        </router-link>
                    </div>
                </template>

                <div @click="redirectCreate" class="card-tambah d-flex justify-content-center align-items-center rounded p-4 cursor-pointer mr-4 my-2">
                    <i class="fas fa-plus text-white mr-2" style="font-size: 20pt"></i>
                </div>
            </div>
            <div>
                <p class="font-weight-bold mx-2 mt-5" style="font-size: 12pt; color: grey">Laporan Pendapatan</p>
            </div>
            <div class="bg-white d-flex justify-content-center py-4 pb-2 mt-2 wadah-laporan-keuangan" style="width: 400px; border-radius: 15px">
                <div style="width: 85%">
                    <div class="mb-3">
                        <p class="mb-0 font-weight-bold" style="color: darkslateblue;">Generate laporan</p>
                    </div>
                    <div class="d-flex justify-content-start align-items-center">
                        <div class="form-group" style="width: 40%; margin-right: 45px">
                            <label style="font-size: 8pt;" class="font-weight-bold" for="start_dt">Mulai dari:</label>
                            <div class="d-flex justify-content-start align-items-center">
                                <input type="date" style="font-size: 9pt" name="" id="start_dt" v-model="start_dt" class="form-control form-control-sm mb-0">
                                <b-input-group-append class="input-group-append">
                                <b-button :disabled="!start_dt" @click="start_dt = ''" class="btn btn-sm background-primary text-white" style="padding-top: 1px; padding-bottom: 2px">x</b-button>
                                </b-input-group-append>
                            </div>
                        </div>
                        <div class="form-group" style="width: 40%">
                            <label style="font-size: 8pt;" class="font-weight-bold" for="end_dt">Sampai dengan:</label>
                            <div class="d-flex justify-content-start align-items-center">
                                <input type="date" style="font-size: 9pt" name="" id="end_dt" v-model="end_dt" class="form-control form-control-sm mb-0">
                                <b-input-group-append class="input-group-append">
                                <b-button :disabled="!end_dt" @click="end_dt = ''" class="btn btn-sm background-primary text-white" style="padding-top: 1px; padding-bottom: 2px">x</b-button>
                                </b-input-group-append>
                            </div>
                        </div>
                    </div>
                    <div class="d-flex justify-content-end align-items-center">
                        <b-button @click="exportPdf" class="btn btn-sm px-3 mt-3 color-primary font-weight-bold" style="background: rgb(102,111,193, 0.2); border: none;">
                            Generate pdf
                        </b-button>
                    </div>
                </div>
            </div>
        </div> 
    </div>
    <Create />
    <Update />
    <b-alert
    :show="dismissCountDown"
    dismissible
    variant="success"
    @dismissed="dismissCountDown=0"
    @dismiss-count-down="countDownChanged"
    class=""
    style="position: fixed; bottom: 0; right: 0; z-index: 99; width: 30%; margin-right: 50px;"
    >
    Data berhasil dihapus.
    </b-alert>
  </base-layout>
</template>

<script>

import BaseLayout from "../layouts/BaseLayout";
import TheNavbar from "../components/TheNavbar";
import Create from "../components/outlet/Create";
import Update from "../components/outlet/Update";
import VueSkeletonLoader from 'skeleton-loader-vue';
import { mapState } from 'vuex'
import jsPDF from 'jspdf'
import 'jspdf-autotable'

export default {
    components: {
        BaseLayout,
        TheNavbar,
        Create,
        Update,
        VueSkeletonLoader
    },

    data(){
        return{
            dismissSecs: 5,
            dismissCountDown: 0,
            start_dt: '',
            end_dt: '',
            transaksi: '',
            pre_transaksi: ''
        }
    },

    computed: {
        ...mapState({
            items: state => state.outlet.items,
            isLoading: state => state.isLoading,
            isLoadingAction: state => state.isLoadingAction,
            itemsTransaksi: state => state.transaksi.items
        }),
    },
    watch: {
        itemsTransaksi(){
            this.transaksi = JSON.parse(JSON.stringify(this.itemsTransaksi))
            this.pre_transaksi = JSON.parse(JSON.stringify(this.itemsTransaksi))
        },
    },

    methods: {
        countDownChanged(dismissCountDown) {
            this.dismissCountDown = dismissCountDown
        },
        redirectCreate(){
            this.$bvModal.show( "modalCreate")
        },
        async redirectEdit(id){
            try{
                await this.$store.dispatch('outlet/GET_INFO_BY_ID', id)
                this.$bvModal.show( "modalUpdate")
            }catch(err) {
                alert(err);
            }
        },
        async softDelete(id){
            try{
                await this.$store.dispatch('outlet/SOFTDELETE_ONE', id)
                this.dismissCountDown = this.dismissSecs
            }catch(err) {
                alert(err);
            }
        },
        showModalDelete(modal){
            this.$bvModal.show('modal-no-backdrop-'+modal)
        },
        async exportPdf(){
            if (this.start_dt != '' || this.end_dt != '') {

                this.transaksi = this.pre_transaksi

                let jumlah = 0

                const r_date_time = this.transaksi.map(item => {
                    return {
                        'status': item.status,
                        'data' : item.data.filter(i => {
                            let split = i.tgl.split(' ')
                            if (this.start_dt <= split[0] && this.end_dt >= split[0] || this.start_dt == split[0] || this.end_dt == split[0]) {
                                jumlah += i.total
                                i.total = rupiah(i.total)
                                return this.start_dt <= split[0] && this.end_dt >= split[0] || this.start_dt == split[0] || this.end_dt == split[0]    
                            }
                            
                        })
                    }
                })

                function rupiah(jumlah) {
                    var	reverse = jumlah.toString().split('').reverse().join(''),
                    ribuan 	= reverse.match(/\d{1,3}/g);
                    ribuan	= ribuan.join('.').split('').reverse().join('');

                    return 'Rp. ' + ribuan
                }

                const penjemputan = r_date_time.find(item => {
                    if(item.status == 'penjemputan'){
                        return item.data
                    }
                })
                const antrian = r_date_time.find(item => {
                    if(item.status == 'antrian'){
                        return item.data
                    }
                })
                const proses = r_date_time.find(item => {
                    if(item.status == 'proses'){
                        return item.data
                    }
                })
                const siap_ambil = r_date_time.find(item => {
                    if(item.status == 'siap ambil'){
                        return item.data
                    }
                })
                const siap_antar = r_date_time.find(item => {
                    if(item.status == 'siap antar'){
                        return item.data
                    }
                })
                const selesai = r_date_time.find(item => {
                    if(item.status == 'selesai'){
                        return item.data
                    }
                })

                var columns = [
                { dataKey: 'kode_invoice', title: 'Kode Invoice'},
                { dataKey: 'outlet', displayProperty: "nama", title: 'Outlet'},
                { dataKey: 'member', displayProperty: "nama", title: 'Nama'},
                { dataKey: 'tgl', title: 'Pemesanan'},
                { dataKey: 'status', title: 'Status'},
                { dataKey: 'dibayar', title: 'Dibayar'},
                { dataKey: 'total', title: 'Total'}
                ];

                

                var	reverse = jumlah.toString().split('').reverse().join(''),
                ribuan 	= reverse.match(/\d{1,3}/g);
                ribuan	= ribuan.join('.').split('').reverse().join('');

                var doc = new jsPDF('p', 'pt');

                 //kop
                doc.addImage('/images/logo-laundry.png', 'JPEG', 50, 30, 75, 70);
                doc.setFontSize(14);
                doc.text('Outlet Application Report', 135, 70);
                doc.line(40, 100, 550, 100);

                doc.setFontSize(11);
                doc.text('Laporan Keuangan Laundry', 40, 120);
                doc.setFontSize(9);
                doc.text('Omset seluruh outlet yang didapat dari tanggal ' + this.start_dt + ' sampai dengan tanggal ' + this.end_dt + ' berjumlah ' + rupiah(ribuan), 40, 150);
                
                const monthNames = ["Januari", "Februari", "Maret", "April", "Mei", "Juni",
                    "Juli", "Augustus", "September", "Oktober", "November", "Desember"];
                let dateObj = new Date();
                let month = monthNames[dateObj.getMonth()];
                let day = String(dateObj.getDate()).padStart(2, '0');
                let year = dateObj.getFullYear();
                let output = month  + ' '+ day  + ',' + year;
                var auth = JSON.parse(localStorage.getItem('auth'));

                doc.setFontSize(8);
                doc.text('' + output, 465, 120);

                const rows = [...penjemputan.data, ...antrian.data, ...proses.data, ...siap_ambil.data, ...siap_antar.data, ...selesai.data]
                doc.autoTable({
                    body: rows,
                    columns: columns,
                    didParseCell: function(data) {
                        if (data.column.raw.displayProperty) {
                            var prop = data.column.raw.displayProperty;
                            var text = data.cell.raw[prop];
                            if (text && text.length > 0) {
                                data.cell.text = text;
                            }
                        }
                    },
                    margin: {top: 170},
                    styles: { fontSize: 8.5 }
                });

                doc.setFontSize(9);
                doc.text(auth.data.role.charAt(0).toUpperCase() + auth.data.role.slice(1) + ', ........................', 420, doc.internal.pageSize.height - 125);

                doc.setFontSize(9);
                doc.text(auth.data.nama, 420, doc.internal.pageSize.height - 40);
                
                doc.save('laporan-keuangan-laundry' + '.pdf');
            }
        }
    },
    async created(){
        try{
            await this.$store.dispatch('outlet/GET_ALL')
            await this.$store.dispatch('transaksi/GET_ALL_FROM_ALL_OUTLET')
        }catch(err) {
            alert(err);
        }
    }
}
</script>

<style lang="scss" scoped> 
    .color-primary{
        color: rgb(102,111,193);
    }
    .background-primary{
        background: rgb(102,111,193);
    }
    .card-tambah{
        width: 300px; 
        height: 210px; 
        background: rgb(102,111,193);
        transition: 0.3s;
        cursor: pointer;

        &:hover{
            background: rgb(102,111,193, 0.5);
        }
    }
    .card-outlet{
        width: 300px; 
        height: 210px; 
        background: rgb(255, 255, 255);
        transition: 0.3s;
        cursor: pointer;

        &:hover{
            background: rgb(255, 255, 255, 0.3);
            box-shadow: none;
        }
    }
</style>