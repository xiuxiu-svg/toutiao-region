<template>
<div class="image-container">
  <el-card class="box-card">
    <div slot="header" class="clearfix">
      <!-- 面包屑路径导航 -->
      <el-breadcrumb separator-class="el-icon-arrow-right">
        <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item>素材管理</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <div class="btn">
      <!-- 全部--收藏 -->
        <el-radio-group v-model="collect" size="small" @change="loadImages(1)">
          <el-radio-button :label="false">全部</el-radio-button>
          <el-radio-button :label="true">收藏</el-radio-button>
        </el-radio-group>
      <!-- 添加素材按钮 -->
      <el-row>
        <el-button type="success" size="small" @click="dialogVisible = true">添加素材</el-button>
      </el-row>
    </div>
    <!-- 响应式布局内容主体 -->
    <el-row :gutter="10">
      <el-col
        :xs="12"
        :sm="8"
        :md="6"
        :lg="4"
        v-for="(image, index) in results"
        :key="index"
        class="img-items">
          <el-image
            style="height: 100px"
            :src="image.url"
            fit="cover"
          ></el-image>
          <!-- 图片收藏/取消收藏/删除 -->
          <div class="img-action">
            <el-button
            type="warning"
            :icon="image.is_collected?'el-icon-star-on':'el-icon-star-off'"
            :loading="image.loading"
            circle
            size="mini"
            @click="onCollectImage(image)"
            ></el-button>
            <el-button @click="onDelImage(image)" type="danger" icon="el-icon-delete" circle size="mini"></el-button>
          </div>
      </el-col>
    </el-row>
    <!-- 分页 -->
    <el-pagination
      background
      layout="prev, pager, next"
      :page-size="perPage"
      :current-page.sync="page"
      :total="totalCount"
      @current-change="onPageChange"
      >
    </el-pagination>
  </el-card>
  <!-- dialog弹出层 -->
    <el-dialog
      title="提示"
      :visible.sync="dialogVisible"
      width="30%"
      :append-to-body="true"
      >
      <el-upload
        class="upload-demo"
        :show-file-list="false"
        drag
        action="http://ttapi.research.itcast.cn/mp/v1_0/user/images"
        :headers="headers"
        :on-success="onUploadSuccess"
        name="image"
        multiple>
        <i class="el-icon-upload"></i>
        <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
        <div class="el-upload__tip" slot="tip">只能上传jpg/png文件，且不超过500kb</div>
      </el-upload>
    </el-dialog>
</div>
</template>

<script>
import {
  getImages,
  collectImage,
  delImage
} from '@/api/image.js'
export default {
  name: 'imageIndex',
  props: {},
  components: {},
  data () {
    const user = JSON.parse(window.localStorage.getItem('user'))
    return {
      dialogVisible: false,
      dialogImageUrl: '',
      collect: false,
      results: [],
      page: 1,
      perPage: 5,
      totalCount: 0,
      headers: {
        Authorization: `Bearer ${user.token}`
      }
    }
  },
  computed: {},
  watch: {},
  created () {
    this.loadImages(1)
  },
  methods: {
    loadImages (page = 1) {
      this.page = page // 如果形参有默认值，要放到最后
      getImages({
        collect: this.collect,
        page,
        per_page: this.perPage
      }).then(res => {
        // console.log(res)
        const { results, total_count: totalCount } = res.data.data
        // 遍历results 给每张图片素材添加自定义属性loading
        // 先遍历再传递
        results.forEach(image => {
          image.loading = false
        })
        this.results = results
        this.totalCount = totalCount
      })
    },
    // 当页码改变时实现全部数据分页
    onPageChange (page) {
      this.loadImages(page)
    },
    onUploadSuccess () {
      // console.log(1)
      this.dialogVisible = false
      this.loadImages()
    },
    onCollectImage (image) {
      image.loading = true
      collectImage(image.id, !image.is_collected).then(res => {
        // 点击收藏后改变css样式
        image.is_collected = !image.is_collected
        image.loading = false
      })
    },
    onDelImage (image) {
      delImage(image.id).then(res => {
        image.loading = true
        this.loadImages()
      })
    }
  },
  mounted () {},
  beforeDestroy () {}
}
</script>

<style lang='less' scoped>
.clearfix {
  margin-bottom: 10px;
}
.btn {
  display: flex;
  justify-content: space-between;
  margin-bottom: 20px;
}
.img-action {
  width: 100%;
  height: 35px;
  position: absolute;
  padding-bottom: 5px;
  bottom: 0;
  display: flex;
  justify-content: space-around;
  align-items: center;
  background: rgba(253, 251, 251, 0.5)
}
.img-items {
  position: relative;
}
</style>
