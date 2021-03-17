<template>
    <base-layout>
        <div class="d-flex justify-content-start">
            <the-sidebar />
            <div class="wrap-content">
                <the-navbar />
                <router-view></router-view>
                <transition name="content" :appear="true" mode="out-in">
                    <div>
                        <Container
                        style="width: 100%;"
                        class="px-2 mt-3 d-flex justify-content-start flex-row flex-wrap my-flex-container"
                        >
                        <div v-for="(column, index) in items" :key="column.status">
                            <div class="card-container scrollbar rounded" orientation="vertical" id="style-2">
                                <div  class="mx-1 pb-2 px-2 rounded force-overflow"  style="width: 310px;">
                                    <div class="card-column-header py-1" style="color:lightseagreen; z-index: 99; background: #f5f5f7; width: 295px; border-radius: 8px">
                                    <span class="column-drag-handle d-flex justify-content-between align-items-center p-2">
                                        <p class="mb-0" style="font-size: 10pt;color: lightseagreen">
                                        <b>
                                            {{ column.status.charAt(0).toUpperCase() + column.status.slice(1)}}
                                        </b>
                                        </p>
                                    </span>
                                    </div>
                                    <Container
                                    group-name="col"
                                    @drop="(e) => onCardDrop(column.status, e, index, column)"
                                    @drag-start="(e) => log('drag start', e)"
                                    @drag-end="(e) => log('drag end', e)"
                                    :get-child-payload="getCardPayload(column.status)"
                                    drag-class="card-ghost"
                                    drop-class="card-ghost-drop"
                                    :drop-placeholder="dropPlaceholderOptions"
                                    style="max-height: 80vh; overflow-y: scroll"
                                    >
                                        
                                    <Draggable v-for="card in column.data" :key="column.status + card.id" class="py-1" >
                                        <!-- modalDetailJadwal -->
                                        <!-- <b-btn @click.left.exact="redirectInfoJD(card.id, column)"  @click.shift="switchDokter(card, {'id':column.id, 'hari': column.hari})" variant="light" class="rouded p-0" style="width: 100%">
                                            <div class="card shadow-sm p-2 card-list card-dd" style="margin-bottom: 0" :id="column.id + '-' + card.id">
                                                <div class="d-flex justify-content-between">
                                                    <div>
                                                        <small style="color: lightseagreen">{{card.jam_mulai}} - {{card.jam_selesai}}</small>
                                                    </div>
                                                </div>
                                                
                                            <div style="font-size: 10pt;" class="d-flex justify-content-between">
                                                <p>
                                                {{ card.nama_kelas }}
                                                </p>
                                                <div>
                                                <i class="fas fa-pencil-alt ml-1 icon-edit-card p-2 rounded" style="font-size: 9pt;"></i>
                                                </div>
                                            </div>
                                            
                                            </div>
                                        </b-btn> -->

                                        <div class="p-3 card-transaksi" @click="redirectInfo(card.id, column.status)">
                                            <div class="d-flex justify-content-between align-items-center mb-3">
                                                <p class="mb-0 font-weight-bold color-primary" style="font-family: monospace">{{ card.kode_invoice }}</p>
                                                <div class="d-flex justify-content-start align-items-center">
                                                    <i class="far fa-user-circle color-primary mr-2" style="font-size: 15pt"></i>
                                                    <div>
                                                        <p class="mb-0 font-weight-bold color-primary" style="font-size: 8pt;">{{ card.member.nama }}</p>
                                                    </div>
                                                </div>
                                            </div>
                                            <div class="d-flex justify-content-between align-items-center">
                                                <div>
                                                    <p class="mb-0" style="font-size: 8pt; color: darkgray">Pemesanan</p>
                                                    <p style="font-size: 9pt">{{ card.tgl }}</p>
                                                </div>
                                                <p class="font-weight-bold" style="font-size: 10pt">-</p>
                                                <div>
                                                    <p class="mb-0" style="font-size: 8pt; color: darkgray">Estimasi</p>
                                                    <p style="font-size: 9pt">{{ card.batas_waktu }}</p>
                                                </div>
                                            </div>
                                            <div class="d-flex justify-content-between align-items-center mb-2 px-3 py-2" style="border-radius: 10px; background: rgb(249,249,249)">
                                                <p class="mb-0 color-primary" style="font-size: 9pt;">Detail pesanan</p>
                                                <p class="mb-0 color-primary" style="font-size: 9pt;">{{ card.detail_transaksi.length }} Item</p>
                                            </div>
                                            <div class="d-flex justify-content-between align-items-center">
                                                <div>
                                                    <p class="mb-0" style="font-size: 8pt; color: darkgray">Tagihan</p>
                                                    <p style="font-size: 9pt">Rp.{{ card.total }}</p>
                                                </div>
                                                <div>
                                                    <div v-if="card.dibayar == 'Lunas'" class="px-4 py-1" style="background: rgb(234,248,246); border-radius: 10px">
                                                        <p class="mb-0 font-weight-bold" style="color: rgb(141,215,204); font-size: 9pt">Lunas</p>
                                                    </div>
                                                    <div v-else class="px-4 py-1" style="background: rgb(255,239,235); border-radius: 10px">
                                                        <p class="mb-0 font-weight-bold" style="color: rgb(255,160,135); font-size: 9pt">Belum Bayar</p>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        
                                    </Draggable>
                                    </Container>
                                </div>
                            </div>
                        </div>    
                        </Container>
                        <Info />
                    </div>
                </transition>
            </div>
        </div>
    </base-layout>
</template>
<script>

import { mapState } from 'vuex'
import BaseLayout from '../layouts/BaseLayout'
import TheNavbar from '../components/TheNavbar'
import TheSidebar from '../components/TheSidebar'
import { Container, Draggable } from 'vue-smooth-dnd'
import Info from '../components/pemesanan/Info';

export default {
    data(){
        return {
            items: [],
            pre_items: [],

            column: '',

            upperDropPlaceholderOptions: {
                className: 'cards-drop-preview',
                animationDuration: '150',
                showOnTop: true
            },
            dropPlaceholderOptions: {
                className: 'drop-preview',
                animationDuration: '150',
                showOnTop: true
            },
        }
    },
    components: {
        BaseLayout,
        TheNavbar,
        TheSidebar,
        Info,
        Container, 
        Draggable
    },
    computed: {
        ...mapState({
            isLoading: state => state.isLoading,
            isLoadingAction: state => state.isLoadingAction,
            data: state => state.transaksi.items,
        }),
    },
    watch: {
        data(){
            this.items = this.data
            this.pre_items = this.data
        }
    },
    methods: {
        async onCardDrop (columnStatus, dropResult) {
            try {
                await this.$store.commit('SET_ISLOADING_ACTION', true, { root: true })
                let id = this.$route.params.id;
                await this.$store.dispatch('transaksi/ON_CARD_DROP', { columnStatus, dropResult, id})
                await this.$store.commit('SET_ISLOADING_ACTION', false, { root: true })
            } catch (error) {
                alert(error)
            }
        },

        getCardPayload (columnStatus) {
            console.log(columnStatus);
            
            return index => {
                return this.items.filter(p => p.status === columnStatus)[0].data[index]
            }
        },

        dragStart () {
            console.log('drag started')
        },
        log (...params) {
            console.log(...params)
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
        }
    },
    async created(){
        try {
            let id = this.$route.params.id;
            await this.$store.dispatch('transaksi/GET_ALL', id)
            this.$bvModal.show("modalInfo")
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

    .card-transaksi{
        background: white; 
        width: 100%; 
        border-radius: 15px;
        cursor: pointer;
        transition: 0.2s;
    }

    .card-transaksi:hover{
        background: rgb(255, 255, 255, 0.6)
    }

    ::-webkit-scrollbar {
        width: 8px;
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

    .content-enter-active, .content-leave-active {
        transition: all 1.5s;
    }

    .content-enter, .content-leave-to {
        opacity: 0;
        transform: translateX(150px);
    }

    .content-enter-to, .content-leave {
        opacity: 1;
        transform: translateX(0);
    }
</style>