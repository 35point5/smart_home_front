<template>
    <div id="House">
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
  name: "HouseList"
}
</script>

<style scoped>
  #House{
    /*position: absolute;*/
    height: 20%;
    width: 100%;
    overflow: auto;
    float: bottom;
  }
</style>