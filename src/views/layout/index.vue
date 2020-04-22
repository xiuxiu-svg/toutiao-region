<template>
  <el-container
  class="container"
  >
    <el-aside width="200px"
    class="aside"
    >
    <app-aside></app-aside>
    </el-aside>
    <el-container>
      <el-header
      class="header"
      >
      <app-header></app-header>
      </el-header>
      <el-main>
        <router-view />
      </el-main>
    </el-container>
  </el-container>
</template>
<script>
import AppAside from './components/aside'
import AppHeader from './components/header'
export default {
  name: '',
  props: {},
  components: {
    AppAside,
    AppHeader
  },
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
aside.el-aside.aside {
  border: 1px solid yellow;
}
header.el-header.header {
  border: 1px solid azure;
}
.el-main {
  background-color: yellowgreen
}
section.el-container.container {
    height: 600px;
}
</style>
