<template>
  <div class="comment-list">
    <van-list v-model="loading" :finished="finished" finished-text="已显示全部评论" @load="onLoad">
      <van-cell title="全部评论"></van-cell>
      <CommentItem v-for="(comment, index) in list" :key="index" :comment="comment" @reply="$emit('reply', $event)"></CommentItem>
    </van-list>
  </div>
</template>

<script>
import { getComments } from '@/api/comment.js'
import CommentItem from '@/views/article/components/comment-item.vue'
export default {
  name: 'CommentList',
  data() {
    return {
      loading: false,
      finished: false,
      offset: null,
      limit: 10
    }
  },
  props: {
    source: {
      type: [Number, String, Object],
      required: true
    },
    type: {
      type: String,
      default: 'a'
    },
    list: {
      type: Array,
      default: () => []
    }
  },
  methods: {
    async onLoad() {
      const { data } = await getComments({
        type: this.type,
        // source: parseInt(this.source),
        source: this.source.toString(),
        offset: this.offset,
        limit: this.limit
      })
      this.$emit('update-totalCount', data.data.total_count)
      const { results } = data.data
      this.list.push(...results)
      this.loading = false
      if (results.lenght) {
        this.offset = data.data.last_id
      } else {
        this.finished = true
      }
    }
  },
  components: {
    CommentItem
  }
}
</script>
<style lang="less" scoped></style>
