<template>
  <div class="login-container">
      <el-form ref="login-form" :model="user" :rules="rules" class="login-form">
  <el-form-item prop="mobile">
    <el-input v-model="user.mobile" placeholder="请输入手机号"></el-input>
  </el-form-item>
  <el-form-item prop="code">
    <el-input v-model="user.code" placeholder="请输入验证码"></el-input>
  </el-form-item>
  <el-form-item prop="agree">
    <el-checkbox v-model="user.agree">我已阅读并同意用户协议和隐私条款</el-checkbox>
  </el-form-item>
  <el-form-item>
    <el-button type="primary" @click="onlogin" style="width: 100%" :loading="loginLoding">登录</el-button>
  </el-form-item>
</el-form>
  </div>
</template>

<script>
// 加载请求模块
import { loginTo } from '@/api/user'
export default {
  name: 'LoginIndex',
  components: {},
  props: {},
  data () {
    return {
      user: {
        mobile: '13911111111',
        code: '246810',
        agree: ''
      },
      loginLoding: false,
      rules: {
        mobile: [
          { pattern: /^1[3|5|7|8]\d{9}$/, message: '请输入正确的号码格式', trigger: 'change' },
          { required: true, message: '请输入手机号', trigger: 'blur' }
        ],
        code: [
          { required: true, message: '验证码不能为空', trigger: 'blur' },
          { pattern: /^\d{6}$/, message: '请输入正确的验证码', trigger: 'change' }
        ],
        agree: [
          {
            validator: (rule, value, callback) => {
              if (value) {
                callback()
              } else {
                callback(new Error('请同意用户协议'))
              }
              // console.log(value)
            }
          }
        ]
      }
    }
  },
  computed: {},
  watch: {},
  created () {},
  mounted () {},
  methods: {
    onlogin () {
      // 强制表单校验
      this.$refs['login-form'].validate(valid => {
        // console.log(valid) valid是验证结果 false/true
        if (!valid) {
          return
        }
        // 校验通过 再调用请求函数
        this.login()
      })
    },
    login () {
      // 获取表单数据（根据接口要求绑定数据）
      // const user = this.user
      this.loginLoding = true
      loginTo(this.user).then(res => {
        // 简单的提示信息
        this.$message({
          message: '登录成功',
          type: 'success'
        })
        // 恢复登录按钮的点击状态
        this.loginLoding = false
        // 登陆成功获取token令牌
        // console.log(1)
        window.localStorage.setItem('user', JSON.stringify(res.data.data))
        // 跳转到首页
        this.$router.push(
          {
            name: 'home'
          }
        )
      }).catch(err => {
        console.log(err)
        this.$message.error('登录失败')
        this.loginLoding = false
      })
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
