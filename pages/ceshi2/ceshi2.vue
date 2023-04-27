<template>
  <view class="content">
    <button @click="chooseImage">拍照或选择图片</button>
    <image :src="imgUrl" mode="widthFix"></image>
  </view>
</template>

<script>
  export default {
    data() {
      return {
        imgUrl: ''
      }
    },
    methods: {
      chooseImage() {
        uni.chooseImage({
          count: 1,
          success: (res) => {
            let tempFilePaths = res.tempFilePaths;
            uni.uploadFile({
              url: "http://192.168.6.248:7080/file/upload",
              header:{
              	'Authorization': "Bearer " + "eyJhbGciOiJIUzUxMiJ9.eyJ1c2VyX2lkIjoxLCJ1c2VyX2tleSI6IjQxYzY2ZGNlLTNkN2YtNDI1Mi05Y2M3LWNkZDc4ZGY5YTY4ZSIsInVzZXJuYW1lIjoiYWRtaW4ifQ.3S1Gj2dtEgtB6_STSPQbGF_lD4l80F042vzr28P7D4iRpxEnymNDHemj6dyoFIvJWyGXA-8EpVGVWHY-ikr1Ww"
              },
              filePath: tempFilePaths[0],
              name: 'file',
              success: (uploadFileRes) => {
                this.imgUrl = uploadFileRes.data;
              }
            });
          }
        });
      }
    }
  }
</script>

<style>

</style>
