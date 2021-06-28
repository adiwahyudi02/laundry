<template>
    <div class="mt-5">
        <div class="d-flex flex-wrap justify-content-between align-items-start">
            <div class="wrap-table-kelola">
                <div class="mb-4">
                    <div class="d-flex justify-content-between align-items-center mb-5">
                        <p class="mb-0 font-weight-bold" style="color: darkslateblue">Ongkir</p>
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
                                                    <!-- <p class="mb-0 text-white">{{item.jenis_kelamin == 'L' ? 'L' : 'P'}}</p> -->
                                                </div>
                                            </div>
                                            <div>
                                                <div class="d-flex justify-content-between align-items-center">
                                                    <div class="d-flex flex-wrap justify-content-start align-items-center">
                                                        <div style="width: 150px">
                                                            <p class="mb-0" style="font-size: 9pt; color: black; font-family: sans-serif">Dari: {{item.dari}} km</p>
                                                        </div>
                                                        <div style="width: 150px;">
                                                            <p class="mb-0" style="font-size: 9pt; color: black; font-family: sans-serif;">Ke: {{item.ke}} km</p>
                                                        </div>
                                                        <div style="width: 150px">
                                                            <p class="mb-0" style="font-size: 9pt; color: black; font-family: sans-serif">{{item.harga | toCurrency}}</p>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div class="d-flex justify-content-between align-items-center" style="width: 15%">
                                            <i @click="redirectEdit(item.id)" class="fas fa-list-ul" title="Edit" style="color: gray; cursor: pointer"></i>
                                            <i @click="showModalDelete(item.id)" class="far fa-trash-alt" title="Hapus" style="color: gray; cursor: pointer"></i>
                                            <b-modal style="width: 200px" :id="'modal-no-backdrop-' + item.id" hide-backdrop hide-header hide-footer hide-header-close centered content-class="shadow" size="sm">
                                                <div>
                                                    <p class="font-weight-bold" style="font-size: 9pt">Hapus ongkir jarak {{item.dari}} - {{item.ke}}km?</p>
                                                    <div class="d-flex justify-content-start align-items-center">
                                                        <button @click="$bvModal.hide('modal-no-backdrop'+item.id)" class="btn btn-sm btn-warning mx-1" style="width: 60px; font-size: 9pt; color: white">Tidak</button>
                                                        <button @click="softDelete(item)" class="btn btn-sm btn-info mx-1" style="width: 60px; font-size: 9pt">Ya</button>
                                                    </div>
                                                </div>
                                            </b-modal>
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
                        <p class="mb-0 ml-2 font-weight-bold" style="color: darkslateblue;">Laporan</p>
                    </div>
                    <div @click="exportPdf" class="mb-4 d-flex justify-content-center align-items-center py-4 px-4 my-3" style="width: 100%; border-radius: 15px; background: rgb(240,243,248); cursor: pointer">
                        <p class="mb-0 font-weight-bold color-primary" style="font-family: berlin sans fb; font-size: 13pt">Generate Laporan</p>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { mapState, mapGetters } from 'vuex'
import VueSkeletonLoader from 'skeleton-loader-vue';
import Create from "../../components/ongkir/Create";
import Update from "../../components/ongkir/Update";
import JwPagination from 'jw-vue-pagination';
import DoughnutChart from '../../components/vue-doughnut-chart/DoughnutChart'
import jsPDF from 'jspdf'
import 'jspdf-autotable'

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
                bed_cover: {
                    jumlah: 0,
                    persentase: 0
                },
                boneka: {
                    jumlah: 0,
                    persentase: 0
                },
                jas: {
                    jumlah: 0,
                    persentase: 0
                },
                kiloan: {
                    jumlah: 0,
                    persentase: 0
                },
                sepatu: {
                    jumlah: 0,
                    persentase: 0
                },
                tas: {
                    jumlah: 0,
                    persentase: 0
                },
                topi: {
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
            data: state => state.ongkir.items,
            outlet: state => state.outlet.info
        })
    },
    watch: {
        data(){
            this.items = this.data
            this.pre_items = this.data
        },
        search(){
            this.filterFunction()
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
                return (
                i.dari.toString().indexOf(this.search) >= 0 ||
                i.ke.toString().indexOf(this.search) >= 0 ||
                i.harga.toString().indexOf(this.search) >= 0)
            })
            console.log(search);
            this.items = search
        },
        redirectCreate(){
            this.$bvModal.show( "modalCreate")
        },
        async redirectEdit(id){
            try{
                await this.$store.dispatch('ongkir/GET_INFO_BY_ID', id)
                this.$bvModal.show( "modalUpdate")
            }catch(err) {
                alert(err);
            }
        },
        showModalDelete(modal){
            this.$bvModal.show('modal-no-backdrop-'+modal)
        },
        async softDelete(item){
            try{
                await this.$store.dispatch('ongkir/SOFTDELETE_ONE', item)
                this.dismissCountDown = this.dismissSecs
            }catch(err) {
                alert(err);
            }
        },
        async exportPdf(){
            try {

                let id = this.$route.params.id;
                const outlet = await this.$store.dispatch('outlet/GET_INFO_BY_ID_REQUEST', id);

                var columns = [
                { dataKey: 'dari', title: 'Dari'},
                { dataKey: 'ke', title: 'Ke'},
                { dataKey: 'harga', title: 'Harga'},
                { dataKey: 'created_at', title: 'Dibuat'}
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
                doc.text('Daftar Ongkir Laundry', 40, 120);

                doc.setFontSize(8);
                
                const monthNames = ["Januari", "Februari", "Maret", "April", "Mei", "Juni",
                    "Juli", "Augustus", "September", "Oktober", "November", "Desember"];
                let dateObj = new Date();
                let month = monthNames[dateObj.getMonth()];
                let day = String(dateObj.getDate()).padStart(2, '0');
                let year = dateObj.getFullYear();
                let output = month  + ' '+ day  + ',' + year;

                doc.text('' + output, 465, 120);
                doc.setFontSize(8);
                doc.autoTable(columns, this.items, {
                margin: {top: 140},
                styles: { fontSize: 8.5 },
                });

                var auth = JSON.parse(localStorage.getItem('auth'));

                doc.setFontSize(9);
                doc.text(auth.data.role.charAt(0).toUpperCase() + auth.data.role.slice(1) + ' ' + this.outlet.nama + ', ........................', 420, doc.internal.pageSize.height - 125);

                doc.setFontSize(9);
                doc.text(auth.data.nama, 420, doc.internal.pageSize.height - 40);
                
                doc.save('daftar-ongkir-laundry-' + this.outlet.nama + '.pdf');

                // this.pdf.nama_file = ''
                // this.pdf.title = ''
                // this.pdf.note = ''
                // await this.$v.pdf.$reset()

            } catch (error) {
                alert(error)
            }
        }
    },
    async created(){
        try {
            let id = this.$route.params.id;
            await this.$store.dispatch('ongkir/GET_ALL', id)
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
        max-height: 60vh;
        overflow-y: scroll;
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