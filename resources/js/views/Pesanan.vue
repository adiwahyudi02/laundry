<template>
    <base-layout>
        <div class="d-flex justify-content-start">
            <the-sidebar />
            <div class="wrap-content">
                <the-navbar />
                <transition name="content" :appear="true" mode="out-in">
                    <div class="d-flex justify-content-center" style="width: 100%">
                        <div style="width: 95%">
                            <div class="mb-4 ml-4" style="width: 100%">
                                <p class="mb-0 font-weight-bold" style="color: darkslateblue">Pesanan</p>
                                <transition name="pesanan" :appear="true" mode="out-in">
                                    <div v-if="!conditionCreate" class="d-flex justify-content-start mt-4">
                                        <b-button @click="hideFormCrate" class="btn btn-sm px-5 py-2 color-primary font-weight-bold" style="background: rgb(102,111,193, 0.2); border: none;">
                                            <i class="fas fa-plus color-primary mr-2"></i>
                                            {{ !conditionCreate ? 'Buat pesanan':'Cancel' }}
                                        </b-button>
                                    </div>
                                </transition>
                            </div>
                            <transition name="pesanan" :appear="true" mode="out-in">
                                <ListPemesanan v-if="!conditionCreate" />
                                <Create @hideFormCrate="hideFormCrate" v-else />
                            </transition>
                        </div>
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

import ListPemesanan from '../components/pemesanan/ListPemesanan';
import Create from '../components/pemesanan/Create';

export default {
    data() {
        return {
            conditionCreate: false
        }
    },
    components: {
        BaseLayout,
        TheNavbar,
        TheSidebar,
        ListPemesanan,
        Create
    },
    computed: {
        ...mapState({
            isLoading: state => state.isLoading,
            isLoadingAction: state => state.isLoadingAction
        }),
    },
    methods: {
        hideFormCrate(){
            this.conditionCreate = !this.conditionCreate
        }
    }
};
</script>
<style scoped>
    .wrap-content{
        width: 100%;
    }
    .color-primary{
        color: rgb(102,111,193);
    }
    .background-primary{
        background: rgb(102,111,193);
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

    .pesanan-enter-active, .pesanan-leave-active {
        transition: all 1s;
    }

    .pesanan-enter, .pesanan-leave-to {
        opacity: 0;
        transform: translateX(150px);
    }

    .pesanan-enter-to, .pesanan-leave {
        opacity: 1;
        transform: translateX(0);
    }
</style>