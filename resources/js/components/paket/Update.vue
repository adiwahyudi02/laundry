<template>
    <b-modal v-if="data != {}" id="modalUpdate" title="Edit paket" size="lg" :hide-footer="true" centered>
        <b-form @submit.stop.prevent="update">
            <div class="form-group">
                <label for="nama_paket"> Nama paket:</label>
                <input type="text" v-model.trim="$v.form.nama_paket.$model" class="form-control form-control-sm mb-0" id="nama_paket">
                <div class="error" v-if="!$v.form.nama_paket.required && $v.form.nama_paket.$anyDirty">Nama paket harus diisi.</div>
            </div>

            <div class="form-group">
                <label for="jenis">Jenis paket</label>
                <select name="" v-model.trim="$v.form.jenis.$model" class="custom-select mb-0" id="jenis">
                    <option disabled value="" style="">- - -</option>
                    <option v-for="item in jenis" :key="item.jenis" :value="item">{{item}}</option>
                </select>
                <div class="error" v-if="!$v.form.jenis.required && $v.form.jenis.$anyDirty">Jenis paket harus diisi.</div>
            </div>

            <div>
                <div class="form-group">
                    <label for="lama_pengerjaan">Lama pengerjaan (hari):</label>
                    <input type="number" v-model.trim="$v.form.lama_pengerjaan.$model" id="lama_pengerjaan" class="form-control mb-0">
                    <div class="error" v-if="!$v.form.lama_pengerjaan.required && $v.form.lama_pengerjaan.$anyDirty">Lama pengerjaan harus diisi.</div>
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
            jenis: [
                'Bed Cover',
                'Boneka',
                'Jas',
                'Kiloan',
                'Sepatu',
                'Tas',
                'Topi'
            ],
            form: ''
        }
        
    },
    computed: {
        ...mapState({
            data (state) {
                const info = Object.assign({}, state.paket.info)
                this.form = info
            },
            isLoadingAction: state => state.isLoadingAction,
            
        })
    },
    validations: {
        form: {
            nama_paket: {
                required
            },
            jenis: {
                required
            },
            lama_pengerjaan: {
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
                await this.$store.dispatch('paket/UPDATE', this.form)
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