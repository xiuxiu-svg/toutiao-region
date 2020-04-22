<template>
<div class="user">
  <div>
    <i class="el-icon-s-fold"></i>
    <!-- <i class="el-icon-s-unfold"></i> -->
    <span>黑马传智播客</span>
  </div>
  <el-dropdown>
    <div class="avatar-wrap">
      <img :src="user.photo" alt="" class="avatar">
      <span>{{user.name}}</span>
      <i class="el-icon-arrow-down el-icon--right"></i>
    </div>
    <el-dropdown-menu slot="dropdown">
      <el-dropdown-item>设置</el-dropdown-item>
      <el-dropdown-item>退出</el-dropdown-item>
    </el-dropdown-menu>
</el-dropdown>
</div>
</template>
<script>
import { getUserProfile } from '@/api/user'
export default {
  name: 'AppHeader',
  props: {},
  components: {},
  data () {
    return {
      user: {}
    }
  },
  computed: {},
  watch: {},
  methods: {
    loadUserProfile () {
      getUserProfile().then(res => {
        console.log(res)
        this.user = res.data.data
      })
    }
  },
  created () {
    this.loadUserProfile()
  },
  mounted () {},
  beforeDestroy () {}
}
</script>
<style lang='less' scoped>
.user {
    display: flex;
    justify-content: space-between;
    align-items: center;
}
.el-dropdown-link {
  cursor: pointer;
  color: #409EFF;
}
.el-icon-arrow-down {
  font-size: 12px;
}
.avatar-wrap {
    display: flex;
    align-items: center;
    .avatar {
        width: 40px;
        height: 40px;
        border-radius: 50%;
        margin: 0 5px;
    }
}
</style>
