<template>
  <div class="home-container">
    <van-nav-bar class="van-nav-bar">
      <van-button slot="title" class="btn-search" icon="search" type="info" round to="/search">搜索</van-button>
    </van-nav-bar>
    <van-tabs v-model="active">
      <van-tab :title="item.name" v-for="item in channels" :key="item.id">
        <ArticleList :channel="item"></ArticleList>
      </van-tab>
      <div slot="nav-right" style="width:33px;flex-shrink:0;"></div>
      <div slot="nav-right" class="wap-nav-wrap" @click="editShow = true">
        <van-icon name="wap-nav" />
      </div>
    </van-tabs>
    <van-popup v-model="editShow" get-container="body" position="bottom" class="edit" closeable close-icon-position="top-left">
      <ChannelEdit :userChannels="channels" :active="active" @close="editShow = false" @update-active="active = $event"></ChannelEdit>
    </van-popup>
  </div>
</template>

<script>
import { userArticle } from '@/api/user.js'
import ArticleList from '@/views/home/components/article-list.vue'
import ChannelEdit from '@/components/channel-edit.vue'
import { mapState } from 'vuex'
import { getItem } from '@/utils/storage.js'
export default {
  name: 'Home',
  data() {
    return {
      active: 0,
      channels: [],
      editShow: false
    }
  },
  methods: {
    async loadArticle() {
      let channels = []
      if (this.user) {
        const { data } = await userArticle()
        channels = data.data.channels
      } else {
        const localChannels = getItem('user-channels')
        if (localChannels) {
          channels = localChannels
        } else {
          const { data } = await userArticle()
          channels = data.data.channels
        }
      }
      this.channels = channels
    }
    // onUpdateActive(index) {
    //   this.active = index
    // }
  },
  components: {
    ArticleList,
    ChannelEdit
  },
  computed: {
    ...mapState(['user'])
  },
  created() {
    this.loadArticle()
  }
}
</script>

<style lang="less" scoped>
.home-container {
  /deep/ .van-nav-bar__title {
    max-width: none;
  }
  .btn-search {
    width: 277px;
    height: 32px;
    background-color: #844ae9;
    border: none;
    line-height: 32px;
    .van-icon {
      font-size: 16px;
    }
    .van-button__text {
      font-size: 14px;
    }
  }
  /deep/ .van-tabs__line {
    background-color: #844ae9;
  }
  .wap-nav-wrap {
    position: fixed;
    right: 0;
    width: 33px;
    height: 44px;
    padding-top: 4px;
    text-align: center;
    line-height: 44px;
    background-color: rgba(255, 255, 255, 0.9);
    .van-icon {
      font-size: 24px;
    }
  }
}
.edit {
  height: 100%;
}
</style>
