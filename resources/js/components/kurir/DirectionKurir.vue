<template>
    <div v-if="!isLoading && !isLoadingAction && info != ''">
        <button @click="$emit('hideMap')" class="button-close">
            <i class="fas fa-times color-primary" style="font-size: 20pt"></i>
        </button>
        <DirectionKurirMap v-if="conditionMap" :outlet="outlet" :alamat="info.lng_lat" @hideMap="conditionMap = false" />
        <div style="z-index: 9909; position: absolute;right: 20px;bottom: 40px;" class="d-flex justify-content-end">
            <div>
                <div class="p-3 card-transaksi mb-2 mx-2">
                    <div class="d-flex justify-content-between align-items-center mb-3">
                        <p class="mb-0 font-weight-bold color-primary" style="font-family: monospace">{{info.kode_invoice}}</p>
                        <div class="d-flex justify-content-start align-items-center">
                            <i class="far fa-user-circle color-primary mr-2" style="font-size: 15pt"></i>
                            <div>
                                <p class="mb-0 font-weight-bold color-primary" style="font-size: 8pt;">{{info.member.nama}}</p>
                            </div>
                        </div>
                    </div>
                    <div class="d-flex justify-content-between align-items-center">
                        <div>
                            <p class="mb-0" style="font-size: 8pt; color: darkgray">Lat lng</p>
                            <p style="font-size: 9pt">{{info.lng_lat}}</p>
                        </div>
                        <p class="font-weight-bold" style="font-size: 10pt">-</p>
                        <div>
                            <p class="mb-0" style="font-size: 8pt; color: darkgray">Ongkir</p>
                            <p style="font-size: 9pt">{{ info.ongkir | toCurrency }}</p>
                        </div>
                    </div>
                    <div v-for="item in info.detail_transaksi" :key="item.id">
                        <div class="d-flex justify-content-between align-items-center mb-2 px-3 py-2" style="border-radius: 10px; background: rgb(249,249,249)">
                            <p class="mb-0 color-primary" style="font-size: 9pt;">{{item.paket.jenis}} {{item.paket.nama_paket}}</p>
                            <p class="mb-0 color-primary" style="font-size: 9pt;">{{item.qty}} x</p>
                        </div>
                    </div>
                    <div class="d-flex justify-content-between align-items-center">
                        <div>
                            <p class="mb-0" style="font-size: 8pt; color: darkgray">Tagihan</p>
                            <p style="font-size: 9pt">{{ info.total | toCurrency }}</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { mapState } from 'vuex'
import DirectionKurirMap from '../maps/DirectionKurirMap'

export default {
    components: {
        DirectionKurirMap
    },
    data(){
        return {
            conditionMap: true
        }
    },
    computed: {
        ...mapState({
            info: state => state.transaksi.info,
            outlet: state => state.outlet.info,
            isLoading: state => state.isLoading,
            isLoadingAction: state => state.isLoadingAction
        }),
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
    width: 350px; 
    height: 240px;
    border-radius: 15px;
    cursor: pointer;
    transition: 0.2s;
}

.card-transaksi:hover{
    background: rgb(255, 255, 255, 0.6)
}

.button-close {
    background: none; outline: none; box-shadow: none; border: none;
    position: absolute;
    top: 15px;
    left: 95%;
    margin: 0;
}

</style>