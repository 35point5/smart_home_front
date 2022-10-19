<template>
  <div id="Home">
    <el-menu mode="horizontal">
      <el-row type="flex" justify="center">
        <el-menu-item>欢迎使用智能家居管理系统</el-menu-item>
      </el-row>
    </el-menu>
  </div>
</template>

<script>
export default {
  name: "HomeNavi"
}
</script>

<style scoped>
#Home {
  height: 10%;
  width: 100%;
}
.el-menu-item{
  font-family: "Microsoft YaHei";
  font-size: 20px;
}
</style>