<template>
  <div class="channel-edit">
    <van-cell center :border="false">
      <div slot="title" class="title">我的频道</div>
      <van-button type="danger" round plain size="mini" @click="isEdit = !isEdit">{{ isEdit ? '完成' : '编辑' }}</van-button>
    </van-cell>
    <van-grid :gutter="10">
      <van-grid-item class="grid-item" :class="{ active: index === active }" :icon="isEdit && index !== 0 ? 'clear' : ''" v-for="(channel, index) in userChannels" :key="index" :text="channel.name" @click="sub(channel, index)" />
    </van-grid>
    <van-cell center :border="false">
      <div slot="title" class="title">频道推荐</div>
    </van-cell>
    <van-grid :gutter="10">
      <van-grid-item class="grid-item" v-for="(channel, index) in recommendChannels" :key="index" :text="channel.name" @click="add(channel)" />
    </van-grid>
  </div>
</template>

<script>
import { getAllChannels, addUserChannels, deleteUserChannel } from '@/api/channels.js'
import { mapState } from 'vuex'
import { setItem } from '@/utils/storage.js'
export default {
  name: 'ChannelEdit',
  data() {
    return {
      allChannels: [],
      isEdit: false
    }
  },
  props: {
    // userChannels也行(驼峰命名法)
    userChannels: {
      type: Array,
      required: true
    },
    active: {
      type: Number,
      required: true
    }
  },
  methods: {
    async loadAllChennels() {
      const { data } = await getAllChannels()
      this.allChannels = data.data.channels
    },
    async add(channel) {
      if (this.isEdit) {
        this.userChannels.push(channel)
        if (this.user) {
          await addUserChannels({
            channels: [
              {
                id: channel.id,
                seq: this.userChannels.length
              }
            ]
          })
        } else {
          setItem('user-channels', this.userChannels)
        }
      }
    },
    sub(channel, index) {
      if (this.isEdit && index !== 0) {
        this.deleteChannel(channel, index)
      } else {
        this.switchChannel(index)
      }
    },
    async deleteChannel(channel, index) {
      // 删除索引之后的数组值(包含当前索引)
      if (index <= this.active) {
        this.$emit('update-active', this.active - 1)
      }
      this.userChannels.splice(index, 1)
      if (this.user) {
        await deleteUserChannel(channel.id)
      } else {
        setItem('user-channels', this.userChannels)
      }
    },
    switchChannel(index) {
      this.$emit('close')
      this.$emit('update-active', index)
    }
  },
  computed: {
    ...mapState(['user']),
    recommendChannels() {
      return this.allChannels.filter(channels => {
        return !this.userChannels.find(userChannel => {
          return userChannel.id === channels.id
        })
      })
    }
  },
  created() {
    this.loadAllChennels()
  }
}
</script>

<style lang="less" scoped>
.channel-edit {
  .van-button--mini {
    padding: 0 15px;
  }
  padding-top: 55px;
  .title {
    font-size: 16px;
    color: #333;
  }
  .grid-item {
    width: 80px;
    height: 45px;
    /deep/ .van-grid-item__content {
      background-color: #f4f5f6;
      .van-grid-item__text {
        margin-top: 0;
        font-size: 14px;
        color: #222;
      }
    }
    /deep/ .van-grid-item__icon {
      position: absolute;
      right: -10px;
      top: -5px;
      font-size: 20px;
      color: #ccc;
      z-index: 999;
    }
  }
  .active {
    /deep/ .van-grid-item__text {
      color: red !important;
    }
  }
}
</style>
