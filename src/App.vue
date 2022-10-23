<template>
  <div id="app">
    <el-row id="Home" type="flex" justify="center" align="middle">
      <span id="welcome">欢迎使用智能家居管理系统</span>
    </el-row>
    <el-row id="main" type="flex" justify="space-between">
      <el-col id="Device">
        <el-card :body-style="{ padding: '0px', width: '100%', position: 'relative'}">
          <span class="DeviceName">灯泡1</span>
          <img src="../static/images/device1.jpg" style="width: 80%; margin: 10%" alt="load failed"/>
          <el-row type="flex" justify="center" class="DeviceEntity">
            <el-switch active-color="#13ce66" inactive-color="#ff4949" active-text="开" inactive-text="关" width="40"/>
          </el-row>
          <el-row class="DeviceEntity">
            <el-slider style="margin-left: 10px;margin-right: 10px"/>
          </el-row>
        </el-card>
        <el-card :body-style="{ padding: '0px', width: '100%', position: 'relative'}">
          <span class="DeviceName">传感器1</span>
          <img src="../static/images/device2.jpg" style="width: 80%; margin: 10%" alt="load failed"/>
          <el-row type="flex" justify="center" class="DeviceEntity">
            <span>温度：25℃</span>
          </el-row>
          <el-row type="flex" justify="center" class="DeviceEntity">
            <span>湿度：60%</span>
          </el-row>
        </el-card>
      </el-col>
      <el-col id="Message">
        <el-card>
          <div slot="header">
            <span>灯泡1</span>
          </div>
          2020-10-23 15:20：
          <el-row>开关变为开</el-row>
          <el-row>亮度变为50%</el-row>
        </el-card>
      </el-col>
    </el-row>
    <el-row id="House" type="flex">
      <el-card :body-style="{ padding: '0px', height: '100%'}" v-for="i in 10" :key="i" class="HouseCard">
        <span class="HouseName">场所{{ i }}</span>
        <img src="../static/images/house1.png" style="height: 100%;" alt="load failed"/>
      </el-card>
    </el-row>
  </div>
</template>

<script>
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import Vue from 'vue'

Vue.use(ElementUI)
export default {
  name: 'App',
  components: {}
}
</script>

<style>
#app {
  height: 99vh;
  width: 99vw;
  position: absolute;
  /*overflow: hidden;*/
  /*background: black;*/
  /*display: flex;*/
}

#main {
  height: 70vh;
  overflow: auto;
}

#Device {
  /*height: 70%;*/
  width: 12%;
  overflow: auto;
}

.DeviceName {
  float: left;
  position: absolute;
  background: white;
  padding: .5%;
  border-radius: 2px;
  font-family: "PingFang SC", sans-serif;
  font-size: 3vh;
  opacity: .8;
}

.DeviceEntity {
  margin-top: 10%;
}

#Message {
  /*height: 70%;*/
  width: 20%;
  overflow: auto;
}

#Home {
  height: 9%;
  width: 100%;
  border-bottom-color: #e6e6e6;
  border-bottom-width: 1px;
  border-bottom-style: solid;
  overflow: hidden;
}

#welcome {
  font-size: 4vh;
  font-family: "PingFang SC", sans-serif;
}

#House {
  /*position: absolute;*/
  height: 20%;
  width: 100%;
  overflow-x: auto;
  /*float: bottom;*/
}

.HouseCard {
  height: 99%;
  /*width: 40%;*/
  display: flex;
  flex-direction: column;
  /*flex-basis: 20%;*/
  flex-shrink: 0;
  white-space: nowrap
}

.HouseName {
  float: left;
  position: absolute;
  background: white;
  padding: .5%;
  border-radius: 2px;
  font-family: "PingFang SC", sans-serif;
  opacity: .8;
}
</style>
