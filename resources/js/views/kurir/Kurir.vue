<template>
  <base-layout>
    <div v-if="!conditionDirectionKurir" class="p-5">
        <div>
            <div>
                <p class="font-weight-bold mx-2 color-primary " style="font-size: 12pt;">Penjemputan</p>
            </div>
            <div v-if="!isLoading"  class="d-flex flex-wrap justify-content-start align-items-center mb-5">
                <div v-for="item in getPenjemputan.data" :key="item.id" class="mb-5">
                    <div v-if="item.dijemput == 0 || item.dijemput == user.data.id" class="p-3 card-transaksi-penjemputan mb-2 mx-2" @click="redirectInfo(item.id, item.status)">
                        <div class="d-flex justify-content-between align-items-center mb-3">
                            <p class="mb-0 font-weight-bold color-primary" style="font-family: monospace">{{item.kode_invoice}}</p>
                            <div class="d-flex justify-content-start align-items-center">
                                <i class="far fa-user-circle color-primary mr-2" style="font-size: 15pt"></i>
                                <div>
                                    <p class="mb-0 font-weight-bold color-primary" style="font-size: 8pt;">{{item.member.nama}}</p>
                                </div>
                            </div>
                        </div>
                        <div class="d-flex justify-content-between align-items-center">
                            <div>
                                <p class="mb-0" style="font-size: 8pt; color: darkgray">Lat lng</p>
                                <p style="font-size: 9pt">{{item.lng_lat}}</p>
                            </div>
                            <p class="font-weight-bold" style="font-size: 10pt">-</p>
                            <div>
                                <p class="mb-0" style="font-size: 8pt; color: darkgray">Ongkir</p>
                                <p style="font-size: 9pt">{{ item.ongkir | toCurrency }}</p>
                            </div>
                        </div>
                        <div class="d-flex justify-content-between align-items-center mb-2 px-3 py-2" style="border-radius: 10px; background: rgb(249,249,249)">
                            <p class="mb-0 color-primary" style="font-size: 9pt;">Detail pesanan</p>
                            <p class="mb-0 color-primary" style="font-size: 9pt;">{{item.detail_transaksi.length}} Item</p>
                        </div>
                        <div class="d-flex justify-content-between align-items-center">
                            <div>
                                <p class="mb-0" style="font-size: 8pt; color: darkgray">Tagihan</p>
                                <p style="font-size: 9pt">{{ item.total | toCurrency }}</p>
                            </div>
                        </div>
                    </div>
                    <div v-if="item.dijemput == 0 || item.dijemput == user.data.id" class="d-flex justify-content-end align-items-center mb-3" style="width: 95%; margin-top: -95px; cursor: pointer">
                        <div>
                            <div @click="redirectMaps(item.id, item.status)" class="px-4 py-1 d-flex justify-content-center align-items-center" style="background: rgb(255,239,235); border-radius: 10px">
                                <i class="fas fa-map-marker-alt mr-2" style="color: rgb(255,160,135); font-size: 9pt"></i>
                                <p class="mb-0 font-weight-bold" style="color: rgb(255,160,135); font-size: 9pt">Maps</p>
                            </div>
                        </div>
                    </div>
                    <div v-if="item.dijemput == 0 || item.dijemput == user.data.id" class="d-flex justify-content-center align-items-center">
                        <div style="width: 90%; cursor: pointer">
                            <div @click="jemput(item.id)" v-if="item.dijemput == ''" class="py-1 color-primary font-weight-bold d-flex justify-content-center align-items-center" style="font-size: 9pt; background: rgb(102,111,193, 0.2); border-radius: 10px; border: none;">
                                <p class="mb-0">
                                    Jemput sekarang
                                </p>
                            </div>
                            <div v-else class="d-flex justify-content-center align-items-center">
                                <div @click="batalJemput(item.id)" class="mr-1 px-4 py-1 d-flex justify-content-center align-items-center" style="width: 50%; background: rgb(255,239,235); border-radius: 10px">
                                    <p class="mb-0 font-weight-bold" style="color: rgb(255,160,135); font-size: 9pt">Batalkan</p>
                                </div>
                                <div @click="selesaiJemput(item.id)" class="ml-1 py-1 color-primary font-weight-bold d-flex justify-content-center align-items-center" style="width: 50%; font-size: 9pt; background: rgb(102,111,193, 0.2); border-radius: 10px; border: none;">
                                    <p class="mb-0">
                                        Selesai
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <div class="mt-5">
            <div>
                <p class="font-weight-bold mx-2 color-primary " style="font-size: 12pt;">Pengantaran</p>
            </div>
            <div v-if="!isLoading"  class="d-flex flex-wrap justify-content-start align-items-center">
                <div v-for="item in getPengantaran.data" :key="item.id" class="mb-5">
                    <div v-if="item.diantar == 0 || item.diantar == user.data.id" class="p-3 card-transaksi-pengantaran mb-2 mx-2" @click="redirectInfo(item.id, item.status)">
                        <div class="d-flex justify-content-between align-items-center mb-3">
                            <p class="mb-0 font-weight-bold color-primary" style="font-family: monospace">{{item.kode_invoice}}</p>
                            <div class="d-flex justify-content-start align-items-center">
                                <i class="far fa-user-circle color-primary mr-2" style="font-size: 15pt"></i>
                                <div>
                                    <p class="mb-0 font-weight-bold color-primary" style="font-size: 8pt;">{{item.member.nama}}</p>
                                </div>
                            </div>
                        </div>
                        <div class="d-flex justify-content-between align-items-center">
                            <div>
                                <p class="mb-0" style="font-size: 8pt; color: darkgray">Lat lng</p>
                                <p style="font-size: 9pt">{{item.lng_lat}}</p>
                            </div>
                            <p class="font-weight-bold" style="font-size: 10pt">-</p>
                            <div>
                                <p class="mb-0" style="font-size: 8pt; color: darkgray">Ongkir</p>
                                <p style="font-size: 9pt">{{ item.ongkir | toCurrency }}</p>
                            </div>
                        </div>
                        <div class="d-flex justify-content-between align-items-center mb-2 px-3 py-2" style="border-radius: 10px; background: rgb(249,249,249)">
                            <p class="mb-0 color-primary" style="font-size: 9pt;">Detail pesanan</p>
                            <p class="mb-0 color-primary" style="font-size: 9pt;">{{item.detail_transaksi.length}} Item</p>
                        </div>
                        <div class="d-flex justify-content-between align-items-center">
                            <div>
                                <p class="mb-0" style="font-size: 8pt; color: darkgray">Tagihan</p>
                                <p style="font-size: 9pt">{{ item.total | toCurrency }}</p>
                            </div>
                        </div>
                    </div>
                    <div v-if="item.diantar == 0 || item.diantar == user.data.id" class="d-flex justify-content-end align-items-center mb-3" style="width: 95%; margin-top: -130px; cursor: pointer">
                        <div>
                            <div @click="redirectMaps(item.id, item.status)" class="px-4 py-1 d-flex justify-content-center align-items-center" style="background: rgb(255,239,235); border-radius: 10px">
                                <i class="fas fa-map-marker-alt mr-2" style="color: rgb(255,160,135); font-size: 9pt"></i>
                                <p class="mb-0 font-weight-bold" style="color: rgb(255,160,135); font-size: 9pt">Maps</p>
                            </div>
                        </div>
                    </div>
                    <div v-if="item.diantar == 0 || item.diantar == user.data.id" class="d-flex justify-content-center align-items-center">
                        <div style="width: 90%; cursor: pointer">
                            <div @click="antar(item.id)" v-if="item.diantar == ''" class="py-1 color-primary font-weight-bold d-flex justify-content-center align-items-center" style="font-size: 9pt; background: rgb(102,111,193, 0.2); border-radius: 10px; border: none;">
                                <p class="mb-0">
                                    Antar sekarang
                                </p>
                            </div>
                            <div v-else class="d-flex justify-content-center align-items-center">
                                <div @click="batalAntar(item.id)" class="mr-1 px-4 py-1 d-flex justify-content-center align-items-center" style="width: 50%; background: rgb(255,239,235); border-radius: 10px">
                                    <p class="mb-0 font-weight-bold" style="color: rgb(255,160,135); font-size: 9pt">Batalkan</p>
                                </div>
                                <div @click="selesaiAntar(item.id)" class="ml-1 py-1 color-primary font-weight-bold d-flex justify-content-center align-items-center" style="width: 50%; font-size: 9pt; background: rgb(102,111,193, 0.2); border-radius: 10px; border: none;">
                                    <p class="mb-0">
                                        Selesai
                                    </p>
                                </div>
                            </div>
                            <div v-if="item.dibayar == 'Lunas'" class="mt-3 px-4 py-1 d-flex justify-content-center align-items-center" style="background: rgb(234,248,246); border-radius: 10px">
                                <p class="mb-0 font-weight-bold" style="color: rgb(141,215,204); font-size: 9pt">Lunas</p>
                            </div>
                            <div @click="bayar(item.id)" v-else class="mt-3 px-4 py-1 d-flex justify-content-center align-items-center" style="background: rgb(217, 243, 255); border-radius: 10px">
                                <p class="mb-0 font-weight-bold" style="color:rgb(110, 207, 255); font-size: 9pt">Bayar</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <Info />
    </div>
    <div v-else>
        <DirectionKurir @hideMap="conditionDirectionKurir = false" @redirectInfo="redirectInfo" @jemput="jemput" @batalJemput="batalJemput"/>
    </div>
  </base-layout>
</template>

<script>
import { mapGetters, mapState } from 'vuex'
import BaseLayout from '../../layouts/BaseLayout'
import Info from '../../components/pemesanan/Info';
import DirectionKurir from '../../components/kurir/DirectionKurir';
import TheNavbar from "../../components/TheNavbar";

export default {
    components: {
        BaseLayout,
        Info,
        DirectionKurir,
        TheNavbar
    },
    data() {
        return {
            conditionDirectionKurir: false,
            user: ''
        }
    },
    computed: {
        ...mapGetters({
            getPenjemputan: 'transaksi/getPenjemputan',
            getPengantaran: 'transaksi/getPengantaran'
        }),
        ...mapState({
            isLoading: state => state.isLoading,
            isLoadingAction: state => state.isLoadingAction
        }),
    },
    methods: {
        jemput(id){
            alert(id)
        },
        async redirectInfo(id, column){
            try{
                const data = {
                    id, column
                }
                await this.$store.dispatch('transaksi/GET_INFO_BY_ID', data)
                this.$bvModal.show("modalInfo")
            }catch(err) {
                alert(err);
            }
        },
        async redirectMaps(id, column){
            try{
                const data = {
                    id, column
                }

                await this.$store.dispatch('outlet/GET_INFO_BY_ID_REQUEST', this.$route.params.id);
                await this.$store.dispatch('transaksi/GET_INFO_BY_ID', data)
                this.conditionDirectionKurir = true
            }catch(err) {
                alert(err);
            }
        },
        async jemput(id){
            try{
                let outlet_id = this.$route.params.id;
                const data = {
                    id, outlet_id
                }
                await this.$store.dispatch('transaksi/JEMPUT', data)
            }catch(err) {
                alert(err);
            }
        },
        async antar(id){
            try{
                let outlet_id = this.$route.params.id;
                const data = {
                    id, outlet_id
                }
                await this.$store.dispatch('transaksi/ANTAR', data)
            }catch(err) {
                alert(err);
            }
        },
        async batalJemput(id){
            try{
                let outlet_id = this.$route.params.id;
                const data = {
                    id, outlet_id
                }
                await this.$store.dispatch('transaksi/BATAL_JEMPUT', data)
            }catch(err) {
                alert(err);
            }
        },
        async batalAntar(id){
            try{
                let outlet_id = this.$route.params.id;
                const data = {
                    id, outlet_id
                }
                await this.$store.dispatch('transaksi/BATAL_ANTAR', data)
            }catch(err) {
                alert(err);
            }
        },
        async selesaiJemput(id){
            try{
                let outlet_id = this.$route.params.id;
                const data = {
                    id, outlet_id
                }
                await this.$store.dispatch('transaksi/SELESAI_JEMPUT', data)
            }catch(err) {
                alert(err);
            }
        },
        async selesaiAntar(id){
            try{
                let outlet_id = this.$route.params.id;
                const data = {
                    id, outlet_id
                }
                await this.$store.dispatch('transaksi/SELESAI_ANTAR', data)
            }catch(err) {
                alert(err);
            }
        },
        async bayar(id){
            try{
                let outlet_id = this.$route.params.id;
                const data = {
                    id, outlet_id
                }
                await this.$store.dispatch('transaksi/BAYAR', data)
            }catch(err) {
                alert(err);
            }
        }
        
        
    },
    async created(){
        try {
            let id = this.$route.params.id;
            await this.$store.dispatch('transaksi/GET_ALL', id)

            const user = JSON.parse(localStorage.getItem('auth'));
            this.user = user
        } catch (error) {
            alert(error);
        }
    }
}
</script>

<style scoped>
    .color-primary{
        color: rgb(102,111,193);
    }
    .background-primary{
        background: rgb(102,111,193);
    }

    .card-transaksi-penjemputan{
        background: white; 
        width: 350px; 
        height: 240px;
        border-radius: 15px;
        cursor: pointer;
        transition: 0.2s;
    }

    .card-transaksi-penjemputan:hover{
        background: rgb(255, 255, 255, 0.6)
    }
    .card-transaksi-pengantaran{
        background: white; 
        width: 350px; 
        height: 280px;
        border-radius: 15px;
        cursor: pointer;
        transition: 0.2s;
    }

    .card-transaksi-pengantaran:hover{
        background: rgb(255, 255, 255, 0.6)
    }
</style>