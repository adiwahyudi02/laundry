<template>
  <div class="mb-3" style="width: 100%; height: 50vh;">
    <MglMap
      :accessToken="mapboxAccessToken"
      :mapStyle.sync="mapStyle"
      :center="coordinates"
      :zoom="13"
      id="map"
    >
      <MglMarker 
          :coordinates="coordinates" 
          :draggable="true"
          @dragend="onDragEnd"
      ></MglMarker>
      <MglGeocoderControl
          :accessToken="mapboxAccessToken"
          @results="handleSearch"
      >
      </MglGeocoderControl>
      <button @click="$emit('hideMap')" class="button-close">
          <i class="fas fa-times color-primary" style="font-size: 20pt"></i>
      </button>
    </MglMap>
  </div>
</template>

<script>
import { MglMap, MglMarker } from "vue-mapbox";
import MglGeocoderControl from "vue-mapbox-geocoder";

export default {
  components: {
    MglMap,
    MglMarker,
    MglGeocoderControl
  },
  props: [
    'coord'
  ],
  data() {
    return {
      mapStyle: "mapbox://styles/mapbox/streets-v11",
      coordinates: this.coord.split(",") || [107.53922280715506, -6.8766114688664],
      mapboxAccessToken: 'pk.eyJ1IjoiYWRpd2FoeXVkaSIsImEiOiJja214MXQ1NmgwNm1xMnhrb3g2eHIwbGFyIn0.MTw15VAd3qdQTD98t7cSJA'
    };
  },
  methods: {
    onDragEnd(event) {
        var lngLat = event.marker._lngLat;
        console.log('lngLat', event);
        this.$emit('setcoord', lngLat.lng + ',' + lngLat.lat)
    },
    handleSearch(event) {
      console.log(event)
    }
  }
};
</script>

<style>
    .mapboxgl-marker{
      position: absolute;
    }
    .button-close {
      background: none; outline: none; box-shadow: none; border: none;
      position: absolute;
      top: 40px;
      left: 95%;
      margin: 0;
    }
</style>