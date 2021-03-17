<template>
    <div class="mt-5">
        <div class="d-flex flex-wrap justify-content-between align-items-start">
            <div class="wrap-table-kelola">
                <div class="mb-4">
                    <div class="d-flex justify-content-between align-items-center mb-5">
                        <p class="mb-0 font-weight-bold" style="color: darkslateblue">Pelanggan</p>
                        <b-button @click="redirectCreate" pill variant="outline-secondary" size="sm" style="font-size: 9pt; width: 100px;">TAMBAH</b-button>
                    </div>
                    <div class="mb-4">
                        <div class="d-flex justify-content-start align-items-center px-3 p-1 wadah-search">
                            <i class="fas fa-search mr-2" style="color: gray; font-size: 10pt"></i>
                            <input v-model="search" type="text" class="" placeholder="Pencarian" style="width: 90%; background: none; border: none; outline: none; color: gray; font-size: 10pt">
                            <i :disabled="!search" @click="search = ''" class="fas fa-times ml-2" style="color: rgb(102,111,193); font-size: 10pt; cursor: pointer"></i>
                        </div>
                    </div>
                    <template v-if="isLoading">
                        <div class="facebook-card px-3 mb-1" style="width: 100%; overflow: hidden">
                            <div class="d-flex justify-content-start align-items-center">
                                <vue-skeleton-loader
                                type="circle"
                                :width="40"
                                :height="40"
                                animation="fade"
                                class="mr-3"
                                />
                                <vue-skeleton-loader
                                type="square"
                                :width="800"
                                :height="40"
                                animation="fade"
                                />
                            </div>
                        </div>
                        <div class="facebook-card px-3 mb-1" style="width: 100%; overflow: hidden">
                            <div class="d-flex justify-content-start align-items-center">
                                <vue-skeleton-loader
                                type="circle"
                                :width="40"
                                :height="40"
                                animation="fade"
                                class="mr-3"
                                />
                                <vue-skeleton-loader
                                type="square"
                                :width="800"
                                :height="40"
                                animation="fade"
                                />
                            </div>
                        </div>
                        <div class="facebook-card px-3 mb-1" style="width: 100%; overflow: hidden">
                            <div class="d-flex justify-content-start align-items-center">
                                <vue-skeleton-loader
                                type="circle"
                                :width="40"
                                :height="40"
                                animation="fade"
                                class="mr-3"
                                />
                                <vue-skeleton-loader
                                type="square"
                                :width="800"
                                :height="40"
                                animation="fade"
                                />
                            </div>
                        </div>
                        <div class="facebook-card px-3 mb-1" style="width: 100%; overflow: hidden">
                            <div class="d-flex justify-content-start align-items-center">
                                <vue-skeleton-loader
                                type="circle"
                                :width="40"
                                :height="40"
                                animation="fade"
                                class="mr-3"
                                />
                                <vue-skeleton-loader
                                type="square"
                                :width="800"
                                :height="40"
                                animation="fade"
                                />
                            </div>
                        </div>
                        <div class="facebook-card px-3 mb-1" style="width: 100%; overflow: hidden">
                            <div class="d-flex justify-content-start align-items-center">
                                <vue-skeleton-loader
                                type="circle"
                                :width="40"
                                :height="40"
                                animation="fade"
                                class="mr-3"
                                />
                                <vue-skeleton-loader
                                type="square"
                                :width="800"
                                :height="40"
                                animation="fade"
                                />
                            </div>
                        </div>
                        <div class="facebook-card px-3 mb-1" style="width: 100%; overflow: hidden">
                            <div class="d-flex justify-content-start align-items-center">
                                <vue-skeleton-loader
                                type="circle"
                                :width="40"
                                :height="40"
                                animation="fade"
                                class="mr-3"
                                />
                                <vue-skeleton-loader
                                type="square"
                                :width="800"
                                :height="40"
                                animation="fade"
                                />
                            </div>
                        </div>
                    </template>
                    <template v-else>
                        <template v-if="items.length">
                            <transition-group name="list" appear>
                                <div v-for="item in pageOfItems" :key="item.id">
                                    <div class="d-flex justify-content-between align-items-center px-3 py-2 mb-1 block-list-item border-bottom">
                                        <div class="d-flex justify-content-start align-items-center" style="width: 85%">
                                            <div class="mr-3">
                                                <div class="rounded-circle background-primary d-flex justify-content-center align-items-center" style="width: 40px; height: 40px">
                                                    <p class="mb-0 text-white">{{item.jenis_kelamin == 'L' ? 'L' : 'P'}}</p>
                                                </div>
                                            </div>
                                            <div>
                                                <div class="d-flex justify-content-between align-items-center">
                                                    <div class="d-flex flex-wrap justify-content-start align-items-center">
                                                        <div style="width: 150px">
                                                            <p class="mb-0" style="font-size: 9pt; color: black; font-family: sans-serif">{{item.nama}}</p>
                                                        </div>
                                                        <div style="width: 150px;">
                                                            <p class="mb-0" style="font-size: 9pt; color: black; font-family: sans-serif;">{{item.alamat}}</p>
                                                        </div>
                                                        <div style="width: 150px">
                                                            <p class="mb-0" style="font-size: 9pt; color: black; font-family: sans-serif">{{item.jenis_kelamin}}</p>
                                                        </div>
                                                        <div style="width: 150px">
                                                            <p class="mb-0" style="font-size: 9pt; color: black; font-family: sans-serif">{{item.tlp}}</p>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div class="d-flex justify-content-between align-items-center" style="width: 15%">
                                            <i @click="redirectEdit(item.id)" class="fas fa-list-ul" title="Edit" style="color: gray; cursor: pointer"></i>
                                            <i @click="softDelete(item)" class="far fa-trash-alt" title="Hapus" style="color: gray; cursor: pointer"></i>
                                        </div>
                                    </div>
                                </div>
                            </transition-group>
                            <div class="mt-4 d-flex justify-content-end">
                                <jw-pagination :items="items" @changePage="onChangePage" :labels="customLabels" :pageSize="7"></jw-pagination>
                            </div>
                        </template>
                        <div v-else>
                            <p style="color: grey; text-align: center">Tidak ada data</p>
                        </div>
                    </template>
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
            </div>
            <div class="bg-white d-flex justify-content-center py-5 wadah-statistik">
                <div style="width: 90%">
                    <div class="mb-4">
                        <p class="mb-0 ml-2 font-weight-bold" style="color: darkslateblue;">Statistik pertumbuhan</p>
                    </div>
                    <div class="d-flex justify-content-between align-items-center py-2 px-4 my-3" style="width: 100%; border-radius: 15px; background: rgb(240,243,248)">
                        <div class="d-flex justify-content-start align-items-center">
                            <div class="mr-3">
                                <template>
                                    <DoughnutChart
                                    :percent="lengthAndPercent.hari_ini.persentase"
                                    :visibleValue="true"
                                    :width="80"
                                    :height="80"
                                    :backgroundColor="'#ffff'"
                                    :foregroundColor="'rgb(102,111,193)'">
                                    </DoughnutChart>
                                </template>
                            </div>
                            <div>
                                <p class="mb-0 font-weight-bold color-primary" style="font-family: berlin sans fb; font-size: 13pt">Hari ini</p>
                            </div>
                        </div>
                        <div>
                            <p class="mb-0" style="font-size: 10pt; color: grey">{{lengthAndPercent.hari_ini.jumlah}} Orang</p>
                        </div>
                    </div>
                    <div class="d-flex justify-content-between align-items-center py-2 px-4 my-3" style="width: 100%; border-radius: 15px; background: rgb(240,243,248)">
                        <div class="d-flex justify-content-start align-items-center">
                            <div class="mr-3">
                                <template>
                                    <DoughnutChart
                                    :percent="lengthAndPercent.minggu_ini.persentase"
                                    :visibleValue="true"
                                    :width="80"
                                    :height="80"
                                    :backgroundColor="'#ffff'"
                                    :foregroundColor="'rgb(102,111,193)'">
                                    </DoughnutChart>
                                </template>
                            </div>
                            <div>
                                <p class="mb-0 font-weight-bold color-primary" style="font-family: berlin sans fb; font-size: 13pt">Minggu ini</p>
                            </div>
                        </div>
                        <div>
                            <p class="mb-0" style="font-size: 10pt; color: grey">{{lengthAndPercent.minggu_ini.jumlah}} Orang</p>
                        </div>
                    </div>
                    <div class="d-flex justify-content-between align-items-center py-2 px-4 my-3" style="width: 100%; border-radius: 15px; background: rgb(240,243,248)">
                        <div class="d-flex justify-content-start align-items-center">
                            <div class="mr-3">
                                <template>
                                    <DoughnutChart
                                    :percent="lengthAndPercent.bulan_ini.persentase"
                                    :visibleValue="true"
                                    :width="80"
                                    :height="80"
                                    :backgroundColor="'#ffff'"
                                    :foregroundColor="'rgb(102,111,193)'">
                                    </DoughnutChart>
                                </template>
                            </div>
                            <div>
                                <p class="mb-0 font-weight-bold color-primary" style="font-family: berlin sans fb; font-size: 13pt">Bulan ini</p>
                            </div>
                        </div>
                        <div>
                            <p class="mb-0" style="font-size: 10pt; color: grey">{{lengthAndPercent.bulan_ini.jumlah}} Orang</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { mapState, mapGetters } from 'vuex'
import VueSkeletonLoader from 'skeleton-loader-vue';
import Create from "../../components/pelanggan/Create";
import Update from "../../components/pelanggan/Update";
import JwPagination from 'jw-vue-pagination';
import DoughnutChart from '../../components/vue-doughnut-chart/DoughnutChart'

const customLabels = {
    first: '<<',
    last: '>>',
    previous: '<',
    next: '>'
};

export default {
    data(){
        return {
            items: [],
            pre_items: [],
            pageOfItems: [],
            customLabels,
            dismissSecs: 5,
            dismissCountDown: 0,
            search: '',
            lengthAndPercent: {
                bulan_ini: {
                    jumlah: 0,
                    persentase: 0
                },
                minggu_ini: {
                    jumlah: 0,
                    persentase: 0
                },
                hari_ini: {
                    jumlah: 0,
                    persentase: 0
                }
            }
        }
    },
    components: {
        VueSkeletonLoader,
        Create,
        Update,
        'jw-pagination': JwPagination,
        DoughnutChart
    },
    computed: {
        ...mapState({
            isLoading: state => state.isLoading,
            isLoadingAction: state => state.isLoadingAction,
            data: state => state.pelanggan.items
        }),
        ...mapGetters({
            getLengthAndPercent : 'pelanggan/getLengthAndPercent'
        }),
    },
    watch: {
        data(){
            this.items = this.data
            this.pre_items = this.data
        },
        search(){
            this.filterFunction()
        },
        getLengthAndPercent(){
            this.lengthAndPercent = this.getLengthAndPercent
        }
    },
    methods: {
        countDownChanged(dismissCountDown) {
            this.dismissCountDown = dismissCountDown
        },
        onChangePage(pageOfItems) {
            // update page of items
            this.pageOfItems = pageOfItems;
        },
        async filterFunction(){
            const search = this.pre_items.filter(i => {
                return (i.nama.toLowerCase().indexOf(this.search.toLowerCase()) >= 0 ||
                i.alamat.toLowerCase().indexOf(this.search.toLowerCase()) >= 0 ||
                i.tlp.toLowerCase().indexOf(this.search.toLowerCase()) >= 0 ||
                i.jenis_kelamin.toLowerCase().indexOf(this.search.toLowerCase()) >= 0)
            })
            this.items = search
        },
        redirectCreate(){
            this.$bvModal.show( "modalCreate")
        },
        async redirectEdit(id){
            try{
                await this.$store.dispatch('pelanggan/GET_INFO_BY_ID', id)
                this.$bvModal.show( "modalUpdate")
            }catch(err) {
                alert(err);
            }
        },
        async softDelete(item){
            try{
                await this.$store.dispatch('pelanggan/SOFTDELETE_ONE', item)
                this.dismissCountDown = this.dismissSecs
            }catch(err) {
                alert(err);
            }
        }
    },
    async created(){
        try {
            let id = this.$route.params.id;
            await this.$store.dispatch('pelanggan/GET_ALL', id)
        } catch (error) {
            alert(error);
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
    .wrap-table-kelola{
        width: 60%;
    }
    .block-list-item{
        border-radius: 15px;
        transition: 0.2s;

        &:hover{
            background: white;
        }
    }

    .list-enter-from{
        opacity: 0;
        transform: scale(0.6);
    }
    .list-enter-to{
        opacity: 1;
        transform: scale(1);
    }
    .list-enter-active{
        transition: all 0.4s ease;
    }

    .list-leave-from{
        opacity: 1;
        transform: scale(1);
    }
    .list-leave-to{
        opacity: 0;
        transform: scale(0.6);
    }
    .list-leave-active{
        transition: all 0.4s ease;
        position: absolute;
    }
    .list-move{
        transition: all 0.4s ease;
    }
    .wadah-search{
        width: 50%; border: 1px gray solid; border-radius: 15px; margin-left: 20px;
    }
    .wadah-statistik{
        width: 25%;
        border-radius: 15px;
    }
    @media screen and (max-width: 1080px){
        .wadah-search{
            width: 100%;
            margin-left: 0;
        }
        .wrap-table-kelola{
            width: 100%;
        }
        .wadah-statistik{
            width: 100%;
        }
    }

    .pagination .page-item.active .page-link{
        background-color: rgb(102,111,193) !important;
        color: white !important;
    }
</style>