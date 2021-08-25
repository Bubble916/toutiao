<template>
  <div class="login-container">
    <van-nav-bar class="van-nav-bar" title="登录界面" left-arrow @click-left="$router.back()" />
    <van-form validate-first ref="loginForm" :show-error-message="false" :show-error="false" @submit="onLogin" @failed="onFail">
      <van-field v-model="user.mobile" center icon-prefix="iconfont" left-icon="shouji" placeholder="请输入手机号" name="mobile" :rules="Rules.mobile" />
      <van-field v-model="user.code" center clearable icon-prefix="iconfont" left-icon="yanzhengma" placeholder="请输入验证码" name="code" :rules="Rules.code">
        <template #button>
          <van-button v-if="isDownShow" size="mini" round class="send" :loading="isSendLoading" @click.prevent="onSend">发送验证码</van-button>
          <van-count-down :time="1000 * 60" format="ss s" v-else @finish="isDownShow = true" />
        </template>
      </van-field>
      <div class="login-btn">
        <van-button type="primary" color="#7232dd" round block>登录</van-button>
      </div>
    </van-form>
  </div>
</template>

<script>
import { login, send } from '@/api/user.js'
export default {
  name: 'Login',
  data() {
    return {
      user: {
        mobile: '',
        code: ''
      },
      Rules: {
        // 验证手机号格式
        mobile: [
          { required: true, message: '请填写手机号' },
          { pattern: /^(13[0-9]|14[01456879]|15[0-35-9]|16[2567]|17[0-8]|18[0-9]|19[0-35-9])\d{8}$/, message: '手机号格式不正确' }
        ],
        // 验证验证码格式
        code: [
          { required: true, message: '请填写验证码' },
          { pattern: /^\d{6}$/, message: '验证码格式不正确' }
        ]
      },
      isDownShow: true,
      isSendLoading: false
    }
  },
  methods: {
    // 实现登录
    async onLogin() {
      this.$toast.loading({
        message: '加急登录中，别催...',
        forbidClick: true,
        duration: 0
      })
      try {
        const { data } = await login(this.user)
        this.$toast.success('登录成功')
        this.$store.commit('setUser', data.data)
        this.$router.back()
      } catch (err) {
        this.$toast.fail('登录失败，填写的手机号或验证码错误!!!')
      }
    },
    // 表单不符合格式提示
    onFail(err) {
      if (err.errors[0]) {
        this.$toast({
          message: err.errors[0].message,
          position: 'top'
        })
      }
    },
    // 发送验证码
    async onSend() {
      try {
        await this.$refs.loginForm.validate('mobile')
        this.isSendLoading = true
        await send(this.user.mobile)
        this.isDownShow = false
      } catch (err) {
        let message = ''
        if (err && err.response && err.response.status === 429) {
          message = '发送太频繁了，请稍后重试'
        } else if (err.name === 'moblie') {
          message = err.message
        } else {
          message = '发送失败，请稍后重试'
        }
        this.$toast({
          message,
          position: 'top'
        })
      }
      this.isSendLoading = false
    }
  }
}
</script>

<style lang="less" scoped>
.login-container {
  .send {
    width: 76px;
    height: 23px;
    background-color: #ededed;
    font-size: 10px;
    color: #666;
  }
  .login-btn {
    padding: 26px 16px;
    .van-button--primary {
      border: none;
    }
    .van-button--normal {
      font-size: 16px;
    }
  }
}
</style>
