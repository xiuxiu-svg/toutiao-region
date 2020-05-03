<template>
<div class="upload-Cover">

  <div class="upload-avatar" @click="dialogVisible = true">
    <i class="el-icon-plus iconPlus"></i>
  </div>
  <el-dialog
    title="封面显示"
    :visible.sync="dialogVisible"
    width="30%"
    :before-close="handleClose"
    append-to-body>
    <el-tabs v-model="activeName" @tab-click="handleClick">
      <el-tab-pane label="素材库" name="first">用户管理</el-tab-pane>
      <el-tab-pane label="上传图片" name="second">
        <input type="file" ref="uploadAction" @change="onFileChange">
        <img src="" width="100" ref="preview-img" >
      </el-tab-pane>
    </el-tabs>
    <span slot="footer" class="dialog-footer">
      <el-button @click="dialogVisible = false">取 消</el-button>
      <el-button type="primary" @click="uploadConfirm">确 定</el-button>
    </span>
  </el-dialog>

</div>
</template>

<script>
import { uploadImage } from '@/api/image'
export default {
  name: 'uploadCover',
  props: {},
  components: {},
  data () {
    return {
      dialogVisible: false,
      activeName: 'second'
    }
  },
  computed: {},
  watch: {},
  created () {},
  methods: {
    showUploadAvatar () {
    },
    handleClose (done) {
      this.$confirm('确认关闭？')
        .then(_ => {
          done()
        })
        .catch(_ => {})
    },
    handleClick (tab, event) {
      console.log(tab, event)
    },
    onFileChange () {
      const file = this.$refs.uploadAction.files[0]
      const blob = window.URL.createObjectURL(file)
      this.$refs['preview-img'].src = blob
      // console.log(file, blob)
    },
    uploadConfirm () {
      const file = this.$refs.uploadAction.files[0]
      // 如果是上传图片tabs，并且input有文件再执行上传操作
      if (this.activeName === 'second') {
        if (!file) {
          return this.$message('请选择文件')
        }
        const fd = new FormData()
        fd.append('image', file)
        uploadImage(fd).then(res => {
          this.dialogVisible = false
        })
      }
    }
  },
  mounted () {},
  beforeDestroy () {}
}
</script>

<style lang='less' scoped>
  .upload-avatar {
    width: 100px;
    height: 100px;
    background-color: #fff;
    border: 1px dashed #ccc;
    text-align: center;
    .iconPlus {
      font-size: 80px;
      color: #ccc;
      line-height: 100px;
    }
  }
</style>
