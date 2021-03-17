<template>
    <base-layout>
        <div class="d-flex justify-content-start">
            <the-sidebar />
            <div class="wrap-content">
                <the-navbar />
                <router-view></router-view>
                Dashboard
            </div>
        </div>
    </base-layout>
</template>
<script>

import BaseLayout from '../layouts/BaseLayout'
import TheNavbar from '../components/TheNavbar'
import TheSidebar from '../components/TheSidebar'

export default {
    components: {
        BaseLayout,
        TheNavbar,
        TheSidebar
    }
};
</script>
<style scoped>
    .wrap-content{
        width: 85%;
    }
</style>