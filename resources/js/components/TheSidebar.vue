<template>
    <div>
        <div class="wrap-sidebar">
            <div class="d-flex justify-content-center align-items-center" style="height: 100vh">
                <div style="width: 70%; height: 80vh">
                    <div>
                        <p class="font-weight-bold color-primary text-center" style="font-size: 15pt; font-family: cursive">bersih.</p>
                    </div>
                    
                    <div style="margin-top: 100px">
                        <router-link :to="{ name: 'dashboard', params: { id: id }}" class="text-decoration-none navigasi-sidebar">
                            <div class="item-link-navigasi py-2 px-2 rounded d-flex justify-content-start align-items-center my-2">  
                                <i class="fas fa-columns color-primary mr-3"></i>
                                <p class="color-primary mb-0" style="font-size: 10pt">Dashboard</p>
                            </div>
                        </router-link>
                        <div class="mb-4 mt-5">
                            <p class="font-weight-bold" style="color: lightgrey; font-size: 8pt">OUTLET</p>
                        </div>
                        <router-link :to="{ name: 'pegawai', params: { id: id }}" class="text-decoration-none navigasi-sidebar">
                            <div class="item-link-navigasi py-2 px-2 rounded d-flex justify-content-start align-items-center my-2">  
                                <i class="far fa-folder-open color-primary mr-3"></i>
                                <p class="color-primary mb-0" style="font-size: 10pt">Kelola</p>
                            </div>
                        </router-link>
                        <router-link :to="{ name: 'pesanan', params: { id: id }}" class="text-decoration-none navigasi-sidebar">
                            <div class="item-link-navigasi py-2 px-2 rounded d-flex justify-content-start align-items-center my-2">  
                                <i class="far fa-arrow-alt-circle-down color-primary mr-3"></i>
                                <p class="color-primary mb-0" style="font-size: 10pt">Pesanan</p>
                            </div>
                        </router-link>
                        <div class="item-link-navigasi py-2 px-2 rounded d-flex justify-content-start align-items-center my-2">  
                            <i class="far fa-chart-bar color-primary mr-3"></i>
                            <p class="color-primary mb-0" style="font-size: 10pt">Laporan</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="wrap-sidebar-middle">
            <div class="d-flex justify-content-center align-items-center">
                <div style="width: 95%; height: 80vh">
                    <div style="margin-top: 100px">
                        <router-link :to="{ name: 'dashboard', params: { id: id }}" class="text-decoration-none navigasi-sidebar">
                            <div class="d-flex justify-content-start align-items-center my-4" id="menu-item-dashboard">  
                                <i class="fas fa-columns color-primary mr-3 ml-3"></i>
                                <div class="rounded background-primary py-2 px-3 text-menu-item-middle">
                                    <p class="text-light mb-0 text-center" style="font-size: 10pt">Dashboard</p>
                                </div>
                            </div>
                        </router-link>
                        <div class="mb-4 mt-5">
                            <div style="width: 100%; height: 1px; background: lightgray"></div>
                        </div>
                        <router-link :to="{ name: 'pegawai', params: { id: id }}" class="text-decoration-none navigasi-sidebar">
                            <div class="d-flex justify-content-start align-items-center my-4" id="menu-item-kelola">  
                                <i class="far fa-folder-open color-primary mr-3 ml-3"></i>
                                <div class="rounded background-primary py-2 px-3 text-menu-item-middle">
                                    <p class="text-light mb-0 text-center" style="font-size: 10pt">Kelola</p>
                                </div>
                            </div>
                        </router-link>
                        <router-link :to="{ name: 'pesanan', params: { id: id }}" class="text-decoration-none navigasi-sidebar">
                            <div class="d-flex justify-content-start align-items-center my-4" id="menu-item-pesanan">  
                                <i class="far fa-arrow-alt-circle-down color-primary mr-3 ml-3"></i>
                                <div class="rounded background-primary py-2 px-3 text-menu-item-middle">
                                    <p class="text-light mb-0 text-center" style="font-size: 10pt">Pesanan</p>
                                </div>
                            </div>
                        </router-link>
                        <div class="d-flex justify-content-start align-items-center my-4" id="menu-item-laporan">  
                            <i class="far fa-chart-bar color-primary mr-3 ml-3"></i>
                            <div class="rounded background-primary py-2 px-3 text-menu-item-middle">
                                <p class="text-light mb-0 text-center" style="font-size: 10pt">Laporan</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <div class="wrap-sidebar-mobile">
            <div v-if="!openSidebar" style="height: 60px" class="d-flex align-items-center">
                <i @click="openSidebar = true" class="fas fa-align-left color-primary p-2"></i>
            </div>
            <div v-if="openSidebar" class="wadah-sidebar-mobile d-flex justify-content-center align-items-center">
                <div>
                    <div class="d-flex justify-content-end">
                        <p class="font-weight-bold" style="margin-right: -15px" @click="openSidebar = false">x</p>
                    </div>
                    <div style="width: 70%; height: 80vh">
                        <div>
                            <p class="font-weight-bold color-primary text-center" style="font-size: 15pt; font-family: cursive">bersih.</p>
                        </div>
                        
                        <div style="margin-top: 50px">
                            <router-link :to="{ name: 'dashboard', params: { id: id }}" class="text-decoration-none navigasi-sidebar">
                                <div class="d-flex justify-content-start align-items-center my-4">  
                                    <i class="fas fa-columns color-primary mr-3"></i>
                                    <p class="color-primary mb-0" style="font-size: 10pt">Dashboard</p>
                                </div>
                            </router-link>
                            <div class="mb-4 mt-5">
                                <p class="font-weight-bold" style="color: lightgrey; font-size: 8pt">OUTLET</p>
                            </div>
                            <router-link :to="{ name: 'pegawai', params: { id: id }}" class="text-decoration-none navigasi-sidebar">
                                <div class="d-flex justify-content-start align-items-center my-4">  
                                    <i class="far fa-folder-open color-primary mr-3"></i>
                                    <p class="color-primary mb-0" style="font-size: 10pt">Kelola</p>
                                </div>
                            </router-link>
                            <router-link :to="{ name: 'pesanan', params: { id: id }}" class="text-decoration-none navigasi-sidebar">
                                <div class="d-flex justify-content-start align-items-center my-4">  
                                    <i class="far fa-arrow-alt-circle-down color-primary mr-3"></i>
                                    <p class="color-primary mb-0" style="font-size: 10pt">Pesanan</p>
                                </div>
                            </router-link>
                            <div class="d-flex justify-content-start align-items-center my-4">  
                                <i class="far fa-chart-bar color-primary mr-3"></i>
                                <p class="color-primary mb-0" style="font-size: 10pt">Laporan</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            id: '',
            openSidebar: false
        }
    },
    async created(){
        this.id = this.$route.params.id
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
    .item-link-navigasi{
        transition: 0.2s;
    }
    .item-link-navigasi:hover{
        background: rgb(0, 0, 0, 0.1);
    }
    .navigasi-sidebar.router-link-exact-active .item-link-navigasi,
    .navigasi-sidebar.router-link-active .item-link-navigasi{
        background: rgb(102,111,193);
        color: white;
    }
    .navigasi-sidebar.router-link-exact-active i,
    .navigasi-sidebar.router-link-active i,
    .navigasi-sidebar.router-link-exact-active p,
    .navigasi-sidebar.router-link-active p{
        color: white;
    }
    .wrap-sidebar{
        background: white;
        width: 270px;
        min-height: 100vh;
    }
    .wrap-sidebar-middle{
        background: white;
        width: 50px;
        min-height: 100vh;
        display: none;
    }
    .text-menu-item-middle{
        visibility: hidden;
        opacity: 0;
        margin-left: 20px;
        transition: 0.2s;
        z-index: 99;
    }
    #menu-item-dashboard:hover .text-menu-item-middle,
    #menu-item-kelola:hover .text-menu-item-middle,
    #menu-item-pesanan:hover .text-menu-item-middle,
    #menu-item-laporan:hover .text-menu-item-middle{
        visibility: visible;
        opacity: 1;
        margin-left: 10px;
    }
    .wadah-sidebar-mobile{
        background: white;
        width: 170px;
        height: 100vh;
        position: fixed;
        z-index: 99;
    }
    .wrap-sidebar-mobile{
        display: none;
    }

    @media screen and (max-width: 1080px){
        .wrap-sidebar{
            display: none;
        }
        .wrap-sidebar-middle{
            display: block;
        }
    }
    @media screen and (max-width: 450px){
        .wrap-sidebar-middle{
            display: none;
        }
        .wrap-sidebar-mobile{
            display: block;
        }
    }
</style>