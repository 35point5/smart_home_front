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
        <div class="el-upload__text">上传场所图</div>
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
        <div class="el-upload__text">上传设备图</div>
      </el-upload>
      <img v-else :src="uploadDevice['Img']" style="width: 100%">
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="addDevice">添 加</el-button>
      </span>
    </el-dialog>
    <el-row id="Home" style="text-align: center" type="flex" justify="center" align="middle">
      <span id="welcome">{{ usrInfo.Name }}，欢迎使用智能家居管理系统</span>
      <div style="position: absolute; left: 0;">
        <el-link :underline="false" class="naviLink" icon="el-icon-check" @click="saveLayout">保存配置</el-link>
        <el-link :underline="false" class="naviLink" icon="el-icon-key" @click="GetAPIKey">生成API key</el-link>
      </div>
    </el-row>
    <el-row id="main" type="flex" justify="space-between">
      <el-col id="Device">
        <div class="subtitle">设备列表</div>
        <el-card v-for="(o, i) in deviceInfo" :key="i"
                 :body-style="{ padding: '0px', width: '100%', position: 'relative'}">
          <el-button type="danger" icon="el-icon-delete" style="float: right;" size="mini" @click="DeleteDevice(i)"></el-button>
          <span class="DeviceName">{{ o.Name }}</span>
          <img :src="o.Img" style="width: 80%; margin: 10%" alt="load failed"/>
          <el-row v-for="(e,j) in o.Status" :key="j" class="DeviceEntity">
            <el-switch v-if="e.Type===0" v-model="e.Value" active-color="#13ce66" inactive-color="#ff4949"
                       active-text="开"
                       inactive-text="关"
                       active-value="开"
                       inactive-value="关"
                       :width="40"/>
            <el-slider v-else-if="e.Type===1" :format-tooltip="sliderInfo" v-model="e.Value"
                       style="margin-left: 10px;margin-right: 10px"/>
            <span v-else-if="e.Type===2">{{ j }}：{{ e.Value }}</span>
          </el-row>
        </el-card>
        <el-card
            v-if="CurrentHouseID!=null"
            :body-style="{ padding: '0px', width: '100px', position: 'relative', width: '100%', border: '2px dashed #d9d9d9','box-sizing': 'border-box'}"
            class="HouseCard">
          <div @click="showUploadDevice" class="HouseAdd">
            <i class="el-icon-plus"></i>
            <p style="font-size: 15px">添加设备</p>
          </div>
        </el-card>
      </el-col>
      <el-col id="Layout" style="margin: 0">
        <div style="height: 100%; position: relative">
          <div style="height: 100%;" ref="Canvas">
            <img v-if="CurrentHouseIndex!=null" :src="houseInfo[CurrentHouseIndex].Img" alt="load failed"
                 style="height: 100%; width: 100%;">
<!--            <el-button type="primary" style="position: absolute; left: 100%; transform: translate(-100%,0)"-->
<!--                       @click="saveLayout">保存设置-->
<!--            </el-button>-->
            <vue-drag-zoom
                v-for="(o, i) in deviceInfo"
                :key="i"
                :area-node="node"
                allow-zoom
                :range="0.2"
                :max-zoom="10"
                :min-zoom="0.2"
                :left="o.PosX*node.offsetWidth-100*(1-o.Zoom)"
                :top="o.PosY*node.offsetHeight"
                :zoom="o.Zoom"
                :width="200"
                @mousemove="move($event,i)"
                @mousescroll="zoom($event,i)"
            >
              <span class="DeviceName">{{ o.Name }}</span>
              <img :src="o.Img" class="drag-zoom-content"
                   alt="load failed"
                   style="border-color: darkblue; border-style: solid; border-width: 2vh; width: 20vh; box-sizing: border-box">
            </vue-drag-zoom>
          </div>
        </div>
      </el-col>
      <el-col id="Message">
        <div class="subtitle">日志消息  <el-link icon="el-icon-refresh" style="font-size: 4vh;float: right" :underline="false" @click="getLog(houseInfo[CurrentHouseIndex])"></el-link></div>
        <el-card v-for="(o,i) in logInfo" :key="i" style="width: 100%">
          <div slot="header">
            <span>{{o.Name}}</span>
            <el-button type="danger" icon="el-icon-delete" style="float: right;" size="mini" @click="DeleteLog(i)"></el-button>
          </div>
          {{o.Time}}：
          <el-row v-for="(s,j) in o.Info" :key="j">{{s}}</el-row>
        </el-card>
      </el-col>
    </el-row>
    <el-row id="House" type="flex">
      <el-card :body-style="{ padding: '0px', height: '100%'}" v-for="(o, i) in houseInfo" :key="i" class="HouseCard">
        <span class="HouseName">{{ o.Name }}</span>
        <el-button type="danger" icon="el-icon-delete" style="float: right;" size="mini" @click="DeleteHouse(i)"></el-button>
        <img @click="changeHouse(o, i)" :src="o.Img" style="height: 100%;" alt="load failed"/>
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
import VueDragZoom from './components/DragZoom';
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
    // devicePos() {
    //   return this.deviceInfo.map((o) => {
    //     return [o.Posx*this.node.offsetWidth]
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
      CurrentHouseID: null,
      CurrentHouseIndex: null,
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
      deviceInfo: [],
      logInfo:[]
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
        if (this.houseInfo != null && this.houseInfo.length > 0) {
          this.changeHouse(this.houseInfo[0], 0)
        }
        console.log(this.houseInfo)
      }).catch((err) => {
        this.$message.error(err.response.data['message']);
      })
    },
    showUploadDevice() {
      this.uploadDevice.Sid = this.CurrentHouseID
      this.AddDeviceVisible = true;
      this.UploadDeviceImgVisible = true;
    },
    changeHouse(h, i) {
      this.CurrentHouseID = h.ID
      this.CurrentHouseIndex = i
      this.getDevice(h)
      this.getLog(h)
    },
    getLog(h){
      axios.post('/smart_home/api/log/getLog',h).then((resp) => {
        this.logInfo = resp.data
        console.log("log:"+this.logInfo)
      }).catch((err) => {
        this.$message.error(err.response.data['message']);
      })
    },
    getDevice(h){
      axios.post('/smart_home/api/device/getDevice', h).then((resp) => {
        if (resp.data != null) {
          this.deviceInfo = resp.data
          this.deviceInfo.forEach((o) => {
            for (let i in o.Status){
              if (o.Status[i].Type===1){
                console.log(o.Status[i])
                o.Status[i].Value=Number(o.Status[i].Value)
              }
            }
            return o
          })
        } else {
          this.deviceInfo = []
        }
      }).catch((err) => {
        this.$message.error(err.response.data['message']);
      })
    },
    sliderInfo(v) {
      return '亮度：' + v.toString() + '%'
    },
    move(e, i) {
      let w = this.node.offsetWidth, h = this.node.offsetHeight, l = e[3], t = e[4], z = e[5];
      console.log(w, h, l, t, z)
      this.deviceInfo[i].PosX = (l + 100 * (1 - z)) / w
      this.deviceInfo[i].PosY = (t) / h
      this.deviceInfo[i].Zoom = z
      console.log(this.deviceInfo[i].PosX, this.deviceInfo[i].PosY, this.deviceInfo[i].Zoom)
    },
    zoom(e, i) {
      let w = this.node.offsetWidth, h = this.node.offsetHeight, l = e[3], t = e[4], z = e[5];
      console.log(w, h, l, t, z)
      this.deviceInfo[i].PosX = (l + 100 * (1 - z)) / w
      this.deviceInfo[i].PosY = t / h
      this.deviceInfo[i].Zoom = z
      console.log(this.deviceInfo[i].PosX, this.deviceInfo[i].PosY, this.deviceInfo[i].Zoom)
    },
    saveLayout() {
      if (this.deviceInfo == null) return
      let temp = JSON.parse(JSON.stringify(this.deviceInfo))
      temp.forEach((o) => {
        for (let i in o.Status){
          console.log(o.Status[i].Value)
          o.Status[i].Value=o.Status[i].Value.toString()
        }
        o.Status = JSON.stringify(o.Status)
        return o
      })
      axios.post('/smart_home/api/device/saveLayout', temp).then(() => {
        this.$message({
          message: '保存成功',
          type: 'success'
        });
      }).catch((err) => {
        console.log(err.status)
        this.$message.error(err.response.data['message']);
      })
    },
    GetAPIKey(){
      axios.post('/smart_home/api/user/getAPIKey', this.usrInfo).then((resp) => {
        this.$copyText(resp.data.Key)
        this.$message({
          message: '已复制到剪贴板，请妥善保存！',
          type: 'success'
        });
      }).catch((err) => {
        console.log(err.status)
        this.$message.error(err.response.data['message']);
      })
    },
    DeleteLog(i){
      axios.post('/smart_home/api/log/deleteLog',this.logInfo[i]).then(() => {
        this.getLog(this.houseInfo[this.CurrentHouseIndex])
        this.$message({
          message: '删除成功',
          type: 'success'
        });
      }).catch((err) => {
        this.$message.error(err.response.data['message']);
      })
    },
    DeleteDevice(i){
      let temp = JSON.parse(JSON.stringify(this.deviceInfo[i]))
      temp.Status=null
      axios.post('/smart_home/api/device/deleteDevice',temp).then(() => {
        this.getDevice(this.houseInfo[this.CurrentHouseIndex])
        this.$message({
          message: '删除成功',
          type: 'success'
        });
      }).catch((err) => {
        this.$message.error(err.response.data['message']);
      })
    },
    DeleteHouse(i){
      if (i === this.CurrentHouseIndex){
        this.$message.error("不能删除当前场所！");
        return
      }
      axios.post('/smart_home/api/site/deleteHouse',this.houseInfo[i]).then(() => {
        this.getHouse()
        this.$message({
          message: '删除成功',
          type: 'success'
        });
      }).catch((err) => {
        this.$message.error(err.response.data['message']);
      })
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

.subtitle{
  font-size: 3vh;
  background: #e1e1e1;
  font-family: "Hiragino Sans GB", sans-serif;
}

.naviLink {
  font-size: 3vh;
  font-family: "Hiragino Sans GB", sans-serif;
  margin: 5px;
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
