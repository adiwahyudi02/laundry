<template>
    <div>
        <b-modal id="modalCreate" title="Form outlet baru" size="lg" :hide-footer="true" centered>
            <b-form @submit.stop.prevent="create">
                <div class="form-group">
                    <label for="nama"> Nama:</label>
                    <input type="text" v-model.trim="$v.form.nama.$model" class="form-control form-control-sm mb-0" id="nama">
                    <div class="error" v-if="!$v.form.nama.required && $v.form.nama.$anyDirty">Nama harus diisi.</div>
                </div>

                <div>
                    <div class="form-group">
                        <label for="tlp">No telepon:</label>
                        <input type="number" v-model.trim="$v.form.tlp.$model" id="tlp" class="form-control mb-0">
                        <div class="error" v-if="!$v.form.tlp.required && $v.form.tlp.$anyDirty">No telepon harus diisi.</div>
                    </div>
                </div>

                <div class="form-group">
                    <label for="cm">Alamat:</label>
                    <textarea v-model.trim="$v.form.alamat.$model" class="form-control form-control-sm mb-0" id="cm" cols="30" rows="6"></textarea>
                    <div class="error" v-if="!$v.form.alamat.required && $v.form.alamat.$anyDirty">Alamat harus diisi.</div>
                </div>

                <div class="form-group">
                    <label for="lng_lat">Longitude, Latitude:</label>
                    <input type="button" v-model.trim="$v.form.lng_lat.$model" class="form-control form-control-sm mb-0" style="text-align: start" @click="conditionMap = true">
                    <div class="error" v-if="!$v.form.lng_lat.required && $v.form.lng_lat.$anyDirty">Longitude, Latitude harus diisi.</div>
                </div>

                <div>
                    <MarkerLocation v-if="conditionMap" :coord="'107.53922280715506, -6.8766114688664'" @hideMap="conditionMap = false" @setcoord="setcoord" />
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

import { required } from 'vuelidate/lib/validators'
import { mapState  } from 'vuex'
import MarkerLocation from '../maps/MarkerLocation'

export default {
    components: {
        MarkerLocation
    },
    data(){
        return{
            dismissSecs: 5,
            dismissCountDown: 0,
            form: {
                nama: '',
                tlp: '',
                alamat: '',
                lng_lat: ''
            },
            conditionMap: false
        }
    },
    computed: {
        ...mapState({
            isLoadingAction: state => state.isLoadingAction
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
            },
            lng_lat: {
                required
            }
        },
    },
    methods:{

        countDownChanged(dismissCountDown) {
            this.dismissCountDown = dismissCountDown
        },

        setcoord(coord){
            this.form.lng_lat = coord
        },

        async create(){

            this.$v.form.$touch();

            if (this.$v.form.$anyError) {
                return;
            }

            try{
                await this.$store.dispatch('outlet/CREATE', this.form)
                this.dismissCountDown = this.dismissSecs
                this.form.nama = ''
                this.form.tlp = ''
                this.form.alamat = ''
                this.form.lng_lat = ''
                await this.$v.$reset()
            }catch(err){
                alert(err);
            }
        }
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