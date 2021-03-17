<template>
    <b-modal v-if="data != {}" id="modalUpdate" title="Edit outlet" size="lg" :hide-footer="true" centered>
        <b-form @submit.stop.prevent="update">
            <div class="form-group">
                <label for="lab">Nama:</label>
                <input type="text" v-model.trim="$v.form.nama.$model" class="form-control form-control-sm mb-0" id="lab">
                <div class="error" v-if="!$v.form.nama.required && $v.form.nama.$anyDirty">Nama harus diisi.</div>
            </div>
            <div class="form-group">
                <label for="lab">No telepon:</label>
                <input type="number" v-model.trim="$v.form.tlp.$model" class="form-control form-control-sm mb-0" id="lab">
                <div class="error" v-if="!$v.form.tlp.required && $v.form.tlp.$anyDirty">No telepon harus diisi.</div>
            </div>
            <div class="form-group">
                <label for="cm">Alamat:</label>
                <textarea v-model.trim="$v.form.alamat.$model" class="form-control form-control-sm mb-0" id="cm" cols="30" rows="6"></textarea>
                <div class="error" v-if="!$v.form.alamat.required && $v.form.alamat.$anyDirty">Alamat is required.</div>
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
            form: ''
        }
        
    },
    computed: {
        ...mapState({
            data (state) {
                const info = Object.assign({}, state.outlet.info)
                this.form = info
            },
            isLoadingAction: state => state.isLoadingAction,
            
        })
    },
    validations: {
        form: {
            nama: {
                required
            },
            tlp: {
                required
            },
            alamat: {
                required
            }
        },
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
                await this.$store.dispatch('outlet/UPDATE', this.form)
                this.dismissCountDown = this.dismissSecs
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