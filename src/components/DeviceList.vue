<template>
  <el-container id="Device">
    <el-aside>
      <el-card v-for="i in 10" :key="i">
        <div slot="header">
          <span>aaaa</span>
        </div>
        {{i}}
      </el-card>
    </el-aside>
  </el-container>
</template>

<script>
export default {
  name: "DeviceList"
}
</script>

<style scoped>
/*el-aside{*/
/*  width: 20%;*/
/*}*/
  #Device{
    height: 80%;
    overflow: scroll;
  }
</style>