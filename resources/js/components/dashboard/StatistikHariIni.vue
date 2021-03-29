<template>
  <div class="bg-white d-flex justify-content-center py-5 wadah-statistik">
        <div style="width: 90%">
            <div class="mb-4">
                <p class="mb-0 ml-2 font-weight-bold" style="color: darkslateblue;">Statistik hari ini</p>
            </div>
            <div class="mb-4">
                <ChartBarTransaksiHariIni />
            </div>
            <div class="d-flex justify-content-between align-items-center py-2 px-4 my-3" style="width: 100%; border-radius: 15px; background: rgb(240,243,248)">
                <div class="d-flex justify-content-start align-items-center">
                    <div class="mr-3">
                        <template>
                            <DoughnutChart
                            :percent="getLengthAndPercent.hari_ini.persentase || 0"
                            :visibleValue="true"
                            :width="80"
                            :height="80"
                            :backgroundColor="'#ffff'"
                            :foregroundColor="'rgb(102,111,193)'">
                            </DoughnutChart>
                        </template>
                    </div>
                    <div>
                        <p class="mb-0 font-weight-bold color-primary" style="font-family: berlin sans fb; font-size: 13pt">Kenaikan pelanggan</p>
                    </div>
                </div>
                <div>
                    <p class="mb-0" style="font-size: 10pt; color: grey">{{getLengthAndPercent.hari_ini.jumlah}} Orang</p>
                </div>
            </div>
            <div class="d-flex justify-content-between align-items-center py-3 px-4 my-3" style="width: 100%; border-radius: 15px; background: rgb(240,243,248)">
                <div class="d-flex justify-content-start align-items-center">
                    <div class="mr-3">
                        <p class="mb-0 font-weight-bold color-primary" style="font-family: berlin sans fb; font-size: 13pt">Pendapatan</p>
                    </div>
                </div>
                <div>
                    <div>
                        <p class="mb-0 font-weight-bold" style="font-family: berlin sans fb; font-size: 13pt">{{getTotalOmsetHariIni | toCurrency}}</p>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { mapGetters } from 'vuex'
import ChartBarTransaksiHariIni from './chart/ChartBarTransaksiHariIni'
import DoughnutChart from '../vue-doughnut-chart/DoughnutChart'
export default {
    components: {
        ChartBarTransaksiHariIni,
        DoughnutChart
    },
    computed: {
        ...mapGetters({
            getTotalOmsetHariIni: 'transaksi/getTotalOmsetHariIni',
            getLengthAndPercent : 'pelanggan/getLengthAndPercent'
        })
    }
}
</script>

<style>
    .color-primary{
        color: rgb(102,111,193);
    }
    .background-primary{
        background: rgb(102,111,193);
    }
    .wadah-statistik{
        width: 100%;
        border-radius: 15px;
        min-height: 95%;
    }
    @media screen and (max-width: 1080px){
        .wadah-statistik{
            width: 100%;
        }
    }
</style>