<template>
  <div style="width: 100%; height: 100vh;">
    <MglMap
      :accessToken="mapboxAccessToken"
      :mapStyle.sync="mapStyle"
      :center="coordinates"
      :zoom="13"
      id="map-direction-kurir"
      @load="onload"
    >
    </MglMap>
  </div>
</template>

<script>

import { MglMap } from "vue-mapbox";
import MapboxDirections from '@mapbox/mapbox-gl-directions/dist/mapbox-gl-directions'
import '@mapbox/mapbox-gl-directions/dist/mapbox-gl-directions.css'

export default {
  components: {
    MglMap,
    MapboxDirections
  },
  props: [
    'outlet',
    'alamat'
  ],
  data() {
    return {
      mapStyle: "mapbox://styles/mapbox/streets-v11",
      coordinates: [107.53922280715506, -6.8766114688664],
      mapboxAccessToken: 'pk.eyJ1IjoiYWRpd2FoeXVkaSIsImEiOiJja214MXQ1NmgwNm1xMnhrb3g2eHIwbGFyIn0.MTw15VAd3qdQTD98t7cSJA'
    };
  },

  methods: {
    onload(event){
      const map = event.map;

        const directions = new MapboxDirections({
            accessToken: this.mapboxAccessToken,
            unit: 'metric',
            profile: 'mapbox/driving'
        });

        directions.on("route", e => {
            // routes is an array of route objects as documented here:
            // https://docs.mapbox.com/api/navigation/#route-object


            // Each route object has a distance property
            

            let destination = directions.getDestination()
            console.log("getDestination", destination.geometry.coordinates)
            this.$emit('setcoord', destination.geometry.coordinates)

            let routes = e.route
            console.log("Route lengths", routes.map(r => r.distance))
            this.$emit('setjarak', routes.map(r => r.distance))
        })

        map.addControl(directions, 'top-left');

        directions.setOrigin(this.outlet.lng_lat.split(","));
        directions.setDestination(this.alamat.split(","));

        var element = document.getElementsByClassName("mapbox-directions-instructions-wrapper");
        var i;

        for (i = 0; i < element.length; i++) {
          element[i].classList.remove("add-directions-instructions-none");
          element[i].classList.add("add-directions-instructions-block");
        }
    }
  },
}
</script>

<style>
  #map-direction-kurir .mapbox-directions-instructions-wrapper{
    height: 100vh;
    display: block;
  }

  #map-direction-kurir .mapbox-directions-instructions{
    position: absolute;
    background: rgba(0,0,0,0.75);
    width: 300px;
  }

  .add-directions-instructions-block{
    display: block;
  }

  .button-close {
    background: none; outline: none; box-shadow: none; border: none;
    position: absolute;
    z-index: 9999;
    top: 15px;
    left: 95%;
    margin: 0;
  }
</style>