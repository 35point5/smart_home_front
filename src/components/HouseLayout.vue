<template>
  <div style="height: 100%;">
    <img src="../../static/images/house1.png" alt="load failed" style="height: 100%; width: 100%;" ref="Canvas">
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
      <img src="../../static/images/device1.jpg" class="drag-zoom-content"
           alt="load failed" style="border-color: darkblue; border-style: solid; border-width: 2vh; width: 20vh">
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
      <img src="../../static/images/device2.jpg" class="drag-zoom-content"
           alt="load failed" style="border-color: darkblue; border-style: solid; border-width: 2vh">
      <!--          </VueDragResize>-->
    </vue-drag-zoom>
  </div>
</template>

<script>
import VueDragZoom from 'vue-drag-zoom';

export default {
  name: "HouseLayout",
  components: {
    VueDragZoom
  },
  data() {
    return {
      node: null,

    }
  },
  mounted() {
    this.node = this.$refs['Canvas']
  }
}
</script>

<style scoped>
.DeviceName {
  float: left;
  position: absolute;
  background: white;
  padding: .5%;
  border-radius: 2px;
  font-family: "PingFang SC", sans-serif;
  font-size: 5vh;
  opacity: .8;
}
</style>