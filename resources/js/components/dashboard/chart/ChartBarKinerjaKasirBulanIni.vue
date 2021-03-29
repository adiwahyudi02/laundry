<template>
    <div class="card p-3">
        <apexchart style="width: 100%" height="300" type="bar" :options="options" :series="series"></apexchart>
    </div>
</template>

<script>
import VueApexCharts from 'vue-apexcharts'

export default {
    // data: function() {
    //     return {
    //         options: {
    //             chart: {
    //                 id: 'vuechart-example'
    //             },
    //             xaxis: {
    //                 categories: ['Udin', 'Endang', 'Dudung']
    //             },
    //             colors: ["rgb(102,111,193)", "rgb(102,111,193)"],
    //             plotOptions: {
    //                 bar: {
    //                     borderRadius: 4,
    //                     horizontal: true,
    //                 }
    //             },
    //         },
    //         series: [{
    //             name: 'Total transaksi',
    //             data: [30, 40, 10]
    //         }],
    //     }
    // },
    // components: {
    //     'apexchart': VueApexCharts
    // }
    data: function() {
        return {
            options: {
                
            },
            series: [],
        }
    },
    components: {
        'apexchart': VueApexCharts
    },
    computed: {
        getLengthTransaksiUntukKasir(){
            const data = this.$store.getters['transaksi/getLengthTransaksiUntukKasir']  
            this.options = {
                chart: {
                    id: 'vuechart-example'
                },
                xaxis: {
                    categories: data.kasir 
                },
                plotOptions: {
                    bar: {
                        borderRadius: 4,
                        horizontal: true,
                    }
                },
                colors: ["rgb(102,111,193)", "rgb(102,111,193)"],
            }

            this.series = [{
                name: 'Total transaksi',
                data: data.data
            }]

            return data
        }
    },
    watch: {
        getLengthTransaksiUntukKasir(){
            this.getLengthTransaksiUntukKasir
        }
    },
    async created(){
        await this.getLengthTransaksiUntukKasir
    }
}
</script>