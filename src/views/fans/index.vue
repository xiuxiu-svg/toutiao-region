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
      <!-- tabs -->
      <!-- 粉丝列表 -->
      <el-tabs v-model="activeName" type="card" @tab-click="handleClick">
        <el-tab-pane label="粉丝列表" name="first">
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
        </el-tab-pane>
        <el-tab-pane label="粉丝画像" name="second">
          <!-- 为ECharts准备一个具备大小（宽高）的Dom -->
          <div id="main" style="width: 600px;height:400px;" ref="fansProfilePhoto"></div>
        </el-tab-pane>
      </el-tabs>
    </el-card>
  </div>
</template>

<script>
import echarts from 'echarts'
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
      fans: [],
      activeName: 'first'
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
  mounted () {
    // 基于准备好的dom，初始化echarts实例
    // 初始化操作dom一定要写在mounted中
    var myChart = echarts.init(document.getElementById('main'))
    var option = {
      title: {
        text: 'ECharts 入门示例'
      },
      tooltip: {},
      legend: {
        data: ['销量']
      },
      xAxis: {
        data: ['衬衫', '羊毛衫', '雪纺衫', '裤子', '高跟鞋', '袜子']
      },
      yAxis: {},
      series: [{
        name: '销量',
        type: 'bar',
        data: [5, 20, 36, 10, 10, 20]
      }]
    }
    // 使用刚指定的配置项和数据显示图表。
    myChart.setOption(option)
  },
  beforeDestroy () {}
}
</script>'
