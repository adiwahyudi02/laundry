<template>
    <div>
        <div id="map"></div>
        <pre id="coordinates" class="coordinates"></pre>
    </div>
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
    mapboxgl.accessToken = this.accessToken;
    var coordinates = document.getElementById('coordinates');
    var map = new mapboxgl.Map({
        container: 'map',
        style: 'mapbox://styles/mapbox/streets-v11',
        center: [107.53922280715506, -6.8766114688664],
        zoom: 13
    });

    var marker = new mapboxgl.Marker({
        draggable: true
    })
        .setLngLat([107.53922280715506, -6.8766114688664])
        .addTo(map);

    function onDragEnd() {
        var lngLat = marker.getLngLat();
        coordinates.style.display = 'block';
        coordinates.innerHTML =
            'Longitude: ' + lngLat.lng + '<br />Latitude: ' + lngLat.lat + '<br />Location: ' + lngLat.properties;
    }

    marker.on('dragend', onDragEnd);

    const geocoder = new MapboxGeocoder({
        mapboxgl: mapboxgl,                                                                               
        accessToken: mapboxgl.accessToken,
        marker: false
    })
    geocoder.on('result', e => {

        // marker.setLngLat(e.result.center)
        
        // const marker = new mapboxgl.Marker({
        //         draggable: true
        // })
        // .setLngLat(e.result.center)
        // .addTo(map)
        marker.on('dragend', e => {
                
        })
    })
    map.addControl(geocoder)


    // document.getElementById("app").style.position = 'absolute';
    // document.getElementById("app").style.width = '100vw';
  },
};
</script>
<style>
body { margin: 0; padding: 0; }
#map { position: absolute; top: 0; bottom: 0; width: 100%; }

    .coordinates {
        background: rgba(0, 0, 0, 0.5);
        color: #fff;
        position: absolute;
        bottom: 40px;
        left: 10px;
        padding: 10px 20px;
        margin: 0;
        font-size: 11pt;
        line-height: 24px;
        border-radius: 3px;
        display: none;
    }

    .mapboxgl-marker{
        position: absolute;
    }

</style>