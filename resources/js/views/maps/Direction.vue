<template>
  <div id="map"></div>
</template>

<script>
import mapboxgl from "mapbox-gl";
export default {
  name: "BaseMap",
  data() {
    return {
      accessToken: 'pk.eyJ1IjoiYWRpd2FoeXVkaSIsImEiOiJja214MXQ1NmgwNm1xMnhrb3g2eHIwbGFyIn0.MTw15VAd3qdQTD98t7cSJA',
    };
  },
  mounted() {
    mapboxgl.accessToken = 'pk.eyJ1IjoiYndhZGFtc29uIiwiYSI6ImNqajZhNm1idDFzMjIza3A2Y3ZmdDV6YWYifQ.9NhptR7a9D0hzWXR51y_9w';
    var map = new mapboxgl.Map({
    container: 'map',
    style: 'mapbox://styles/mapbox/streets-v9',
    center: [ 107.58338730171596, -6.874932988412624],
    zoom: 2
    });

    map.on('load', function() {
    var directions = new MapboxDirections({
        accessToken: mapboxgl.accessToken
    });
    map.addControl(directions, 'top-left');

    directions.setOrigin('Cimahi Tengah, Cimahi, West Java, Indonesia');
    directions.setDestination([107.53760,-6.89610]);
    });

  },
}
</script>

<style>
    #map{
        width: 100%;
        height: 100vh;
    }
</style>