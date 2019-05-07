<template>
  <l-map style="width: 100%; height: 600px;"
    :zoom="zoom"
    :center="center"
    @update:center = "centerUpdated">

    <l-tile-layer :url="url" :attribution="attribution"></l-tile-layer>
    <l-marker :lat-lng="marker">
      <l-popup :content="text"></l-popup>
    </l-marker>
    <div v-if="isShowTenLine">
      <l-polyline v-for="(item, index) in polylines" v-bind:key="index"
        :lat-lngs="item.latlngs"
        :color="polylineColor">
      </l-polyline>
    </div>
    
    <l-control position="bottomleft" >
      <el-button @click="toggleTenLine">
        隐藏/显示十段线
      </el-button>
    </l-control>
  </l-map>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { LMap, LTileLayer, LMarker, LPopup, LPolyline, LControl} from "vue2-leaflet";
import L from 'leaflet';
import axios from 'axios'
@Component({
  components: {
    LMap,
    LTileLayer,
    LMarker,
    LPopup,
    LPolyline,
    LControl
  }
})
export default class OpenSMap extends Vue {
  zoom:number = 8;
  center:object = L.latLng(22.373566, 113.575185);
  url = 'http://{s}.tile.osm.org/{z}/{x}/{y}.png';
  attribution = '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors';
  marker = L.latLng(47.413220, -1.219482);
  text = 'this is a marker';
  isShowTenLine = false;
  polylineColor = 'green';
  polylines = [
    {latlngs:[[24.57765785743432,122.79666413281248],[23.463809301225297,122.51101960156248]]},
    {latlngs:[[21.719249953651758,121.93973053906248],[20.82858337230064,121.19266022656248]]},
    {latlngs:[[19.0315434488245,120.02810944531248],[18.021111267057044,119.47879303906248]]},
    {latlngs:[[16.035844698510633,119.07229889843748],[14.977219519233827,119.06131257031248]]},
    {latlngs:[[12.007684872103113,118.99539460156248],[10.898644806394351,118.51199616406248]]},
    {latlngs:[[8.005444597592394,116.25979889843748],[7.134206657904496,115.55667389843748]]},
    {latlngs:[[3.7552464889672312,112.87600983593748],[3.3934035093460753,111.76639069531248]]},
    {latlngs:[[6.004606582302569,108.30569733593748],[7.096050619922608,108.26175202343748]]},
    {latlngs:[[11.227500327159833,110.05252350781248],[12.270830961551562,110.32718171093748]]},
    {latlngs:[[15.15226395323892,109.86575592968748],[16.209989177744973,109.31643952343748]]}
  ];
  centerUpdated (center: any) {
      this.marker = center;
      axios.get('https://restapi.amap.com/v3/geocode/regeo', {
        params:{
          output:'JSON',
          location: this.marker.lng + ',' + this.marker.lat,
          key:'8a3b36c2265a30f551355400f51d05e2',
          radius:1000,
          extensions:'all'
        }
      }).then(res => {
        if (res.data.regeocode) {
          this.text = res.data.regeocode.formatted_address
        }
      }).catch(err => {
        console.error(err);
      })
  }
  toggleTenLine () {
    this.isShowTenLine = !this.isShowTenLine;
  }

}
</script>
