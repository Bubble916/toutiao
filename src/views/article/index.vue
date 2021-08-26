<template>
  <div class="article-container">
    <van-nav-bar class="van-nav-bar" title="文章详情" left-arrow @click-left="$router.back()" />
    <div class="article-wrap">
      <h1 class="title">{{ article.title }}</h1>
      <van-cell center class="user-info">
        <div slot="title" class="auth-title">{{ article.aut_name }}</div>
        <van-image slot="icon" class="avater" round fit="cover" :src="article.aut_photo" />
        <div slot="label" class="pubdate">
          {{ article.pubdate | relativeTime }}
        </div>
        <van-button class="btn-follow" round size="small" :type="article.is_followed ? 'default' : 'info'" :icon="article.is_followed ? '' : 'plus'" :loading="isFollowLoading" @click="onFollow">{{ article.is_followed ? '已关注' : '关注' }}</van-button>
      </van-cell>
      <div class="content markdown-body" v-html="article.content" ref="article-content"></div>
      <van-divider class="content">正文结束</van-divider>
      <CommentList :source="articleId" :list="commentList" @update-totalCount="totalCommentCount = $event" @reply="onReply"></CommentList>
    </div>
    <div class="article-bottom">
      <van-button class="btn-comment" type="default" round size="small" @click="isPostShow = true">写评论</van-button>
      <van-icon name="comment-o" :info="totalCommentCount" color="#777"></van-icon>
      <van-icon :color="article.is_collected ? 'orange' : '#777'" :name="article.is_collected ? 'star' : 'star-o'" @click="onCollect"></van-icon>
      <van-icon :color="article.attitude === 1 ? 'hotpink' : '#777'" :name="article.attitude === 1 ? 'good-job' : 'good-job-o'" @click="onLike"></van-icon>
      <van-icon name="share" color="#777"></van-icon>
    </div>
    <van-popup v-model="isPostShow" position="bottom">
      <PostComment :target="articleId" @post-success="onPostSuccess"></PostComment>
    </van-popup>
    <van-popup v-model="isReplyShow" position="bottom">
      <CommentReply v-if="isReplyShow" :comment="replyComment" :articleId="articleId" @close="isReplyShow = false"></CommentReply>
    </van-popup>
  </div>
</template>

<script>
import '@/views/article/github-markdown.css'
import { getArticleInfo, addCollect, cancelCollect, addLike, cancelLike } from '@/api/article.js'
import { ImagePreview } from 'vant'
import { addFollow, cancelFollow } from '@/api/user.js'
import CommentList from '@/views/article/components/comment-list.vue'
import PostComment from '@/views/article/components/post-comment.vue'
import CommentReply from '@/views/article/components/comment-reply.vue'
export default {
  name: 'ArticleInfo',
  data() {
    return {
      article: {},
      isFollowLoading: false,
      isCollectLoading: false,
      isPostShow: false,
      commentList: [],
      totalCommentCount: 0,
      isReplyShow: false,
      replyComment: {}
    }
  },
  props: {
    articleId: {
      type: [String, Number, Object],
      required: true
    }
  },
  methods: {
    async loadArticle() {
      const { data } = await getArticleInfo(this.articleId)
      this.article = data.data
      this.$nextTick(() => {
        this.handleImage()
      })
    },
    handleImage() {
      const articleContent = this.$refs['article-content']
      const imgs = articleContent.querySelectorAll('img')
      const imgPaths = []
      imgs.forEach((img, index) => {
        imgPaths.push(img.src)
        img.onclick = function() {
          ImagePreview({
            images: imgPaths,
            startPosition: index
          })
        }
      })
    },
    async onFollow() {
      this.isFollowLoading = true
      if (this.article.is_followed) {
        await cancelFollow(this.article.aut_id)
      } else {
        await addFollow(this.article.aut_id)
      }
      this.article.is_followed = !this.article.is_followed
      this.isFollowLoading = false
    },
    async onCollect() {
      this.$toast.loading({
        message: '操作中...',
        forbidClick: true
      })
      if (this.article.is_collected) {
        await cancelCollect(this.articleId)
      } else {
        await addCollect(this.articleId)
      }
      this.article.is_collected = !this.article.is_collected
      this.$toast.success(`${this.article.is_collected ? '' : '取消'}收藏成功`)
    },
    async onLike() {
      this.$toast.loading({
        message: '操作中...',
        forbidClick: true
      })
      if (this.article.attitude === 1) {
        await cancelLike(this.articleId)
        this.article.attitude = -1
      } else {
        await addLike(this.articleId)
        this.article.attitude = 1
      }
      this.$toast.success(`${this.article.attitude === 1 ? '' : '取消'}点赞成功`)
    },
    onPostSuccess(comment) {
      this.commentList.unshift(comment)
      this.totalCommentCount++
      this.isPostShow = false
    },
    onReply(comment) {
      this.replyComment = comment
      this.isReplyShow = true
    }
  },
  components: {
    CommentList,
    PostComment,
    CommentReply
  },
  created() {
    this.loadArticle()
  }
}
</script>

<style lang="less" scoped>
.article-container {
  .article-wrap {
    position: fixed;
    left: 0;
    right: 0;
    top: 46px;
    bottom: 44px;
    overflow-y: auto;
  }
  .title {
    font-size: 20px;
    color: #3a3a3a;
    padding: 14px;
    background-color: #fff;
    margin: 0;
  }
  .user-info {
    .avater {
      width: 35px;
      height: 35px;
      margin-right: 8px;
    }
    .auth-title {
      font-size: 14px;
      color: #333;
    }
    .pubdate {
      font-size: 10px;
      color: #b4b4b4;
    }
    .btn-follow {
      width: 85px;
      height: 29px;
      font-size: 12px;
      line-height: 29px;
      border: none;
      background-color: #844ae9;
    }
    .van-button--default {
      color: #844ae9;
      background-color: #fff;
      border: 1px solid #844ae9;
    }
  }
  .markdown-body {
    padding: 14px;
    background-color: #fff;
  }
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
      width: 141px;
      height: 26px;
      border: 2px solid #eeeeee;
      font-size: 15px;
      line-height: 26px;
      color: #a7a7a7;
    }
    /deep/ .van-icon {
      font-size: 20px;
    }
  }
}
</style>
