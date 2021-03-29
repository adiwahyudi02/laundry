<template>
    <div>
        <apexchart style="width: 100%;" height="300" type="area" :options="options" :series="series"></apexchart>
        {{getLenghtTransaksiBulanIniPerTanggal}}
    </div>
</template>

<script>
import VueApexCharts from 'vue-apexcharts'
import { mapGetters } from 'vuex'
export default {
    data: function() {
        return {
            options: {
                chart: {
                    id: 'vuechart-example'
                },
                xaxis: {},
                colors: ["rgb(102,111,193)", "rgb(102,111,193)"],
                stroke: {
                    curve: 'smooth',
                }
            },
            dataLabels: {
                enabled: false
            },
            series: [],
            fill: {
                type: "gradient",
                gradient: {
                shadeIntensity: 1,
                opacityFrom: 0.7,
                opacityTo: 0.9,
                stops: [0, 90, 100]
                }
            }
        }
    },
    components: {
        'apexchart': VueApexCharts
    },
    computed: {
        ...mapGetters({
            getLenghtTransaksiBulanIniPerTanggal: 'transaksi/getLenghtTransaksiBulanIniPerTanggal'
        }),
        getLenghtTransaksiBulanIniPerTanggal(){
            const data = this.$store.getters['transaksi/getLenghtTransaksiBulanIniPerTanggal']  
            this.options.xaxis = {
                categories: data.tanggal
            }    
            this.series = [{
                name: 'Total transaksi',
                data: data.data
            }]
        }
    }
}
</script>