<template>
	<view>
		<view  class="view-fir">
			<camera device-position="back" flash="off" @error="error" style="width: 100%; height: 570px;"></camera>
			<view class="button-group">
				<button type="primary" @click="takePhoto" style="margin-bottom: 10upx;margin-top: 30upx;">拍照</button>
				<button type="primary" @click="chooseImage" style="margin-bottom: 10upx;margin-top: 30upx;">选择相册</button>
			</view>
		</view>
		<view class="view-sec"><canvas canvas-id="firstCanvas" class="canvas" style="width: 100%;height: 570px;"></canvas></view>
	</view> 
</template>

<script>
import QQMAP from "../../common/qqmap.js"
export default {
	data() {
		return {
			tempSrc: '',
			nowTime: '',
			latitude: '',
			longitude: '',
			addr: ''
		};
	},
	methods: {
		takePhoto() {
			console.log('拍照')
			uni.showLoading({
				mask: true,
				title:'正在处理,请稍候...'
			});
			this.getLocation();
			this.getNowTime();
		},
		draw() {
			const ctx = uni.createCameraContext();
			var _self = this;
			ctx.takePhoto({
				quality: 'high',
				success: res => {
					_self.addWorkMark('firstCanvas', res.tempImagePath);
				}
			});
		},
		addWorkMark(canvasId, imgSrc) {
			var that = this;
			console.log(that);
			wx.getSystemInfo({
				success (dev) {
					console.log(dev.model)
					console.log(dev.pixelRatio)
					console.log(dev.windowWidth)
					console.log(dev.windowHeight)
					console.log(dev.language)
					console.log(dev.version)
					console.log(dev.platform)
					console.log(dev.environment)
					uni.getImageInfo({ 
						src: imgSrc,
						success: ress => {
							console.log(ress)
							let ctx = uni.createCanvasContext(canvasId);
							ctx.drawImage(imgSrc, 0, 0, dev.windowWidth, 570); // 绘制图像到画布 // 图片那拼接
							// ctx.drawImage('你要添加的图片路径', 0, 0, 80, 48); // 绘制图像到原有画布，也就是图片拼接 // 图片加水印
							ctx.setTextAlign('left');
							ctx.setFillStyle('#ff0000');
							ctx.setFontSize(16);
							ctx.fillText(that.nowTime, 20, 30); //在画布上绘制被填充的文本
							ctx.fillText(that.latitude.toFixed(8) + ',' + that.longitude.toFixed(8), 20, 50);
							ctx.fillText(that.addr, 20, 70);
							ctx.draw(false, function() {
								setTimeout(function() {
									uni.canvasToTempFilePath({
										canvasId: canvasId,
										success: res => {
											//res.tempFilePath
											console.log(res.tempFilePath)
											console.log('回转推片', res)
											uni.hideLoading();
											that.$api.prePage().tmpImageSrc = res.tempFilePath;
                      console.log(that.$api.prePage().tmpImageSrc);
											uni.navigateBack();
										},
										fail: e => {
											uni.hideLoading();
											that.$api.prePage().tmpImageSrc = imgSrc;
                      console.log(that.$api.prePage().tmpImageSrc);
											uni.navigateBack();
										}
									});
								}, 200);
							});
						}
					});

				}
			})

		},
		getNowTime() {
			this.nowTime = this.$api.dateFormat('yyyy-MM-dd hh:mm:ss', new Date());
		},
		async getLocation() {
			let res = await QQMAP.getLocation();
			console.log(res);
			this.addr = res.location;
			this.latitude = res.latitude;
			this.longitude = res.longitude;
			this.draw();
		},

		error(e) {
			console.log(e.detail);
		},
		chooseImage() {
			console.log('从相册选择')
			var that = this;
			uni.chooseImage({
			    count: 1, //默认9
			    sizeType: ['original', 'compressed'], //可以指定是原图还是压缩图，默认二者都有
			    sourceType: ['album'], //从相册选择
			    success: function (res) {
			        console.log(JSON.stringify(res.tempFilePaths));
					uni.hideLoading();
					that.$api.prePage().tmpImageSrc = res.tempFilePaths[0];
          console.log(that.$api.prePage().tmpImageSrc);
					uni.navigateBack();
			    }
			})
		}
	},

};
</script>

<style>
	.view-fir {
		position: absolute; 
		width: 100%;
		height: 100%;
		z-index: 9999;
		margin-top: 0;
		margin-left: 0;
	}
	.button-group{
		width: 100%;
		padding: 0 40rpx;
		box-sizing: border-box;
		position: absolute;
		bottom: 40rpx;
	}
	.view-sec {
		position: absolute;
		background: #ffffff;
		width: 100%;
		height: 100%;
		z-index: 100;
		display: flex;
		align-items: center;
	}
</style>
