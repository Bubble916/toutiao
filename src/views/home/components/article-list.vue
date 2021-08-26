<template>
  <div class="article-list" ref="article-list">
    <van-pull-refresh v-model="isLoading" @refresh="onRefresh">
      <van-list v-model="loading" :finished="finished" finished-text="没有更多了" @load="onLoad">
        <ArticleItem v-for="(item, index) in articles" :key="index" :article="item"></ArticleItem>
      </van-list>
    </van-pull-refresh>
  </div>
</template>

<script>
import { getArticle } from '@/api/article.js'
import ArticleItem from '@/components/article-item.vue'
import { debounce } from 'lodash'
export default {
  name: 'ArticleList',
  data() {
    return {
      articles: [],
      loading: false,
      finished: false,
      timestamp: null,
      isLoading: false,
      scrollTop: 0
    }
  },
  props: {
    channel: {
      type: Object,
      required: true
    }
  },
  methods: {
    async onLoad() {
      const { data } = await getArticle({
        channel_id: this.channel.id,
        timestamp: this.timestamp || Date.now(),
        with_top: 1
      })
      const { results } = data.data
      this.articles.push(...results)
      this.loading = false
      if (results.length) {
        this.timestamp = results.pre_timestamp
      } else {
        this.finished = true
      }
    },
    async onRefresh() {
      const { data } = await getArticle({
        channel_id: this.channel.id,
        timestamp: this.timestamp || Date.now(),
        with_top: 1
      })
      const { results } = data.data
      this.articles.unshift(...results)
      this.$toast(`成功加载了${results.length}篇文章`)
      this.isLoading = false
    }
  },
  components: {
    ArticleItem
  },
  mounted() {
    this.$refs['article-list'].onscroll = debounce(() => {
      this.scrollTop = this.$refs['article-list'].scrollTop
    }, 50)
  },
  activated() {
    this.$refs['article-list'].scrollTop = this.scrollTop
  }
}
</script>

<style lang="less" scoped>
.article-list {
  position: fixed;
  left: 0;
  right: 0;
  top: 90px;
  bottom: 50px;
  overflow: auto;
}
</style>
