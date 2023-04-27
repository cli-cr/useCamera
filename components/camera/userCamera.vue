<template>
	<view>
		<view class="upload-image-view">
			<!-- 标题已经省略 -->
			<!-- <view class='title'>上传xxxx图片</view> -->
			<block v-for="(image, index) in imageList" :key="index">
				<view class="image-view">
					<image :src="image" :data-src="image" @tap="previewImage"></image>
					<view class="del-btn" @tap="deleteImage(index)"><view class="baicha"></view></view>
				</view>
			</block>
			<view class="add-view" @tap="openCamera" v-bind:style="{ display: showed }">
				<!-- 十字架 -->
				<view class="cross">
					<view class="transverse-line"></view>
					<view class="vertical-line"></view>
				</view>
			</view>
			<view class="info" v-if="imageLength > 0">拍摄照片，最多不超过{{ imageLength }}张。</view>
		</view>
	</view>
</template>

<script>
export default {
	name: 'userCamera',
	props: {
		imageList: Array,
		imageLength: {
			type: Number,
			default: 0
		}
	},
	data() {
		return {
			showed: 'flex',
			tmpImageSrc: ''
		};
	},
	methods: {
		openCamera() {
			if (this.imageLength > 0 && this.imageList.length >= this.imageLength) {
				// this.showed = 'none';
				this.$api.msg('最多只能拍摄五张照片');
				return;
			} else {
				uni.navigateTo({
					url: '/components/camera/openCamera'
				});
			}
		},
		//预览图片
		previewImage: function(e) {
			var current = e.target.dataset.src;
      console.log(e);
			uni.previewImage({
				current: current,
				urls: this.imageList
			});
		},
		//删除图片
		deleteImage: function(index) {
			var that = this;
			var images = that.imageList;
			images.splice(index, 1);

			that.$emit('refresh', images);
		}
	}
};
</script>

<style>
@import '../../common/css/upload-imgs.css';
</style>
