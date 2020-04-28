<template>
<div class="commentIndex">
<el-card class="box-card">
  <div slot="header" class="clearfix">
    <!-- 面包屑路径 -->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>评论管理</el-breadcrumb-item>
    </el-breadcrumb>
  </div>

<!-- 内容主题 -->
  <el-table
    :data="articles"
    style="width: 100%">
    <el-table-column
      prop="title"
      label="标题"
    >
    </el-table-column>
    <el-table-column
      prop="total_comment_count"
      label="评论数"
    >
    </el-table-column>
    <el-table-column
      prop="fans_comment_count"
      label="粉丝评论数">
    </el-table-column>
    <el-table-column
      prop="comment_status"
      label="状态">
      <template slot-scope="scope">
        <span>{{ scope.row.comment_status? '开放': '关闭'}}</span>
      </template>
    </el-table-column>
    <el-table-column
      prop=""
      label="操作">
      <!-- scopr.row 是每一个条目 -->
      <template slot-scope="scope">
        <el-switch
          :disabled="scope.row.disabledStatus"
          v-model="scope.row.comment_status"
          active-color="#13ce66"
          inactive-color="#ff4949"
          @change="changeCmmentStatus(scope.row)">
        </el-switch>
      </template>
    </el-table-column>
    </el-table>
  <!-- 分页 -->
  <div class="block">
    <!-- 完整功能 -->
    <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="page"
      :page-sizes="[10,100, 200, 300, 400]"
      :page-size="perPage"
      layout="total, sizes, prev, pager, next, jumper"
      :total="totalCount">
    </el-pagination>
  </div>
</el-card>

</div>
</template>

<script>
import {
  getComments,
  changeStatus
} from '@/api/article'
export default {
  name: 'commentIndex',
  props: {},
  components: {},
  data () {
    return {
      articles: [
        { comment_status: '' },
        { fans_comment_count: '' },
        { title: '' },
        { total_comment_count: '' }
      ],
      perPage: 10,
      page: 1,
      totalCount: 0
    }
  },
  computed: {},
  watch: {},
  created () {
    this.loadComments(1)
  },
  methods: {
    loadComments (page = 1) {
      this.page = page
      getComments({
        response_type: 'comment',
        page,
        per_page: this.perPage
      }).then(res => {
        // console.log(res)
        const { total_count: totalCount, results, per_page: perPage } = res.data.data
        // 给每篇文章添加自定义属性
        results.forEach(article => {
          article.disabledStatus = false
        })
        this.totalCount = totalCount
        this.articles = results
        this.perPage = perPage
      })
    },
    changeCmmentStatus (article) {
      // 禁用switch
      article.disabledStatus = true
      // article.id 是一个bigNumber对象
      const articleId = article.id.toString()
      changeStatus(articleId, article.comment_status).then(res => {
        // 恢复switch功能
        article.disabledStatus = false
        this.$message({
          type: 'success',
          message: '修改评论状态成功'
        })
      })
    },
    handleCurrentChange (page) {
      // console.log(page)
      this.loadComments(page)
    },
    handleSizeChange (perPage) {
      // console.log(perPage)
      this.loadComments(perPage)
    }
  },
  mounted () {},
  beforeDestroy () {}
}
</script>

<style lang='less' scoped>

</style>
