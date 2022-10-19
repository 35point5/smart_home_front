<template>
  <div id="app">
    <HomeNavi/>
    <DeviceList/>
    <HouseList/>
  </div>
</template>

<script>
import HomeNavi from './components/HomeNavi'
import DeviceList from "@/components/DeviceList";
import HouseList from "@/components/HouseList";
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import Vue from 'vue'
Vue.use(ElementUI)
export default {
  name: 'App',
  components: {
    HomeNavi,
    DeviceList,
    HouseList
  }
}
</script>

<style>
#app {
  height: 100%;
  width: 100%;
  position: absolute;
}
/*HouseList{*/
/*  height: 20%;*/
/*  position: absolute;*/
/*}*/
/*HomeNavi{*/
/*  height: 20%;*/
/*  position: absolute;*/
/*}*/

</style>
