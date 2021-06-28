<template>
    <base-layout>
        <div class="d-flex justify-content-start">
            <the-sidebar />
            <div class="wrap-content">
                <the-navbar />
                <transition name="content" :appear="true">
                    <div>
                        <div class="d-flex justify-content-center" style="width: 100%">
                            <div class="d-flex flex-wrap justify-content-between" style="width: 95%">
                                <div class="wrap-main-chart">
                                    <div class="mb-4">
                                        <p class="font-weight-bold" style="color: darkslateblue">Dashboard</p>
                                    </div>
                                    <div class="d-flex justify-content-start align-items-center mb-5" style="overflow-x: scroll" id="w-menu-master">
                                        <div class="mr-4 mb-2">
                                            <router-link :to="{ path: '/kelola/pegawai/' + id}" class="text-decoration-none navigasi-kelola">
                                                <!-- <div class="bagian-atas-shape-file"></div> -->
                                                <div class="p-4 bagian-tengah-shape-file">
                                                    <div class="d-flex justify-content-start align-items-start" style="height: 60px">
                                                        <div class="d-flex justify-content-start align-items-center">
                                                            <i class="far fa-user mr-3 color-primary" style="font-size: 13pt"></i>
                                                            <p class="mb-0 color-primary" style="font-size: 13pt; font-family: berlin sans fb">Pegawai</p>
                                                        </div>
                                                    </div>
                                                    <div class="d-flex justify-content-end align-items-center">
                                                        <div>
                                                            <p class="mb-0 text-untuk-jumlah" style="font-size: 8pt">JUMLAH</p>
                                                            <p class="text-untuk-jumlah" style="font-size: 13pt; text-align: right">{{pegawaiLength}}</p>
                                                        </div>
                                                    </div>
                                                </div>
                                            </router-link>
                                        </div>
                                        <div class="mr-4 mb-2">
                                            <router-link :to="{ path: '/kelola/pelanggan/' + id}" class="text-decoration-none navigasi-kelola">
                                                <!-- <div class="bagian-atas-shape-file"></div> -->
                                                <div class="p-4 bagian-tengah-shape-file">
                                                    <div class="d-flex justify-content-start align-items-start" style="height: 60px">
                                                        <div class="d-flex justify-content-start align-items-center">
                                                            <i class="fas fa-user-tag mr-3 color-primary" style="font-size: 13pt"></i>
                                                            <p class="mb-0 color-primary" style="font-size: 13pt; font-family: berlin sans fb">Pelanggan</p>
                                                        </div>
                                                    </div>
                                                    <div class="d-flex justify-content-end align-items-center">
                                                        <div>
                                                            <p class="mb-0 text-untuk-jumlah" style="font-size: 8pt">JUMLAH</p>
                                                            <p class="text-untuk-jumlah" style="font-size: 13pt; text-align: right">{{pelangganLength}}</p>
                                                        </div>
                                                    </div>
                                                </div>
                                            </router-link>
                                        </div>
                                        <div class="mr-4 mb-2">
                                            <router-link :to="{ path: '/kelola/paket/' + id}" class="text-decoration-none navigasi-kelola">
                                                <!-- <div class="bagian-atas-shape-file"></div> -->
                                                <div class="p-4 bagian-tengah-shape-file">
                                                    <div class="d-flex justify-content-start align-items-start" style="height: 60px">
                                                        <div class="d-flex justify-content-start align-items-center">
                                                            <i class="fas fa-tshirt mr-3 color-primary" style="font-size: 13pt"></i>
                                                            <p class="mb-0 color-primary" style="font-size: 13pt; font-family: berlin sans fb">Paket</p>
                                                        </div>
                                                    </div>
                                                    <div class="d-flex justify-content-end align-items-center">
                                                        <div>
                                                            <p class="mb-0 text-untuk-jumlah" style="font-size: 8pt">JUMLAH</p>
                                                                <p class="text-untuk-jumlah" style="font-size: 13pt; text-align: right">{{paketLength}}</p>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </router-link>
                                            </div>
                                        <div class="mr-4 mb-2">
                                            <router-link :to="{ path: '/kelola/ongkir/' + id}" class="text-decoration-none navigasi-kelola">
                                                <!-- <div class="bagian-atas-shape-file"></div> -->
                                                <div class="p-4 bagian-tengah-shape-file">
                                                    <div class="d-flex justify-content-start align-items-start" style="height: 60px">
                                                        <div class="d-flex justify-content-start align-items-center">
                                                            <i class="fas fa-exchange-alt mr-3 color-primary" style="font-size: 13pt"></i>
                                                            <p class="mb-0 color-primary" style="font-size: 13pt; font-family: berlin sans fb">Ongkir</p>
                                                        </div>
                                                    </div>
                                                    <div class="d-flex justify-content-end align-items-center">
                                                        <div>
                                                            <p class="mb-0 text-untuk-jumlah" style="font-size: 8pt">JUMLAH</p>
                                                            <p class="text-untuk-jumlah" style="font-size: 13pt; text-align: right">{{ongkirLength}}</p>
                                                        </div>
                                                    </div>
                                                </div>
                                            </router-link>
                                        </div>
                                        <div class="mr-4 mb-2">
                                            <router-link :to="{ name: 'promo', params: { id: id }}" class="text-decoration-none navigasi-kelola">
                                                <!-- <div class="bagian-atas-shape-file"></div> -->
                                                <div class="p-4 bagian-tengah-shape-file">
                                                    <div class="d-flex justify-content-start align-items-start" style="height: 60px">
                                                        <div class="d-flex justify-content-start align-items-center">
                                                            <i class="fas fa-percentage mr-3 color-primary" style="font-size: 13pt"></i>
                                                            <p class="mb-0 color-primary" style="font-size: 13pt; font-family: berlin sans fb">Promo</p>
                                                        </div>
                                                    </div>
                                                    <div class="d-flex justify-content-end align-items-center">
                                                        <div>
                                                            <p class="mb-0 text-untuk-jumlah" style="font-size: 8pt">JUMLAH</p>
                                                                <p class="text-untuk-jumlah" style="font-size: 13pt; text-align: right">{{promoLength}}</p>
                                                        </div>
                                                    </div>
                                                </div>
                                            </router-link>
                                        </div>
                                    </div>
                                    <div class="mb-5">
                                        <div class="d-flex justify-content-between align-items-center">
                                            <div class="ml-3">
                                                <p class="font-weight-bold" style="color: darkslateblue">Bulan ini</p>
                                            </div>
                                        </div>
                                        <TransaksiPerTahun />
                                    </div>
                                    <div class="d-flex flex-wrap justify-content-start align-items-center my-5">
                                        <div v-for="item in getOmsetPerBulan" :key="item.key">
                                            <div v-if="item.transaksi != 0" class="mr-4 mb-2">
                                                <div class="px-4 py-3" :class="item.bulan_ini ? 'bagian-tengah-progress-omset-active' : 'bagian-tengah-progress-omset'">
                                                    <div class="d-flex justify-content-start align-items-start" style="height: 60px">
                                                        <div>
                                                            <p class="mb-0 color-primary" style="font-size: 13pt; font-family: berlin sans fb">{{item.bulan}}</p>
                                                            <p class="mb-0 text-untuk-jumlah" style="font-size: 8pt">Total {{item.transaksi}} transaksi</p>
                                                        </div>
                                                    </div>
                                                    <div class="d-flex justify-content-end align-items-center">
                                                        <div>
                                                            <p class="mb-0 text-untuk-jumlah" style="font-size: 8pt">Omset</p>
                                                            <p class="text-untuk-jumlah" style="font-size: 12pt; text-align: right">{{item.omset | toCurrency}}</p>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    
                                </div>
                                <div class="wrap-hari-ini-chart">
                                    <StatistikHariIni />
                                    <div class="bg-white d-flex justify-content-center py-3 pb-2 mt-2 wadah-laporan-keuangan">
                                        <div style="width: 90%">
                                            <div class="mb-3">
                                                <p class="mb-0 font-weight-bold" style="color: darkslateblue;">Generate laporan keuangan</p>
                                            </div>
                                            <div class="d-flex justify-content-start align-items-center">
                                                <div class="form-group mr-4" style="width: 42%">
                                                    <label style="font-size: 8pt;" class="font-weight-bold" for="start_dt">Mulai dari:</label>
                                                    <div class="d-flex justify-content-start align-items-center">
                                                        <input type="date" style="font-size: 9pt" name="" id="start_dt" v-model="start_dt" class="form-control form-control-sm mb-0">
                                                        <b-input-group-append class="input-group-append">
                                                        <b-button :disabled="!start_dt" @click="start_dt = ''" class="btn btn-sm background-primary text-white" style="padding-top: 1px; padding-bottom: 2px">x</b-button>
                                                        </b-input-group-append>
                                                    </div>
                                                </div>
                                                <div class="form-group" style="width: 42%">
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
                                                <b-button @click="exportPdf" class="btn btn-sm px-3 mt-3 mr-3 color-primary font-weight-bold" style="background: rgb(102,111,193, 0.2); border: none;">
                                                    Generate pdf
                                                </b-button>
                                            </div>
                                            
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="d-flex justify-content-center">
                            <div class="d-flex flex-wrap justify-content-between align-items-start mb-5" style="width: 95%">
                                <div class="mx-2 my-3 wrap-kinerja-pertumbuhan">
                                    <div class="d-flex justify-content-between align-items-center">
                                        <div class="ml-3">
                                            <p class="font-weight-bold" style="color: darkslateblue">Kinerja kasir bulan ini</p>
                                        </div>
                                    </div>
                                    <ChartBarKinerjaKasirBulanIni />
                                </div>
                                <div class="mx-2 my-3 wrap-kinerja-pertumbuhan">
                                    <div class="d-flex justify-content-between align-items-center">
                                        <div class="ml-3">
                                            <p class="font-weight-bold" style="color: darkslateblue">Pertumbuhan pelanggan</p>
                                        </div>
                                    </div>
                                    <ChartLinePertumbuhanPelangganTahunIni />
                                </div>
                            </div>
                        </div>
                    </div>
                </transition>
            </div>
        </div>
    </base-layout>
</template>
<script>

import { mapGetters, mapState } from 'vuex'

import BaseLayout from '../layouts/BaseLayout'
import TheNavbar from '../components/TheNavbar'
import TheSidebar from '../components/TheSidebar'
import TransaksiPerTahun from '../components/dashboard/chart/TransaksiPerTahun'
import StatistikHariIni from '../components/dashboard/StatistikHariIni'
import ChartBarKinerjaKasirBulanIni from '../components/dashboard/chart/ChartBarKinerjaKasirBulanIni'
import ChartLinePertumbuhanPelangganTahunIni from '../components/dashboard/chart/ChartLinePertumbuhanPelangganTahunIni'
import jsPDF from 'jspdf'
import 'jspdf-autotable'


export default {
    data(){
        return {
            id: '',
            start_dt: '',
            end_dt: '',
            transaksi: '',
            pre_transaksi: ''
        }
    },
    components: {
        BaseLayout,
        TheNavbar,
        TheSidebar,
        TransaksiPerTahun,
        StatistikHariIni,
        ChartBarKinerjaKasirBulanIni,
        ChartLinePertumbuhanPelangganTahunIni
    },
    computed: {
        ...mapState({
            itemsTransaksi: state => state.transaksi.items
        }),
        ...mapGetters({
            pegawaiLength: 'pegawai/getLength',
            pelangganLength: 'pelanggan/getLength',
            paketLength: 'paket/getLength',
            ongkirLength: 'ongkir/getLength',
            promoLength: 'promo/getLength',
            getOmsetPerBulan: 'transaksi/getOmsetPerBulan'
        }),
        ...mapState({
            outlet: state => state.outlet.info
        })
    },
    watch: {
        itemsTransaksi(){
            this.transaksi = JSON.parse(JSON.stringify(this.itemsTransaksi))
            this.pre_transaksi = JSON.parse(JSON.stringify(this.itemsTransaksi))
        },
    },
    methods: {
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

                let id = this.$route.params.id;
                const outlet = await this.$store.dispatch('outlet/GET_INFO_BY_ID_REQUEST', id);

                var columns = [
                { dataKey: 'kode_invoice', title: 'Kode Invoice'},
                { dataKey: 'member', displayProperty: "nama", title: 'Nama'},
                { dataKey: 'tgl', title: 'Pemesanan'},
                { dataKey: 'status', title: 'Status'},
                { dataKey: 'dibayar', title: 'Dibayar'},
                { dataKey: 'total', title: 'Total'}
                ];


                var doc = new jsPDF('p', 'pt');

                 //kop
                doc.addImage('/images/logo-laundry.png', 'JPEG', 50, 30, 75, 70);
                doc.setFontSize(14);
                doc.text(this.outlet.nama + ' Application Report', 135, 60);
                doc.setFontSize(9);
                doc.text(this.outlet.alamat , 135, 80);
                doc.line(40, 100, 550, 100);

                doc.setFontSize(11);
                doc.text('Laporan Keuangan Laundry', 40, 120);
                doc.setFontSize(9);
                doc.text('Omset yang didapat dari tanggal ' + this.start_dt + ' sampai dengan tanggal ' + this.end_dt + ' berjumlah ' + rupiah(jumlah), 40, 150);
                
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
                doc.text(auth.data.role.charAt(0).toUpperCase() + auth.data.role.slice(1) + ' ' + this.outlet.nama + ', ........................', 420, doc.internal.pageSize.height - 125);

                doc.setFontSize(9);
                doc.text(auth.data.nama, 420, doc.internal.pageSize.height - 40);
                
                doc.save('laporan-keuangan-laundry-' + this.outlet.nama + '.pdf');
            }
        }
    },
    async created(){
        try {
            let id = this.$route.params.id;
            this.id = id

            await this.$store.dispatch('pegawai/REFRESH_GET_ALL', id)
            await this.$store.dispatch('pelanggan/REFRESH_GET_ALL', id)
            await this.$store.dispatch('paket/REFRESH_GET_ALL', id)
            await this.$store.dispatch('ongkir/REFRESH_GET_ALL', id)
            await this.$store.dispatch('promo/REFRESH_GET_ALL', id)
            await this.$store.dispatch('transaksi/REFRESH_GET_ALL', id)

        } catch (error) {
            alert(error);
        }
    }
};
</script>
<style scoped>
    .color-primary{
        color: rgb(102,111,193);
    }
    .background-primary{
        background: rgb(102,111,193);
    }
    .wrap-content{
        width: 100%;
    }
    .wrap-main-chart{
        width: 70%
    }
    .wrap-hari-ini-chart{
        width: 25%;
    }
    .wrap-kinerja-pertumbuhan{
        width: 45%
    }
    .wadah-laporan-keuangan{
        width: 100%;
        border-radius: 15px;
        min-height: 20%;
    }
    @media screen and (max-width: 1200px){
        .wrap-main-chart{
            width: 100%
        }
        .wrap-hari-ini-chart{
            width: 100%;
        }
    }
    @media screen and (max-width: 1080px){
        .wrap-kinerja-pertumbuhan{
            width: 100%
        }
    }
    .bagian-atas-shape-file{
        width: 110px; 
        height: 0px;
        border-bottom: 20px solid white; 
        border-right: 35px solid transparent;
        border-radius: 10px 0px 0px 0px;
    }
    .bagian-tengah-shape-file{
        width: 230px; 
        height: 150px;
        background: white;
        border-radius: 10px 10px 10px 10px;
    }
    .text-untuk-jumlah{
        color: darkgray;
    }
    .navigasi-kelola.router-link-exact-active .bagian-tengah-shape-file{
        background: rgb(102,111,193);
    }
    .navigasi-kelola.router-link-exact-active .bagian-atas-shape-file{
        border-bottom: 25px solid rgb(102,111,193); 
    }
    .navigasi-kelola.router-link-exact-active p,
    .navigasi-kelola.router-link-exact-active i,
    .navigasi-kelola.router-link-exact-active .text-untuk-jumlah{
        color: white;
    }

    .bagian-tengah-progress-omset{
        width: 210px; 
        height: 130px;
        background: white;
        border-radius: 10px 10px 10px 10px;
    }
    .bagian-tengah-progress-omset-active{
        background: rgb(102,111,193);
        width: 210px; 
        height: 130px;
        border-radius: 10px 10px 10px 10px;
    }
    .bagian-tengah-progress-omset-active p,
    .bagian-tengah-progress-omset-active i,
    .bagian-tengah-progress-omset-active .text-untuk-jumlah{
        color: white;
    }

    .content-enter-active, .content-leave-active {
        transition: all 1s;
    }

    .content-enter, .content-leave-to {
        opacity: 0;
        transform: translateX(100px);
    }

    .content-enter-to, .content-leave {
        opacity: 1;
        transform: translateX(0);
    }

    ::-webkit-scrollbar {
        /* width: 2px; */
        height: 5px;
    }
    /* Track */
    ::-webkit-scrollbar-track {
        background: #f1f1f1; 
        border-radius: 15px
    }
    
    /* Handle */
    ::-webkit-scrollbar-thumb {
        background: lightgray; 
        border-radius: 15px
    }

    /* Handle on hover */
    ::-webkit-scrollbar-thumb:hover {
        background: gray; 
    }
</style>