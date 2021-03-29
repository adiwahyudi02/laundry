<template>
    <div class="bg-light mx-4 p-4" style="width: 90%; min-height: 80vh; border-radius: 15px">
        <div class="d-flex justify-content-end">
            <div class="d-flex justify-content-start">
                <button @click="$emit('hideFormCrate')" style="background: none; outline: none; box-shadow: none; border: none">
                    <i class="fas fa-times color-primary" style="font-size: 20pt"></i>
                </button>
            </div>
        </div>
        <div>
            <div class="d-flex flex-wrap justify-content-around">
                <div style="width: 45%">
                    <p class="mb-4 font-weight-bold" style="color: darkslateblue">Form Pesanan</p>
                    <div class="mb-4">
                        <p class="ml-2 font-weight-bold" style="font-size: 9pt; color: black">Pilih Pelanggan</p>
                        <div>
                            <div class="mb-4">
                                <div class="d-flex justify-content-start align-items-center rounded px-3 py-2 wadah-search">
                                    <i class="fas fa-search mr-2" style="color: gray; font-size: 10pt"></i>
                                    <input v-model="search_pelanggan" type="text" class="" placeholder="Cari pelanggan" style="width: 95%; background: none; border: none; outline: none; color: gray; font-size: 9pt">
                                    <i :disabled="!search_pelanggan" @click="search_pelanggan = ''" class="fas fa-times ml-2" style="color: rgb(102,111,193); font-size: 9pt; cursor: pointer"></i>
                                </div>
                            </div>
                        </div>
                        <div style="max-height: 200px; overflow: hidden">
                            <transition-group name="list" appear>
                                <div v-for="item in pelanggans" :key="item.id">
                                    <label :for="'member-' + item.id">
                                        <div class="d-flex justify-content-between align-items-center px-3 py-2 mb-1 block-list-item border-bottom">
                                            <div class="d-flex justify-content-start align-items-center" style="width: 100%">
                                                <div class="mr-3">
                                                    <div class="rounded-circle background-primary d-flex justify-content-center align-items-center" style="width: 40px; height: 40px">
                                                        <p class="mb-0 text-white">{{item.jenis_kelamin == 'L' ? 'L' : 'P'}}</p>
                                                    </div>
                                                </div>
                                                <div>
                                                    <div class="d-flex justify-content-between align-items-center">
                                                        <div class="d-flex flex-wrap justify-content-start align-items-center">
                                                            <div style="width: 150px">
                                                                <p class="mb-0" style="font-size: 8pt; color: black; font-family: sans-serif">{{item.nama}}</p>
                                                            </div>
                                                            <div style="width: 150px;">
                                                                <p class="mb-0" style="font-size: 8pt; color: black; font-family: sans-serif;">{{item.alamat}}</p>
                                                            </div>
                                                            <div style="width: 150px">
                                                                <p class="mb-0" style="font-size: 8pt; color: black; font-family: sans-serif">{{item.jenis_kelamin}}</p>
                                                            </div>
                                                            <div style="width: 150px">
                                                                <p class="mb-0" style="font-size: 8pt; color: black; font-family: sans-serif">{{item.tlp}}</p>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div class="d-flex justify-content-between align-items-center" style="width: 15%">
                                                <input type="radio" name="member" :id="'member-' + item.id" v-bind:value="item" v-model.trim="form.member">
                                            </div>
                                        </div>
                                    </label>
                                </div>
                            </transition-group>
                        </div>
                    </div>
                    
                    <div class="mb-4">
                        <p class="ml-2 font-weight-bold" style="font-size: 9pt; color: black">Pilih Layanan</p>
                        <div v-for="(paket, index_jenis) in items" :key="paket.jenis" class="shadow-sm rounded px-3 mb-1" style="background: rgb(235,236,240)">
                            <p @click="openDetailPaket(paket.jenis)" class="mb-2 py-2 font-weight-bold" style="font-size: 9pt">{{paket.jenis}}</p>
                            <transition-group name="pakets" mode="in-out">
                                <template v-if="ConditionDetailPaket == paket.jenis">
                                <div v-for="(item, index_paket) in paket.data" :key="item.id" class="rounded px-3" style="background: rgb(249, 249, 249)">
                                    <div class="py-2 mx-1 d-flex justify-content-between align-items-center" style="width: 100%;">
                                        <div class="d-flex justify-content-start align-items-center">
                                            <div class="mr-2" style="width: 60px; height: 55px; border-radius: 10px; background: lightgray"></div>
                                            <div>
                                                <p class="mb-1 font-weight-bold" style="font-size: 8pt; color:black">{{item.nama_paket}}</p>
                                                <p class="mb-0" style="font-size: 7pt; color: black">{{item.harga}}</p>
                                                <p class="mb-0" style="font-size: 7pt; color: black">{{item.lama_pengerjaan}} hari</p>
                                            </div>
                                        </div>
                                        <div>
                                            <b-button v-if="item.val == 0" @click="increase(index_jenis, index_paket)" type="submit" class="background-primary btn btn-sm" style="font-size: 7pt; border-radius: 15px">
                                                <div>
                                                    Tambah
                                                </div>
                                            </b-button>
                                            <div v-else class="d-flex justify-content-start align-items-center">
                                                
                                                <button @click="decrease(index_jenis, index_paket)" class="mx-1 px-2 color-primary font-weight-bold" style="background: none; outline: none; border: none; font-size: 18pt">
                                                    -
                                                </button>
                                                <span>
                                                    <input type="number" :value="item.val" :id="'input-item-' + item.id" @keyup="changeValueItem(index_jenis, index_paket, item.id)" class="hidden-arrow" style="background: rgb(235, 236, 240); font-size: 9pt; width: 50px; text-align: center; outline: none; border: none; border-radius: 15px">
                                                </span>
                                                <button @click="increase(index_jenis, index_paket)" class="mx-1 px-2 color-primary font-weight-bold" style="background: none; outline: none; border: none; font-size: 14pt">
                                                    +
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                </template>
                            </transition-group>
                        </div>
                    </div>
                    
                    <div class="d-flex flex-wrap justify-content-between align-items-center">
                        <div class="mb-4">
                            <p class="ml-2 font-weight-bold" style="font-size: 9pt; color: black">Promo</p>
                            <div class="d-flex justify-content-start align-items-center rounded px-3 py-2 wadah-search">
                                <input v-model="form.diskon" type="number" class="hidden-arrow" placeholder="" style="width: 95%; background: none; border: none; outline: none; color: gray; font-size: 9pt">
                                <i class="fas fa-percent ml-2" style="color: rgb(102,111,193); font-size: 9pt; cursor: pointer"></i>
                            </div>
                        </div>
                        <div class="mb-4">
                            <p class="ml-2 font-weight-bold" style="font-size: 9pt; color: black">Pajak</p>
                            <div class="d-flex justify-content-start align-items-center rounded px-3 py-2 wadah-search">
                                <input v-model="form.pajak" type="number" class="hidden-arrow" placeholder="" style="width: 95%; background: none; border: none; outline: none; color: gray; font-size: 9pt">
                                <i class="far fa-money-bill-alt ml-2" style="color: rgb(102,111,193); font-size: 9pt; cursor: pointer"></i>
                            </div>
                        </div>
                        <div class="mb-4">
                            <p class="ml-2 font-weight-bold" style="font-size: 9pt; color: black">Biaya tambahan</p>
                            <div class="d-flex justify-content-start align-items-center rounded px-3 py-2 wadah-search">
                                <input v-model="form.biaya_tambahan" type="number" class="hidden-arrow" placeholder="" style="width: 95%; background: none; border: none; outline: none; color: gray; font-size: 9pt">
                                <i class="fas fa-plus ml-2" style="color: rgb(102,111,193); font-size: 9pt; cursor: pointer"></i>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="mx-2" style="width: 1px; min-height: 70vh; background: lightgray"></div>
                <div class="mb-4" style="width: 45%">
                    <p class="mb-4 font-weight-bold" style="color: darkslateblue">Detail Pesanan</p>
                    <div class="mb-4">
                        <div style="width: 50%">
                            <p class="ml-2 font-weight-bold" style="font-size: 9pt; color: black">Pelanggan</p>
                            <div v-if="form.member != ''">
                                <div class="d-flex justify-content-start align-items-center pl-3 py-2" style="width: 100%; border-radius: 10px; background: rgb(235, 236, 240)">
                                    <i class="fas fa-user-circle color-primary mr-2" style="font-size: 30pt"></i>
                                    <div>
                                        <p class="mb-0 font-weight-bold color-primary" style="font-size: 8pt;">{{ form.member.nama }}</p>
                                        <p class="mb-0" style="font-size: 8pt; color: black">{{ form.member.tlp }}</p>
                                    </div>
                                </div>
                            </div>
                            <div v-else>
                                <div class="d-flex align-items-center justify-content-center" style="width: 100%; height: 70px; background: rgb(235, 236, 240)">
                                    <p class="mb-0" style="font-size: 9pt">Pelanggan belum dipilih</p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="mb-4">
                        <p class="ml-2 font-weight-bold" style="font-size: 9pt; color: black">Layanan yang dipilih</p>
                        <div v-if="form.detail_pemesanan.length">
                            <div class="">
                                <div  v-for="detail in form.detail_pemesanan" :key="detail.id" class="py-2 px-3 mb-2 d-flex justify-content-between align-items-center mx-1" style="width: 100%; border-radius: 10px; background: rgb(249, 249, 249)">
                                    <div class="d-flex justify-content-start align-items-center">
                                        <div class="mr-2" style="width: 60px; height: 50px; border-radius: 10px; background: lightgray"></div>
                                        <div>
                                            <p class="mb-1 font-weight-bold" style="font-size: 8pt; color:black">{{detail.jenis}} {{detail.nama_paket}}</p>
                                            <p class="mb-0" style="font-size: 8pt; color: gray">{{detail.harga}}</p>
                                        </div>
                                    </div>
                                    <div>
                                        <p class="mb-0" style="font-size: 8pt; color: gray">Jumlah</p>
                                        <p class="font-weight-bold" style="font-size: 10pt; text-align: right">{{detail.val}} x</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div v-else>
                            <div class="d-flex align-items-center justify-content-center" style="width: 100%; height: 70px; background: rgb(235, 236, 240)">
                                <p class="mb-0" style="font-size: 9pt">Belum ada layanan yang dipilih</p>
                            </div>
                        </div>
                    </div>
                    
                    <div class="d-flex flex-wrap justify-content-between align-items-center">
                        <div class="mb-4" style="width: 30%">
                            <p class="ml-2 font-weight-bold" style="font-size: 9pt; color: black">Promo</p>
                            <div v-if="form.diskon != ''">
                                <div class="d-flex justify-content-start align-items-center pl-3 py-2" style="width: 100%; border-radius: 10px; background: rgb(234,248,246)">
                                    <div class="d-flex justify-content-center align-items-center mr-3" style="border: 2px solid rgb(141,215,204); border-radius: 50%; width: 25px; height: 25px">
                                        <i class="fas fa-percent" style="font-size: 9pt; color: rgb(141,215,204)"></i>
                                    </div>
                                    <div>
                                        <p class="mb-0 font-weight-bold" style="font-size: 10pt; color: rgb(141,215,204)">{{ form.diskon }} %</p>
                                    </div>
                                </div>
                            </div>
                            <div v-else>
                                <div class="d-flex align-items-center justify-content-center" style="width: 100%; height: 70px; background: rgb(235, 236, 240)">
                                    <p class="mb-0" style="font-size: 9pt">Promo belum diisi</p>
                                </div>
                            </div>
                        </div>
                        <div class="mb-4" style="width: 30%">
                            <p class="ml-2 font-weight-bold" style="font-size: 9pt; color: black">Pajak</p>
                            <div v-if="form.pajak != ''">
                                <div class="d-flex justify-content-start align-items-center pl-3 py-2" style="width: 100%; border-radius: 10px; background: rgb(255,239,235)">
                                    <div class="d-flex justify-content-center align-items-center mr-3" style="border: 2px solid rgb(255,160,135); border-radius: 50%; width: 25px; height: 25px">
                                        <i class="far fa-money-bill-alt" style="font-size: 9pt; color: rgb(255,160,135);"></i>
                                    </div>
                                    <div>
                                        <p class="mb-0 font-weight-bold" style="font-size: 10pt; color: rgb(255,160,135);">Rp. {{ form.pajak }}</p>
                                    </div>
                                </div>
                            </div>
                            <div v-else>
                                <div class="d-flex align-items-center justify-content-center" style="width: 100%; height: 70px; background: rgb(235, 236, 240)">
                                    <p class="mb-0" style="font-size: 9pt">Pajak belum diisi</p>
                                </div>
                            </div>
                        </div>
                        <div class="mb-4" style="width: 30%">
                            <p class="ml-2 font-weight-bold" style="font-size: 9pt; color: black">Biaya tambahan</p>
                            <div v-if="form.biaya_tambahan != ''">
                                <div class="d-flex justify-content-start align-items-center pl-3 py-2" style="width: 100%; border-radius: 10px; background: rgb(255, 250, 235)">
                                    <div class="d-flex justify-content-center align-items-center mr-3" style="border: 2px solid rgb(255, 223, 135); border-radius: 50%; width: 25px; height: 25px">
                                        <i class="fas fa-plus" style="font-size: 9pt; color: rgb(255, 223, 135)"></i>
                                    </div>
                                    <div>
                                        <p class="mb-0 font-weight-bold" style="font-size: 10pt; color: rgb(255, 223, 135)">Rp. {{ form.biaya_tambahan }}</p>
                                    </div>
                                </div>
                            </div>
                            <div v-else>
                                <div class="d-flex align-items-center justify-content-center" style="width: 100%; height: 70px; background: rgb(235, 236, 240)">
                                    <p class="mb-0" style="font-size: 9pt">Biaya tambahan</p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="mb-4">
                        <p class="ml-2 font-weight-bold" style="font-size: 9pt; color: black">Detail tagihan</p>
                        <!-- {{form}} -->
                        <div>
                            <div class="pl-3 pb-3 mb-4" style="width: 100%; border-bottom: 1px solid lightgray">
                                <div class="d-flex justify-content-between align-items-center">
                                    <p class="mb-1 font-weight-bold" style="font-size: 8pt; color: black">Subtotal</p>
                                    <p class="mb-0 font-weight-bold" style="font-size: 8pt; color: black">{{ subtotal }}</p>
                                </div>
                                <div class="pl-2 mb-1">
                                    <div v-for="detail in form.detail_pemesanan" :key="detail.id" class="d-flex justify-content-between align-items-center">
                                        <p class="mb-0" style="font-size: 9pt; color: black">{{ detail.jenis }} {{ detail.nama_paket }} x {{ detail.val }}</p>
                                        <p class="mb-0" style="font-size: 9pt; color: black">{{ detail.harga * detail.val }}</p>
                                    </div>
                                </div>
                                <div class="mb-1" v-if="form.diskon.length">
                                    <div class="d-flex justify-content-between align-items-center">
                                        <p class="mb-1 font-weight-bold" style="font-size: 8pt; color: black">Diskon</p>
                                        <p class="mb-0 font-weight-bold" style="font-size: 8pt; color: black">-{{ (form.diskon / 100) * subtotal }}</p>
                                    </div>
                                    <div class="pl-2">
                                        <div class="d-flex justify-content-between align-items-center">
                                            <p class="mb-0" style="font-size: 9pt; color: black">Jumlah {{  form.diskon }}%</p>
                                        </div>
                                    </div>
                                </div>
                                <div class="mb-1" v-if="form.pajak.length">
                                    <div class="d-flex justify-content-between align-items-center">
                                        <p class="mb-1 font-weight-bold" style="font-size: 8pt; color: black">Pajak</p>
                                        <p class="mb-0 font-weight-bold" style="font-size: 8pt; color: black">{{ form.pajak }}</p>
                                    </div>
                                    <div class="pl-2">
                                        <div class="d-flex justify-content-between align-items-center">
                                            <p class="mb-0" style="font-size: 9pt; color: black">Jumlah Rp.{{  form.pajak }}</p>
                                        </div>
                                    </div>
                                </div>
                                <div class="mb-1" v-if="form.biaya_tambahan.length">
                                    <div class="d-flex justify-content-between align-items-center">
                                        <p class="mb-1 font-weight-bold" style="font-size: 8pt; color: black">Biaya tambahan</p>
                                        <p class="mb-0 font-weight-bold" style="font-size: 8pt; color: black">{{ form.biaya_tambahan }}</p>
                                    </div>
                                    <div class="pl-2">
                                        <div class="d-flex justify-content-between align-items-center">
                                            <p class="mb-0" style="font-size: 9pt; color: black">Jumlah Rp.{{  form.biaya_tambahan }}</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="d-flex justify-content-between align-items-center" style="width: 100%">
                                <div>
                                    <div v-if="form.detail_pemesanan.length && form.member != ''" class="d-flex justify-content-start align-items-center">
                                        <button v-b-modal.modal-no-backdrop class="btn btn-sm btn-info mx-1 px-3">Bayar sekarang</button>
                                        <b-modal style="width: 200px" id="modal-no-backdrop" hide-backdrop hide-header hide-footer hide-header-close centered content-class="shadow" size="sm">
                                            <div class="d-flex justify-content-center align-items-center">
                                                <div class="d-flex justify-content-center align-items-center rounded-circle mr-2" style="width: 100px; height: 100px; border: 3px solid rgb(102,111,193)">
                                                    <i class="fas fa-exclamation" style="font-size: 20pt; color: rgb(102,111,193)"></i>
                                                </div>
                                                <div>
                                                    <p class="font-weight-bold" style="font-size: 9pt">Uang telah diterima ?</p>
                                                    <div class="d-flex justify-content-start align-items-center">
                                                        <button @click="$bvModal.hide('modal-no-backdrop')" class="btn btn-sm btn-warning mx-1" style="width: 60px; font-size: 9pt; color: white">Tidak</button>
                                                        <button @click="create(true)" class="btn btn-sm btn-info mx-1" style="width: 60px; font-size: 9pt">Ya</button>
                                                    </div>
                                                </div>
                                            </div>
                                        </b-modal>
                                        <button @click="create(false)" class="btn btn-sm btn-warning mx-1 px-3">Bayar nanti</button>
                                    </div>
                                </div>
                                <div>
                                    <p class="font-weight-bold" style="font-size: 9pt; color: black">Total tagihan</p>
                                    <p class="color-primary font-weight-bold" style="font-size: 10pt">Rp. {{ total }}</p>
                                </div>
                                
                            </div>
                        </div>                        
                    </div>
                </div>
            </div>
        </div>
        <b-alert
        :show="dismissCountDown"
        dismissible
        variant="success"
        @dismissed="dismissCountDown=0"
        @dismiss-count-down="countDownChanged"
        class=""
        style="position: fixed; bottom: 0; right: 0; z-index: 99; width: 30%; margin-right: 50px;"
        >
        Data berhasil disimpan.
        </b-alert>
    </div>
</template>

<script>
import { mapState, mapGetters } from 'vuex'
export default {
    data(){
        return {
            items: [],
            dismissSecs: 5,
            dismissCountDown: 0,
            ConditionDetailPaket: '',
            search_pelanggan: '',
            pelanggans: [],
            pre_pelanggans: [],
            form: {
                detail_pemesanan: [],
                member: '',
                diskon: '',
                pajak: '',
                biaya_tambahan: '',
                dibayar: 'Belum Bayar'
            }
        }
    },
    computed: {
        getItemsGrupByJenis () {

            let data = this.$store.getters['paket/getItemsGrupByJenis']

            const result = data.map((record) => {
                return {
                    jenis: record.jenis,
                    data: record.data.map((item) => {
                        return {
                            ...item,
                            val: 0,
                        };
                    })
                }
            });

            return result
        },
        ...mapState({
            data: state => state.pelanggan.items
        }),

        subtotal(){
            var subtotal = 0
            this.form.detail_pemesanan.forEach(element => {
                subtotal += element.val * element.harga
            });

            return subtotal;
        },

        total(){
            var total = (Number(this.subtotal) + Number(this.form.pajak) + Number(this.form.biaya_tambahan)) - ((Number(this.form.diskon) / 100) * Number(this.subtotal))

            return total;
        }

    },
    watch: {
        getItemsGrupByJenis(){
            this.items = this.getItemsGrupByJenis
        },
        data(){
            this.pelanggans = this.data
            this.pre_pelanggans = this.data
        },
        search_pelanggan(){
            this.filterPelanggan()
        },
    },
    methods: {
        countDownChanged(dismissCountDown) {
            this.dismissCountDown = dismissCountDown
        },

        openDetailPaket(e) {
            if (this.ConditionDetailPaket == e) {
                this.ConditionDetailPaket = false
            }else{
                this.ConditionDetailPaket = e;
            }
        },

        increase(index_jenis, index_paket) {

            const checkIfExist = this.form.detail_pemesanan.filter(i => {
                if (i.id == this.items[index_jenis].data[index_paket].id) {
                    return i;
                }
            })

            this.items[index_jenis].data[index_paket].val += 1;

            if (checkIfExist.length <= 0) {
                this.form.detail_pemesanan.push(this.items[index_jenis].data[index_paket])
            }

        },
        decrease(index_jenis, index_paket) {
            if (this.items[index_jenis].data[index_paket].val > 0) {
                this.items[index_jenis].data[index_paket].val -= 1;
                if (this.items[index_jenis].data[index_paket].val == 0) {
                    this.form.detail_pemesanan = this.form.detail_pemesanan.filter(item => item.id != this.items[index_jenis].data[index_paket].id);
                }
            }
        },
        changeValueItem(index_jenis, index_paket, id){

            this.form.detail_pemesanan.filter(i => {
                if (i.id == this.items[index_jenis].data[index_paket].id) {
                    i.val = document.getElementById('input-item-' + id).value
                    if (document.getElementById('input-item-' + id).value == '') {
                        if (this.items[index_jenis].data[index_paket].val == 0) {
                            this.form.detail_pemesanan = this.form.detail_pemesanan.filter(item => item.id != this.items[index_jenis].data[index_paket].id);
                        }
                    }
                }
            })
        },
        async filterPelanggan(){
            const search = this.pre_pelanggans.filter(i => {
                return (i.nama.toLowerCase().indexOf(this.search_pelanggan.toLowerCase()) >= 0 ||
                i.alamat.toLowerCase().indexOf(this.search_pelanggan.toLowerCase()) >= 0 ||
                i.tlp.toLowerCase().indexOf(this.search_pelanggan.toLowerCase()) >= 0 ||
                i.jenis_kelamin.toLowerCase().indexOf(this.search_pelanggan.toLowerCase()) >= 0)
            })
            this.pelanggans = search
        },
        async create(dibayar){

            try{

                if (dibayar) {
                    this.form.dibayar = 'Lunas'
                }

                this.form = {...this.form, 'total': this.total, 'subtotal': this.subtotal, 'outlet_id': this.$route.params.id}

                console.log('form', this.form);

                await this.$store.dispatch('transaksi/CREATE', this.form)
                this.dismissCountDown = this.dismissSecs

                this.form = {
                    detail_pemesanan: [],
                    member: '',
                    diskon: '',
                    pajak: '',
                    biaya_tambahan: '',
                    dibayar: 'Belum Bayar'
                }

            }catch(err){
                alert(err);
            }
        }
    },

    async created(){
        try {
            let id = this.$route.params.id;
            await this.$store.dispatch('paket/GET_ALL', id)
            await this.$store.dispatch('pelanggan/GET_ALL', id)
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

    .pakets-enter-active {
        transition: all 0.5s;
    }

    .pakets-enter{
        opacity: 0;
        transform: translateX(10px);
    }

    .pakets-enter-to {
        opacity: 1;
        transform: translateX(0);
    }

    .hidden-arrow::-webkit-outer-spin-button,
    .hidden-arrow::-webkit-inner-spin-button {
        -webkit-appearance: none;
        margin: 0;
    }

    .wadah-search{
        background: rgb(235,236,240);
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
        transition: all 0.3s ease;
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
        transition: all 0.3s ease;
    }
    .list-move{
        transition: all 0.3s ease;
    }
</style>