<template>
    <div id="Device">
      <el-card v-for="i in 10" :key="i">
        <div slot="header">
          <span>aaaa</span>
        </div>
        {{i}}
      </el-card>
    </div>
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
    height: 70%;
    width: 20%;
    overflow: auto;
  }
</style>