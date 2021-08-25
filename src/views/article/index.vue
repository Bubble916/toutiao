<template>
  <div class="article-container">
    <van-nav-bar class="van-nav-bar" title="文章详情" left-arrow @click-left="$router.back()" />
    <h1 class="title">dadsdasdsd</h1>
    <van-cell center class="user-info">
      <div slot="title" class="auth-title">勇闯天涯</div>
      <van-image slot="icon" class="avater" round fit="cover" src="https://img01.yzcdn.cn/vant/cat.jpeg" />
      <div slot="label" class="pubdate">14小时前</div>
      <van-button class="btn-follow" round size="small" type="info" icon="plus">关注</van-button>
    </van-cell>
    <div class="content markdown-body"></div>
  </div>
</template>

<script>
import '@/views/article/github-markdown.css'
import { getArticleInfo } from '@/api/article.js'
export default {
  name: 'ArticleInfo',
  props: {
    articleId: {
      type: [String, Number, Object],
      required: true
    }
  },
  methods: {
    async loadArticle() {
      const { data } = await getArticleInfo(this.articleId)
      console.log(data)
    }
  },
  created() {
    this.loadArticle()
  }
}
</script>

<style lang="less" scoped>
.article-container {
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
  }
  .markdown-body {
    padding: 14px;
    background-color: #fff;
  }
}
</style>
