<template>
  <div id="app">
    <el-dialog
        title="请先登录或注册"
        :visible.sync="LoginVisible"
        width="30%"
        :show-close="false">
      <el-input v-model="usrInfo.Name" placeholder="请输入用户名" class="Input"></el-input>
      <el-input v-model="usrInfo.Password" placeholder="请输入密码" class="Input"></el-input>
      <el-input v-model="usrInfo.Phone" placeholder="请输入手机号" class="Input"></el-input>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="passwordLogin">登 录</el-button>
        <el-button type="primary" @click="register">注 册</el-button>
      </span>
    </el-dialog>
    <el-dialog
        title="添加场所"
        :visible.sync="AddHouseVisible"
        width="30%"
        :show-close="false">
      <el-input v-model="uploadHouse.Name" placeholder="请输入场所名" class="Input"></el-input>
      <el-upload
          v-if="UploadHouseImgVisible"
          style="width: 100%"
          drag
          action="https://jsonplaceholder.typicode.com/posts/"
          multiple
          :before-upload="uploadHouseImg">
        <i class="el-icon-upload"></i>
      </el-upload>
      <img v-else :src="uploadHouse['Img']" style="width: 100%">
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="addHouse">添 加</el-button>
      </span>
    </el-dialog>
    <el-dialog
        title="添加设备"
        :visible.sync="AddDeviceVisible"
        width="30%"
        :show-close="false">
      <el-input v-model="uploadDevice.Name" placeholder="请输入设备名" class="Input"></el-input>
      <el-select v-model="uploadDevice.Type" placeholder="请选择" class="Input">
        <el-option
            v-for="(item, i) in DeviceTypes"
            :key="i"
            :label="item"
            :value="i">
        </el-option>
      </el-select>
      <el-upload
          v-if="UploadDeviceImgVisible"
          style="width: 100%"
          drag
          action="https://jsonplaceholder.typicode.com/posts/"
          multiple
          :before-upload="uploadDeviceImg">
        <i class="el-icon-upload"></i>
      </el-upload>
      <img v-else :src="uploadDevice['Img']" style="width: 100%">
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="addDevice">添 加</el-button>
      </span>
    </el-dialog>
    <el-row id="Home" type="flex" justify="center" align="middle">
      <span id="welcome">{{ usrInfo.Name }}，欢迎使用智能家居管理系统</span>
    </el-row>
    <el-row id="main" type="flex" justify="space-between">
      <el-col id="Device">
        <el-card v-for="(o, i) in deviceInfo" :key="i"
                 :body-style="{ padding: '0px', width: '100%', position: 'relative'}">
          <span class="DeviceName">{{ o.Name }}</span>
          <img :src="o.Img" style="width: 80%; margin: 10%" alt="load failed"/>
          <el-row v-for="(e,j) in o.Status" :key="j" class="DeviceEntity">
            <el-switch v-if="e.Type===0" v-model="e.Value" active-color="#13ce66" inactive-color="#ff4949"
                       active-text="开"
                       inactive-text="关"
                       :width="40"/>
            <el-slider v-else-if="e.Type===1" :format-tooltip="sliderInfo" v-model="e.Value"
                       style="margin-left: 10px;margin-right: 10px"/>
            <span v-else-if="e.Type===2">{{j}}：{{e.Value}}</span>
          </el-row>
          <!--          <el-row class="DeviceEntity">-->
          <!--            <el-slider v-model="deviceInfo[0].slider" style="margin-left: 10px;margin-right: 10px"/>-->
          <!--          </el-row>-->
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
        <el-card
            v-if="CurrentHouse!=null"
            :body-style="{ padding: '0px', width: '100px', position: 'relative', width: '100%', border: '2px dashed #d9d9d9','box-sizing': 'border-box'}"
            class="HouseCard">
          <div @click="showUploadDevice" class="HouseAdd">
            <i class="el-icon-plus"></i>
            <p style="font-size: 15px">添加设备</p>
          </div>
        </el-card>
      </el-col>
      <el-col id="Layout">
        <div style="height: 100%; position: relative">
          <div style="height: 100%;" ref="Canvas">
            <img src="../static/images/house1.png" alt="load failed" style="height: 100%; width: 100%;">
            <!--    position: absolute; top: 0; left: 100px; width: 100px; height: 100px-->
            <vue-drag-zoom
                :area-node="node"
                allow-zoom
                :range="0.2"
                :max-zoom="10"
                :min-zoom="0.2"
            >
              <!--          <VueDragResize :isActive="true">-->
              <span class="DeviceName">灯泡1</span>
              <img src="../static/images/device1.jpg" class="drag-zoom-content"
                   alt="load failed"
                   style="border-color: darkblue; border-style: solid; border-width: 2vh; width: 20vh">
              <!--          </VueDragResize>-->
            </vue-drag-zoom>
            <vue-drag-zoom
                :area-node="node"
                allow-zoom
                :range="0.2"
                :max-zoom="10"
                :min-zoom="0.2"
            >
              <!--          <VueDragResize :isActive="true">-->
              <span class="DeviceName">传感器1</span>
              <img src="../static/images/device2.jpg" class="drag-zoom-content"
                   alt="load failed" style="border-color: darkblue; border-style: solid; border-width: 2vh">
              <!--          </VueDragResize>-->
            </vue-drag-zoom>
          </div>
        </div>
      </el-col>
      <el-col id="Message">
        <el-card>
          <div slot="header">
            <span>传感器1</span>
          </div>
          2020-10-23 15:40：
          <el-row>温度变为25℃</el-row>
          <el-row>湿度变为60%</el-row>
        </el-card>
        <el-card>
          <div slot="header">
            <span>灯泡1</span>
          </div>
          2020-10-23 15:20：
          <el-row>开关变为开</el-row>
          <el-row>亮度变为50%</el-row>
        </el-card>
        <el-card>
          <div slot="header">
            <span>传感器1</span>
          </div>
          2020-10-23 15:40：
          <el-row>温度变为25℃</el-row>
          <el-row>湿度变为60%</el-row>
        </el-card>
      </el-col>
    </el-row>
    <el-row id="House" type="flex">
      <el-card :body-style="{ padding: '0px', height: '100%'}" v-for="(o, i) in houseInfo" :key="i" class="HouseCard">
        <span class="HouseName">{{ o.Name }}</span>
        <img @click="changeHouse(o)" :src="o.Img" style="height: 100%;" alt="load failed"/>
      </el-card>

      <el-card
          :body-style="{ padding: '0px', width: '100px', position: 'relative', height: '100%', border: '2px dashed #d9d9d9'}"
          class="HouseCard">
        <div @click="showUploadHouse" class="HouseAdd">
          <i class="el-icon-plus"></i>
          <p style="font-size: 15px">添加场所</p>
        </div>
      </el-card>
    </el-row>
  </div>
</template>

<script>
import ElementUI from 'element-ui';
import VueDragZoom from 'vue-drag-zoom';
// import VueDragResize from 'vue-drag-resize'
// import HouseLayout from "@/components/HouseLayout";
import 'element-ui/lib/theme-chalk/index.css';
import Vue from 'vue'
import axios from "axios";

Vue.use(ElementUI)
export default {
  name: 'App',
  components: {
    // HouseLayout,
    VueDragZoom
  },
  computed: {
    // DeviceStatus(){
    //   return this.deviceInfo.map((o)=>{
    //     return JSON.parse(o.Status)
    //   })
    // }
  },
  data() {
    return {
      node: null,
      LoginVisible: false,
      AddHouseVisible: false,
      UploadHouseImgVisible: true,
      AddDeviceVisible: false,
      UploadDeviceImgVisible: true,
      CurrentHouse: null,
      DeviceTypes: ['灯', '开关', '传感器', '门'],
      uploadHouse: {
        Name: '',
        Img: ''
      },
      uploadDevice: {
        Name: '',
        Img: '',
        Type: 0,
        Sid: 0
      },
      usrInfo: {
        Name: '',
        Password: '',
        Phone: ''
      },
      houseInfo: [],
      deviceInfo: []
    }
  },
  mounted() {
    this.node = this.$refs['Canvas']
    this.cookieLogin()
  },
  methods: {
    cookieLogin() {
      axios.post('/smart_home/api/user/cookieLogin').then((resp) => {
        this.usrInfo['Name'] = resp.data['Name']
        this.getHouse()
      }).catch((err) => {
        this.$message.error(err.response.data['message']);
        this.LoginVisible = true;
      });
    },
    passwordLogin() {
      axios.post('/smart_home/api/user/passwordLogin', this.usrInfo).then(() => {
        this.$message({
          message: '登录成功！',
          type: 'success'
        });
        this.LoginVisible = false;
        this.getHouse();
      }).catch((err) => {
        console.log(err.status)
        this.$message.error(err.response.data['message']);
      })
      console.log(this.username, this.password)
    },
    register() {
      axios.post('/smart_home/api/user/register', this.usrInfo).then(() => {
        this.$message({
          message: '注册成功！',
          type: 'success'
        });
        this.LoginVisible = false;
        this.getHouse();
      }).catch((err) => {
        console.log(err.status)
        this.$message.error(err.response.data['message']);
      })
      console.log(this.username, this.password)
    },
    showUploadHouse() {
      this.AddHouseVisible = true;
      this.UploadHouseImgVisible = true;
    },
    uploadHouseImg(img) {
      let reader = new FileReader();
      reader.readAsDataURL(img);
      reader.onload = () => {
        console.log(reader.result);
        this.uploadHouse['Img'] = reader.result
      };
      this.UploadHouseImgVisible = false
      return false
    },
    uploadDeviceImg(img) {
      let reader = new FileReader();
      reader.readAsDataURL(img);
      reader.onload = () => {
        console.log(reader.result);
        this.uploadDevice['Img'] = reader.result
      };
      this.UploadDeviceImgVisible = false
      return false
    },
    addHouse() {
      axios.post('/smart_home/api/site/addHouse', this.uploadHouse).then((resp) => {
        this.$message({
          message: '添加成功！',
          type: 'success'
        });
        this.AddHouseVisible = false;
        this.houseInfo = resp.data
      }).catch((err) => {
        console.log(err.status)
        this.$message.error(err.response.data['message']);
        this.UploadHouseImgVisible = true;
      })
    },
    addDevice() {
      axios.post('/smart_home/api/device/addDevice', this.uploadDevice).then((resp) => {
        this.$message({
          message: '添加成功！',
          type: 'success'
        });
        this.AddDeviceVisible = false;
        this.deviceInfo = resp.data
      }).catch((err) => {
        console.log(err.status)
        this.$message.error(err.response.data['message']);
        this.UploadDeviceImgVisible = true;
      })
    },
    getHouse() {
      axios.post('/smart_home/api/site/getHouse').then((resp) => {
        this.houseInfo = resp.data
        console.log(this.houseInfo)
      }).catch((err) => {
        this.$message.error(err.response.data['message']);
      })
    },
    showUploadDevice() {
      this.uploadDevice.Sid = this.CurrentHouse
      this.AddDeviceVisible = true;
      this.UploadDeviceImgVisible = true;
    },
    changeHouse(h) {
      this.CurrentHouse = h.ID
      axios.post('/smart_home/api/device/getDevice', h).then((resp) => {
        if (resp.data != null) {
          this.deviceInfo = resp.data
        } else {
          this.deviceInfo = []
        }
      }).catch((err) => {
        this.$message.error(err.response.data['message']);
      })
    },
    sliderInfo(v) {
      return '亮度：' + v.toString() + '%'
    }
  }
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

.Input {
  margin: 5px;
  /*width: 90%;*/
}

#main {
  height: 70vh;
  overflow: auto;
}

#Device {
  /*height: 70%;*/
  width: 15%;
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
  text-align: center;
}

#Layout {
  margin: 3vh 0;
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

.HouseAdd {
  font-size: 28px;
  color: #8c939d;
  /*width: 278px;*/
  /*height: 278px;*/
  /*line-height: 278px;*/
  top: 50%;
  /*bottom: 50%;*/
  /*left: 100%;*/
  margin: auto;
  /*display: block;*/
  position: relative;
  text-align: center;
  transform: translate(0, -50%);
}

.el-upload-dragger {
  width: 100%;
}

.el-upload {
  width: 100%;
}
</style>
