<template>
    <b-modal v-if="data != {}" id="modalUpdate" title="Edit promo" size="lg" :hide-footer="true" centered>
        <b-form @submit.stop.prevent="update">
            <div class="d-flex justify-content-between align-items-center">
                    <div style="width: 45%">
                        <div class="form-group">
                            <label for="min_subtotal">Minimal subtotal:</label>
                            <input type="number" v-model.trim="form.min_subtotal" id="min_subtotal" class="form-control mb-0">
                        </div>
                    </div>
                    <div style="width: 45%">
                        <div class="form-group">
                            <label for="min_qty">Minimal qty:</label>
                            <input type="number" v-model.trim="form.min_qty" id="min_qty" class="form-control mb-0">
                        </div>
                    </div>
                </div>

                <div class="d-flex justify-content-between align-items-center">
                    <div style="width: 45%">
                        <div class="form-group">
                            <label for="diskon">Diskon:</label>
                            <input type="number" v-model.trim="$v.form.diskon.$model" id="diskon" class="form-control mb-0">
                            <div class="error" v-if="!$v.form.diskon.required && $v.form.diskon.$anyDirty">Diskon harus diisi.</div>
                        </div>
                    </div>
                    <div style="width: 45%">
                        <div class="form-group">
                            <div>
                                <label>Status:</label>
                            </div>
                            <input type="radio" v-model.trim="$v.form.status.$model" class="mr-2" value="aktif" name="aktif">
                            <label for="aktif" class="mr-4">Aktif</label>
                            <input type="radio" v-model.trim="$v.form.status.$model" class="mr-2" value="tidak aktif" name="tidak aktif">
                            <label for="tidak aktif" class="mr-4">Tidak aktif</label>
                        </div>
                        <div class="error" v-if="!$v.form.status.required && $v.form.status.$anyDirty">Status harus diisi.</div>
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
                const info = Object.assign({}, state.promo.info)
                this.form = info
            },
            isLoadingAction: state => state.isLoadingAction,
        })
    },
    validations: {
        form: {
            diskon: {
                required
            },
            status: {
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
                await this.$store.dispatch('promo/UPDATE', this.form)
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