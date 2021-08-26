<template>
  <div class="update-photo">
    <img class="image" :src="image" ref="image" />
    <van-nav-bar class="bottombar" left-text="取消" right-text="确认" @click-left="$emit('close')" @click-right="onConfirm"></van-nav-bar>
  </div>
</template>

<script>
import { updateUserPhoto } from '@/api/user.js'
import 'cropperjs/dist/cropper.css'
import Cropper from 'cropperjs'
export default {
  name: 'UpdatePhoto',
  data() {
    return {
      image: window.URL.createObjectURL(this.file),
      cropper: null
    }
  },
  methods: {
    getCroppedCanvas() {
      return new Promise(resolve => {
        this.cropper.getCroppedCanvas().toBlob(blob => {
          resolve(blob)
        })
      })
    },
    async onConfirm() {
      this.$toast.loading({
        message: '保存中',
        forbidClick: true,
        duration: 0
      })
      const file = await this.getCroppedCanvas()
      const fd = new FormData()
      fd.append('photo', file)
      await updateUserPhoto(fd)
      this.$toast.success('保存成功')
      this.$emit('update-photo', window.URL.createObjectURL(file))
      this.$emit('close')
    }
  },
  props: {
    file: {
      required: true
    }
  },
  mounted() {
    const image = this.$refs.image
    this.cropper = new Cropper(image, {
      viewMode: 1,
      dragMode: 'move',
      aspectRatio: 1,
      cropBoxMovable: false,
      cropBoxResizable: false,
      background: false,
      movable: true
    })
  }
}
</script>

<style lang="less" scoped>
.update-photo {
  background-color: #000;
  /deep/ .van-nav-bar__text {
    color: white;
  }
  .bottombar {
    position: fixed;
    left: 0;
    right: 0;
    bottom: 0;
  }
  .image {
    display: block;
    max-width: 100%;
  }
}
</style>
