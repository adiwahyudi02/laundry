<template>
    <div>
        <apexchart style="width: 100%" height="300px" type="bar" :options="options" :series="series"></apexchart>
        {{getLengthTransaksiHariIni}}
    </div>
</template>

<script>

import VueApexCharts from 'vue-apexcharts'

export default {
    data: function() {
        return {
            options: {
                chart: {
                    id: 'vuechart-example'
                },
                xaxis: {
                    categories: ['konfirmasi', 'penjemputan', 'antrian', 'proses', 'siap ambil', 'siap antar', 'selesai']
                },
                colors: ["rgb(102,111,193)", "rgb(102,111,193)"]
            },
            series: []
        }
    },
    components: {
        'apexchart': VueApexCharts
    },
    computed: {
        getLengthTransaksiHariIni(){
            this.series = [{
                name: 'Total transaksi',
                data: this.$store.getters['transaksi/getLengthTransaksiHariIni']        
            }]
        }
    }
}
</script>