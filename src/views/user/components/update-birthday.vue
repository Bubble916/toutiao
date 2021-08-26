<template>
  <div class="update-birthday">
    <van-datetime-picker v-model="currentDate" type="date" title="选择年月日" :min-date="minDate" :max-date="maxDate" @cancel="$emit('close')" @confirm="onConfirm" />
  </div>
</template>

<script>
import { updateUser } from '@/api/user.js'
import dayjs from 'dayjs'
export default {
  name: 'UpdateBirthday',
  data() {
    return {
      minDate: new Date(2000, 0, 1),
      maxDate: new Date(),
      currentDate: new Date(this.value)
    }
  },
  methods: {
    async onConfirm() {
      this.$toast.loading({
        message: '保存中',
        forbidClick: true
      })
      await updateUser({
        birthday: dayjs(this.currentDate).format('YYYY-MM-DD')
      })
      this.$emit('input', dayjs(this.currentDate).format('YYYY-MM-DD'))
      this.$emit('close')
      this.$toast.success('保存成功')
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
.update-birthday {
  /deep/ .van-nav-bar__text {
    color: white;
  }
}
</style>
