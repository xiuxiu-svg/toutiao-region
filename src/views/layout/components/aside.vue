<template>
  <el-menu
    default-active="/"
    class="menu el-menu-vertical-demo"
    background-color="rgb(126, 112, 119)"
    text-color="#fff"
    active-text-color="#ffd04b"
    :collapse="isCollapse"
    router
    >
    <!-- 上面的router是element提供的attribute -->
    <!-- logo -->
    <div>
      <img src="./logo_admin.png" alt="" class="logoAdmin">
    </div>
    <el-menu-item index="/">
      <i class="el-icon-s-home"></i>
      <span slot="title">首页</span>
    </el-menu-item>
    <el-menu-item index="/article">
      <i class="el-icon-menu"></i>
      <span slot="title">内容管理</span>
    </el-menu-item>
    <el-menu-item index="/image">
      <i class="el-icon-document"></i>
      <span slot="title">素材管理</span>
    </el-menu-item>
    <el-menu-item index="/publish">
      <i class="el-icon-s-order"></i>
      <span slot="title">发布文章</span>
    </el-menu-item>
    <el-menu-item index="/comment">
      <i class="iconfont iconfensi"></i>
      <span slot="title">评论管理</span>
    </el-menu-item>
    <el-menu-item index="/fans">
      <i class="iconfont iconreview"></i>
      <span slot="title">粉丝管理</span>
    </el-menu-item>
    <el-menu-item index="/profile">
      <i class="el-icon-setting"></i>
      <span slot="title">个人设置</span>
    </el-menu-item>
  </el-menu>
</template>
<script>
export default {
  name: 'AppAside',
  props: ['is-collapse'],
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
.menu {
  height: 100%;
    .logoAdmin {
      margin: 15px ;
      // margin-left: 15px ;
      width: 150px;
    }
    .iconfont {
        margin: 0 10px 0 5px;
    }
}
</style>
