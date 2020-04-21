<template>
  <div class="login-container">
      <el-form ref="form" :model="user" class="login-form">
  <el-form-item>
    <el-input v-model="user.mobile" placeholder="请输入手机号"></el-input>
  </el-form-item>
  <el-form-item>
    <el-input v-model="user.code" placeholder="请输入密码"></el-input>
  </el-form-item>
  <el-form-item>
    <el-checkbox v-model="checked">我已阅读并同意用户协议和隐私条款</el-checkbox>
  </el-form-item>
  <el-form-item>
    <el-button type="primary" @click="onlogin" style="width: 100%" :loading="loginLoding">登录</el-button>
  </el-form-item>
</el-form>
  </div>
</template>

<script>
// 加载axios
import request from '@/utils/request'
export default {
  name: 'LoginIndex',
  components: {},
  props: {},
  data () {
    return {
      user: {
        mobile: '',
        code: ''
      },
      checked: false,
      loginLoding: false
    }
  },
  computed: {},
  watch: {},
  created () {},
  mounted () {},
  methods: {
    onlogin () {
      // 获取表单数据（根据接口要求绑定数据）
      const user = this.user
      this.loginLoding = true
      // 表单验证

      // 验证通过，提交登录
      request({
        method: 'POST',
        url: '/mp/v1_0/authorizations',
        // data 用来设置 POST 请求体
        data: user
      }).then(res => {
        console.log(res)

        // 登录成功
        this.$message({
          message: '登录成功',
          type: 'success'
        })
        this.loginLoding = true
      }).catch(err => { // 登录失败
        console.log('登录失败', err)
        this.$message.error('登录失败，手机号或验证码错误')
      })
      this.loginLoding = true
    }
  }
}
</script>

<style lang="less" scoped>
  .login-container {
      position: fixed;
      left: 0;
      right: 0;
      top: 0;
      bottom: 0;
      display: flex;
      justify-content: center;
      align-items: center;
      background: url(./login_bg.jpg) no-repeat;
      background-size: cover;
      .login-form {
          background-color: #fff;
          padding: 50px;
      }
  }
</style>
