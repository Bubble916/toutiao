<template>
  <div class="me-container">
    <van-cell-group class="me" v-if="user">
      <van-cell class="base" center :border="false">
        <van-image class="avater" slot="icon" round fit="cover" :src="currentUser.photo" />
        <div class="nick" slot="title">{{ currentUser.name }}</div>
        <van-button class="btn-update" size="small" round to="/user/profile">编辑资料</van-button>
      </van-cell>
      <van-grid :border="false">
        <van-grid-item class="data-item">
          <div slot="text" class="wrap">
            <div class="num">{{ currentUser.art_count }}</div>
            <div class="text">头条</div>
          </div>
        </van-grid-item>
        <van-grid-item class="data-item">
          <div slot="text" class="wrap">
            <div class="num">{{ currentUser.follow_count }}</div>
            <div class="text">关注</div>
          </div>
        </van-grid-item>
        <van-grid-item class="data-item">
          <div slot="text" class="wrap">
            <div class="num">{{ currentUser.fans_count }}</div>
            <div class="text">粉丝</div>
          </div>
        </van-grid-item>
        <van-grid-item class="data-item">
          <div slot="text" class="wrap">
            <div class="num">{{ currentUser.like_count }}</div>
            <div class="text">获赞</div>
          </div>
        </van-grid-item>
      </van-grid>
    </van-cell-group>
    <div class="nologin" v-else>
      <div
        @click="
          $router.push({
            name: 'login',
            query: {
              redirect: '/me'
            }
          })
        "
      >
        <van-image class="bigavater" slot="icon" round fit="cover" src="https://img01.yzcdn.cn/vant/cat.jpeg" />
      </div>
      <div class="text">登录</div>
    </div>
    <van-grid class="nav-grid mb4" :column-num="2">
      <van-grid-item class="nav-grid" icon="star-o" text="收藏" />
      <van-grid-item class="nav-grid" icon="browsing-history-o" text="历史" />
    </van-grid>
    <van-cell title="通知" is-link to="/" />
    <div class="out" v-if="user">
      <van-button type="danger" block round @click="logout">退出登录</van-button>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import { currentUser } from '@/api/user.js'
export default {
  name: 'Me',
  data() {
    return {
      currentUser: {}
    }
  },
  computed: {
    ...mapState(['user'])
  },
  methods: {
    logout() {
      this.$dialog
        .confirm({
          title: '退出提示',
          message: '要考虑一下吗？'
        })
        .then(() => {
          this.$store.commit('setUser', null)
        })
        .catch(() => {})
    },
    async loadCurrentUser() {
      const { data } = await currentUser()
      this.currentUser = data.data
    }
  },
  created() {
    this.loadCurrentUser()
  }
}
</script>

<style lang="less" scoped>
.me-container {
  .me {
    background: url('./banner.png') no-repeat center;
    .base {
      box-sizing: border-box;
      padding-top: 30px;
      padding-bottom: 11px;
      height: 115px;
      background-color: unset;
      .avater {
        box-sizing: border-box;
        width: 66px;
        height: 66px;
        border: 1px solid rgba(255, 255, 255, 0.7);
        margin-right: 12px;
      }
      .nick {
        font-size: 15px;
        color: #fff;
      }
      .btn-update {
        height: 30px;
        font-size: 14px;
        color: #666;
      }
    }
    .data-item {
      height: 65px;
      color: #fff;
      .wrap {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        .num {
          font-size: 18px;
        }
        .text {
          font-size: 12px;
        }
      }
    }
    /deep/ .van-grid-item__content {
      background-color: unset;
    }
  }
  .nologin {
    height: 180px;
    background: url('./banner.png') no-repeat center;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    .bigavater {
      box-sizing: border-box;
      width: 80px;
      height: 80px;
      border: 1px solid rgba(255, 255, 255, 0.7);
    }
    .text {
      font-size: 16px;
      color: #fff;
    }
  }
  /deep/ .nav-grid {
    .nav-grid {
      height: 70px;
      .van-icon-star-o {
        font-size: 22px;
        color: #eb5255;
      }
      .van-icon-browsing-history-o {
        font-size: 22px;
        color: #ff9d11;
      }
      .van-grid-item__text {
        font-size: 14px;
        color: #333;
      }
    }
  }
  .out {
    display: flex;
    justify-content: center;
    padding-top: 30px;
    .van-button--danger {
      width: 300px;
      border: none;
    }
  }
  .mb4 {
    margin-bottom: 4px;
  }
}
</style>
