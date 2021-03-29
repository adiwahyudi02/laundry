<template>
    <div>
        <div class="mb-4 d-flex flex-wrap justify-content-between align-items-center">
            <div class="d-flex justify-content-start align-items-center px-3 p-1 wadah-search">
                <i class="fas fa-search mr-2" style="color: gray; font-size: 10pt"></i>
                <input v-model="search" type="text" class="" placeholder="Pencarian" style="width: 90%; background: none; border: none; outline: none; color: gray; font-size: 10pt">
                <i :disabled="!search" @click="search = ''" class="fas fa-times ml-2" style="color: rgb(102,111,193); font-size: 10pt; cursor: pointer"></i>
            </div>
            <div class="d-flex flex-wrap justify-content-start align-items-center">
                <div>
                    <div class="form-group mr-3">
                        <label style="font-size: 9pt; color: gray" class="font-weight-bold" for="filter">Filter:</label>
                        <select v-model="filter" id="filter" class="form-control form-control-sm mb-0" style="width: 300px; font-size: 9pt">
                            <option value="semua">Semua data</option>
                            <option value="hari_ini">Hari ini</option>
                            <option value="minggu_ini">Minggu ini</option>
                            <option value="bulan_ini">Bulan ini</option>
                            <option value="custom">Custom</option>
                        </select>
                    </div>
                </div>
                <div v-if="conditionCustom" class="d-flex justify-content-start align-items-center">
                    <div class="form-group mr-3">
                        <label style="font-size: 9pt; color: gray" class="font-weight-bold" for="start_dt">Mulai dari:</label>
                        <div class="d-flex justify-content-start align-items-center">
                            <input type="date" style="font-size: 9pt" name="" id="start_dt" v-model="start_dt" class="form-control form-control-sm mb-0">
                            <b-input-group-append class="input-group-append">
                            <b-button :disabled="!start_dt" @click="start_dt = ''" class="btn btn-sm btn-info" style="padding-top: 1px; padding-bottom: 2px">x</b-button>
                            </b-input-group-append>
                        </div>
                    </div>
                    <div class="form-group">
                        <label style="font-size: 9pt; color: gray" class="font-weight-bold" for="end_dt">Sampai dengan:</label>
                        <div class="d-flex justify-content-start align-items-center">
                            <input type="date" style="font-size: 9pt" name="" id="end_dt" v-model="end_dt" class="form-control form-control-sm mb-0">
                            <b-input-group-append class="input-group-append">
                            <b-button :disabled="!end_dt" @click="end_dt = ''" class="btn btn-sm btn-info" style="padding-top: 1px; padding-bottom: 2px">x</b-button>
                            </b-input-group-append>
                        </div>
                    </div>
                </div>
                <div>
                    <b-button @click="exportPdf" class="btn btn-sm px-3 mt-3 mx-3 color-primary font-weight-bold" style="background: rgb(102,111,193, 0.2); border: none;">
                        Generate Laporan
                    </b-button>
                </div>
            </div>
        </div>
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
                                    <p style="font-size: 9pt">{{ card.total | toCurrency }}</p>
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
</template>

<script>
import { mapState } from 'vuex'
import { Container, Draggable } from 'vue-smooth-dnd'
import Info from './Info';
import jsPDF from 'jspdf'
import 'jspdf-autotable'

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
            search: '',
            filter: 'semua',
            conditionCustom: false,
            start_dt: '',
            end_dt: ''
        }
    },
    components: {
        Info,
        Container, 
        Draggable
    },
    computed: {
        ...mapState({
            isLoading: state => state.isLoading,
            isLoadingAction: state => state.isLoadingAction,
            data: state => state.transaksi.items,
            outlet: state => state.outlet.info
        }),
    },
    watch: {
        data(){
            this.items = this.data
            this.pre_items = this.data
            this.pre_items_pisan = this.data
        },
        search(){
            this.searchFunction()
        },
        filter(){
            this.filterFunction()
        },
        start_dt(){
            this.filterFunction()
        },
        end_dt(){
            this.filterFunction()
        },
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
        },

        async filterFunction(){

            if(this.filter != '') {

                const date = new Date();

                this.conditionCustom = false

                if (this.filter == 'hari_ini') {

                    this.start_dt = ''
                    this.end_dt = ''

                    const thisDay = date.getFullYear() + '-' + ('0' + (date.getMonth()+1)).slice(-2) + '-' + date.getDate();
                    const filter = this.pre_items.map(item => {
                        return {
                            'status': item.status,
                            'data' : item.data.filter(i => {
                                let split = i.created_at.split('T')
                                return split[0] == thisDay
                            })
                        }
                    })
                    
                    this.items = filter

                } else if(this.filter == 'minggu_ini') {

                    this.start_dt = ''
                    this.end_dt = ''

                    const thisWeek = date.getFullYear() + '-' + ('0' + (date.getMonth()+1)).slice(-2) + '-' + (date.getDate() - date.getDay());
                    const filter = this.pre_items.map(item => {
                        return {
                            'status': item.status,
                            'data' : item.data.filter(i => {
                                return i.created_at >= thisWeek
                            })
                        }
                    })
                    
                    this.items = filter
                    
                } else if(this.filter == 'bulan_ini') {

                    this.start_dt = ''
                    this.end_dt = ''
                    
                    const thisMonth = date.getFullYear() + '-' + ('0' + (date.getMonth()+1)).slice(-2) + '-' + '1';
                    const filter = this.pre_items.map(item => {
                        return {
                            'status': item.status,
                            'data' : item.data.filter(i => {
                                return i.created_at >= thisMonth
                            })
                        }
                    })
                    
                    this.items = filter

                }else if(this.filter == 'custom'){

                    this.conditionCustom = true

                }else{
                    this.items = this.pre_items
                }
            }

            if (this.start_dt != '' || this.end_dt != '') {

                this.pre_items = this.pre_items_pisan

                const r_date_time = this.pre_items.map(item => {
                    return {
                        'status': item.status,
                        'data' : item.data.filter(i => {
                            return this.start_dt + ' 00:00:00' <= i.created_at && this.end_dt + ' 24:00:00' >= i.created_at
                        })
                    }
                })

                this.items = r_date_time
            }
            
        },
        async searchFunction(){
            if (this.search != '') {
                const search = this.pre_items.map(item => {
                    return {
                        'status': item.status,
                        'data' : item.data.filter(i => {
                            return (i.kode_invoice.toLowerCase().indexOf(this.search.toLowerCase()) >= 0 ||
                            i.member.nama.toLowerCase().indexOf(this.search.toLowerCase()) >= 0 ||
                            i.tgl.toLowerCase().indexOf(this.search.toLowerCase()) >= 0 ||
                            i.batas_waktu.toLowerCase().indexOf(this.search.toLowerCase()) >= 0 ||
                            i.status.toLowerCase().indexOf(this.search.toLowerCase()) >= 0 ||
                            i.dibayar.toLowerCase().indexOf(this.search.toLowerCase()) >= 0 ||
                            i.total.toString().indexOf(this.search) >= 0)
                        })
                    }
                })
                this.items = search
            } 
        },
        async exportPdf(){
            try {
                const baru = this.items.find(item => {
                    if(item.status == 'baru'){
                        return item.data
                    }
                })
                const proses = this.items.find(item => {
                    if(item.status == 'proses'){
                        return item.data
                    }
                })
                const selesai = this.items.find(item => {
                    if(item.status == 'selesai'){
                        return item.data
                    }
                })
                const diambil = this.items.find(item => {
                    if(item.status == 'diambil'){
                        return item.data
                    }
                })

                console.log('result', [...baru.data, ...proses.data, ...selesai.data, ...diambil.data]);

                let id = this.$route.params.id;
                const outlet = await this.$store.dispatch('outlet/GET_INFO_BY_ID_REQUEST', id);

                var columns = [
                { dataKey: 'kode_invoice', title: 'Kode Invoice'},
                { dataKey: 'member', displayProperty: "nama", title: 'Nama'},
                { dataKey: 'tgl', title: 'Pemesanan'},
                { dataKey: 'status', title: 'Status'},
                { dataKey: 'dibayar', title: 'Dibayar'},
                { dataKey: 'total', title: 'total'}
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
                doc.text('Daftar Transaksi Laundry', 40, 120);

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
                // doc.autoTable(columns, [...baru.data, ...proses.data, ...selesai.data, ...diambil.data], {
                // margin: {top: 140},
                // styles: { fontSize: 8.5 },
                // });

                const rows = [...baru.data, ...proses.data, ...selesai.data, ...diambil.data]


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
                    margin: {top: 140},
                    styles: { fontSize: 8.5 }
                });

                

                var auth = JSON.parse(localStorage.getItem('auth'));

                doc.setFontSize(9);
                doc.text(auth.data.role.charAt(0).toUpperCase() + auth.data.role.slice(1) + ' ' + this.outlet.nama + ', ........................', 420, doc.internal.pageSize.height - 125);

                doc.setFontSize(9);
                doc.text(auth.data.nama, 420, doc.internal.pageSize.height - 40);
                
                doc.save('daftar-transaksi-laundry-' + this.outlet.nama + '.pdf');

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
            await this.$store.dispatch('transaksi/GET_ALL', id)
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

    .wadah-search{
        width: 400px; border: 1px gray solid; border-radius: 15px; margin-left: 20px;
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
    }
</style>