<template>
  <l-map style="width: 100%; height: 600px;" :zoom="zoom" :center="center">
    <l-tile-layer :url="url" :attribution="attribution"></l-tile-layer>
    <l-marker :lat-lng="marker">
      <l-popup :content="text"></l-popup>
    </l-marker>
  </l-map>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { LMap, LTileLayer, LMarker, LPopup } from "vue2-leaflet";
import L from 'leaflet';
@Component({
  components: {
    LMap,
    LTileLayer,
    LMarker,
    LPopup
  }
})
export default class OpenSMap extends Vue {
  zoom:number = 13;
  center:object = L.latLng(47.413220, -1.219482);
  url = 'http://{s}.tile.osm.org/{z}/{x}/{y}.png';
  attribution = '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors';
  marker = L.latLng(47.413220, -1.219482);
  text = 'this is a marker';
}
</script>
