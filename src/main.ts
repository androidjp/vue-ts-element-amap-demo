import Vue from 'vue'

import 'normalize.css'
import ElementUI from 'element-ui'
import SvgIcon from 'vue-svgicon'
import '@/styles/index.scss'
import '@/icons/components'
import '@/permission'

/**
 * This project originally used easy-mock to simulate data requests,
 * but its official service is not stable.
 * So here We use Mock.js for a local emulation,
 * it will intercept your request and you won't see the request in the network.
 * If you remove `import '../mock'` it will automatically request easy-mock data.
 */
import '../mock' // simulation data requests

import App from '@/App.vue'
import store from '@/store'
import router from '@/router'
import '@/registerServiceWorker'
import VueAMap from 'vue-amap'

Vue.use(ElementUI)
Vue.use(SvgIcon, {
  tagName: 'svg-icon',
  defaultWidth: '1em',
  defaultHeight: '1em'
})


let clearAMapStorage = function () {
  let i = 0;
  while (i < 1000) {
  let key = window.localStorage.key(i);
  if (key === undefined || key === null) {
  break;
  } else if (/^_AMap/.test(key)) {
    window.localStorage.removeItem(key);
  }
  i++;
  }
};

Vue.use(VueAMap)
clearAMapStorage();
VueAMap.initAMapApiLoader({
  key: '2f7cf73468883f720a37ef942e01bffe',
  plugin: ['AMap.Geolocation','AMap.Autocomplete', 'AMap.PlaceSearch', 'AMap.Scale', 'AMap.OverView', 'AMap.ToolBar', 'AMap.MapType', 'AMap.PolyEditor', 'AMap.CircleEditor'],
  v: '1.4.4'
})
Vue.config.productionTip = false

import L from 'leaflet';
/* leaflet icon */
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: require('leaflet/dist/images/marker-icon-2x.png'),
  iconUrl: require('leaflet/dist/images/marker-icon.png'),
  shadowUrl: require('leaflet/dist/images/marker-shadow.png'),
});

new Vue({
  router,
  store,
  render: (h) => h(App)
}).$mount('#app')

