<template>
  <div>
    <b-modal id="modalInfo" hide-footer ok-only size="lg" v-if="info != ''"> <!-- v-if="info != '' -->
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
                <div class="pr-5" style="width: 50%; border-right: 1px solid lightgray">
                    <div class="d-flex justify-content-between align-items-center">
                        <p class="mb-0 font-weight-bold" style="font-size: 8pt; color: black">Subtotal</p>
                        <p class="mb-0 font-weight-bold" style="font-size: 8pt; color: black">{{ info.total }}</p>
                    </div>
                    <div class="pl-2">
                        <div v-for="detail in info.detail_transaksi" :key="detail.id" class="d-flex justify-content-between align-items-center">
                            <p class="mb-0" style="font-size: 8pt; color: black">{{ detail.paket.jenis }} {{ detail.paket.nama_paket }} x {{ detail.qty }}</p>
                            <p class="mb-0" style="font-size: 8pt; color: black">{{ detail.paket.harga * detail.qty }}</p>
                        </div>
                    </div>
                    <div class="d-flex justify-content-between align-items-center">
                        <p class="mb-0 font-weight-bold" style="font-size: 8pt; color: black">Diskon</p>
                        <p class="mb-0 font-weight-bold" style="font-size: 8pt; color: black">-4,300</p>
                    </div>
                    <div class="pl-2">
                        <div class="d-flex justify-content-between align-items-center">
                            <p class="mb-0" style="font-size: 8pt; color: black">Jumlah 10%</p>
                        </div>
                    </div>
                </div>
                <div class="pl-5" style="width: 50%">
                    <p class="mb-1 font-weight-bold" style="font-size: 9pt; color: black">Total Tagihan</p>
                    <p class="color-primary font-weight-bold" style="font-size: 10pt">Rp. 38, 000</p>
                </div>
            </div>
        </div>
    </b-modal>
  </div>
</template>

<script>

import { mapState } from 'vuex'

export default {
    computed: {
        ...mapState({
            info: state => state.transaksi.info,
            isLoading: state => state.isLoading,
            isLoadingAction: state => state.isLoadingAction
        }),
    },
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