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
                                    <div class="d-flex flex-wrap justify-content-start align-items-center mb-5">
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
                                    </div>
                                    <div class="mb-5">
                                        <div class="d-flex justify-content-between align-items-center">
                                            <div class="ml-3">
                                                <p class="font-weight-bold" style="color: darkslateblue">Bulan ini</p>
                                            </div>
                                        </div>
                                        <TransaksiPerTahun />
                                    </div>
                                    <div class="d-flex flex-wrap justify-content-start align-items-center mb-5">
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

import { mapGetters } from 'vuex'

import BaseLayout from '../layouts/BaseLayout'
import TheNavbar from '../components/TheNavbar'
import TheSidebar from '../components/TheSidebar'
import TransaksiPerTahun from '../components/dashboard/chart/TransaksiPerTahun'
import StatistikHariIni from '../components/dashboard/StatistikHariIni'
import ChartBarKinerjaKasirBulanIni from '../components/dashboard/chart/ChartBarKinerjaKasirBulanIni'
import ChartLinePertumbuhanPelangganTahunIni from '../components/dashboard/chart/ChartLinePertumbuhanPelangganTahunIni'


export default {
    data(){
        return {
            id: ''
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
        ...mapGetters({
            pegawaiLength: 'pegawai/getLength',
            pelangganLength: 'pelanggan/getLength',
            paketLength: 'paket/getLength',
            ongkirLength: 'ongkir/getLength',
            getOmsetPerBulan: 'transaksi/getOmsetPerBulan'
        })
    },
    async created(){
        try {
            let id = this.$route.params.id;
            this.id = id

            await this.$store.dispatch('pegawai/REFRESH_GET_ALL', id)
            await this.$store.dispatch('pelanggan/REFRESH_GET_ALL', id)
            await this.$store.dispatch('paket/REFRESH_GET_ALL', id)
            await this.$store.dispatch('ongkir/REFRESH_GET_ALL', id)
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
</style>