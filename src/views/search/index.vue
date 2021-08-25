<template>
  <div class="search-container">
    <form action="/">
      <van-search v-model="searchValue" background="#844ae9" placeholder="请输入搜索关键词" show-action @search="onSearch(searchValue)" @cancel="$router.back()" @focus="isResultShow = false" />
    </form>
    <SearchResult v-if="isResultShow" :search-value="searchValue"></SearchResult>
    <SearchSuggestion v-else-if="searchValue" :search-value="searchValue" @search="onSearch"></SearchSuggestion>
    <SearchHistory v-else :search-histories="searchHistories" @search="onSearch" @updata-histories="searchHistories = []"></SearchHistory>
  </div>
</template>

<script>
import SearchSuggestion from './components/search-suggestion.vue'
import SearchHistory from './components/search-history.vue'
import SearchResult from './components/search-result.vue'
import { mapState } from 'vuex'
import { setItem, getItem } from '@/utils/storage.js'
// import { getSearchHistories } from '@/api/search.js'
export default {
  name: 'SearchIndex',
  data() {
    return {
      searchValue: '',
      isResultShow: false,
      searchHistories: []
    }
  },
  methods: {
    onSearch(searchValue) {
      this.searchValue = searchValue
      const index = this.searchHistories.indexOf(searchValue)
      if (index !== -1) {
        this.searchHistories.splice(index, 1)
      }
      this.searchHistories.unshift(searchValue)
      this.isResultShow = true
    },
    async loadSearchHistories() {
      const searchHistories = getItem('search-histories') || []
      // if (this.user) {
      //   const { data } = await getSearchHistories()
      //   searchHistories = [...new Set([...searchHistories, ...data.data.keywords])]
      // }
      this.searchHistories = searchHistories
    }
  },
  components: {
    SearchSuggestion,
    SearchHistory,
    SearchResult
  },
  computed: {
    ...mapState(['user'])
  },
  watch: {
    searchHistories() {
      setItem('search-histories', this.searchHistories)
    }
  },
  created() {
    this.loadSearchHistories()
  }
}
</script>

<style lang="less" scoped>
.search-container {
  .van-search__action {
    color: #fff;
  }
}
</style>
