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
<!-- 图片裁切 -->
<el-dialog
  title="提示"
  :visible.sync="dialogVisible"
  width="30%"
  :before-close="handleClose"
  append-to-body
  @opened="onUserphotoOpen"
>
  <!-- Wrap the image or canvas element with a block element (container) -->
  <div class="cropper-image-wrap">
    <img :src="preViewImage" class="cropper-image" ref="preview-image">
  </div>
  <span slot="footer" class="dialog-footer">
    <el-button @click="dialogVisible = false">取 消</el-button>
    <el-button type="primary" @click="onUpdataPhoto">确 定</el-button>
  </span>
</el-dialog>
</div>
</template>

<script>
import { getUserProfile, changeUserAvatar } from '@/api/user'
import 'cropperjs/dist/cropper.css'
import Cropper from 'cropperjs'
export default {
  name: 'accountIndex',
  props: {},
  components: {},
  data () {
    return {
      user: {
        id: '',
        name: '',
        intro: '',
        photo: '',
        email: '',
        mobile: ''
      },
      preViewImage: '',
      dialogVisible: false,
      cropper: ''
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
      console.log(blobData) // 图片链接
      this.preViewImage = blobData
      this.$refs.file.value = ''
      this.dialogVisible = true
    },
    handleClose (done) {
      this.$confirm('确认关闭？')
        .then(_ => {
          done()
        })
        .catch(_ => {})
    },
    onUserphotoOpen () {
      // 获取图片dom节点
      const image = this.$refs['preview-image']
      console.log(image)
      if (this.cropper) {
        // 解决copper选择同一张图片不会更新图片的问题
        this.cropper.replace(this.preViewImage)
        return
      }
      this.cropper = new Cropper(image, {
        aspectRatio: 1,
        dragMode: 'none'
      })
    },
    onUpdataPhoto () {
      this.cropper.getCroppedCanvas().toBlob((file) => {
        const formData = new FormData()
        // Pass the image file name as the third parameter if necessary.
        // photo是接口参数名
        formData.append('photo', file)
        // changeUserAvatar是接口参数
        changeUserAvatar(formData).then(res => {
          console.log(res)
          this.dialogVisible = false
          this.onLoadUser()
        })
      })
    }
  },
  mounted () {},
  beforeDestroy () {}
}
</script>

<style lang='less' scoped>
.cropper-image {
  display: block;

  /* This rule is very important, please don't ignore this */
  max-width: 100%;
}
</style>
