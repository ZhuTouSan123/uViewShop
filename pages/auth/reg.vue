<template>
	<view id="reg">
		<view class="reg-name u-flex">
			<text class="u-flex">昵称：</text> <input type="text" v-model="name" />
		</view>
		<view class="reg-email u-flex u-relative">
			<text class="u-flex">邮箱：</text> <input type="text" v-model="email" @input="checkEmail" />
			<view class="ctext u-absolute" v-show="emailShow">邮箱格式不正确</view>
		</view>
		<view class="reg-password u-flex">
			<text class="u-flex">密码：</text> <input type="password" v-model="password" />
		</view>
		<view class="reg-confirmPwd u-flex u-relative">
			<text class="u-flex">确认密码：</text> <input type="password" v-model="confirmPwd" @input="checkPwd" />
			<view class="ctext u-absolute" v-show="pwdShow">两次密码不一致</view>
		</view>
		<button type="primary" @click="reg">确认注册</button>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				name: '',
				email: '',
				password: '',
				confirmPwd: '',
				emailShow: true,
				pwdShow: true
			}
		},
		methods: {
			checkEmail() {
				if (this.$u.test.email(this.email)) {
					this.emailShow = false;
				} else {
					this.emailShow = true;
				}
			},
			checkPwd() {
				if (this.password == this.confirmPwd) {
					this.pwdShow = false;
				} else {
					this.pwdShow = true;
				}
			},
			async reg(){
				const params = {
					name: this.name,
					email: this.email,
					password: this.password,
					password_confirmation: this.confirmPwd
				}
				await this.$u.api.authReg(params);
				uni.redirectTo({
					url:`/pages/auth/login?email=${this.email}`
				})
			}
		}
	}
</script>

<style lang='scss' scoped>
	#reg {
		background-color: #ededed;

		>view {
			background-color: #fff;
			padding: 16rpx 20rpx 24rpx 20rpx;
			margin-bottom: 2rpx;
			font-size: 40rpx;

			.ctext {
				bottom: 0;
				color: rgba($color: #ff0000, $alpha: 0.6);
				font-size: 20rpx;
				left: 50%;
			}
		}
	}
</style>
