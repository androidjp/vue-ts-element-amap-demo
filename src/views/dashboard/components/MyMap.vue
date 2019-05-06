<template>
    <div class="amap-page-container">
      <el-amap ref="map" vid="amapDemo"
        :center="center"
        :zoom="zoom"
        :lang="mapLang"   
        :events="events"
        :plugin="plugin"
        :amap-manager="amapManager"
        class="amap-demo"
        >
      </el-amap>
       <button @click="add()">add marker</button>
      <div id="lang">
        <div class="input-item"><input id="en" name="language" type="radio" checked="checked" @click="setLang('en')"><span class="input-text">英文底图</span></div>
        <div class="input-item"><input id="zh_en" name="language" type="radio" @click="setLang('zh_en')"><span class="input-text">中英文对照</span></div>
        <div class="input-item"><input id="zh_cn" name="language" type="radio" @click="setLang('zh_cn')"><span class="input-text">中文底图</span></div>
      </div>
      <div>
        <el-row>
          请输入经度:
          <el-input
            placeholder="请输入经度"
            v-model="this.lng"
            clearable
            style= "width:160px"
            >
          </el-input>
          请输入纬度:
          <el-input
            placeholder="请输入纬度"
            v-model="this.lat"
            clearable
            style= "width:160px"
            >
          </el-input>
          <el-button icon="el-icon-search" circle @click="searchLocation"></el-button>
        </el-row>
      </div>
    </div>
</template>
<script lang="ts">
//:amap-manager="amapManager"
// NPM 方式
import {Component, Vue} from 'vue-property-decorator';
import { exists } from 'fs';
// import {default as VueAMap} from 'vue-amap';
import { AMapManager } from 'vue-amap';
import axios from 'axios';
let _this:any = null;
@Component
export default class MyMap extends Vue {
  center = [121.59996, 31.197646];
  zoom =  12;
  mapLang = 'en';
  lng = '121.59996';
  lat = '31.197646';
  curPositionInfo = {
    str:'',
    address: null,
    loaded: false
  };
  amapManager = new AMapManager();
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
  public add() {
    let map = this.amapManager.getMap();
    let marker = new AMap.Marker({
      position: [121.59996, 31.177646]
    });
    marker.setMap(map);
  };
  public searchLocation() {
    // https://restapi.amap.com/v3/geocode/regeo?output=xml&location=116.310003,39.991957&key=<用户的key>&radius=1000&extensions=all
    alert('lng:' + this.lng + ', lat:' + this.lat);
    axios.get('https://restapi.amap.com/v3/geocode/regeo', {
      params:{
        output:'JSON',
        location: this.lng + ',' + this.lat,
        key:'8a3b36c2265a30f551355400f51d05e2',
        radius:1000,
        extensions:'all'
      }
    }).then(res => {
      console.log(res);
    })

  }
};
</script>
<style lang="scss" scoped>
.amap-page-container {
  width: 800px;
}
.amap-demo {
    height: 500px;
}
</style>