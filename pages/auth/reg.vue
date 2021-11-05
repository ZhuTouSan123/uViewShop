<template>
	<view id="reg">
		<view class="reg-name u-flex">
			<text class="u-flex">昵称：</text> <input type="text" v-model="name" />
		</view>
		<view class="reg-email u-flex">
			<text class="u-flex">邮箱：</text> <input type="text" v-model="email" />
		</view>
		<view class="reg-password u-flex">
			<text class="u-flex">密码：</text> <input type="password" v-model="password" />
		</view>
		<view class="reg-confirmPwd u-flex">
			<text class="u-flex">确认密码：</text> <input type="password" v-model="confirmPwd" />
		</view>
		<button type="primary">确认注册</button>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				name: '',
				email: '',
				password: '',
				confirmPwd: ''
			}
		},
		methods: {
			
		}
	}
</script>

<style lang='scss' scoped>
	#reg{
		background-color: #ededed;
		>view{
			background-color: #fff;
			padding: 20rpx;
			margin-bottom: 2rpx;
			font-size: 40rpx;
		}
	}
</style>
