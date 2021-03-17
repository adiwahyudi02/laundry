<template>
  <div class="py-2">
    <div class="d-flex justify-content-end mx-2 my-2">
        <div class="bg-white mx-2 d-flex justify-content-center align-items-center rounded-circle wrap-icon">
            <i class="fas color-primary fa-search"></i>
        </div>
        <div class="bg-white mx-2 d-flex justify-content-center align-items-center rounded-circle wrap-icon">
            <i class="fas color-primary fa-bell"></i>
        </div>
        <div class="user-login">
            <b-dropdown size="sm" right variant="none" no-caret style="margin-top: -3px">
                <template #button-content>
                    <div class="d-flex justify-content-start align-items-center">
                        <div class="background-primary d-flex justify-content-center align-items-center rounded-circle wrap-icon mx-2">
                            <i class="far text-white fa-user"></i>
                        </div>
                        <p class="font-weight-bold mb-0 nama-user-login" style="color: grey">{{ user.nama }}</p>
                    </div>
                </template>
                <b-dropdown-item-button>Profil</b-dropdown-item-button>
                <router-link :to="{ name: 'logout' }"><b-dropdown-item-button>Logout</b-dropdown-item-button></router-link>
            </b-dropdown>
        </div>
    </div>
  </div>
</template>

<script>
export default {
    data() {
        return {
            user: ''
        }
    },
    async created(){
        const user = await JSON.parse(localStorage.getItem('auth'));
        this.user = user.data
    }
}
</script>

<style lang="scss" scoped>
    .color-primary{
        color: rgb(102,111,193);
    }
    .background-primary{
        background: rgb(102,111,193);
    }
    .wrap-icon{
        width: 35px; 
        height: 35px;
        cursor: pointer;
    }
    .user-login{
        margin: 0 20px;
    }
    @media screen and (max-width: 450px){
        .user-login{
            margin: 0 5px;
        }
        .nama-user-login{
            display: none;
        }
    }
</style>