<template>
	<view id="login">
		<view class="top"></view>
		<view class="content">
			<view class="title">欢迎登录图书商城</view>
			<input class="u-border-bottom" v-model="email" placeholder="请输入邮箱"/>
			<input class="u-border-bottom" type="password" v-model="password" placeholder="请输入密码" />
			<button @tap="submit" :style="[inputStyle]" class="getCaptcha">登录</button>
			<view class="findpassword-reg u-flex u-row-between u-m-t-10">
				<navigator :url="`./findpassword?email=${email}`">找回密码</navigator>
				<navigator url="./reg">立即注册</navigator>
			</view>
		</view>
		<view class="buttom">
			<view class="loginType">
				<view class="wechat item">
					<view class="icon"><u-icon size="70" name="weixin-fill" color="rgb(83,194,64)"></u-icon></view>
					微信
				</view>
				<view class="QQ item">
					<view class="icon"><u-icon size="70" name="qq-fill" color="rgb(17,183,233)"></u-icon></view>
					QQ
				</view>
			</view>
			<view class="hint">
				登录代表同意
				<text class="link">图书商城用户协议、隐私政策，</text>
				并授权使用您的图书商城账号信息（如昵称、头像、收获地址）以便您统一管理
			</view>
		</view>
	</view>
</template>

<script>
export default {
	data() {
		return {
			email: '',
			password:'',
		}
	},
	onLoad(option) {
		if(option.email)
		this.email = option.email;
	},
	computed: {
		inputStyle() {
			let style = {};
			if(this.$u.test.email(this.email) && this.password) {
				style.color = "#fff";
				style.backgroundColor = this.$u.color['warning'];
			}
			return style;
		}
	},
	methods: {
		async submit() {
			if(!this.$u.test.email(this.email) || !this.password) return;
			const params = {
				email: this.email,
				password: this.password
			};
			const loginRes = await this.$u.api.authLogin(params);
			this.$u.vuex('vuex_token',loginRes.access_token);
			const userInfo = await this.$u.api.userInfo();
			this.$u.vuex('vuex_user',userInfo);
			uni.switchTab({
				url: "/pages/profile/index"
			});
		}
	}
};
</script>

<style lang="scss" scoped>
	.u-border-bottom{
		margin-bottom: 30rpx !important;
	}
#login {
	font-size: 28rpx;
	.content {
		width: 600rpx;
		margin: 0 auto;
		.findpassword-reg{
			font-size: 24rpx;
			color: #888;
		}
		.title {
			text-align: left;
			font-size: 60rpx;
			font-weight: 500;
			margin-top: 40rpx;
			margin-bottom: 60rpx;
		}
		input {
			text-align: left;
			margin-bottom: 10rpx;
			padding-bottom: 6rpx;
		}
		.tips {
			color: $u-type-info;
			margin-bottom: 60rpx;
			margin-top: 8rpx;
		}
		.getCaptcha {
			background-color: rgb(253, 243, 208);
			color: $u-tips-color;
			border: none;
			font-size: 30rpx;
			padding: 12rpx 0;
			
			&::after {
				border: none;
			}
		}
		.alternative {
			color: $u-tips-color;
			display: flex;
			justify-content: space-between;
			margin-top: 30rpx;
		}
	}
	.buttom {
		.loginType {
			display: flex;
			padding: 300rpx 150rpx 150rpx 150rpx;
			justify-content:space-between;
			
			.item {
				display: flex;
				flex-direction: column;
				align-items: center;
				color: $u-content-color;
				font-size: 28rpx;
			}
		}
		
		.hint {
			padding: 20rpx 40rpx;
			font-size: 20rpx;
			color: $u-tips-color;
			
			.link {
				color: $u-type-warning;
			}
		}
	}
}
</style>
