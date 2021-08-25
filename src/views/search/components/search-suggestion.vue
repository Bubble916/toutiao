<template>
  <div class="search-suggestion">
    <van-cell icon="search" v-for="(str, index) in suggestion" :key="index" @click="$emit('search', str)">
      <div slot="title" v-html="highlight(str)"></div>
    </van-cell>
  </div>
</template>

<script>
import { getSearchSuggestion } from '@/api/search.js'
import { debounce } from 'lodash'
export default {
  name: 'SearchSuggestion',
  data() {
    return {
      suggestion: [],
      htmlStr: ''
    }
  },
  props: {
    searchValue: {
      type: String,
      required: true
    }
  },
  watch: {
    searchValue: {
      handler: debounce(async function() {
        const { data } = await getSearchSuggestion(this.searchValue)
        this.suggestion = data.data.options
      }, 200),
      immediate: true
    }
  },
  methods: {
    highlight(str) {
      const highLightText = `<span style="color: red">${this.searchValue}</span>`
      const reg = new RegExp(this.searchValue, 'gi')
      return str.replace(reg, highLightText)
    }
  }
}
</script>

<style lang="less" scoped></style>
