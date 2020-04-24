<template>
<div class="article-container">
<!-- 查询条件 -->
<el-card class="box-card">
    <div slot="header" class="clearfix">
      <!-- 面包屑路径 -->
      <el-breadcrumb separator-class="el-icon-arrow-right">
        <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item>内容管理</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <div>
        <el-form ref="form" :model="form" label-width="80px" size="small">
          <!-- 状态 -->
          <el-form-item label="状态 :">
            <el-radio-group v-model="form.resource">
              <el-radio :label="null">全部</el-radio>
              <el-radio :label="0">草稿</el-radio>
              <el-radio :label="1">待审核</el-radio>
              <el-radio :label="2">审核通过</el-radio>
              <el-radio :label="3">审核失败</el-radio>
              <el-radio :label="4">已删除</el-radio>
            </el-radio-group>
          </el-form-item>
          <!-- 频道 -->
          <el-form-item label="频道 :">
            <el-select v-model="channelId" placeholder="请选择">
              <el-option
              label="全部"
              :value="null"
              ></el-option>
              <el-option
                :label="channel.name"
                :value="channel.id"
                v-for="(channel, index) in channels"
                :key="index"
                ></el-option>
            </el-select>
          </el-form-item>
          <!-- 日期 -->
          <el-form-item label="日期 :">
            <el-date-picker
              v-model="form.date1"
              type="datetimerange"
              start-placeholder="开始日期"
              end-placeholder="结束日期"
              :default-time="['00:00:00', '23:59:59']"
              format="yyyy-MM-dd">
            </el-date-picker>
          </el-form-item>
          <el-form-item>
            <el-button type="info" @click="loadArticles(1)">筛选</el-button>
          </el-form-item>
        </el-form>
    </div>
</el-card>
<!-- 查询结果 -->
<el-card class="box-card">
  <div slot="header" class="clearfix">
  <span>根据筛选条件共查询到 <span>{{ totalCount }}</span> 条结果：</span>
  </div>
  <!-- 表格 -->
  <el-table
    :data="articles"
    stripe
    style="width: 100%">
      <el-table-column
        prop=""
        label="封面"
        width="180">
        <template slot-scope="scope">
          <!-- 后台返回了图片就显示第一张 没有显示暂无图片 -->
          <!-- <img v-if="scope.row.cover.images[0]" class="coverImage" :src="scope.row.cover.images[0]" alt="">
          <img v-else class="coverImage" src="./error.3f7b1f94.gif" alt=""> -->

          <!-- 使用express图片组件 懒加载，占位功能 -->
            <el-image
              style="width: 100px; height: 100px"
              :src="scope.row.cover.images[0]"
              :fit="fits[2]"
              lazy>
              <div slot="placeholder" class="image-slot">
                加载中<span class="dot">...</span>
              </div>
              </el-image>
        </template>
      </el-table-column>
      <el-table-column
        prop="title"
        label="标题"
        width="180">
      </el-table-column>
      <el-table-column
        label="状态">
        <!-- 自定义列状态 -->
        <template slot-scope="scope">
          <!-- 在data中声明type、文本  -->
          <el-tag :type="articleStatus[scope.row.status].type">{{ articleStatus[scope.row.status].text }}</el-tag>
          <!-- <el-tag v-else-if="scope.row.status === 2" type="success">审核通过</el-tag>
          <el-tag v-else-if="scope.row.status === 1" type="info">待审核</el-tag>
          <el-tag v-else-if="scope.row.status === 3" type="warning">审核失败</el-tag>
          <el-tag v-else-if="scope.row.status === 4" type="danger">已删除</el-tag> -->
        </template>
      </el-table-column>
      <el-table-column
        prop="pubdate"
        label="发布时间"
        width="180">
      </el-table-column>
      <el-table-column
        prop="name"
        label="操作"
        width="180">
        <el-button type="primary" icon="el-icon-edit" circle></el-button>
        <el-button type="danger" icon="el-icon-delete" circle></el-button>
      </el-table-column>
  </el-table>
  <!-- 分页 -->
  <el-pagination
    background
    layout="prev, pager, next"
    @current-change="onPageChange"
    :page-size="perPage"
    :current-page="page"
    :total="totalCount">
  </el-pagination>
</el-card>
</div>
</template>
<script>
import {
  getArticles,
  getArticleChannel
} from '@/api/article'

export default {
  name: 'ArticleIndex',
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
        resource: null,
        desc: ''
      },
      articles: [],
      articleStatus: [
        { status: 0, text: '草稿', type: 'info' },
        { status: 1, text: '待审核', type: '' },
        { status: 2, text: '审核通过', type: 'success' },
        { status: 3, text: '审核失败', type: 'warning' },
        { status: 4, text: '已删除', type: 'danger' }
      ],
      fits: ['fill', 'contain', 'cover', 'none', 'scale-down'],
      url: '',
      perPage: 15,
      totalCount: 0,
      page: 1, // 声明页码
      channels: [],
      channelId: null
    }
  },
  computed: {},
  watch: {},
  methods: {
    onSubmit () {
      console.log('submit!')
    },
    // 加载页面时不传page 默认page=1
    loadArticles (page = 1) {
      getArticles({
        // page（形参）： page（用户传入的页码）
        page,
        per_page: this.perPage,
        status: this.form.resource,
        channel_id: this.channelId
      }).then(res => {
        console.log(res)
        // 解构res.data.data=[page: 1, per_page: 10, results: [], total_count: 118684 ...]
        const { results, total_count: totalCount } = res.data.data
        this.articles = results
        this.totalCount = totalCount
      })
    },
    onPageChange (page) {
      this.loadArticles(page)
    },
    loadChannel () {
      getArticleChannel()
        .then(res => {
          console.log(res)
          this.channels = res.data.data.channels
        })
    }
  },
  created () {
    // 请求所有图书
    this.loadArticles(1)
    this.loadChannel()
  },
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
.coverImage {
  width: 100px;
  background-size: cover;
}
</style>
