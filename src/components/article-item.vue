<template>
  <van-cell
    class="article-item"
    :to="{
      name: 'article',
      params: {
        articleId: article.art_id
      }
    }"
  >
    <div slot="title" class="title van-multi-ellipsis--l3">{{ article.title }}</div>
    <div slot="label">
      <div class="image-wrap" v-if="article.cover.type === 3">
        <div class="wrap-item" v-for="(img, index) in article.cover.images" :key="index">
          <van-image class="image-item" fit="cover" :src="img" />
        </div>
      </div>
      <div class="label-wrap">
        <span>{{ article.aut_name }}</span>
        <span>{{ article.comm_count }}评论</span>
        <span>{{ article.pubdate | relativeTime }}</span>
      </div>
    </div>
    <van-image v-if="article.cover.type === 1" class="right-image" fit="cover" :src="article.cover.images[0]" />
  </van-cell>
</template>

<script>
export default {
  name: 'ArticleItem',
  props: {
    article: {
      type: Object,
      required: true
    }
  }
}
</script>

<style lang="less" scoped>
.article-item {
  .title {
    font-size: 16px;
    color: #3a3a3a;
  }
  /deep/ .van-cell__value {
    flex: unset;
    width: 120px;
    height: 70px;
    margin-left: 12px;
  }
  .right-image {
    width: 120px;
    height: 70px;
  }
  .image-wrap {
    display: flex;
    padding: 15px 0;
    .wrap-item {
      flex: 1;
      height: 70px;
      &:not(:last-child) {
        padding-right: 4px;
      }
      .image-item {
        width: 100%;
        height: 70px;
      }
    }
  }
  .label-wrap {
    font-size: 10px;
    color: #b4b4b4;
    span {
      margin-right: 12px;
    }
  }
}
</style>
