<template>
	<view>
		<userCamera :imageLength="imageLength" :imageList="imageList" v-on:refresh="refresh"></userCamera>
		<view class="button-group">
			<button @tap="applyAdd">保存</button>
		</view>
	</view>
</template>

<script>
	import eventBus from '@/common/eventBus.js';
	import userCamera from '@/components/camera/userCamera.vue';
	const com = require('@/api/com.js');
	export default {
		name: 'AddApply',
		components: { userCamera },
		data() {
			return {
				 // 最多5张图片
				imageList: [],
				imageLength: 2,
				tmpImageSrc: '',
				fileNames:[]
			}
		},
		// 图片回显的
		onShow() {
		  console.log(this.tmpImageSrc);
				if (this.tmpImageSrc != '') {
					this.imageList.push(this.tmpImageSrc);
					this.tmpImageSrc = '';
			}
		},
		methods: {
			refresh: function(images) {
				this.imageList = images;
			},
			applyAdd(){
				console.log('上传');
				var that = this;
				for (let i = 0; i < that.imageList.length; i++) {
					com.userUploadFile(that.imageList[i], function(res) {
						console.log(res.data);
						let data = res.data;
						data = JSON.parse(data);
						that.fileNames.push(data.data.fileName);
						console.log(that.fileNames);
					})
				}
				that.fileNames = []
			}
		}
	}
</script>

<style>

</style>
