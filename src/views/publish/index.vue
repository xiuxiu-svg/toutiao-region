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
          :model="articles"
          label-width="80px"
          size="small"
          >
          <!-- 标题 -->
          <el-form-item label="标题">
            <el-input v-model="articles.title"></el-input>
          </el-form-item>
          <!-- 内容 -->
          <el-form-item label="内容">
            <el-input type="textarea" v-model="articles.content"></el-input>
          </el-form-item>
          <!-- 封面 -->
          <el-form-item label="封面 :">
            <el-radio-group v-model="articles.cover.type">
              <el-radio :label="1">单图</el-radio>
              <el-radio :label="3">三图</el-radio>
              <el-radio :label="0">无图</el-radio>
              <el-radio :label="-1">自动</el-radio>
            </el-radio-group>
          </el-form-item>
          <!-- 选择频道 -->
          <el-form-item label="频道 :">
            <el-select v-model="articles.channel_id" placeholder="请选择">
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
              @click="onSubmit(false)"
              >发表
            </el-button>
            <el-button type="info"
              @click="onSubmit(true)"
              >存为草稿
            </el-button>
          </el-form-item>
        </el-form>
    </div>
</el-card>
</div>
</template>

<script>
import {
  getArticleChannel,
  addArticle,
  getArticle,
  updateArticle
} from '@/api/article'

export default {
  name: 'publishIndex',
  props: {},
  components: {},
  data () {
    return {
      articles: {
        title: '',
        content: '',
        cover: {
          type: 0,
          images: []
        },
        channel_id: ''
      },
      channels: []
      // draft: false,
    }
  },
  computed: {},
  watch: {},
  created () {
    // 组件创建后加载频道
    this.loadChannel()
    // 根据URL中是否带id区分发布跟编辑文章
    if (this.$route.query.id) {
      this.loadArticle()
    }
  },
  methods: {
    // 发布文章或存为草稿
    onSubmit (draft = false) {
      const articleId = this.$route.query.id
      // URL有articleId就是修改文章
      if (articleId) {
        updateArticle(articleId, this.articles, draft)
          .then(res => {
            // console.log(res)
            this.$router.push('/article')
            this.$message({
              type: 'succeess',
              message: '操作成功'
            })
          })
      } else {
        addArticle(this.articles, draft)
          .then(res => {
            // console.log(res)
            this.$router.push('/article')
            this.$message({
              type: 'succeess',
              message: '操作成功'
            })
          })
      }
    },
    // 请求频道
    loadChannel () {
      getArticleChannel()
        .then(res => {
          // console.log(res)
          this.channels = res.data.data.channels
        })
    },
    // 加载指定文章
    loadArticle () {
      const articleId = this.$route.query.id
      getArticle(articleId)
        .then(res => {
          console.log(res)
          this.articles = res.data.data
        })
    }
  },
  mounted () {},
  beforeDestroy () {}
}
</script>

<style lang='less' scoped>

</style>
