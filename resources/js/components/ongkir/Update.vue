<template>
    <b-modal v-if="data != {}" id="modalUpdate" title="Edit paket" size="lg" :hide-footer="true" centered>
        <b-form @submit.stop.prevent="update">
            <div class="d-flex justify-content-between align-items-center">
                <div style="width: 45%">
                    <div class="form-group">
                        <label for="dari">Dari km:</label>
                        <input type="number" v-model.trim="$v.form.dari.$model" id="dari" class="form-control mb-0">
                        <div class="error" v-if="!$v.form.dari.required && $v.form.dari.$anyDirty">Dari km harus diisi.</div>
                    </div>
                </div>
                <div style="width: 45%">
                    <div class="form-group">
                        <label for="ke">Ke km:</label>
                        <input type="number" v-model.trim="$v.form.ke.$model" id="ke" class="form-control mb-0">
                        <div class="error" v-if="!$v.form.ke.required && $v.form.ke.$anyDirty">Ke km harus diisi.</div>
                    </div>
                </div>
            </div>

            <div>
                <div class="form-group">
                    <label for="harga">Harga:</label>
                    <input type="number" v-model.trim="$v.form.harga.$model" id="harga" class="form-control mb-0">
                    <div class="error" v-if="!$v.form.harga.required && $v.form.harga.$anyDirty">Harga harus diisi.</div>
                </div>
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
                const info = Object.assign({}, state.ongkir.info)
                this.form = info
            },
            isLoadingAction: state => state.isLoadingAction,
        })
    },
    validations: {
        form: {
            dari: {
                required
            },
            ke: {
                required
            },
            harga: {
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
                await this.$store.dispatch('ongkir/UPDATE', this.form)
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