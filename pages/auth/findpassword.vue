<template>
	<view id="findpwd">
		<view class="reg-name u-flex">
			<text class="u-flex">邮箱：</text> <input type="text" v-model="email" />
		</view>
		<view class="reg-password u-flex">
			<text class="u-flex">密码：</text> <input type="password" v-model="password" />
		</view>
		<view class="reg-confirmPwd u-flex u-relative">
			<text class="u-flex">确认密码：</text> <input type="password" v-model="confirmPwd" @input="checkPwd" />
			<view class="ctext u-absolute" v-show="pwdShow">两次密码不一致</view>
		</view>
		<view class="reg-code u-flex">
			<text class="u-flex">验证码：</text> <input type="text" v-model="code"/>
			<button type="primary" @click="getCode" v-show="isCodeShow">获取验证码</button>
			<button type="default" disabled v-show="!isCodeShow">{{second}}秒后重新发送</button>
		</view>
		<button type="primary" @click="findPwd">确定</button>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				email:'',
				password:'',
				confirmPwd:'',
				code:'',
				pwdShow: true,
				second: 60,
				isCodeShow:true
			}
		},
		onLoad(option) {
			if(option.email)
			this.email = option.email;
		},
		methods: {
			checkPwd() {
				if (this.password == this.confirmPwd) {
					this.pwdShow = false;
				} else {
					this.pwdShow = true;
				}
			},
			async getCode(){
				this.isCodeShow = false;
				await this.$u.api.authCode({email: this.email});
				let timer = setInterval(()=>{
					this.second > 1 ? this.second--:(clearInterval(timer),this.isCodeShow = true,this.second = 60);
				},1000);
			},
			async findPwd(){
				const params = {
					code: this.code,
					email: this.email,
					password: this.password,
					password_confirmation: this.confirmPwd
				}
				await this.$u.api.authFindpwd(params);
				uni.redirectTo({
					url:`/pages/auth/login?email=${this.email}`
				})
			}
		}
	}
</script>

<style lang='scss' scoped>
	#findpwd {
		background-color: #ededed;

		>view {
			background-color: #fff;
			padding: 20rpx;
			margin-bottom: 2rpx;
			font-size: 40rpx;
			button{
				font-size: 28rpx;
			}
			.ctext {
				bottom: 0;
				color: rgba($color: #ff0000, $alpha: 0.6);
				font-size: 24rpx;
				left: 50%;
			}
		}
		.reg-code{
			input{
				width: 30%;
			}
			button{
				margin-left: auto;
			}
		}
	}
</style>
