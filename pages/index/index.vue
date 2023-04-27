<template>
	<view class="content">
		<text>首页</text>
		<button @click="goChat">点击跳转聊天页</button>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				
			}
		},
		onShow() {
			console.log('Index page show');
		},
		onLoad() {
			// 获取当前页面栈的实例
			console.log(getCurrentPages());
		},
		onPullDownRefresh(){
			// 页面压根无法下拉
			console.log('页面下拉刷新了！');
		},
		methods: {
			goChat(){
				uni.redirectTo({
					url:'/pages/chat/chat'
				})
			}
		}
	}
</script>

<style>
	.content {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
	}

	.logo {
		height: 200rpx;
		width: 200rpx;
		margin-top: 200rpx;
		margin-left: auto;
		margin-right: auto;
		margin-bottom: 50rpx;
	}

	.text-area {
		display: flex;
		justify-content: center;
	}

	.title {
		font-size: 36rpx;
		color: #8f8f94;
	}
</style>
