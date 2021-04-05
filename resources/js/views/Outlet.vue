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
        }
    },

    computed: {
        ...mapState({
            items: state => state.outlet.items,
            isLoading: state => state.isLoading,
            isLoadingAction: state => state.isLoadingAction
        }),
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
        }  
    },
    async created(){
        try{
            await this.$store.dispatch('outlet/GET_ALL')
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