<template>
	<view>
		<text>chat</text>
		<!-- 聊天列表 -->
		
		<!-- 聊天输入 -->
		<input type="text" placeholder="请输入聊天内容" />
	</view>
</template>

<script>
	export default {
		data() {
			return {
				
			}
		},
		onLoad() {
			// 获取当前页面栈的实例
			console.log(getCurrentPages());
		},
		onPullDownRefresh(){
			console.log('页面下拉刷新了！');
		},
		methods: {
			
		}
	}
</script>

<style>

</style>
