<template>
  <el-container>
    <el-footer id="House">
      <el-card v-for="i in 10" :key="i">
        <div slot="header">
          <span>aaaa</span>
        </div>
        {{i}}
      </el-card>
    </el-footer>
  </el-container>
</template>

<script>
export default {
  name: "HouseList"
}
</script>

<style scoped>
  #House{
    /*position: absolute;*/
    height: 500px;
    overflow: scroll;
  }
</style>