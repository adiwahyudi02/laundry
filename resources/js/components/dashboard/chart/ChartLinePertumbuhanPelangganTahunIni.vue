<template>
    <div class="card p-3">
        <apexchart style="width: 100%" height="300" type="line" :options="options" :series="series"></apexchart>
        {{getLengthPertumbuhanPelannganTahunIni}}
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
                    categories: ['Jan', 'Feb', 'Mar', 'Apr', 'Mei', 'Jun', 'Jul', 'Agu', 'Sep', 'Okt', 'Nov', 'Des']
                },
                colors: ["rgb(102,111,193)", "rgb(102,111,193)"],
                stroke: {
                    curve: 'smooth',
                }
            },
            dataLabels: {
                enabled: false
            },
            series: []
        }
    },
    components: {
        'apexchart': VueApexCharts
    },
    computed: {
        getLengthPertumbuhanPelannganTahunIni(){
            const data = this.$store.getters['pelanggan/getLengthPertumbuhanPelannganTahunIni']
            this.series = [{
                name: 'Total pelanggan',
                data: data
            }]
        }
    }
}
</script>