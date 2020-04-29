<template>
  <div class="fans-container">
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <!-- 面包屑路径 -->
        <el-breadcrumb separator-class="el-icon-arrow-right">
          <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
          <el-breadcrumb-item>评论管理</el-breadcrumb-item>
        </el-breadcrumb>
      </div>
      <!-- 粉丝列表/粉丝画像 -->
      <el-row>
        <el-button plain @click="onFansListManage">粉丝列表</el-button>
        <el-button plain>粉丝画像</el-button>
      </el-row>
      <el-row :gutter="10">
        <el-col
        class="fansItem"
        v-for="(fan, index) in fans"
        :key="index"
        :sm="6"
        :md="6"
        :lg="4"
        >
        <div class="bg-purple">
          <el-image
            style="height: 100px"
            :src="fan.photo"
            fit="cover"
          ></el-image>
          <p class="name">{{fan.name}}</p>
        </div>
        </el-col>
      </el-row>
      <el-pagination
        layout="prev, pager, next"
        :total="total_count"
        :page-size="per_page"
        :current-page.sync="page"
        @current-change="pageChange"
        >
      </el-pagination>
    </el-card>
  </div>
</template>

<script>
import { fansList } from '@/api/fans.js'
export default {
  name: 'fansIndex',
  props: {},
  components: {},
  data () {
    return {
      page: 2,
      per_page: 20,
      total_count: 261,
      fans: []
    }
  },
  computed: {},
  watch: {},
  created () {
    this.onFansListManage(this.page)
  },
  methods: {
    onFansListManage (page) {
      // const page = this.page
      fansList({
        page,
        per_page: this.per_page
      }).then(res => {
        console.log(res)
        const { page, per_page: perPage, total_count: totalCount, results } = res.data.data

        this.total_count = totalCount
        this.fans = results
      })
    },
    pageChange (page) {
      this.onFansListManage(page)
    }
  },
  mounted () {},
  beforeDestroy () {}
}
</script>

<style lang='less' scoped>
.fansItem {
  margin-top: 20px;

}
.name {
  position:absolute;
  bottom: 1px;
  text-align: center;
}

.bg-purple {
  height: 140px;
  position: relative;
  background: #d3dce6;
  text-align: center;
}
</style>
