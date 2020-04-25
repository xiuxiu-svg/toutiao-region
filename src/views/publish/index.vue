<template>
<div class="publish-container">
<el-card class="box-card">
    <div slot="header" class="clearfix">
      <!-- 面包屑路径导航 -->
      <el-breadcrumb separator-class="el-icon-arrow-right">
        <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item>发布文章</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <div>
        <el-form ref="form"
          :model="form"
          label-width="80px"
          size="small"
          >
          <!-- 标题 -->
          <el-form-item label="标题">
            <el-input v-model="form.name"></el-input>
          </el-form-item>
          <!-- 内容 -->
          <el-form-item label="内容">
            <el-input type="textarea" v-model="form.desc"></el-input>
          </el-form-item>
          <!-- 封面 -->
          <el-form-item label="封面 :">
            <el-radio-group v-model="form.resource">
              <el-radio :label="null">单图</el-radio>
              <el-radio :label="0">三图</el-radio>
              <el-radio :label="1">无图</el-radio>
              <el-radio :label="2">自动</el-radio>
            </el-radio-group>
          </el-form-item>
          <!-- 选择频道 -->
          <el-form-item label="频道 :">
            <el-select v-model="channelId" placeholder="请选择">
              <el-option
                :label="channel.name"
                :value="channel.id"
                v-for="(channel, index) in channels"
                :key="index"
                ></el-option>
            </el-select>
          </el-form-item>
          <!-- 按钮 -->
          <el-form-item>
            <el-button type="info"
              @click="loadArticles(1)"
              :disabled="loading">发表
            </el-button>
            <el-button type="info"
              @click="loadArticles(1)"
              :disabled="loading">存为草稿
            </el-button>
          </el-form-item>
        </el-form>
    </div>
</el-card>
</div>
</template>

<script>
export default {
  name: 'publishIndex',
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
      }
    }
  },
  computed: {},
  watch: {},
  created () {},
  methods: {
    onSubmit () {
      console.log('submit!')
    }
  },
  mounted () {},
  beforeDestroy () {}
}
</script>

<style lang='less' scoped>

</style>
