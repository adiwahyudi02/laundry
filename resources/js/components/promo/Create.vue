<template>
    <div>
        <b-modal id="modalCreate" title="Form promo baru" size="lg" :hide-footer="true" centered>
            <b-form @submit.stop.prevent="create">

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

                <div>
                    <div class="form-group">
                        <label for="diskon">Diskon:</label>
                        <div class="d-flex justify-content-start align-items-center">
                            <input type="number" v-model.trim="$v.form.diskon.$model" id="diskon" class="form-control mb-0 hidden-arrow" style="width: 95%;">
                            <i class="fas fa-percent ml-2" style="color: rgb(102,111,193); font-size: 12pt; cursor: pointer"></i>
                        </div>
                        <div class="error" v-if="!$v.form.diskon.required && $v.form.diskon.$anyDirty">Diskon harus diisi.</div>
                    </div>
                </div>

                <div class="d-flex justify-content-end mt-5">
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

import { required } from 'vuelidate/lib/validators'
import { mapState  } from 'vuex'

export default {
    data(){
        return{
            dismissSecs: 5,
            dismissCountDown: 0,
            form: {
                outlet_id: '',
                min_subtotal: '',
                min_qty: '',
                diskon: '',
                status: 'aktif'
            }
        }
    },
    computed: {
        ...mapState({
            isLoadingAction: state => state.isLoadingAction
        })
    },
    validations: {
        form: {
            diskon: {
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
                await this.$store.dispatch('promo/CREATE', this.form)
                this.dismissCountDown = this.dismissSecs
                this.form.min_subtotal = ''
                this.form.min_qty = ''
                this.form.diskon = ''
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