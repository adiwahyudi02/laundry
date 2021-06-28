<template>
    <b-modal v-if="data != {}" id="modalUpdate" title="Edit pegawai" size="lg" :hide-footer="true" centered>
        <b-form @submit.stop.prevent="update">
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
        Data berhasil diperbarui.
        </b-alert>
    </b-modal>
</template>

<script>
import { required } from 'vuelidate/lib/validators'
import { mapState  } from 'vuex'

export default {
    data(){
        return{
            dismissSecs: 5,
            dismissCountDown: 0,
            form: '',
            pre_username: ''
        }
        
    },
    computed: {
        ...mapState({
            data (state) {
                const info = Object.assign({}, state.pegawai.info)
                this.form = info
                let pre = JSON.parse(JSON.stringify(state.pegawai.info))
                this.pre_username = pre.username
            },
            items: state => state.pegawai.items,
            isLoadingAction: state => state.isLoadingAction,
            
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

                    if (this.pre_username == value) {
                        return true
                    }
                    else{
                        if (value === '') return true    
                        if (this.items.find(user => user.username === value)) {
                            return false
                        }
                        else{
                            return true
                        }
                    }
                    
                } 
            },
            role: {
                required
            }
        }
    },
    methods:{
        countDownChanged(dismissCountDown) {
            this.dismissCountDown = dismissCountDown
        },
        async update(){

            this.$v.form.$touch();

            if (this.$v.form.$anyError) {
                return;
            }

            try{
                await this.$store.dispatch('pegawai/UPDATE', this.form)
                this.dismissCountDown = this.dismissSecs
                await this.$v.$reset()
            }catch(err){
                alert(err);
            }
        }
    },
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