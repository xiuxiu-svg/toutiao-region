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
        <el-form
          :model="articles"
          :rules="rules"
          label-width="80px"
          size="small"
          ref="publish-form"
          >
          <!-- 标题 -->
          <el-form-item
          label="标题"
          prop="title"
          >
            <el-input
              v-model="articles.title"
            ></el-input>
          </el-form-item>
          <el-form-item
            label="内容"
            prop="content"
          >
            <el-tiptap
              v-model="articles.content"
              :extensions="extensions"
              placeholder="内容区"
              :width="700"
              :height="400"
            />
            <!-- <el-input type="textarea" v-model="articles.content"></el-input> -->
          </el-form-item>
          <!-- 封面 -->
          <el-form-item label="封面 :">
            <el-radio-group v-model="articles.cover.type">
              <el-radio :label="1">单图</el-radio>
              <el-radio :label="3">三图</el-radio>
              <el-radio :label="0">无图</el-radio>
              <el-radio :label="-1">自动</el-radio>
            </el-radio-group>
            <!-- 使用引入的封面插件 -->
            <template v-if="articles.cover.type > 0">
              <upload-cover
              v-for="cover in articles.cover.type"
              :key="cover"
              />
            </template>
          </el-form-item>
          <!-- 选择频道 -->
          <el-form-item label="频道 :" prop="channel_id">
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
import uploadCover from './components/upload-cover'
import { uploadImage } from '@/api/image.js'
// import { ElementTiptap } from 'element-tiptap'
import {
  // necessary extensions
  Doc,
  Text,
  Paragraph,
  Heading,
  Bold,
  Underline,
  Italic,
  Strike,
  ListItem,
  BulletList,
  OrderedList,
  ElementTiptap,
  Image,
  CodeBlock,
  Blockquote,
  TodoItem,
  TodoList,
  HardBreak,
  FormatClear
} from 'element-tiptap'
// import element-tiptap styles
import 'element-tiptap/lib/index.css'
export default {
  name: 'publishIndex',
  props: {},
  components: {
    'el-tiptap': ElementTiptap,
    uploadCover
  },
  data () {
    return {
      articles: {
        title: '表单验证1',
        content: '',
        cover: {
          type: 1,
          images: []
        },
        channel_id: ''
      },
      channels: [],
      // draft: false,
      extensions: [
        new Doc(),
        new Text(),
        new Paragraph(),
        new Heading({ level: 5 }),
        new Bold({ bubble: true }), // render command-button in bubble menu.
        new Image({
          // 图片的上传方法，返回一个 Promise<url>
          uploadRequest (file) {
            console.log(file)
            const fd = new FormData()
            fd.append('image', file)
            return uploadImage(fd).then(res => {
              console.log(res)
              return res.data.data.url
            })
          }
        }),
        new Underline(),
        new Italic(),
        new Strike(),
        new ListItem(),
        new BulletList(),
        new OrderedList(),
        new CodeBlock(),
        new Blockquote(),
        new TodoItem(),
        new TodoList(),
        new HardBreak(),
        new FormatClear()
      ],
      rules: {
        title: [
          { required: true, message: '请输入标题名称', trigger: 'blur' },
          { min: 5, message: '最少输入5个字符', trigger: 'blur' }
        ],
        content: [
          {
            validator (rule, value, callback) {
              // console.log('con/tent validator')
              if (value === '<p></p>') {
                callback(new Error('内容不能为空'))
              } else {
                callback()
              }
            }
          },
          { required: true, message: '请输入文章内容', trigger: 'blur' }
        ],
        channel_id: [
          { required: true, message: '请选择文章频道' }
        ]
      }
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
      // 发请求前先校验内容
      this.$refs['publish-form'].validate(valid => {
        if (!valid) {
          return
        }
        // valid为true再进行下一步操作
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
      })
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
          // console.log(res)
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
