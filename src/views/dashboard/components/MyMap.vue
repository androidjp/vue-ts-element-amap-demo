<template>
    <div class="amap-page-container">
      <el-amap ref="map" vid="amapDemo"
        :center="center"
        :zoom="zoom"
        :lang="mapLang"   
        :events="events"
        :plugin="plugin"
        class="amap-demo"
        >
      </el-amap>
      <div id="lang">
        <div class="input-item"><input id="en" name="language" type="radio" checked="checked" @click="setLang('en')"><span class="input-text">英文底图</span></div>
        <div class="input-item"><input id="zh_en" name="language" type="radio" @click="setLang('zh_en')"><span class="input-text">中英文对照</span></div>
        <div class="input-item"><input id="zh_cn" name="language" type="radio" @click="setLang('zh_cn')"><span class="input-text">中文底图</span></div>
      </div>
    </div>
</template>
<script lang="ts">
//:amap-manager="amapManager"
// NPM 方式
import {Component, Vue} from 'vue-property-decorator';
import { exists } from 'fs';
// import {default as VueAMap} from 'vue-amap';
// import { AMapManager } from 'vue-amap';
let _this:any = null;
@Component
export default class MyMap extends Vue {
  center = [121.59996, 31.197646];
  zoom =  12;
  mapLang = 'en';
  curPositionInfo = {
    str:'',
    address: null,
    lng: null,
    lat: null,
    loaded: false
  };
  _this = this;
  events = {
    init: (o: any) => {
      console.log(o.getCenter())
      this.$refs.map as HTMLDivElement;
      console.log(this.$refs.map)
      o.getCity(function(result:any) {
        console.log(result)
      })
    },
    'moveend': () => {
    },
    'zoomchange': () => {
    },
    'click': (e:any) => {
      alert('map clicked');
    }
  };
  plugin = ['ToolBar',
    {
      pName: 'MapType',
      defaultType: 0,
      events: {
        init(o:string) {
          console.log(o);
        }
      }
    },
    {
      pName: 'Geolocation',
      events: {
        init(o:any) {
          // o 是高德地图定位插件实例
          o.getCurrentPosition((status:any, result:any) => {
            if (result && result.position) {
              alert(result.formattedAddress);
              _this.refreshCurPos(result.position.lng, result.position.lat);
            }
          });
        }
      }
    }
  ];
  // amapManager = new AMapManager();
  public setLang(id:string) {
    this.mapLang = id;
  };
  public refreshCurPos(lng:number, lat:number) {
    this.center = [lng, lat];
  };
};
</script>
<style lang="scss" scoped>
.amap-page-container {
  width: 800px;
  height: 600px;
}
.amap-demo {
    height: 500px;
}
</style>