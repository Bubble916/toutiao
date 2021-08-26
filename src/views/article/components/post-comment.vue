<template>
  <div class="post-comment">
    <van-field v-model="message" rows="2" autosize type="textarea" maxlength="50" placeholder="请输入评论" show-word-limit />
    <van-button @click="onPost" :disabled="!message">发布</van-button>
  </div>
</template>

<script>
import { addComment } from '@/api/comment.js'
export default {
  name: 'PostComment',
  data() {
    return {
      message: ''
    }
  },
  props: {
    target: {
      type: [Number, String, Object],
      required: true
    },
    articleId: {
      type: [Number, String, Object],
      default: null
    }
  },
  methods: {
    async onPost() {
      this.$toast.loading({
        message: '发布中',
        forbidClick: true
      })
      const { data } = await addComment({
        target: this.target.toString(),
        content: this.message,
        art_id: this.articleId ? this.articleId.toString() : null
      })
      this.$emit('post-success', data.data.new_obj)
      this.$toast.success('发布成功')
      this.message = ''
    }
  }
}
</script>

<style lang="less" scoped>
.post-comment {
  padding: 14px;
  display: flex;
  align-items: center;
  .van-button--normal {
    padding: 0;
    border: none;
    .van-button__content {
      width: 30px;
      height: 50px;
    }
  }
}
</style>
