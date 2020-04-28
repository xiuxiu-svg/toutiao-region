<template>
<div class="account-container">
<el-card class="box-card">
  <div slot="header" class="clearfix">
    <!-- 面包屑路径导航 -->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>个人设置</el-breadcrumb-item>
    </el-breadcrumb>
  </div>
    <div class="setting" >

    <el-row :gutter="50">
      <el-col :span="15">
        <el-form ref="user" :model="user" label-width="80px">
          <el-form-item label="编号 :">
            {{ user.id }}
          </el-form-item>
          <el-form-item label="手机 :">
            {{ user.mobile }}
          </el-form-item>
          <el-form-item label="媒体名称 :">
            <el-input v-model="user.name"></el-input>
          </el-form-item>
          <el-form-item label="媒体介绍 :">
            <el-input type="textarea" v-model="user.intro"></el-input>
          </el-form-item>
          <el-form-item label="邮箱 :">
            <el-input v-model="user.email"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="onSubmit">保存设置</el-button>
          </el-form-item>
        </el-form>
      </el-col>

      <el-col :span="6">
        <label for="file">
          <el-avatar shape="square" :size="100" fit="cover" :src="user.photo"></el-avatar>
        </label>
        <p>修改头像</p>
        <!-- html5 新提供的方法 -->
        <input type="file" id="file" ref="file" hidden @change="onAvatarChange">
      </el-col>
    </el-row>

    </div>
</el-card>
</div>
</template>

<script>
import { getUserProfile, changeUserAvatar } from '@/api/user'
export default {
  name: 'accountIndex',
  props: {},
  components: {},
  data () {
    return {
      form: {
        name: '',
        region: '',
        date1: '',
        date2: '',
        delivery: false,
        type: [],
        resource: '',
        desc: ''
      },
      user: {
        id: '',
        name: '',
        intro: '',
        photo: '',
        email: '',
        mobile: ''
      },
      preViewImage: ''
    }
  },
  computed: {},
  watch: {},
  created () {
    this.onLoadUser()
  },
  methods: {
    onSubmit () {
      console.log('submit!')
    },
    onLoadUser () {
      getUserProfile().then(res => {
        console.log(res)
        this.user = res.data.data
      })
    },
    onAvatarChange () {
      const file = this.$refs.file
      // console.log(file)// <input type="file" id="file" ref="file" hidden @change="onAvatarChange">
      const blobData = window.URL.createObjectURL(file.files[0])
      console.log(blobData)
      this.preViewImage = blobData
      this.$refs.file.value = ''
      changeUserAvatar(blobData).then(res => {
        console.log(res)
      })
    }
  },
  mounted () {},
  beforeDestroy () {}
}
</script>

<style lang='less' scoped>
</style>
