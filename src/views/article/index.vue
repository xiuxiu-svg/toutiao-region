<template>
<div class="article-container">
<!-- 查询条件 -->
<el-card class="box-card">
    <div slot="header" class="clearfix">
      <!-- 面包屑路径 -->
      <el-breadcrumb separator-class="el-icon-arrow-right">
        <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item>文章管理</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <div>
        <form action="">

        </form>
    </div>
</el-card>
<!-- 查询结果 -->
<el-card class="box-card">
  <div slot="header" class="clearfix">
  <span>根据筛选条件共查询到 46147 条结果：</span>
  </div>
  <div v-for="o in 4" :key="o" class="text item">
    {{'列表内容 ' + o }}
  </div>
</el-card>
</div>
</template>
<script>
export default {
  name: 'ArticleIndex',
  props: {},
  components: {},
  data () {
    return {}
  },
  computed: {},
  watch: {},
  methods: {},
  created () {},
  mounted () {},
  beforeDestroy () {}
}
</script>
<style lang='less' scoped>
.box-card {
  margin-bottom: 20px;
}
.item {
  margin-bottom: 10px;
}
</style>
