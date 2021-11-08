<template>
	<view id="profile">
		<view url='./modify/modify' class="avatarbox u-flex u-padding-40">
			<view class="avatar">
				<oss-upload></oss-upload>
			</view>
			<view class="user-info">
				<view class="user-name">{{vuex_user.name ? vuex_user.name : '未登录'}}</view>
				<view class="user-email">{{vuex_user.email}}</view>
			</view>
		</view>
		<block v-for="s in sList" :key='s.title'>
			<profile-service :path='s.path' :iconName='s.iconName' :title='s.title'></profile-service>
		</block>
		<button type="warn" class="u-m-t-20" @click="logout">退出登录</button>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				sList:[
					{title: '个人信息', path: './modify/modify', iconName: 'account'},
					{title: '商品收藏', path: './star/star', iconName: 'star'},
					{title: '地址管理', path: './address/address', iconName: 'map'}
				],
				src:"../../static/avatar.png",
				isSrcShow: false
			}
		},
		onShow(){
			if(!uni.getStorageSync('lifeData')){
				uni.showToast({
					title:'请先登录',
					icon:'error'
				});
				setTimeout(()=>{
					uni.redirectTo({
						url:'/pages/auth/login'
					})
				},1500)
			}
		},
		methods: {
			async logout(){
				const res = await this.$u.api.authLogout();
				uni.clearStorageSync();
				uni.redirectTo({
					url:'/pages/index/index'
				})
			}
		}
	}
</script>

<style lang="scss" scoped>
	page{
		background-color: #ededed;
	}
	.arrow-right{
		margin-left: auto;
		color: #888;
	}
	#profile{
		.avatarbox{
			background-color: #fff;
			margin-bottom: 20rpx;
			.avatar{
				width: 120rpx;
				height: 128rpx;
			}
			.user-info{
				display: flex;
				flex-direction: column;
				justify-content: space-around;
				padding: 12rpx;
				.user-name{
					font-size: 32rpx;
					font-weight: 600;
				}
				.user-email{
					color: #888;
				}
			}
		}

	}
	

</style>
