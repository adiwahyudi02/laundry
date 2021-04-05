<template>
    <base-layout>
        <div class="d-flex justify-content-start">
            <the-sidebar />
            <div class="wrap-content">
                <the-navbar />
                <transition name="content" :appear="true">
                    <div class="d-flex justify-content-center" style="width: 100%">
                        <div class="wadah-biar-tengah-responsive">
                            <div class="wadah-kelola-table">
                                <div class="mb-4">
                                    <p class="font-weight-bold" style="color: darkslateblue">Kelola outlet</p>
                                </div>
                                <div class="d-flex flex-wrap justify-content-start align-items-center">
                                    <div class="mr-4 mb-2">
                                        <router-link :to="{ name: 'pegawai', params: { id: id }}" class="text-decoration-none navigasi-kelola">
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
                                        <router-link :to="{ name: 'pelanggan', params: { id: id }}" class="text-decoration-none navigasi-kelola">
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
                                        <router-link :to="{ name: 'paket', params: { id: id }}" class="text-decoration-none navigasi-kelola">
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
                                        <router-link :to="{ name: 'ongkir', params: { id: id }}" class="text-decoration-none navigasi-kelola">
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
                                <transition name="kelolaroute" mode="out-in">
                                    <router-view></router-view>
                                </transition>
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

export default {
    data(){
        return {
            id: ''
        }
    },
    components: {
        BaseLayout,
        TheNavbar,
        TheSidebar
    },
    computed: {
        ...mapGetters({
            pegawaiLength: 'pegawai/getLength',
            pelangganLength: 'pelanggan/getLength',
            paketLength: 'paket/getLength',
            ongkirLength: 'ongkir/getLength',
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
        width: 85%;
    }
    .navigasi-kelola.router-link-exact-active .item-link-navigasi{
        background: rgb(102,111,193);
        color: white;
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
    
    .wadah-biar-tengah-responsive{
        width: 90%;
    }
    .wadah-kelola-table{
        width: 100%;
    }

    @media screen and (max-width: 450px){
        .wadah-biar-tengah-responsive{
            width: 100%;
        }
    }

    .kelolaroute-enter-active, .kelolaroute-leave-active {
        transition: all 0.5s;
    }

    .kelolaroute-enter, .kelolaroute-leave-to {
        opacity: 0;
        transform: translateX(100px);
    }

    .kelolaroute-enter-to, .kelolaroute-leave {
        opacity: 1;
        transform: translateX(0);
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