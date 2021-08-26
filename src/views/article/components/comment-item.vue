<template>
  <van-cell class="comment-item">
    <van-image slot="icon" class="avater" round fit="cover" :src="comment.aut_photo" />
    <div slot="title">
      <div class="title-wrap">
        <div class="name">{{ comment.aut_name }}</div>
        <div class="like-wrap" @click="onCommentLike">
          <van-icon :name="comment.is_liking ? 'good-job' : 'good-job-o'" class="like-icon" :class="{ liked: comment.is_liking }" />
          <span class="like-count">{{ comment.like_count }}</span>
        </div>
      </div>
      <div class="content">{{ comment.content }}</div>
      <div>
        <span class="pubdate">{{ comment.pubdate | dataTime('MM-DD HH:mm') }}</span>
        <van-button round size="mini" class="btn-reply" @click="$emit('reply', comment)">{{ comment.reply_count }} 回复</van-button>
      </div>
    </div>
  </van-cell>
</template>

<script>
import { addCommentLike, cancelCommentLike } from '@/api/comment.js'
export default {
  name: 'CommentItem',
  data() {
    return {}
  },
  props: {
    comment: {
      type: Object,
      required: true
    }
  },
  methods: {
    async onCommentLike() {
      const commentId = this.comment.com_id.toString()
      if (this.comment.is_liking) {
        await cancelCommentLike(commentId)
        this.comment.like_count--
      } else {
        await addCommentLike(commentId)
        this.comment.like_count++
      }
      this.comment.is_liking = !this.comment.is_liking
    }
  }
}
</script>

<style lang="less" scoped>
.comment-item {
  .title-wrap {
    display: flex;
    justify-content: space-between;
    .like-wrap {
      display: flex;
      align-items: center;
      justify-content: center;
    }
  }
  .avater {
    width: 36px;
    height: 36px;
    margin-right: 12px;
  }
  .name {
    font-size: 12px;
    color: skyblue;
  }
  .content {
    font-size: 14px;
    color: #222;
  }
  .pubdate {
    font-size: 10px;
    margin-right: 10px;
  }
  .van-button {
    top: -5px;
  }
  .btn-reply {
    background-color: rgba(231, 229, 229, 0.3);
  }
  .like-icon.liked {
    color: #ff69b4;
  }
}
</style>
