<template>
    <div>
        <b-modal id="modalCreate" title="Form pegawai baru" size="lg" :hide-footer="true" centered>
            <b-form @submit.stop.prevent="create">
                <div class="form-group">
                    <label for="nama"> Nama:</label>
                    <input type="text" v-model.trim="$v.form.nama.$model" class="form-control form-control-sm mb-0" id="nama">
                    <div class="error" v-if="!$v.form.nama.required && $v.form.nama.$anyDirty">Nama harus diisi.</div>
                </div>

                <div>
                    <div class="form-group">
                        <label for="username">Username:</label>
                        <input type="text" v-model.trim="$v.form.username.$model" id="username" class="form-control mb-0">
                        <div class="error" v-if="!$v.form.username.required && $v.form.username.$anyDirty">Username harus diisi.</div>
                        <div class="error" v-if="!$v.form.username.isUnique && $v.form.username.$anyDirty">Username telah terdaftar.</div>
                    </div>
                </div>

                <div>
                    <div class="form-group">
                        <label for="password">Password</label>
                        <input type="password" class="form-control form-control mb-0" id="password" v-model.trim="$v.form.password.$model"/>
                        <div class="error" v-if="!$v.form.password.required && $v.form.password.$anyDirty">Password harus diisi.</div>
                        <div class="error" v-if="!$v.form.password.minLength">Password paling sedikit terdiri dari {{ $v.form.password.$params.minLength.min }} letters.</div>
                    </div>
                </div>

                <div>
                    <div class="form-group">
                        <label for="repeatPassword">Ulangi password :</label>
                        <input type="password" v-model.trim="$v.form.repeatPassword.$model" class="form-control form-control mb-0" id="repeatPassword">
                        <div class="error" v-if="!$v.form.repeatPassword.sameAsPassword">Password tidak sama.</div>
                    </div>
                    
                </div>

                <div>
                    <div class="form-group">
                        <div>
                            <label>Role:</label>
                        </div>
                        <input type="radio" v-model.trim="$v.form.role.$model" class="mr-2" value="admin" name="admin">
                        <label for="admin" class="mr-4">Admin</label>
                        <input type="radio" v-model.trim="$v.form.role.$model" class="mr-2" value="kasir" name="kasir">
                        <label for="kasir" class="mr-4">Kasir</label>
                        <input type="radio" v-model.trim="$v.form.role.$model" class="mr-2" value="kurir" name="kurir">
                        <label for="kurir">Kurir</label>
                    </div>
                    <div class="error" v-if="!$v.form.role.required && $v.form.role.$anyDirty">Role harus diisi.</div>
                </div>

                <div class="d-flex justify-content-end">
                    <b-button type="submit" class="background-primary btn btn-sm px-5">
                        <div v-if="isLoadingAction">
                            <b-spinner variant="light" type="grow" label="Spinning" small></b-spinner>
                            <b-spinner variant="light" type="grow" label="Spinning" small></b-spinner>
                            <b-spinner variant="light" type="grow" label="Spinning" small></b-spinner>
                        </div>
                        <div v-else>
                            Simpan
                        </div>
                    </b-button>
                </div>
            </b-form>
            <b-alert
            :show="dismissCountDown"
            dismissible
            variant="success"
            @dismissed="dismissCountDown=0"
            @dismiss-count-down="countDownChanged"
            class=""
            style="position: fixed; bottom: 0; right: 0; z-index: 99; width: 30%; margin-right: 50px;"
            >
            Data berhasil disimpan.
            </b-alert>
        </b-modal>
    </div>
</template>

<script>

import { required, minLength, sameAs } from 'vuelidate/lib/validators'
import { mapState  } from 'vuex'

export default {
    data(){
        return{
            dismissSecs: 5,
            dismissCountDown: 0,
            form: {
                nama: '',
                username: '',
                password: '',
                repeatPassword: '',
                role: '',
                outlet_id: ''
            }
        }
    },
    computed: {
        ...mapState({
            items: state => state.pegawai.items,
            isLoadingAction: state => state.isLoadingAction
        })
    },
    validations: {
        form: {
            nama: {
                required
            },
            username: {
                required,
                isUnique (value) {

                    if (value === '') return true
    
                    if (this.items.find(user => user.username === value)) {
                        return false
                    }
                    else{
                        return true
                    }
                }   
            },
            password: {
                required,
                minLength: minLength(6)
            },
            repeatPassword: {
                sameAsPassword: sameAs('password')
            },
            role: {
                required
            }
        },
    },
    methods:{

        countDownChanged(dismissCountDown) {
            this.dismissCountDown = dismissCountDown
        },

        async create(){

            this.$v.form.$touch();

            if (this.$v.form.$anyError) {
                return;
            }

            try{
                await this.$store.dispatch('pegawai/CREATE', this.form)
                this.dismissCountDown = this.dismissSecs
                this.form.nama = ''
                this.form.username = ''
                this.form.password = ''
                this.form.repeatPassword = ''
                this.form.role = ''
                await this.$v.$reset()
            }catch(err){
                alert(err);
            }
        }
    },
    async created(){
        this.form.outlet_id = this.$route.params.id
    }
}
</script>

<style scoped>
    .background-primary{
        background: rgb(102,111,193);
    }
    .error{
        font-size: 10pt;
        color: red;
    }
</style>