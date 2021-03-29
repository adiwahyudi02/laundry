<template>
  <div>
    <b-modal id="modalInfo" hide-footer ok-only centered size="lg" v-if="info != ''"> <!-- v-if="info != '' -->
    <!-- {{info}} -->
        <div class="p-3">
            <div class="d-flex justify-content-between align-items-center mb-5">
                <p class="mb-0 ml-2 font-weight-bold color-primary" style="font-family: monospace; font-size: 12pt">{{ info.kode_invoice }}</p>
                <div class="d-flex justify-content-start align-items-center">
                    <div class="mr-3">
                        <div class="px-5 py-1" style="background: rgb(217, 243, 255); border-radius: 10px">
                            <p class="mb-0 font-weight-bold" style="color: rgb(110, 207, 255); font-size: 9pt">{{ info.status }}</p>
                        </div>
                    </div>
                </div>
            </div>
            <div class="d-flex justify-content-between align-items-center mb-4">
                <div class="d-flex justify-content-start align-items-center pl-3 py-2" style="width: 250px; border-radius: 10px; background: ghostwhite">
                    <i class="fas fa-user-circle color-primary mr-2" style="font-size: 30pt"></i>
                    <div>
                        <p class="mb-0 font-weight-bold color-primary" style="font-size: 8pt;">{{ info.member.nama }}</p>
                        <p class="mb-0" style="font-size: 8pt; color: black">{{ info.member.tlp }}</p>
                    </div>
                </div>
                <div class="px-4 py-2 d-flex justify-content-between align-items-center" style="width: 50%; background: lightyellow; border-radius: 15px">
                    <div>
                        <p class="mb-0" style="font-size: 8pt; color: darkgray">Pemesanan</p>
                        <p style="font-size: 9pt">{{ info.tgl }}</p>
                    </div>
                    <p class="font-weight-bold" style="font-size: 10pt">-</p>
                    <div>
                        <p class="mb-0" style="font-size: 8pt; color: darkgray">Estimasi</p>
                        <p style="font-size: 9pt">{{ info.batas_waktu }}</p>
                    </div>
                </div>
            </div>
            <div class="mb-4">
                <p class="ml-2 font-weight-bold" style="font-size: 9pt; color: black">Detail Pemesanan</p>
                <div class="d-flex flex-wrap justify-content-start align-items-center">
                    <div v-for="detail in info.detail_transaksi" :key="detail.id" class="py-2 px-3 mb-2 d-flex justify-content-between align-items-center mx-1" style="width: 45%; border-radius: 10px; background: rgb(249, 249, 249)">
                        <div class="d-flex justify-content-start align-items-center">
                            <div class="mr-2" style="width: 60px; height: 50px; border-radius: 10px; background: lightgray"></div>
                            <div>
                                <p class="mb-0 font-weight-bold" style="font-size: 10pt; color:black">{{ detail.paket.nama_paket }}</p>
                                <p class="mb-0" style="font-size: 8pt; color: gray">{{ detail.paket.jenis }}</p>
                            </div>
                        </div>
                        <div>
                            <p class="mb-0" style="font-size: 8pt; color: gray">Jumlah</p>
                            <p class="font-weight-bold" style="font-size: 10pt; text-align: right">{{ detail.qty }} x</p>
                        </div>
                    </div>
                </div>
            </div>
            <div class="mb-4" style="width: 100%; height: 1px; background: lightgray"></div>
            
            <p class="mb-3 ml-2 font-weight-bold" style="font-size: 9pt; color: black">Detail Tagihan</p>
            <div class="d-flex justify-content-start align-items-center px-3">
                <div class="pl-2 pr-5 pb-3 mb-4" style="width: 50%; border-right: 1px solid lightgray">
                    <div class="d-flex justify-content-between align-items-center">
                        <p class="mb-1 font-weight-bold" style="font-size: 8pt; color: black">Subtotal</p>
                        <p class="mb-0 font-weight-bold" style="font-size: 8pt; color: black">{{ info.subtotal }}</p>
                    </div>
                    <div class="pl-2 mb-1">
                        <div v-for="detail in info.detail_transaksi" :key="detail.id" class="d-flex justify-content-between align-items-center">
                            <p class="mb-0" style="font-size: 9pt; color: black">{{ detail.paket.jenis }} {{ detail.paket.nama_paket }} x {{ detail.qty }}</p>
                            <p class="mb-0" style="font-size: 9pt; color: black">{{ detail.paket.harga * detail.qty }}</p>
                        </div>
                    </div>
                    <div class="mb-1" v-if="info.diskon">
                        <div class="d-flex justify-content-between align-items-center">
                            <p class="mb-1 font-weight-bold" style="font-size: 8pt; color: black">Diskon</p>
                            <p class="mb-0 font-weight-bold" style="font-size: 8pt; color: black">-{{ (info.diskon / 100) * info.subtotal }}</p>
                        </div>
                        <div class="pl-2">
                            <div class="d-flex justify-content-between align-items-center">
                                <p class="mb-0" style="font-size: 9pt; color: black">Jumlah {{  info.diskon }}%</p>
                            </div>
                        </div>
                    </div>
                    <div class="mb-1" v-if="info.pajak">
                        <div class="d-flex justify-content-between align-items-center">
                            <p class="mb-1 font-weight-bold" style="font-size: 8pt; color: black">Pajak</p>
                            <p class="mb-0 font-weight-bold" style="font-size: 8pt; color: black">{{ info.pajak }}</p>
                        </div>
                        <div class="pl-2">
                            <div class="d-flex justify-content-between align-items-center">
                                <p class="mb-0" style="font-size: 9pt; color: black">Jumlah {{  info.pajak | toCurrency}}</p>
                            </div>
                        </div>
                    </div>
                    <div class="mb-1" v-if="info.biaya_tambahan">
                        <div class="d-flex justify-content-between align-items-center">
                            <p class="mb-1 font-weight-bold" style="font-size: 8pt; color: black">Biaya tambahan</p>
                            <p class="mb-0 font-weight-bold" style="font-size: 8pt; color: black">{{ info.biaya_tambahan }}</p>
                        </div>
                        <div class="pl-2">
                            <div class="d-flex justify-content-between align-items-center">
                                <p class="mb-0" style="font-size: 9pt; color: black">Jumlah {{  info.biaya_tambahan | toCurrency}}</p>
                            </div>
                        </div>
                    </div>
                    <div class="mt-3 d-flex justify-content-end">
                        <button @click="exportPdf" class="btn btn-sm btn-info px-3" style="font-size: 9pt">Nota</button>
                    </div>
                </div>
                <div class="pl-5" style="width: 50%">
                    <div class=" d-flex justify-content-around align-items-center">
                        <div>
                            <p class="mb-1 font-weight-bold" style="font-size: 9pt; color: black">Total Tagihan</p>
                            <p class="color-primary font-weight-bold" style="font-size: 10pt">{{ info.total | toCurrency }}</p>
                        </div>
                        <div>
                            <div v-if="info.dibayar == 'Lunas'" class="px-4 py-1" style="background: rgb(234,248,246); border-radius: 10px">
                                <p class="mb-0 font-weight-bold" style="color: rgb(141,215,204); font-size: 9pt">Lunas</p>
                            </div>
                            <div v-else class="px-4 py-1" style="background: rgb(255,239,235); border-radius: 10px">
                                <p class="mb-0 font-weight-bold" style="color: rgb(255,160,135); font-size: 9pt">Belum Bayar</p>
                            </div>
                        </div>
                    </div>
                    <div v-if="info.dibayar != 'Lunas'">
                        <b-button v-b-modal.modal-no-backdrop type="submit" class="background-primary btn btn-sm px-5 mt-3" style="width: 100%">
                            <div v-if="isLoadingAction">
                                <b-spinner variant="light" type="grow" label="Spinning" small></b-spinner>
                                <b-spinner variant="light" type="grow" label="Spinning" small></b-spinner>
                                <b-spinner variant="light" type="grow" label="Spinning" small></b-spinner>
                            </div>
                            <div v-else>
                                Bayar sekarang
                            </div>
                        </b-button>
                        <b-modal style="width: 200px" id="modal-no-backdrop" hide-backdrop hide-header hide-footer hide-header-close centered content-class="shadow" size="sm">
                            <div class="d-flex justify-content-center align-items-center">
                                <div class="d-flex justify-content-center align-items-center rounded-circle mr-2" style="width: 100px; height: 100px; border: 3px solid rgb(102,111,193)">
                                    <i class="fas fa-exclamation" style="font-size: 20pt; color: rgb(102,111,193)"></i>
                                </div>
                                <div>
                                    <p class="font-weight-bold" style="font-size: 9pt">Uang telah diterima ?</p>
                                    <div class="d-flex justify-content-start align-items-center">
                                        <button @click="$bvModal.hide('modal-no-backdrop')" class="btn btn-sm btn-warning mx-1" style="width: 60px; font-size: 9pt; color: white">Tidak</button>
                                        <button @click="updateBayar(info.id)" class="btn btn-sm btn-info mx-1" style="width: 60px; font-size: 9pt">Ya</button>
                                    </div>
                                </div>
                            </div>
                        </b-modal>
                    </div>
                </div>
            </div>
        </div>
    </b-modal>
    <b-alert
    :show="dismissCountDown"
    dismissible
    variant="success"
    @dismissed="dismissCountDown=0"
    @dismiss-count-down="countDownChanged"
    class=""
    style="position: fixed; bottom: 0; right: 0; z-index: 99; width: 30%; margin-right: 50px;"
    >
    Data berhasil diperbarui.
    </b-alert>
  </div>
</template>

<script>

import { mapState } from 'vuex'
import jsPDFInvoiceTemplate, { OutputType, jsPDF } from "jspdf-invoice-template";

export default {
    data(){
        return {
            dismissSecs: 5,
            dismissCountDown: 0,
        }
    },
    computed: {
        ...mapState({
            info: state => state.transaksi.info,
            isLoading: state => state.isLoading,
            isLoadingAction: state => state.isLoadingAction,
            outlet: state => state.outlet.info
        }),
    },
    methods: {
        countDownChanged(dismissCountDown) {
            this.dismissCountDown = dismissCountDown
        },
        async updateBayar(id){
            try{
                this.$bvModal.hide('modal-no-backdrop')
                await this.$store.dispatch('transaksi/UPDATE_BAYAR', {'id': id, 'outlet_id': this.$route.params.id})
                this.dismissCountDown = this.dismissSecs
            }catch(err) {
                alert(err);
            }
        },
        async exportPdf(params){

            let id = this.$route.params.id;
            const outlet = await this.$store.dispatch('outlet/GET_INFO_BY_ID_REQUEST', id);

            console.log(this.outlet);

            const items = this.info.detail_transaksi.map((item, index) => {
                return {
                        num: index + 1,
                        desc: item.paket.jenis + ' ' + item.paket.nama_paket,
                        price: item.paket.harga,
                        quantity: item.qty,
                        unit: "",
                        total: (item.paket.harga * item.qty).toString()
                    }
            })

            var result = [...items]

            if (this.info.diskon != null) {
                const diskon = {
                    num: "Diskon",
                    desc: "Jumlah " + this.info.diskon + "%",
                    price: "",
                    quantity: "",
                    unit: "",
                    total: "-" + (this.info.diskon / 100) * this.info.subtotal
                }
                result = [...result, diskon]
            }
            if (this.info.pajak != null) {
                const pajak = {
                    num: "Pajak",
                    desc: "Jumlah Rp." + this.info.pajak,
                    price: "",
                    quantity: "",
                    unit: "",
                    total: this.info.pajak.toString()
                }
                result = [...result, pajak]
            }
            if (this.info.biaya_tambahan != null) {
                const biaya_tambahan = {
                    num: "Biaya tambahan",
                    desc: "Jumlah Rp." + this.info.biaya_tambahan,
                    price: "",
                    quantity: "",
                    unit: "",
                    total: this.info.biaya_tambahan.toString()
                }
                result = [...result, biaya_tambahan]
            }

            console.log(result);
            
            let dateObj = new Date();
            let month = dateObj.getMonth();
            let day = String(dateObj.getDate()).padStart(2, '0');
            let year = dateObj.getFullYear();
            let output = day  + '/' +  month + '/' + year + ' ' + dateObj.getHours() + ':' + dateObj.getMinutes() + ':' + dateObj.getSeconds() ;

            var props = {
                outputType: OutputType.Save,
                fileName: this.info.kode_invoice,
                orientationLandscape: false,
                logo: {
                    src: "/images/logo-laundry.png",
                    width: 33.33, //aspect ratio = width/height
                    height: 26.66
                },
                business: {
                    name: this.outlet.nama,
                    address: this.outlet.alamat,
                    phone: "Telp." + this.outlet.tlp.toString(),
                    email: "",
                    email_1: "",
                    website: "",
                },
                contact: {
                    label: "Atas nama: ",
                    name: this.info.member.nama,
                    address: this.info.member.alamat,
                    phone: "telp." + this.info.member.tlp.toString(),
                    email: "",
                    otherInfo: "",
                },
                invoice: {
                    label: " ",
                    invTotalLabel: "Total: ",
                    num: this.info.kode_invoice,
                    invDate: "Pembayaran: " + this.info.tgl_bayar,
                    invGenDate: "Nota: " + output,
                    header: ["#", "Paket", "Harga", "Kuantitas", "","Subtotal"],
                    headerBorder: false,
                    tableBodyBorder: false,
                    table: result,
                    invTotal: "Rp." + this.info.total.toString()
                },
                pageEnable: true,
                pageLabel: "Page "
            };

            const pdfObject = await jsPDFInvoiceTemplate(props); //returns number of pages created
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
</style>