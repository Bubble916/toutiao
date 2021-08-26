<template>
  <div class="comment-reply">
    <van-nav-bar :title="`${comment.reply_count} 条回复`">
      <van-icon slot="left" name="cross" size="14" @click="$emit('close')" />
    </van-nav-bar>
    <CommentItem :comment="comment"></CommentItem>
    <van-cell title="所有回复"></van-cell>
    <CommentList :source="comment.com_id" type="c" :list="commentList"></CommentList>
    <div class="article-bottom">
      <van-button class="btn-comment" type="default" round size="small" @click="isPostShow = true">写评论</van-button>
    </div>
    <van-popup v-model="isPostShow" position="bottom">
      <PostComment :target="comment.com_id" :articleId="articleId" @post-success="onPostSuccess"></PostComment>
    </van-popup>
  </div>
</template>

<script>
import CommentItem from '@/views/article/components/comment-item.vue'
import CommentList from '@/views/article/components/comment-list.vue'
import PostComment from '@/views/article/components/post-comment.vue'
export default {
  name: 'CommentReply',
  components: {
    CommentItem,
    CommentList,
    PostComment
  },
  props: {
    comment: {
      type: Object,
      required: true
    },
    articleId: {
      type: [Number, String, Object],
      required: true
    }
  },
  data() {
    return {
      isPostShow: false,
      commentList: []
    }
  },
  methods: {
    onPostSuccess(comment) {
      this.commentList.unshift(comment)
      this.comment.reply_count++
      this.isPostShow = false
    }
  }
}
</script>

<style lang="less" scoped>
.article-bottom {
  position: fixed;
  left: 0;
  right: 0;
  bottom: 0;
  display: flex;
  justify-content: space-around;
  align-items: center;
  box-sizing: border-box;
  height: 44px;
  border-top: 1px solid #d8d8d8;
  background-color: #fff;
  .btn-comment {
    width: 200px;
    height: 30px;
    border: 1px solid #eeeeee;
    font-size: 15px;
    line-height: 30px;
    color: #a7a7a7;
  }
}
</style>
