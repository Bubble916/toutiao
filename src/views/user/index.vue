<template>
  <div class="user-container">
    <van-nav-bar class="van-nav-bar" title="个人信息" left-arrow @click-left="$router.back()" />
    <input type="file" hidden ref="file" accept="image/*" @change="onFileChange" />
    <van-cell title="头像" is-link center @click="$refs.file.click()">
      <van-image width="30" height="30" round fit="cover" :src="user.photo" />
    </van-cell>
    <van-cell title="昵称" is-link :value="user.name" @click="isEditName = true"></van-cell>
    <van-cell title="性别" is-link :value="user.gender === 0 ? '男' : '女'" @click="isEditGender = true"></van-cell>
    <van-cell title="生日" is-link :value="user.birthday" @click="isEditBirthday = true"></van-cell>
    <van-popup v-model="isEditName" position="bottom" :style="{ height: '100%' }">
      <UpdateName v-if="isEditName" v-model="user.name" @close="isEditName = false"></UpdateName>
    </van-popup>
    <van-popup v-model="isEditGender" position="bottom">
      <UpdateGender v-if="isEditGender" v-model="user.gender" @close="isEditGender = false"></UpdateGender>
    </van-popup>
    <van-popup v-model="isEditBirthday" position="bottom">
      <UpdateBirthday v-if="isEditBirthday" v-model="user.birthday" @close="isEditBirthday = false"></UpdateBirthday>
    </van-popup>
    <van-popup v-model="isEditPhoto" position="bottom" :style="{ height: '100%' }">
      <UpdatePhoto v-if="isEditPhoto" :file="prePhoto" @close="isEditPhoto = false" @update-photo="user.photo = $event"></UpdatePhoto>
    </van-popup>
  </div>
</template>

<script>
import UpdateName from '@/views/user/components/update-name.vue'
import UpdateGender from '@/views/user/components/update-gender.vue'
import UpdateBirthday from '@/views/user/components/update-birthday.vue'
import UpdatePhoto from '@/views/user/components/update-photo.vue'
import { getUser } from '@/api/user.js'
export default {
  name: 'User',
  data() {
    return {
      user: {},
      isEditName: false,
      isEditGender: false,
      isEditBirthday: false,
      isEditPhoto: false,
      prePhoto: null
    }
  },
  methods: {
    async loadUser() {
      const { data } = await getUser()
      this.user = data.data
    },
    onFileChange() {
      const file = this.$refs.file.files[0]
      this.prePhoto = file
      this.isEditPhoto = true
      this.$refs.file.value = ''
    }
  },
  components: {
    UpdateName,
    UpdateGender,
    UpdateBirthday,
    UpdatePhoto
  },
  created() {
    this.loadUser()
  }
}
</script>

<style lang="less" scoped>
/deep/ .van-popup {
  background-color: #f5f7f9;
}
</style>
