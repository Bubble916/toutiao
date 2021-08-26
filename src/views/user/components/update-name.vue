<template>
  <div class="update-name">
    <van-nav-bar title="修改昵称" left-text="取消" right-text="完成" @click-left="$emit('close')" @click-right="onClickRight" />
    <div class="name-wrap">
      <van-field v-model="message" rows="1" autosize type="textarea" maxlength="7" placeholder="请输入昵称" show-word-limit />
    </div>
  </div>
</template>

<script>
import { updateUser } from '@/api/user.js'
export default {
  name: 'UpdateName',
  data() {
    return {
      message: this.value
    }
  },
  methods: {
    async onClickRight() {
      this.$toast.loading({
        message: '保存中',
        forbidClick: true
      })
      try {
        await updateUser({
          name: this.message
        })
        this.$emit('input', this.message)
        this.$emit('close')
        this.$toast.success('保存成功')
      } catch (err) {
        if (err && err.response && err.response.status === 409) {
          this.$toast.fail('昵称已存在')
        }
      }
    }
  },
  props: {
    value: {
      type: String,
      required: true
    }
  }
}
</script>

<style lang="less" scoped>
.update-name {
  /deep/ .van-nav-bar__text {
    color: white;
  }
  .name-wrap {
    padding: 10px;
  }
}
</style>
