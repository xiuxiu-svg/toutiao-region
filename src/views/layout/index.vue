<template>
  <el-container
  class="container">
    <el-aside
      width="auto">
      <app-aside
      :is-collapse="isCollapse"
      />
    </el-aside>
    <el-container>
      <el-header
      class="header">
        <div class="user">
          <div>
            <i
              :class="{
                'el-icon-s-fold': isCollapse,
                'el-icon-s-unfold': !isCollapse
              }"
              @click="isCollapse = !isCollapse"
            ></i>
            <span class="heima">黑马传智播客</span>
          </div>
          <el-dropdown>
            <div class="avatar-wrap">
              <img :src="user.photo" class="avatar">
              <span>{{user.name}}</span>
              <i class="el-icon-arrow-down el-icon--right"></i>
            </div>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item>设置</el-dropdown-item>
              <el-dropdown-item @click.native="onLogout()">退出</el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
        </div>
      </el-header>
      <el-main>
        <router-view />
      </el-main>
    </el-container>
  </el-container>
</template>
<script>
import AppAside from './components/aside'
import { getUserProfile } from '@/api/user'
import globalBus from '@/utils/global-bus'
export default {
  name: 'layoutIndex',
  props: {},
  components: {
    AppAside
  },
  data () {
    return {
      user: {
        photo: '',
        name: ''
      },
      isCollapse: false
    }
  },
  computed: {},
  watch: {},
  methods: {
    loadUserProfile () {
      getUserProfile().then(res => {
        // console.log(res)
        this.user = res.data.data
      })
    },
    onLogout () {
      this.$confirm('你舍得走吗?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '再陪你一会儿',
        type: 'warning'
      }).then(() => {
        this.$router.push('/login')
        window.localStorage.removeItem('user')
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '你选择了留下'
        })
      })
    }
  },
  created () {
    this.loadUserProfile()
    globalBus.$on('user-setting', (data) => {
      this.user.name = data.name
      console.log(data.photo, 1)
      this.user.photo = data.photo
    })
  },
  mounted () {},
  beforeDestroy () {}
}
</script>
<style lang='less' scoped>
.header {
  background-color: rgb(134, 123, 129);
}
.el-main {
  background-color: rgb(240, 243, 235)
}
.container {
  position: fixed;
  right: 0;
  left: 0;
  bottom: 0;
  top: 0;
}
.user {
  display: flex;
  justify-content: space-between;
  align-items: center;
  .heima {
    margin-left: 10px;
  }
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
  color: #fff;
  .avatar {
    width: 40px;
    height: 40px;
    border-radius: 50%;
    margin: 0 5px;
  }
}
</style>
