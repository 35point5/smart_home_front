<template>
  <div id="app">
    <el-row id="Home" type="flex" justify="center" align="middle">
      <span id="welcome">欢迎使用智能家居管理系统</span>
    </el-row>
    <el-row id="main" type="flex" justify="space-between">
      <el-col id="Device">
        <el-card v-for="i in 10" :key="i">
          <div slot="header">
            <span>aaaa</span>
          </div>
          {{ i }}
        </el-card>
      </el-col>
      <el-col id="Message">
        <el-card v-for="i in 10" :key="i">
          <div slot="header">
            <span>aaaa</span>
          </div>
          {{ i }}
        </el-card>
      </el-col>
    </el-row>
    <el-row id="House" type="flex">
      <el-card :body-style="{ padding: '0px', height: '100%'}" v-for="i in 10" :key="i" class="HouseCard">
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
  width: 20%;
  overflow: auto;
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
</style>
