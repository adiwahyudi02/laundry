<template>
    <div style="
    width: 40%;
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);">
        <form @submit.prevent="login">
            <div>
                <h3 class="mb-5 color-primary"><b>Login.</b></h3>
            </div>
            <div class="form-group">
                <label for="username">Username:</label>
                <input type="text" v-model.trim="$v.form.username.$model" class="form-control form-control-sm mb-0" id="username">
                <div class="error" v-if="!$v.form.username.required && $v.form.username.$anyDirty">Username harus diisi.</div>
            </div>
            <div class="form-group">
                <label for="password">Password:</label>
                <input type="password" v-model.trim="$v.form.password.$model" class="form-control form-control-sm mb-0" id="password">
                <div class="error" v-if="!$v.form.password.required && $v.form.password.$anyDirty">Password harus diisi.</div>
            </div>
            <div class="d-flex justify-content-end">
                <b-button type="submit" class="background-primary btn btn-sm px-5">
                    <div v-if="isLoadingAction">
                        <b-spinner variant="light" type="grow" label="Spinning" small></b-spinner>
                        <b-spinner variant="light" type="grow" label="Spinning" small></b-spinner>
                        <b-spinner variant="light" type="grow" label="Spinning" small></b-spinner>
                    </div>
                    <div v-else>
                        Login
                    </div>
                </b-button>
            </div>
            <p v-if="error" class="error">User tidak terdaftar.</p>
        </form>
    </div>
</template>

<script>
import { required } from 'vuelidate/lib/validators'
import { mapState } from 'vuex'
import Auth from '../Auth'

export default {
    data(){
        return{
            form: {
                username: '',
                password: '',
            },
            
            error: ''
        }
    },
    computed: {
        asd (){
            return Auth.loggedIn()
        },
        ...mapState({
            isLoadingAction: state => state.isLoadingAction
        })
    },
    validations: {
        form: {
            username: {
                required
            },
            password: {
                required
            }
        },
    },
    methods: {
        async login(){

            this.$v.form.$touch();

            if (this.$v.form.$anyError) {
                return;
            }

            try{
                await this.$store.commit('SET_ISLOADING_ACTION', true, { root: true })
                await Auth.login(this.form.username, this.form.password, loggedIn => {
                    if (!loggedIn) {
                        this.error = true
                    } else {
                        var auth = JSON.parse(localStorage.getItem('auth'));

                        if(auth.data.role == 'owner'){
                            this.$router.replace(this.$route.query.redirect || '/outlet')
                        }else if(auth.data.role == 'admin'){
                            this.$router.replace(this.$route.query.redirect || '/')
                        }else{
                            this.$router.replace(this.$route.query.redirect || '/kasir')
                        }
                        // window.location = "/outlet";
                    }
                })
                await this.$store.commit('SET_ISLOADING_ACTION', false, { root: true })
            }catch(err){
                this.error = err
            }
        }
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
    .error{
        font-size: 10pt;
        color: red;
    }
</style>