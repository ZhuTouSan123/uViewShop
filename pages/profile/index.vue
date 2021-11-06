<template>
	<view id="profile">
		<navigator url='./modify/modify' class="avatarbox u-flex u-padding-40">
			<u-avatar :src="vuex_user.avatar_url" size="120"></u-avatar>
			<view class="user-info">
				<view class="user-name">{{vuex_user.name ? vuex_user.name : '未登录'}}</view>
				<view class="user-email">{{vuex_user.email}}</view>
			</view>
			<u-icon class="arrow-right" name='arrow-right' size="40"></u-icon>
		</navigator>
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
					{title: '商品收藏', path: './star/star', iconName: 'star'},
					{title: '地址管理', path: './address/address', iconName: 'map'}
				]
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
