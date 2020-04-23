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
        <el-form ref="form" :model="form" label-width="80px">
          <!-- 状态 -->
          <el-form-item label="状态:">
            <el-radio-group v-model="form.resource">
              <el-radio label="全部"></el-radio>
              <el-radio label="草稿"></el-radio>
              <el-radio label="待审核"></el-radio>
              <el-radio label="审核通过"></el-radio>
              <el-radio label="审核失败"></el-radio>
              <el-radio label="已删除"></el-radio>
            </el-radio-group>
          </el-form-item>
          <!-- 频道 -->
          <el-form-item label="频道:">
            <el-select v-model="form.region" placeholder="请选择">
              <el-option label="开发者资讯" value="1"></el-option>
              <el-option label="ios" value="2"></el-option>
              <el-option label="c++" value="3"></el-option>
              <el-option label="Android" value="4"></el-option>
              <el-option label="css" value="5"></el-option>
              <el-option label="数据库" value="6"></el-option>
              <el-option label="区块链" value="7"></el-option>
            </el-select>
          </el-form-item>
          <!-- 日期 -->
          <el-form-item label="日期:">
            <el-date-picker
              v-model="form.date1"
              type="datetimerange"
              start-placeholder="开始日期"
              end-placeholder="结束日期"
              :default-time="['00:00:00', '23:59:59']">
            </el-date-picker>
          </el-form-item>
          <el-form-item>
            <el-button type="info">筛选</el-button>
          </el-form-item>
        </el-form>
    </div>
</el-card>
<!-- 查询结果 -->
<el-card class="box-card">
  <div slot="header" class="clearfix">
  <span>根据筛选条件共查询到 46147 条结果：</span>
  </div>
  <!-- 表格 -->
  <el-table
    :data="articles"
    stripe
    style="width: 100%">
      <el-table-column
        prop="date"
        label="封面"
        width="180">
      </el-table-column>
      <el-table-column
        prop="title"
        label="标题"
        width="180">
      </el-table-column>
      <el-table-column

        label="状态">
        <template slot-scope="scope">
          <el-tag v-if="scope.row.status === 0">草稿</el-tag>
          <el-tag v-else-if="scope.row.status === 2" type="success">审核通过</el-tag>
          <el-tag v-else-if="scope.row.status === 1" type="info">待审核</el-tag>
          <el-tag v-else-if="scope.row.status === 3" type="warning">审核失败</el-tag>
          <el-tag v-else-if="scope.row.status === 4" type="danger">已删除</el-tag>
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
  <el-pagination
  background
  layout="prev, pager, next"
  :total="1000">
  </el-pagination>
</el-card>
</div>
</template>
<script>
import { getArticles } from '@/api/article'

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
        resource: '',
        desc: ''
      },
      articles: []
    }
  },

  computed: {},
  watch: {},
  methods: {
    onSubmit () {
      console.log('submit!')
    },
    loadArticles () {
      getArticles().then(res => {
        console.log(res)
        this.articles = res.data.data.results
      })
    }
  },
  created () {
    // 请求所有图书
    this.loadArticles()
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
</style>
