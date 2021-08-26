<template>
  <div class="update-gender">
    <van-picker show-toolbar title="性别" :default-index="defaultIndex" :columns="columns" @cancel="$emit('close')" @confirm="onConfirm" @change="onGenderChange" />
  </div>
</template>

<script>
import { updateUser } from '@/api/user.js'
export default {
  name: 'UpdateGender',
  data() {
    return {
      columns: ['男', '女'],
      defaultIndex: this.value
    }
  },
  methods: {
    onGenderChange(picker, value, index) {
      this.defaultIndex = index
    },
    async onConfirm() {
      this.$toast.loading({
        message: '保存中',
        forbidClick: true
      })

      await updateUser({
        gender: this.defaultIndex
      })
      this.$emit('input', this.defaultIndex)
      this.$emit('close')
      this.$toast.success('保存成功')
    }
  },
  props: {
    value: {
      type: Number,
      required: true
    }
  }
}
</script>

<style lang="less" scoped>
.update-gender {
  /deep/ .van-nav-bar__text {
    color: white;
  }
}
</style>
